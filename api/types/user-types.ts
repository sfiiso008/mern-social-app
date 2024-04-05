import { ObjectId } from 'mongoose'

export interface IUserRead {
  _id: ObjectId
  firstName: string
  lastName: string
  email: string
  picturePath: string
  location: string
  occupation: string
  friends: string[]
  impressions: number
  viewedProfile: number
}
