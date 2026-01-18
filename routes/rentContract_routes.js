//#region 
import express from 'express'
import authenticate from '../middlewares/authenticate.js'
import { approveContractController, createContractController, deleteContractDataController, getContractByIdController, getContractsController, updateContractDataController } from '../controllers/rentContract_controller.js'
//#endregion

const router = express.Router()

// Get all rental contracts
router.get('/', authenticate, getContractsController)
// Get a single contract by ID
router.get('/:id', authenticate, getContractByIdController)
// User sends a rental request for a specific unit
router.post('/request/:unitId', authenticate, createContractController)
// Update contract details
router.patch('/:id', authenticate, updateContractDataController)
// Delete/Cancel a contract
router.delete('/:id', authenticate, deleteContractDataController)
// Owner approves a pending rental request
router.patch('/approve/:contractId', authenticate, approveContractController)

export default router