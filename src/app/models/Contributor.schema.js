import { model, Schema } from 'mongoose'

const ContributorSchema = new Schema(
  {
    cpf: {
      type: String,
      required: true,
      unique: true,
    },

    nome: { type: String, default: null },

    dataNasc: {
      type: String,
      required: true,
    },

    status: { percentage: String, lastIntent: Number },

    email: { type: String, default: null },

    telefone: { type: String, default: null },

    address: {
      cep: { type: String, default: null },
      estado: { type: String, default: null },
      cidade: { type: String, default: null },
      bairro: { type: String, default: null },
      logradouro: { type: String, default: null },
      numero: { type: String, default: null },
    },
  },
  { timestamps: true }
)

export default model('Contributor', ContributorSchema)
