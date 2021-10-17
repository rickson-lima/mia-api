import Contributor from '../models/Contributor.schema'
import requestCepAPI from '../services/CepAPI'
import { existsOrError, checkObject } from '../validations/emptyFields'
class ContributorController {
  // TODO: FAZER VALIDAÇÕES DE CPF, EMAIL, TELEFONE

  async store(req, res, next) {
    try {
      const { cpf, email, telefone, nome, cep, numero } = req.body

      existsOrError(cpf, 'CPF do contribuinte não informado.')
      const isContributorRegistered = await Contributor.findOne({ cpf })

      if (isContributorRegistered)
        return res.status(409).json({ error: 'CPF já cadastrado. ' })

      existsOrError(email, 'Email do contribuinte não informado.')
      existsOrError(telefone, 'Telefone do contribuinte não informado.')
      existsOrError(nome, 'Nome do contribuinte não informado.')
      existsOrError(cep, 'CEP do contribuinte não informado.')

      const contributorAddress = (await requestCepAPI(cep)).data

      const contributor = await Contributor.create({
        cpf,
        email,
        telefone,
        nome,

        cep,
        estado: contributorAddress.state,
        cidade: contributorAddress.city,
        bairro: contributorAddress.district,
        logradouro: contributorAddress.address,

        numero,
      })

      const contributorResult = contributor.toObject()
      delete contributorResult._id
      delete contributorResult.__v

      return res.status(201).json(contributorResult)
    } catch (error) {
      next(error)
    }
  }

  async index(req, res, next) {
    try {
      const contributors = await Contributor.find()

      return res.status(200).json(contributors)
    } catch (error) {
      next(error)
    }
  }
}

export default new ContributorController()
