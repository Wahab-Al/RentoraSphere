//#region 
import jwt from "jsonwebtoken"
import _config from "../config/env.js"
import User from "../models/user.js"
//#endregion

/**
 * @description Authentication middleware to verify JWT and attach user data to the request.
 */
const authenticate = async (request, response, next) =>{
  try {
    const header = request.header('Authorization')
    if(!header || !header.startsWith('Bearer '))
      return response.status(401).json({message: 'Not authenticated'})
    
    const token = header.replace('Bearer ','')
    const decoded = jwt.verify(token, _config.jwt_secret_key)
    const user = await User.findOne({ _id: decoded.sub, tokens: token }).select('+tokens')

    if(!user)
      return response.status(401).json({ message: 'Not authenticated, or Session expired or invalid' })
    request.user = user
    request.token = token
    next()
  } catch (error) {
    response.status(401).json({message: 'Invalid or Expired token'})
  }
}

export default authenticate