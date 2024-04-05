import { Request, Response } from 'express'

import Post from '../../models/post.js'
import User from '../../models/user.js'

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, description, picturePath } = req.body

    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const post = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: [],
      comments: []
    })

    await post.save()

    const posts = await Post.find({}, null, { sort: { createdAt: -1 } })

    res.status(201).json(posts)
  } catch (err) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message })
    }
  }
}

export const getFeedPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({}, null, { sort: { createdAt: -1 } })

    res.status(200).json(posts)
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ message: err.message })
    }
  }
}

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const post = await Post.find({ userId }, null, { sort: { createdAt: -1 } })

    res.status(200).json(post)
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ message: err.message })
    }
  }
}

export const likePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { userId } = req.body

    const post = await Post.findById(id)

    const isLiked = post?.likes.includes(userId)

    if (!post) return

    if (isLiked) {
      post.likes = post?.likes.filter((like) => like !== userId)
    } else {
      post?.likes.push(userId)
    }

    const updatedPost = await Post.findByIdAndUpdate(id, { likes: post?.likes }, { new: true })

    res.status(200).json(updatedPost)
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ message: err.message })
    }
  }
}
