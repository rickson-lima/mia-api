import jwt from 'jsonwebtoken'
import { promisify } from 'util'

export default async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ error: 'Token was not provided.' })
    }

    const [, token] = authHeader.split(' ')

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    req.userId = decoded.id

    return next()
  } catch (error) {
    next(error)
    // return response.status(401).json({ error: 'Token provided is invalid.' })
  }
}
