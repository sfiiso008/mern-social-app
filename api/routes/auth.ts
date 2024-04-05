import express from 'express'
import { login } from '../controllers/auth/index.js'
import { register } from '../controllers/auth/index.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)

export default router
