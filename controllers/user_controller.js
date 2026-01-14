//#region 
import  {getUsers, createUser, updateUserData, getUserDataById, deleteUserData, login } from '../services/user_service.js'
//#endregion

//#region 

// create new user data methodController
const registerUser = async(request, response) =>{
  try {
    const { user, token } = await createUser(request.body)
    return response.status(201).json({message: 'Registraion successsful', user, token })
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
const loginUser = async(request, response) =>{
  try {
    const { user, token } = await login(request.body.email, request.body.password)
    response.status(200).json({message: 'Login successsful', user, token })
  } catch (error) {
    const status = error.message.includes("not found") ? 401 : 500;
    response.status(status).json({messge: 'Login Faild', error: "Invalid credentials"})
  }
}

// get all users data methodController
const displayUsers = async(request, response) =>{
  try {
    const users = await getUsers();
    response.status(200).json(users)
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

// get user data by id methodController
const _getUserDataById = async(request, response) =>{
  try {
    const user = await getUserDataById(request.params.id)
    response.status(200).json(user)
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}


// update user data methodController 
const _updateUserData = async (request, response) =>{
  try {
    const user = await updateUserData(request.params.id, request.body)
    return response.status(201).json(user)
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

// delete user data methodController
const _deleteUserData = async (request, response) =>{
  try {
    const deleteduser = await deleteUserData(request.params.id)
    response.status(200).json({message: `delete user with id: **${request.params.id}** is successfully`, deleteduser})
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

export { displayUsers, registerUser, _updateUserData, _getUserDataById, _deleteUserData, loginUser }