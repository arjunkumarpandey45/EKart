import express from 'express'
import connectDB from './database/db.js'
const app = express()

import "dotenv/config"

const port =process.env.PORT||1000
app.get('/', (req, res) => {
  res.send('Hello World!')
}) 
          
app.listen(port, () => { 
  connectDB()
  console.log(`Example a listening on port ${port}`)
}) 