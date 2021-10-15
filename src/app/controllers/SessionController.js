import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User.schema'

class SessionController {
  async store(req, res, next) {
    try {
      const { username, password } = req.body

      const user = await User.findOne({ username })

      if (!user)
        return res.status(401).json({ error: 'User is not registered.' })

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid password.' })
      }

      const { id } = user

      return res.status(200).json({
        message: 'Hey, are you supposed to be here?!',
        token: jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRATION,
        }),
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new SessionController()
