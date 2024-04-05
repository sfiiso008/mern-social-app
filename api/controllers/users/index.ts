import { Request, Response } from 'express'
import User from '../../models/user.js'
import { IUserRead } from '../../types/user-types'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()

    res.status(200).json(users)
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ message: err.message })
    }
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const users = await User.findById(id)

    res.status(200).json(users)
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ message: err.message })
    }
  }
}

export const getUserFriends = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = (await User.findById(id)) as IUserRead

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const friends = await Promise.all(user.friends.map((friendId) => User.findById(friendId)))

    const formattedFriends = friends.map((friend) => {
      const { _id, firstName, lastName, picturePath, location, occupation } = friend as unknown as IUserRead

      return {
        _id,
        firstName,
        lastName,
        picturePath,
        location,
        occupation
      }
    })

    res.status(200).json(formattedFriends)
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ message: err.message })
    }
  }
}

export const addRemoveFriends = async (req: Request, res: Response) => {
  try {
    const { id, friendId } = req.params

    const user = await User.findById(id)

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const friend = await User.findById(friendId)

    if (!friend) {
      res.status(404).json({ message: 'Friend not found' })
      return
    }

    const isFriend = user.friends.includes(friendId)

    if (isFriend) {
      user.friends = user.friends.filter((friend) => friend !== friendId)

      friend.friends = friend.friends.filter((friend) => friend !== id)
    } else {
      user.friends.push(friendId)
      friend.friends.push(id)
    }

    await user.save()
    await friend.save()

    const friends = await Promise.all(user.friends.map((friendId) => User.findById(friendId)))

    const formattedFriends = friends.map((friend) => {
      const { _id, firstName, lastName, picturePath, location, occupation } = friend as unknown as IUserRead

      return {
        _id,
        firstName,
        lastName,
        picturePath,
        location,
        occupation
      }
    })

    res.status(200).json(formattedFriends)
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ message: err.message })
    }
  }
}
