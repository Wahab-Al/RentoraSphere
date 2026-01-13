//#region 
import Client from '../models/client.js'
//#endregion


//#region 

// creat a new client data
const createClient = async(enteredClient) =>{
  const client = await Client.create(enteredClient)
  const token = await client.generateToken()
  return {client, token}
}

/**
 * @desc    Authenticate client & get token
 * @route   POST /api/clients/login
 * @access  Public
 */

// login 
const login = async(email, password) =>{
    const client = await Client.findByCredentials(email, password)
    if(!client)
      throw new Error `Invalid email or password, check it and try it later.`
    const token = await client.generateToken()
    return {client, token}
}
// get all clients data 
const getClients = async()=>{
  return  await Client.find().sort({createdAt: -1})
}

// get client data by id 
const getClientDataById = async(clientId)=>{
  const client =  await Client.findById(clientId)
  if(!client)
    throw new Error `client with id: ${clientId} that you call is not exist`
  return client
}

// update client data
const updateClientData = async(clientId, client)=>{
  // Prevent hashing password if not changed 
  if(!client.password) delete client.password

  const newClientData = await Client.findByIdAndUpdate(clientId, client, {new: true, runValidators: true})
  if(!newClientData)
    throw new Error `client with id: ${clientId} that you call is not exist`
  return newClientData
}

// delete client data
const deleteClientData = async(clientId)=>{
  const deletedClient = await Client.findByIdAndDelete(clientId)
  if(!deletedClient)
    throw new Error `client with id: ${clientId} that you call is not exist`
  return deletedClient
}

//#endregion

export { getClients, createClient, getClientDataById, updateClientData, deleteClientData, login }