//#region 
import express from 'express'
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


app.use('/api/units', unitRoutes)

// All endpoints 
app.use('/api/users', usersRoutes)

// All endpoints in 
app.use('/api/contracts', contractRoutes)

export default app