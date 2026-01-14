
//#region 
import { createUnitData, deleteUnitData, getAllUnits, getUnitById, updateUnitData } from '../services/unit_service.js'
//#endregion

//#region 

// get all units controller
async function displayUnits(request, response) {
  try {
    const units = await getAllUnits();
    response.status(200).json(units)
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}

// get unit by id controller
async function _getUnitById(request, response) {
  try {
    // console.log("Fetching unit with ID:", request.params.id);
    const unit = await getUnitById(request.params.id)
    response.status(200).json(unit)
  } catch (error) {
      const status = error.message.includes("not found") ? 404 : 500;
      response.status(status).json({error: error.message})
  }
}

// update unit data controller
async function _updateUnitData(request, response) {
  try {
    const newUnit = await updateUnitData(request.params.id, request.body)
    response.status(201).json(newUnit)
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

// create unit data controller
async function createNewUnitData(request, response) {
  try {
    const newUnitData = await createUnitData(request.body)
    response.status(201).json(newUnitData)
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

// delete unit data controller
async function _deleteUnitData(request, response) {
  try {
    const deletedUnit = await deleteUnitData(request.params.id)
    response.status(200).json(deletedUnit)
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

//#endregion

export { displayUnits, _getUnitById, _updateUnitData, createNewUnitData, _deleteUnitData }