//#region 
import jwt from "jsonwebtoken"
import _config from "../config/env.js"
import Client from "../models/client.js"
//#endregion

/**
 * @description Authentication middleware to verify JWT and attach client data to the request.
 */
const authenticate = async (request, response, next) =>{
  try {
    const header = request.header('Authorization')
    if(!header || !header.startWith('Bearer '))
      return response.status(401).json({message: 'Not authenticated'})
    
    const token = header.replace('Bearer ','')
    const decoded = jwt.verify(token, _config.jwt_secret_key)
    const client = await Client.findOne({ _id: decoded.sub, tokens: token })

    if(!client)
      return response.status(404).json({message: `client with ${decoded.sub} is not found`})
    request.client = client
    request.token = token
    next()
  } catch (error) {
    response.status(401).json({message: 'Invalid or Expired token'})
  }
}

export default authenticate