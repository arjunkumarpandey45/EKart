import express from 'express'
import connectDB from './database/db.js'
import userRoute from './routes/userRoute.js'
const app = express()

import "dotenv/config"

const port = process.env.PORT || 1000
app.use(express.json())
app.use('/api/user', userRoute)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  connectDB()
  console.log(` Listening on port ${port}`)
}) 