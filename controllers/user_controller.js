//#region 
import  {getUsers, createUser, updateUserData, getUserDataById, deleteUserData, login, removeToken, removeAllTokens } from '../services/user_service.js'
import { zodLogin, zodRegister, zodUpdateUser } from '../validators/user_validator.js'
import { z } from 'zod'
//#endregion

//#region 

// create new user data methodController
const registerUser = async(request, response) =>{
  try {
    const validateData = zodRegister.parse(request.body)
    // const role = request.body.role?.trim()
    if (validateData.role === 'sysmanager') {
      return response.status(403).json({ 
        success: false, 
        message: "Forbidden role!, registration as sysManager is prohibited." 
      });
    }
    const { user, token } = await createUser(validateData)
    return response.status(201).json({message: 'Registraion successsful', user, token })
  } catch (error) {
    if(error instanceof z.ZodError){
      return response.status(400).json({
        errors: (error.errors || []).map(error => ({
          field: error.path[0], massage: error.message
        }))
      })
    }
    // Check for duplicate email error
    if (error.code === 11000) {
      return response.status(400).json({ error: "Email already exists" });
    }
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}
// login methodController
const loginUser = async(request, response) =>{
  try {
    const validateData = zodLogin.parse(request.body)
    const { user, token } = await login(validateData.email, validateData.password)
    response.status(200).json({message: 'Login successsful', user, token })
  } catch (error) {
    if (error instanceof z.ZodError) {
  return response.status(400).json({
    message: "Invalid input data",
    errors: error.issues.map(issue => ({
      field:
        issue.path.length > 0
          ? issue.path.join('.')
          : issue.code === 'unrecognized_keys'
            ? issue.keys.join(', ')
            : 'body',
      message: issue.message
    }))
  })
}
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

// get all users data methodController
const displayUsers = async(request, response) =>{
  try {
    const currentUserRole =  request.user.role
    if(currentUserRole === 'sysManager'){
      const users = await getUsers();
      response.status(200).json(users)
    }
    else{
      return response.status(403).json({
        message: "Access Denied: You are not authorized."
      });
    }
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

// get user data by id methodController
const _getUserDataById = async(request, response) =>{
  try {
    const { id } = request.params; 
    const currentUserId = request.user._id.toString();
    const currentUserRole = request.user.role;
    const isAccOwner = currentUserId === id;
    const isSysManager = currentUserRole === 'sysManager';
    if (!isAccOwner && !isSysManager) {
      return response.status(403).json({
        message: "Unauthorized: You can only view your own profile."
      });
    }
    const user = await getUserById(id);
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    response.status(200).json({
      message: "User data retrieved successfully",
      data: user
    });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}


// update user data methodController 
const _updateUserData = async (request, response) =>{
  try {
    const validateData = zodUpdateUser.parse(request.body)
    const {id} = request.params
    const user = await getUserDataById(id)
    const currentUserId = request.user._id.toString()
    const currentUserRole = request.user.role
    if(currentUserRole === 'sysManager' || user._id.toString() === currentUserId){
      const updatedUser = await updateUserData(id, validateData)
        return response.status(200).json({message: `update user with id: ** ${id} ** is successfully`, updatedUser})
    }else{
      return response.status(403).json({
        message: "Access Denied: You are not authorized to update this user profile."
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        message: "Invalid input data",
        errors: (error.errors || []).map(error => ({ field: error.path[0], message: error.message }))
      });
    }
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

// delete user data methodController
const _deleteUserData = async (request, response) =>{
  try {
    const currentUserRole = request.user.role
    const currentUserId = request.user._id.toString()
    const {id} = request.params
    if(currentUserRole === 'sysManager' || (currentUserId === id)){
      const deleteduser = await deleteUserData(id)
      if (!deleteduser) {
        return response.status(404).json({ success: false, message: "User not found" });
      }
      response.status(200).json({message: `delete user with id: ** ${id} ** is successfully`, deleteduser})
    }else{
      return response.status(403).json({
        message: "Access Denied: You are not authorized."
      });
    }
  } catch (error) {
    response.status(500).json({error: 'Failed to delete user'})
  }
}

// log out user accaount:
const logout = async(request, response) =>{
  try {
    const currentUserId = request.user._id
    const token = request.token
    await removeToken(currentUserId, token)
    response.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
  
}

// log out user of all:
const logoutAll = async(request, response) => {
  try {
    await removeAllTokens(request.user._id)
    response.status(200).json({ 
        message: "Logged out from all devices successfully" 
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}

export { displayUsers, registerUser, _updateUserData, _getUserDataById, _deleteUserData, loginUser, logout, logoutAll }