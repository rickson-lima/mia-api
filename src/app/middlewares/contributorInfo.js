import isValidCpf from '../validations/isValidCpf'

export default async (req, res, next) => {
  try {
    const CPF = req.headers['cpf']
    const DATA_NASC = req.headers['data-nasc']

    if (!CPF || !DATA_NASC)
      return res.status(400).json({
        message: 'CPF and Data de Nascimento is required.',
      })

    const validatedCpf = isValidCpf(
      CPF,
      'Você precisa informar um CPF válido 😅'
    )

    req.headers['cpf'] = validatedCpf

    return next()
  } catch (error) {
    next(error)
  }
}
