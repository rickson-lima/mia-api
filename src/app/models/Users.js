import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
  cpf: {
    type: Number,
    required: true,
    unique: true,
  },
  name: String,
  email: String,
  phone: Number,
  status: {
    type: Schema.Types.ObjectId,
    ref: 'Status',
  },
})

export default model('User', UserSchema)
