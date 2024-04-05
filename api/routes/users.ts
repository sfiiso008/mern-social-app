import express from 'express'
// @controllers
import { getUser, getUserFriends, addRemoveFriends, getUsers } from '../controllers/users/index.js'
// @middlewares
import { verifyToken } from '../middleware/auth/auth.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/:id/friends', verifyToken, getUserFriends)

router.patch('/:id/:friendId', verifyToken, addRemoveFriends)

export default router
