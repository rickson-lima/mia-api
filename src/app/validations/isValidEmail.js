import RequestError from './RequestError'

export default function validateEmail(email, msg) {
  if (!email || email === '') throw new RequestError(msg)

  const re = /\S+@\S+\.\S+/

  if (!re.test(email)) throw new RequestError(msg)
  return email
}
