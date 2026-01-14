//#region 
import express from 'express'
import unitRoutes from '../routes/unit_routes.js'
import usersRoutes from '../routes/user_routes.js'
//#endregion

const app = express()
// to parse automatically
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// All endpoints defined in unitRoutes will be prefixed with '/api'.
app.use('/api/units', unitRoutes)

// All endpoints in clientsRoutes will also be prefixed with '/api'.
app.use('/api/users', usersRoutes)


export default app