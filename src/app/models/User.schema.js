import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const saltRounds = 10

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

UserSchema.pre('save', function (next) {
  const user = this

  bcrypt.hash(user.password, saltRounds, (error, hash) => {
    if (error) return next(error)

    user.password = hash
    next()
  })
})

export default model('User', UserSchema)
