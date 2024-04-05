import express from 'express'
import AWS from 'aws-sdk'
import multer from 'multer'

const router = express.Router()

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
})

const s3 = new AWS.S3()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // limit file size to 5MB
  }
})

// Initialize our service with any options it requires
router.post('/upload', upload.single('file'), (req: any, res: any) => {
  const params = {
    Bucket: process.env.AWS_BUCKET as string,
    Key: req.file.originalname,
    Body: req.file.buffer
  }

  s3.upload(params, (err: any, data: any) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Error uploading file')
    }

    const responseData = {
      message: 'File uploaded successfully',
      url: data.Location
    }

    res.json(responseData)
  })
})

export default router
