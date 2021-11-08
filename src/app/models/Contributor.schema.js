import { model, Schema } from 'mongoose'

const ContributorSchema = new Schema(
  {
    cpf: {
      type: String,
      required: true,
      unique: true,
    },

    nome: { type: String, default: null, uppercase: true },

    dataNasc: {
      type: String,
      required: true,
    },

    status: { percentage: String, currentIntent: String, nextIntent: String },

    email: { type: String, default: null },

    telefone: { type: String, default: null },

    cep: { type: String, default: null },
    uf: { type: String, default: null },
    cidade: { type: String, default: null },
    bairro: { type: String, default: null },
    logradouro: { type: String, default: null },
  },
  { timestamps: true }
)

export default model('Contributor', ContributorSchema)
