//#region 
import express from 'express'
import houseRoutes from '../routes/house_routes.js'
import clientsRoutes from '../routes/client_routes.js'
//#endregion

const app = express()
// to parse automatically
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// All endpoints defined in houseRoutes will be prefixed with '/api'.
app.use('/api', houseRoutes)

// All endpoints in clientsRoutes will also be prefixed with '/api'.
app.use('/api', clientsRoutes)


export default app