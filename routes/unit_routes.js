import express from 'express'
import {_deleteUnitData, _getUnitById, _updateUnitData, createNewUnitData, displayUnits  } from '../controllers/unit_controller.js'
import authenticate from '../middlewares/authenticate.js'

const router = express.Router()


//#region  unit routes:

// get all units data
router.get('/', displayUnits)
// get unit data by id
router.get('/:id', _getUnitById)
// create new unit data
router.post('/', authenticate, createNewUnitData)
// update unit data
router.patch('/:id', authenticate, _updateUnitData)
// delete unit data
router.delete('/:id', authenticate, _deleteUnitData)

//#endregion
export default router