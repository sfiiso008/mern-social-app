import express from 'express'
// @controllers
import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts/index.js'
// @middlewares
import { verifyToken } from '../middleware/auth/auth.js'

const router = express.Router()

router.get('/', verifyToken, getFeedPosts)
router.get('/:userId', verifyToken, getUserPosts)

router.patch('/:id/like', verifyToken, likePost)

export default router
