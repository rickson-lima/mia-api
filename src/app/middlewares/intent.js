import isValidName from '../validations/isValidName'
import isValidEmail from '../validations/isValidEmail'
import isValidPhone from '../validations/isValidPhone'
import requestCepAPI from '../services/CepAPI'

export default async (req, res, next) => {
  try {
    let { intent, data } = req.body

    if (!intent || !data) {
      return res.status(401).json({ message: 'Intent and data is required.' })
    }

    let functionToValidateData = ''

    switch (intent) {
      case 'nome':
        functionToValidateData = isValidName
        break
      case 'email':
        functionToValidateData = isValidEmail
        break
      case 'telefone':
        functionToValidateData = isValidPhone
        break
      case 'cep':
        functionToValidateData = requestCepAPI
        break

      default:
        console.log('Intent nao existe')
    }

    next(functionToValidateData)
  } catch (error) {
    next(error)
  }
}
