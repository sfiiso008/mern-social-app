export interface IUserRead {
  _id: string
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
