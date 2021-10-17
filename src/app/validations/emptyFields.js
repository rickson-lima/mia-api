import RequestError from './RequestError'

export function existsOrError(value, msg) {
  if (!value) throw new RequestError(msg)
}
