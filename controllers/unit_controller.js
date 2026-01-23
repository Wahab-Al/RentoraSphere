
//#region 
import { createUnitData, deleteUnitData, getAllUnits, getUnitById, updateUnitData } from '../services/unit_service.js'
import { zodUnit, zodUpdateUnit } from '../validators/unit_validator.js'
import { z } from 'zod'
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
    const validateData = zodUpdateUnit.parse(request.body)
    const { id } = request.params;
    const currentUserId = request.user._id.toString();
    const currentUserRole = request.user.role;

    const unit = await getUnitById(id);
    if (!unit) {
      return response.status(404).json({ error: "Unit not found" });
    }

    const isOwner = unit.owner?.toString() === currentUserId;
    const isSysManager = currentUserRole === 'sysManager';

    if (isSysManager || isOwner) {
      const newUnit = await updateUnitData(id, validateData);
      return response.status(200).json({message: `unit data with id: ** ${id} ** is updated`, unit: newUnit});
    }
    return response.status(403).json({ error: "Access Denied" });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        message: "Invalid input data",
        errors: (error.errors || []).map(error => ({ field: error.path[0], message: error.message }))
      });
    }
    const status = error.message.includes("not found") ? 404 : 500;
    return response.status(status).json({ error: error.message });
  }
}

// create unit data controller
async function createNewUnitData(request, response) {
  try {
    const validateData = zodUnit.parse(request.body)
    const newUnitData = await createUnitData(validateData)
    response.status(201).json(newUnitData)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        message: "Invalid input data",
        errors: (error.errors || []).map(error => ({ field: error.path[0], message: error.message }))
      });
    }
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

// delete unit data controller
async function _deleteUnitData(request, response) {
  try {
    const { id } = request.params;
    const currentUserId = request.user._id.toString();
    const currentUserRole = request.user.role;
    const unit = await getUnitById(id);
    if (!unit) {
      return response.status(404).json({ error: "Unit not found" });
    }

    const isOwner = unit.owner?.toString() === currentUserId;
    const isSysManager = currentUserRole === 'sysManager';

    if (isSysManager || isOwner) {
      const deletedUnit = await deleteUnitData(id);
      return response.status(200).json({message: `unit data with id: ** ${id} ** is deleted`, unit: deletedUnit});
    }

    return response.status(403).json({ error: "Access Denied" });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

//#endregion

export { displayUnits, _getUnitById, _updateUnitData, createNewUnitData, _deleteUnitData }