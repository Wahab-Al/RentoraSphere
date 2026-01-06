
import express from 'express'
import houseRoutes from '../routes/house_routes.js'

const app = express()

app.use('/api', houseRoutes)


export default app