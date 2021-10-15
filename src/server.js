import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import routes from './routes'

dotenv.config()

const server = express()
const port = process.env.PORT || 3000

mongoose.connect(
  `mongodb+srv://admin:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

server.use(cors())
server.use(express.json())

server.use(routes)

// handle not found
server.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// catch all
server.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: error.message })
})

server.listen(port, () => {
  console.log(`🚀 API is running on http://localhost:${port}`)
})
