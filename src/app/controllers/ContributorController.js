import Contributor from '../models/Contributor.schema'

import calculateStatus from '../utils/calculateStatus'
import { Conversations } from '../models/Intents.schema'
import isValidCpf from '../validations/isValidCpf'

class ContributorController {
  async create(req, res, next) {
    const messages = Conversations.store.created
    const { registeredCpf } = Conversations.errors

    const CPF = req.body['cpf']
    const DATA_NASC = req.body['data-nasc']

    try {
      const validatedCpf = isValidCpf(
        CPF,
        'Por favor, informe um CPF válido 😅'
      )

      // criar uma funcao validadora para data

      const isCpfRegistered = await Contributor.findOne({ cpf: validatedCpf })

      if (isCpfRegistered) return res.status(409).json({ error: registeredCpf })

      const contributor = await Contributor.create({
        cpf: validatedCpf,
        dataNasc: DATA_NASC,
      })

      const contributorObj = contributor.toObject()

      const status = calculateStatus(contributorObj)
      contributor.status = status

      contributor.save()

      return res.status(201).json({ messages, status })
    } catch (err) {
      next(err)
    }
  }

  async storeNewData(func, req, res, next) {
    const { intent, data } = req.body

    const CPF = req.headers['cpf']
    const DATA_NASC = req.headers['data-nasc']

    const messages = Conversations.store[intent]

    const { notRegisteredCpf } = Conversations.errors
    const errorMessages = Conversations.errors[intent]

    try {
      const contributor = await Contributor.findOne({
        cpf: CPF,
        dataNasc: DATA_NASC,
      })

      if (!contributor) return res.status(404).json({ error: notRegisteredCpf })

      if (intent === 'cep') {
        const address = await func(data)

        if (address.status !== 200)
          return res.status(400).json({ message: errorMessages })

        contributor.cep = data
        contributor.uf = address.state
        contributor.cidade = address.city
        contributor.bairro = address.district
        contributor.logradouro = address.address
      } else {
        const validatedData = func(data, errorMessages)
        contributor[intent] = validatedData
      }

      const status = calculateStatus(contributor.toObject())
      contributor.status = status

      contributor.save()

      return res.status(201).json({ messages, status })
    } catch (error) {
      next(error)
    }
  }

  async updateData(func, req, res, next) {
    const { intent, data } = req.body

    const CPF = req.headers['cpf']
    const DATA_NASC = req.headers['data-nasc']

    const { notRegisteredCpf } = Conversations.errors
    const errorMessages = Conversations.errors[intent]

    try {
      const contributor = await Contributor.findOne({
        cpf: CPF,
        dataNasc: DATA_NASC,
      })

      if (!contributor)
        return res.status(404).json({ message: notRegisteredCpf })

      if (intent === 'cep') {
        const address = await func(data)

        if (address.status !== 200)
          return res.status(400).json({ message: errorMessages })

        contributor.cep = data
        contributor.uf = address.state
        contributor.cidade = address.city
        contributor.bairro = address.district
        contributor.logradouro = address.address
      } else {
        const validatedData = func(data, errorMessages)
        contributor[intent] = validatedData
      }

      contributor.save()

      return res.json({
        message: `Atualizei seu ${intent}, ${
          contributor.nome.split(' ')[0]
        } 🤗`,
      })
    } catch (error) {
      next(error)
    }
  }

  async indexOne(req, res, next) {
    const { incorrectData, notRegisteredCpf } = Conversations.errors

    const CPF = req.headers['cpf']
    const DATA_NASC = req.headers['data-nasc']

    try {
      const isCpfRegistered = await Contributor.findOne({ cpf: CPF })

      if (!isCpfRegistered)
        return res.status(404).json({ message: notRegisteredCpf })

      const contributor = isCpfRegistered
      if (contributor.dataNasc !== DATA_NASC)
        return res.status(409).json({ message: incorrectData })

      const message = [
        `CPF ✅ ${contributor.cpf}`,
        `Nome ✅ ${contributor.nome}`,
        `Data de nascimento 🗓  ${contributor.dataNasc}`,
        `Email 💌 ${contributor.email}`,
        `Telefone 💌 ${contributor.telefone}`,
        `CEP 🏠 ${contributor.cep}`,
      ]

      const firstName = contributor.nome.split(' ')[0]

      return res.json({ message, firstName })
    } catch (err) {
      next(err)
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
