import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Array,
      default: []
    },
    comments: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
)

const Post = mongoose.model('posts', postSchema)

export default Post
