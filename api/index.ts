import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
// @controllers
import { createPost } from './controllers/posts/index.js'
// @routes
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postsRoutes from './routes/posts.js'
import uploadRoute from './routes/upload.js'
import { verifyToken } from './middleware/auth/auth.js'
import { Server } from 'socket.io'

import http from 'http'

dotenv.config()

// @app
const app = express()
app.use(express.json())
app.use(helmet())
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
  })
)

app.use(morgan('common'))
app.use(
  bodyParser.json({
    limit: '30mb'
  })
)
app.use(
  bodyParser.urlencoded({
    limit: '30mb',
    extended: true
  })
)
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

//Add this before the app.get() block
io.on('connection', (socket) => {
  console.log('New user connected')

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

app.post('/posts', verifyToken, createPost)

// @routes
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postsRoutes)
app.use('/', uploadRoute)

mongoose
  .connect(process.env.MONGO_URI as string, {})
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}...`)
    })
  })
  .catch((error) => {
    console.log(`${error.message} could not connect`)
  })
