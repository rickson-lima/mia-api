import { model, Schema } from 'mongoose'

const ContributorSchema = new Schema(
  {
    cpf: {
      type: String,
      default: null,
    },
    nome: { type: String, required: true },

    status: { type: String, default: null },

    email: { type: String, default: null },

    telefone: { type: String, default: null },

    cep: { type: String, default: null },
    estado: { type: String, default: null },
    cidade: { type: String, default: null },
    bairro: { type: String, default: null },
    logradouro: { type: String, default: null },
    numero: { type: String, default: null },
  },
  { timestamps: true }
)

export default model('Contributor', ContributorSchema)
