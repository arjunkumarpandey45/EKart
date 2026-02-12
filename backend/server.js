import express from 'express'
import connectDB from './database/db.js'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import cors from 'cors'
const app = express() 
app.use(express.json())
import "dotenv/config"
app.use(cors({ 
origin:'http://localhost:5173',credentials:true
}))
const port = process.env.PORT || 1000

app.use('/api/user', userRoute)
app.use('/api/product',productRoute)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  connectDB()
  console.log(` Listening on port ${port}`)
}) 