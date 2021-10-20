import RequestError from './RequestError'

export default function isValidPhone(phone, msg) {
  if (!phone || phone === '') throw new RequestError(msg)

  const regex = new RegExp(
    '^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$'
  )

  if (!regex.test(phone)) throw new RequestError(msg)

  return phone
}
