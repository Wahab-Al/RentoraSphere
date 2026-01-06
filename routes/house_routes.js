import express from 'express'
import displayHouses from '../controllers/house_controller.js'

const router = express.Router()

router.get('/houses', displayHouses)

export default router