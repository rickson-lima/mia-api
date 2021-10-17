import { model, Schema } from 'mongoose'

const ContributorSchema = new Schema(
  {
    cpf: {
      type: String,
      required: true,
      unique: true,
    },
    nome: String,
    status: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    telefone: {
      type: String,
      required: true,
    },
    cep: String,
    estado: String,
    cidade: String,
    bairro: String,
    logradouro: String,
    numero: String,
  },
  { timestamps: true }
)

export default model('Contributor', ContributorSchema)
