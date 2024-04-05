import jwt from 'jsonwebtoken'

export const verifyToken = (req: any, res: any, next: any) => {
  let token = req.header('Authorization')

  if (!token) {
    return res.status(403).send({ message: 'Access denied' })
  }

  try {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft()
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET as string)

    req.user = verified

    next()
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Invalid token' })
    }
  }
}
