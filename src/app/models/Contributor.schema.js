import { model, Schema } from 'mongoose'

const ContributorSchema = new Schema(
  {
    cpf: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    telefone: {
      type: String,
      required: true,
    },
    nome: String,

    cep: String,
    estado: String,
    cidade: String,
    bairro: String,
    logradouro: String,
    numero: String,

    statusDoCadastro: String,
  },
  { timestamps: true }
)

export default model('Contributor', ContributorSchema)
