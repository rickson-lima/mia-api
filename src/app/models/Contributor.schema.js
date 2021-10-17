import { model, Schema } from 'mongoose'

const ContributorSchema = new Schema(
  {
    nome: { type: String, required: true },
    cpf: {
      type: String,
      required: true,
      unique: true,
    },

    status: String,

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
