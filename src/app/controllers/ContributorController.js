import Contributor from '../models/Contributor.schema'
import isValidName from '../validations/isValidName'
import isValidCpf from '../validations/isValidCpf'
import isValidEmail from '../validations/isValidEmail'
import isValidPhone from '../validations/isValidPhone'
import calculateStatus from '../utils/calculateStatus'
import requestCepAPI from '../services/CepAPI'

class ContributorController {
  async create(req, res, next) {
    try {
      const { nome } = req.body

      isValidName(nome, 'Ei, você precisar informar seu nome completo 😉')

      const contributor = await Contributor.create({
        nome: nome.toUpperCase(),
      })

      const { _id } = contributor

      const contributorObj = contributor.toObject()
      const status = calculateStatus(contributorObj)

      const contributorResult = await Contributor.findById(_id)

      contributorResult.status = status + '%'
      contributorResult.save()

      return res.status(201).json({
        message: 'Muito bem. Agora informe seu CPF 🤗',
        _id,
      })
    } catch (error) {
      next(error)
    }
  }

  async storeCpf(req, res, next) {
    try {
      // criar um middleware de validacao do cpf
      const { cpf, _id } = req.body

      const formattedCpf = isValidCpf(
        cpf,
        'Por favor, informe um CPF válido 😅'
      )
      const isCpfRegistered = await Contributor.findOne({ cpf: formattedCpf })

      if (isCpfRegistered)
        return res.status(409).json({
          message:
            'Ops... Esse CPF já foi cadastrado 😣. Verifique se você errou algum dígito e informe novamente 🤭',
        })

      const contributor = await Contributor.findById(_id)

      if (!contributor)
        return res.status(404).json({
          message:
            'Ops... Parece que você está tentando alterar o cadastro de outra pessoa... 😬',
        })

      contributor.cpf = formattedCpf

      const contributorObj = contributor.toObject()
      const status = calculateStatus(contributorObj)

      contributor.status = status + '%'

      contributor.save()
      return res.status(201).json({
        message: 'CPF ✅ Agora me diz qual é o seu email 💌',
      })
    } catch (error) {
      next(error)
    }
  }

  async storeEmail(req, res, next) {
    try {
      const { cpf, email } = req.body

      const formattedCpf = isValidCpf(
        cpf,
        'Por favor, informe um CPF válido 😅'
      )
      const isCpfRegistered = await Contributor.findOne({ cpf: formattedCpf })

      if (!isCpfRegistered)
        return res.status(404).json({
          message:
            'Hmmm... Parece que esse CPF não está cadastrado no nosso sistema 😶',
        })

      const contributor = isCpfRegistered

      isValidEmail(
        email,
        'Poxa... Você precisa informar um email válido como exemplo@email.com 🥺'
      )

      contributor.email = email

      const contributorObj = contributor.toObject()
      const status = calculateStatus(contributorObj)

      contributor.status = status + '%'

      contributor.save()

      res.status(200).json({
        message:
          'Email ✅ Agora preciso do seu número de celular 📱 Não esqueça do seu DDD e o dígito 9 na frente, hein 🙃',
      })
    } catch (error) {
      next(error)
    }
  }

  async storePhone(req, res, next) {
    try {
      const { cpf, telefone } = req.body

      const formattedCpf = isValidCpf(
        cpf,
        'Por favor, informe um CPF válido 😅'
      )
      const isCpfRegistered = await Contributor.findOne({ cpf: formattedCpf })

      if (!isCpfRegistered)
        return res.status(404).json({
          message:
            'Hmmm... Parece que esse CPF não está cadastrado no nosso sistema 😶',
        })

      const contributor = isCpfRegistered

      isValidPhone(
        telefone,
        'Poxa, parece que seu número de telefone está errado 😥 Verifica e informa de novo, por favor 🥺'
      )

      contributor.telefone = telefone

      const contributorObj = contributor.toObject()
      const status = calculateStatus(contributorObj)

      contributor.status = status + '%'

      contributor.save()

      res.status(200).json({
        message:
          'Telefone ✅ Estamos quase finalizando, mas antes me fala qual é o CEP da sua casa 📍',
      })
    } catch (error) {
      next(error)
    }
  }

  async storeCep(req, res, next) {
    try {
      const { cpf, cep } = req.body

      const formattedCpf = isValidCpf(
        cpf,
        'Por favor, informe um CPF válido 😅'
      )
      const isCpfRegistered = await Contributor.findOne({ cpf: formattedCpf })

      if (!isCpfRegistered)
        return res.status(404).json({
          message:
            'Hmmm... Parece que esse CPF não está cadastrado no nosso sistema 😶',
        })

      const contributor = isCpfRegistered

      const responseCepApi = await requestCepAPI(cep)

      if (responseCepApi.status !== 200) {
        return res.status(responseCepApi.status).json({
          message: 'Ops... O CEP que você informou não é válido 😬',
        })
      }

      const address = responseCepApi

      contributor.cep = cep
      contributor.estado = address.state
      contributor.cidade = address.city
      contributor.bairro = address.district
      contributor.logradouro = address.address

      const contributorObj = contributor.toObject()
      const status = calculateStatus(contributorObj)

      contributor.status = status + '%'

      contributor.save()

      res.status(200).json({
        message: 'E agora o número da sua casa 🏠',
      })
    } catch (error) {
      next(error)
    }
  }

  async storeNumero(req, res, next) {
    try {
      const { cpf, numero } = req.body

      const formattedCpf = isValidCpf(
        cpf,
        'Por favor, informe um CPF válido 😅'
      )
      const isCpfRegistered = await Contributor.findOne({ cpf: formattedCpf })

      if (!isCpfRegistered)
        return res.status(404).json({
          message:
            'Hmmm... Parece que esse CPF não está cadastrado no nosso sistema 😶',
        })

      const contributor = isCpfRegistered

      if (!Number(numero))
        return res.status(400).json({
          message: 'Por favor, informe somente números 🔢',
        })

      contributor.numero = numero

      const contributorObj = contributor.toObject()
      const status = calculateStatus(contributorObj)

      contributor.status = status + '%'

      contributor.save()

      res.status(200).json({
        message: 'Parabéns!!! Seu cadastro foi concluído 🥳🥳',
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
