import { model, Schema } from 'mongoose'

const ContributorSchema = new Schema(
  {
    cpf: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    telefone: {
      type: Number,
      required: true,
    },
    nome: String,

    cep: Number,
    estado: String,
    cidade: String,
    bairro: String,
    rua: String,
    numeroDaCasa: Number,

    statusDoCadastro: String,
  },
  { timestamps: true }
)

export default model('Contributor', ContributorSchema)
