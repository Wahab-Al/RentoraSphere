import express from 'express'
import {_deletHouseData, _getHouseById, _updateHouseData, createNewHouseData, displayHouses  } from '../controllers/house_controller.js'

const router = express.Router()


//#region  house routes:
// get all houses data
router.get('/houses', displayHouses)
// get house data by id
router.get('/houses/:id', _getHouseById)
// update house data
router.patch('/houses/:id', _updateHouseData)
// create new house data
router.post('/houses', createNewHouseData)
// delete house data
router.delete('/houses/:id', _deletHouseData)
//#endregion
export default router