//#region 
import express from 'express'
import {_deleteUserData, _getUserDataById, _updateUserData, registerUser, displayUsers, loginUser, logout, logoutAll} from '../controllers/user_controller.js'
import authenticate from '../middlewares/authenticate.js'
//#endregion

const router = express.Router()

//#region User Routes:

// register new user 
router.post('/register', registerUser)
// login user
router.post('/login', loginUser)
// get users data
router.get('/', authenticate, displayUsers)
// get user data by id
router.get('/:id', authenticate, _getUserDataById)
// update user data 
router.patch('/:id', authenticate, _updateUserData)
// delete user data
router.delete('/:id', authenticate, _deleteUserData)
// log out user
router.post('/logout', authenticate, logout)
// log out user from all devices
router.post('/logoutAll', authenticate, logoutAll)

//#endregion
export default router