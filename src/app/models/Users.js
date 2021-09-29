import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
  nome: String,
  cpf: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  rg: {
    type: Number,
    unique: true,
  },
  telefone: Number,

  cep: Number,
  bairro: Number,
  rua: Number,
  logradouro: Number,
  bairro: Number,

  statusDoCadastro: String,
})

export default model('User', UserSchema)
