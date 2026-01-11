//#region 
import express from 'express'
import {_deleteClientData, _getClientDataById, _updateClientData, registerClient, displayClients, loginClient} from '../controllers/client_controller.js'
import { _deletHouseData } from '../controllers/house_controller.js'
//#endregion

const router = express.Router()

//#region Client Routes:

// register new client 
router.post('/clients/register', registerClient)
// login client
router.post('/clients/login', loginClient)
// get clients data
router.get('/clients', displayClients)
// get client data by id
router.get('/clients/:id', _getClientDataById)

// update client data 
router.patch('/clients/:id', _updateClientData)
// delete client data
router.delete('/clients/:id', _deleteClientData)
//#endregion
export default router