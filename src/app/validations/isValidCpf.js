import RequestError from './RequestError'

export default function isValidCpf(cpf, msg) {
  if (cpf == '' || !cpf) throw new RequestError(msg)

  cpf = cpf.replace(/[^\d]+/g, '')

  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length != 11 ||
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999'
  )
    throw new RequestError(msg)

  // Valida 1o digito
  let add = 0
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i)
  let rev = 11 - (add % 11)
  if (rev == 10 || rev == 11) rev = 0
  if (rev != parseInt(cpf.charAt(9))) throw new RequestError(msg)

  // Valida 2o digito
  add = 0
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i)
  rev = 11 - (add % 11)
  if (rev == 10 || rev == 11) rev = 0
  if (rev != parseInt(cpf.charAt(10))) throw new RequestError(msg)

  //realizar a formatação...
  const formattedCpf = cpf.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4'
  )

  return formattedCpf
}
