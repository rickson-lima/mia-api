import { model, Schema } from 'mongoose'

const ContributorSchema = new Schema({
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
  bairro: String,
  rua: String,
  logradouro: String,
  bairro: String,

  statusDoCadastro: String,
})

export default model('Contributor', ContributorSchema)
