import 'dotenv/config'
import express, { Express, urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import http from 'http'
import initialRoutes from './routes/v1'
import Middleware from './middleware'
import db from './connection'
import { setupModelRelationships } from './db/models'
import { Server } from 'socket.io'
import useSocketEvents from './sockets'
const app: Express = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 5000
const BASE_URL = process.env.BASE_URL || 'http://localhost'
const DELAY = 0

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(
  cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)
app.use(initialRoutes)
app.use(Middleware.errorHandling)

io.on('connection', (socket) => {
  useSocketEvents(socket)
})

db.authenticate()
  .then(() => {
    setupModelRelationships()
    console.log('[INFO] Kết nối thành công đến cơ sở dữ liệu.')
    server.listen(PORT, () => {
      console.log(`[INFO] Server đã bắt đầu lắng nghe yêu cầu từ máy khách tại ${BASE_URL}:${PORT}`)
    })
  })
  .catch((error: any) => {
    console.error('[ERROR] Không thể kết nối đến cơ sở dữ liệu:', error)
  })
