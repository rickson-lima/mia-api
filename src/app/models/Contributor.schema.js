import { model, Schema } from 'mongoose'

const ContributorSchema = new Schema(
  {
    nome: { String, required: true },
    cpf: {
      type: String,
      required: true,
      unique: true,
    },

    status: String,

    email: {
      type: String,
      unique: true,
    },

    telefone: String,

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
