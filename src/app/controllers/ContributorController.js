import Contributor from '../models/Contributor.schema'
import isValidName from '../validations/isValidName'
import isValidCpf from '../validations/isValidCpf'
import calculateStatus from '../utils/calculateStatus'
class ContributorController {
  // TODO: FAZER VALIDAÇÕES DE CPF, EMAIL, TELEFONE

  async create(req, res, next) {
    try {
      const { cpf, nome } = req.body

      isValidName(nome, 'Ei, você precisar informar seu nome completo 🤷‍♀️')

      isValidCpf(cpf, 'Por favor, informa um CPF válido aí, vai 🙄')
      const isContributorRegistered = await Contributor.findOne({ cpf })

      if (isContributorRegistered)
        return res.status(409).json({
          message:
            'Ops... Parece que este CPF já foi cadastrado por outra pessoa 😮',
        })

      await Contributor.create({
        cpf,
        nome: nome.toUpperCase(),
      })

      return res
        .status(201)
        .json({ message: `Tudo certo, ${nome}. Agora podemos prosseguir 🥳` })
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const { cpf, email, telefone } = req.body

      if (!cpf)
        return res
          .status(400)
          .json({ message: 'Ei, você precisa informar seu CPF 🙄' })

      const contributor = await Contributor.findOne({ cpf })
      if (!contributor)
        res
          .status(404)
          .json({ error: 'Ops... Parece que esse CPF não está cadastrado 🥱' })

      contributor.email = email || contributor.email
      contributor.telefone = telefone || contributor.telefone

      contributor.status = calculateStatus(contributor)

      // add cep

      contributor.save()

      const { createdAt, updatedAt } = contributor

      return res.status(201).json({
        nome: contributor.nome,
        cpf: contributor.cpf,
        status: contributor.status,
        email: contributor.email,
        telefone: contributor.telefone,
        createdAt,
        updatedAt,
      })
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
