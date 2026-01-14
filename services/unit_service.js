//#region 
import Unit from "../models/unit.js"
//#endregion

//#region CRUD OPERATIONS:

//get all units
const getAllUnits = async()=>{
  return await Unit.find().sort({createdAt: -1})
}

//get unit by id
const getUnitById = async(unitId) =>{
  const unit = await Unit.findById(unitId)
  if(!unit)  
    throw new Error(`Unit with id ${unitId} not found`);
  return unit
}


// update unit data controller
const updateUnitData = async(unitId, unit) =>{
  const newUnit = await Unit.findByIdAndUpdate(unitId, unit, {new:true, runValidators: true})
  if(!newUnit)
    throw new Error(`Unit with id ${unitId} not found`);
  return newUnit
}


// create unit data
const createUnitData = async(unit)=>{
  const newunit = await Unit.create(unit)
  return newunit
}

// delete unit data
const deleteUnitData = async(unitId) =>{
  const deletedUnit = await Unit.findByIdAndDelete(unitId)
  if(!deletedUnit)
    throw new Error(`Unit with id ${unitId} not found`);
  return deletedUnit
}
//#endregion

export  { getAllUnits, getUnitById, updateUnitData, createUnitData, deleteUnitData }