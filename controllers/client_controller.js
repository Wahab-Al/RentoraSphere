//#region 
import  {getClients, createClient, updateClientData, getClientDataById, deleteClientData, login } from '../services/client_service.js'
//#endregion

//#region 

// create new client data methodController
const registerClient = async(request, response) =>{
  try {
    const { client, token } = await createClient(request.body)
    return response.status(201).json({message: 'Registraion successsful', client, token })
  } catch (error) {
    // Check for duplicate email error
    if (error.code === 11000) {
      return response.status(400).json({ error: "Email already exists" });
    }
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}
// login methodController
const loginClient = async(request, response) =>{
  try {
    const { client, token } = await login(request.body.email, request.body.password)
    response.status(200).json({message: 'Login successsful', client, token })
  } catch (error) {
    const status = error.message.includes("not found") ? 401 : 500;
    response.status(status).json({messge: 'Login Faild', error: error.message})
  }
}

// get all clients data methodController
const displayClients = async(request, response) =>{
  try {
    const Clients = await getClients();
    response.status(200).json(Clients)
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

// get client data by id methodController
const _getClientDataById = async(request, response) =>{
  try {
    const client = await getClientDataById(request.params.id)
    response.status(200).json(client)
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}


// update client data methodController 
const _updateClientData = async (request, response) =>{
  try {
    const client = await updateClientData(request.params.id, request.body)
    return response.status(201).json(client)
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

// delete client data methodController
const _deleteClientData = async (request, response) =>{
  try {
    const deletedClient = await deleteClientData(request.params.id)
    response.status(200).json(deletedClient)
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

export { displayClients, registerClient, _updateClientData, _getClientDataById, _deleteClientData, loginClient }