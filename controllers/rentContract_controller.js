import { updateContractStatusToApproveOrRejectContract, createContractData, getContracts, getContractById, updateContractData, deleteContractData } from "../services/rentContract_service.js"

// get all contracts
const getContractsController = async (request, response) => {
  try {
    const currentUserId = request.user._id.toString()
    const currentUserRole = request.user.role
    const contracts = await getContracts();
    if(currentUserRole === 'sysManager'){
      response.status(200).json({
        message: 'Rental Contracts has been invoked',
        data: contracts
      })
    }
    const userContracts = contracts.filter(contract=>{
      const isRenter = contract.user?._id?.toString() === currentUserId;
      const isOwner = contract.unitOwner?._id?.toString() === currentUserId;
      if(isRenter || isOwner)
        return true
      else{
        return false
      }
    })
    return response.status(200).json({
      message: `Rental Contracts for user with id: ** ${currentUserId} ** has been invoked`,
      data: userContracts
    });
  } catch (error) {
    response.status(500).json({
      error: error.message
    });
  }
}

// get a specific contract data
const getContractByIdController = async (request, response) => {
  try {
    const { id } = request.params;
    const currentUserId = request.user._id
    const currentUserRole = request.user.role
    const contract = await getContractById(id);

    if (typeof contract === 'string') {
      return response.status(404).json({
        error: contract
      });
    }
    const isRenter = contract.user._id.toString() === currentUserId.toString()
    const isOwner = contract.unitOwner._id.toString() === currentUserId.toString()
    const isSysManager = currentUserRole === 'sysManager'

    if(isRenter || isOwner || isSysManager){
      response.status(200).json({
        data: contract
      });
    }else{
      return response.status(403).json({
        message: "Access Denied: You are not authorized to view this contract."
      });
    }
  } catch (error) {
    response.status(500).json({
      error: error.message
    });
  }
}

// request to create a new contract
const createContractController = async (request, response)=>{
  try {
    const {unitId} = request.params
    const userId = request.user._id
    const {contractDetails} = request.body || {}

    if (!contractDetails || !contractDetails.rentBeginn || !contractDetails.rentEnd) {
      return response.status(400).json({ 
        error: "Missing contract details: rentBeginn and rentEnd are required." 
      });
    }
    
    const result = await createContractData(unitId, userId, contractDetails)
    response.status(201).json({success:true, message: result.message, data: result.contract})
  } catch (error) {
    const status = error.message.toLowerCase().includes("not found") || 
                  error.message.toLowerCase().includes("exist") ? 404 : 400;
    response.status(status).json({ success: false, error: error.message });
  }
}

// update contract data
const updateContractDataController = async (request, response) => {
  try {
    const { id } = request.params;
    const currentUserRole = request.user.role;

    const contract = await getContractById(id); 

    if (!contract) {
      return response.status(404).json({ error: "Contract not found" });
    }
    const isSysManager = currentUserRole === 'sysManager';

    if (!isSysManager) {
      return response.status(403).json({
        message: "Unauthorized: You don't have permission to update this contract."
      });
    }
    const updatedContract = await updateContractData(id, request.body);
    response.status(200).json({
      message: "Contract updated successfully",
      data: updatedContract
    });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 400;
    response.status(status).json({
      error: error.message
    });
  }
}

// delete specific contract data
const deleteContractDataController = async (request, response) => {
  try {
    const { id } = request.params;
    const currentUserRole = request.user.role
    if(currentUserRole === 'sysManager'){
      const deletedContract = await deleteContractData(id);
      response.status(200).json({
        message: "Contract deleted and unit status reverted to available",
        data: deletedContract
      });
    }
    return response.status(403).json({
        message: "Access Denied: You are not authorized to view this contract."
      });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 400;
    response.status(status).json({
      error: error.message
    });
  }
}

// approve contract request 
const approveContractController = async (request, response) =>{
try {
  const {contractId} = request.params
    const ownerId = request.user._id
    const result = await updateContractStatusToApproveOrRejectContract(contractId, ownerId, 'approve')
    response.status(200).json({message: result.message, data: result.contract})
  } catch (error) {
    const status = error.message.includes("Unauthorized") ? 403 : 400;
    response.status(status).json({ error: error.message });
  }
}

// reject contract request
const rejectContractController = async (request, response) =>{
try {
  const {contractId} = request.params
    const ownerId = request.user._id
    const result = await updateContractStatusToApproveOrRejectContract(contractId, ownerId, 'reject')
    response.status(200).json({success: true, message: result.message, data: result.contract})
  } catch (error) {
    const status = error.message.includes("Unauthorized") ? 403 : 400;
    response.status(status).json({ error: error.message });
  }
}


export {createContractController, approveContractController, getContractsController, getContractByIdController, updateContractDataController, deleteContractDataController, rejectContractController}