import Contributor from '../models/Contributor.schema'
import requestCepAPI from '../services/CepAPI'

class ContributorController {
  // TODO: FAZER VALIDAÇÕES DE CPF, EMAIL, TELEFONE

  async store(req, res, next) {
    try {
      const { cpf, email, telefone, nome, cep, numeroDaCasa } = req.body

      const isContributorRegistered = await Contributor.findOne({ cpf })

      if (isContributorRegistered)
        return res.status(409).json({ error: 'CPF já cadastrado. ' })

      const contributorAddress = (await requestCepAPI(cep)).data
      console.log(Contributor)
      const contributor = await Contributor.create({
        cpf: Number(cpf),
        email,
        telefone: Number(telefone),
        nome,

        cep: Number(cep),
        estado: contributorAddress.state,
        cidade: contributorAddress.city,
        bairro: contributorAddress.district,
        rua: contributorAddress.address,
        logradouro: contributorAddress.address,

        numeroDaCasa: Number(numeroDaCasa),
      })

      const contributorResult = contributor.toObject()

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
