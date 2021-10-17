export default function RequestError(msg = '', status) {
  ;(this.name = 'RequestError'), (this.message = msg)
  this.status = status || 400
}
