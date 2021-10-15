import User from '../models/User.schema'

class UserController {
  async store(req, res, next) {
    try {
      const { username, password } = req.body

      const user = await User.create({
        username,
        password,
      })

      let userResult = user.toObject()

      delete userResult['password']

      return res.status(201).json({ userResult })
    } catch (err) {
      next(err)
    }
  }
}

export default new UserController()
