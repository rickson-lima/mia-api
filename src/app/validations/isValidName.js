import RequestError from './RequestError'

export default function isValidName(name, msg) {
  if (!name) throw new RequestError(msg)

  const splittedName = name.split(' ')
  if (splittedName.length < 2) throw new RequestError(msg)

  const firstName = splittedName[0]
  if (firstName.length < 3) throw new RequestError(msg)

  const lastName = splittedName[splittedName.length - 1]
  if (lastName.length < 3) throw new RequestError(msg)

  return true
}
