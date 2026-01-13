//#region 
import express from 'express'
import {_deleteClientData, _getClientDataById, _updateClientData, registerClient, displayClients, loginClient} from '../controllers/client_controller.js'
import { _deletHouseData } from '../controllers/house_controller.js'
import authenticate from '../middlewares/authenticate.js'
//#endregion

const router = express.Router()

//#region Client Routes:

// register new client 
router.post('/clients/register', authenticate, registerClient)
// login client
router.post('/clients/login', authenticate, loginClient)
// get clients data
router.get('/clients', authenticate, displayClients)
// get client data by id
router.get('/clients/:id', authenticate, _getClientDataById)

// update client data 
router.patch('/clients/:id', authenticate, _updateClientData)
// delete client data
router.delete('/clients/:id', authenticate, _deleteClientData)
//#endregion
export default router