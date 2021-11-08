import RequestError from './RequestError'

export default function isValidName(name, msg) {
  if (!name) throw new RequestError(msg)

  const formattedName = name.split(' ').filter(String)
  if (formattedName.length < 2) throw new RequestError(msg)

  const firstName = formattedName[0]
  if (firstName.length < 3) throw new RequestError(msg)

  const lastName = formattedName[formattedName.length - 1]
  if (lastName.length < 3) throw new RequestError(msg)

  const contributorName = formattedName.join(' ')

  return contributorName
}
