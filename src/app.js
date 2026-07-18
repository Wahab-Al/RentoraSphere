//#region 
import express from 'express'
import unitRoutes from '../routes/unit_routes.js'
import usersRoutes from '../routes/user_routes.js'
import createSubscribers from './subscribers/contractSubscribers.js'
import contractRoutes from '../routes/rentContract_routes.js'
import mongoSafeSanitizer from '../middlewares/mongoSafeSanitizer.js'
import helmet from "helmet"
import { xssSanitize } from '../middlewares/xss.js'
import { globalLimiter } from '../middlewares/rateLimiter.js'
import hpp from 'hpp'

//#endregion

const app = express()

// Trust proxy 
app.set('trust proxy', 1)

// limit queries per 15 minutes
app.use(globalLimiter)

// adding security headers
app.use(helmet())

// to parse automatically incoming JSON 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// HTTP Param Pollution
app.use(hpp())

// prevent Cross-Site Scripting (XSS) attacks
app.use(xssSanitize)

// Sanitize incoming requests
app.use(mongoSafeSanitizer)

// Initialize event subscribers to start listening for system events/ Notifications
createSubscribers()

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