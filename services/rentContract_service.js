import mongoose from 'mongoose'
import RentContract from '../models/rent_contract.js'
import Unit from '../models/unit.js'
import contractEvents from '../src/Events/contractEvents.js'

// create new rent contract controller
const createContractData = async(unitId, userId, contractDetails)=>{
  
  // start session to trak the changes
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const unit = await Unit.findById(unitId)
    .populate('owner')
    .session(session)
    if(!unit) throw new Error ('unit does not exist.')
    if(unit.unitStatus !== 'available') throw new Error ('Sorry, unit is already rented.')
    
    // collect months number:
    const startDate = new Date(contractDetails.rentBeginn)
    const endDate = new Date(contractDetails.rentEnd)
    const months_number = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth())

    const duration = months_number > 0 ? months_number : 1
    const totalContractValue = unit.price * duration

    const [newContract] = await RentContract.create([{
      title: `${unit.title} - Contract`,
      location: unit.location,
      rentBeginn: contractDetails.rentBeginn,
      rentEnd: contractDetails.rentEnd, 
      contractStatus: 'scheduled',
      orderStatus: 'pending',
      monthRentPrice: unit.price,
      totalContractValue: totalContractValue,
      unit: unitId, 
      unitOwner: unit.owner,
      user: userId 
    }],{session})
  
  // reserv the unit
  unit.unitStatus = 'reserved'
  
  // save changes
  await unit.save({session})
  await session.commitTransaction()

  // sending email to unit owner
  contractEvents.emit('contractCreated', {contract: newContract, owner: unit.owner, unit: unit})
  return {message: 'contract is created and email has been sent to owner.', contract: newContract}
  } catch (error) {
    // reject changes
    await session.abortTransaction()
    throw error
  }finally{
    // end the session
    session.endSession()
  }
}

// approv Rental contract
const approveContract = async(contractId, ownerId)=>{

  // start session to trak the changes
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    
    const contract = await RentContract.findById(contractId)
    .populate([
      { path: 'unit', select: 'title price location' },
      { path: 'user', select: 'name surname email phone' }
    ]).session(session)

    if(!contract) throw new Error('Contract not found')
    
    if(contract.unitOwner.toString() !== ownerId.toString()){
      throw new  Error('Unauthorized: Only owner can approve this contract request')
    }

    if(contract.orderStatus !== 'pending'){
      throw new  Error (`Invalid action: Contract is already ${contract.orderStatus}`)
    }

    contract.orderStatus = 'approved'
    contract.contractState = 'active'

    await contract.save({session})

    await Unit.findByIdAndUpdate(contract.unit._id, {
      unitStatus: 'rented'
    }, {session})

    // commit and and the session
    await session.commitTransaction();
    session.endSession();

    // publish Notification
    contractEvents.emit('contractApproved', contract)

    return {message: 'Approved successfully', contract: contract }
  } catch (error) {
    // reject changes
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

// get all Contracts controller
const getContracts = async ()=>{
  return  await RentContract.find()
  .populate({path: 'unit', select: 'title location monthRentPrice'})
  .populate({path: 'user', select: 'name surname email phone'})
  .populate({path: 'unitOwner', select: 'name surname email phone'})
  .sort({createdAt: -1})
}

// get Contract data controller
const getContractById = async(contractId)=>{
  const contract = await RentContract.findById(contractId)
  .populate({path: 'unit', select: 'title location monthRentPrice'})
  .populate({path: 'user', select: 'name surname email phone'})
  .populate({path: 'unitOwner', select: 'name surname email phone'})
  if(!contract)
    return `no contract found with id: ** ${contractId} **`
  return contract
}

//TODO: handle maintenance state
// update Contract data controller
const updateContractData = async(contractId, newContractDetails) =>{
  const newContract = await RentContract.findByIdAndUpdate(contractId, newContractDetails, {new:true, runValidators: true})
  if(!newContract)
    throw new Error(`Contract with id ${contractId} not found`);
  if(newContractDetails.contractState){
    let newUnitStatus
    switch (newContractDetails.contractState) {
      case 'active':
        newUnitStatus = 'rented'
        break;
      case 'scheduled':
        newUnitStatus = 'reserved'
        break;
      case 'expired':
      case 'cancelled':
        newUnitStatus = 'available'
        break; 
      default:
        console.warn(`Unknown contract state: ${newContractDetails.contractState}`);
        newUnitStatus = null;
        break;
    }
  }
  if(newUnitStatus)
    await Unit.findByIdAndUpdate(newContract.unit, {
      unitStatus: newUnitStatus
  })
  return newContract
}

// delete Contract data
const deleteContractData = async(contractId) =>{
  const deletedContract = await RentContract.findById(contractId)
  if(!deletedContract)
    throw new Error(`Contract with id ** ${contractId} ** not found`);
  await Unit.findByIdAndUpdate(deletedContract.unit, {unitStatus : 'available'})
  await deletedContract.deleteOne()
  return deletedContract
}

//#endregion

export { getContracts, getContractById, createContractData, updateContractData, deleteContractData, approveContract }