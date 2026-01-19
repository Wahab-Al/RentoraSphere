//#region 
import express, { response } from 'express'
import unitRoutes from '../routes/unit_routes.js'
import usersRoutes from '../routes/user_routes.js'
import createSubscribers from './subscribers/contractSubscribers.js'
import contractRoutes from '../routes/rentContract_routes.js'
//#endregion

const app = express()

// Initialize event subscribers to start listening for system events/ Notifications
createSubscribers()

// to parse automatically incoming JSON 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

//#region ApI Route Configuration
// Unit Management
app.use('/api/units', unitRoutes)

// User Management
app.use('/api/users', usersRoutes)

// Contracts Management
app.use('/api/contracts', contractRoutes)

//404 Handler to catch requests for non-existent endpoints
app.use((request, response)=>{
  response.status(404).json({status: 'request fail', message: `Can´t find ${request.originalUrl} on this server!`})
})
//#endregion

export default app