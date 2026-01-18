//#region 
import User from '../models/user.js'
//#endregion


//#region 

// creat a new user data
const createUser = async(enteredUser) =>{
  const user = await User.create(enteredUser)
  const token = await user.generateToken()
  return {user, token}
}


// login 
const login = async(email, password) =>{
    const user = await User.findByCredentials(email, password)
    if(!user)
      throw new Error `Invalid email or password, check it and try it later.`
    const token = await user.generateToken()
    return {user, token}
}
// get all users data 
const getUsers = async()=>{
  return  await User.find().sort({createdAt: -1})
}

// get user data by id 
const getUserDataById = async(userId)=>{
  const user =  await User.findById(userId)
  if(!user)
    throw new Error `user with id: ${userId} that you call is not exist`
  return user
}

// update user data
const updateUserData = async(userId, user)=>{
  // Prevent hashing password if not changed 
  if(!user.password) delete user.password

  const newUserData = await User.findByIdAndUpdate(userId, user, {new: true, runValidators: true})
  if(!newUserData)
    throw new Error `user with id: ${userId} that you call is not exist`
  return newUserData
}
/**
 * 
  *const updateUserData = async (userId, updateData) => {
      const user = await User.findById(userId);
      if (!user) throw new Error(`User with id: ${userId} not found`);
      Object.assign(user, updateData);
      await user.save(); 
      return user;
}
 */

// delete user data
const deleteUserData = async(userId)=>{
  const deletedUser = await User.findByIdAndDelete(userId)
  if(!deletedUser)
    throw new Error `user with id: ${userId} that you call is not exist`
  return deletedUser
}

//#endregion

export { getUsers, createUser, getUserDataById, updateUserData, deleteUserData, login }