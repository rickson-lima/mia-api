import { model, Schema } from 'mongoose'

const StatusSchema = new Schema({
  type: String,
})

export default model('Status', StatusSchema)
