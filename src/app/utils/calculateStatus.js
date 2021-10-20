// (qtdCamposPreenchidos / totalCampos) * 100
// Math.floor(resultado)

export default function calculateStatus(obj) {
  delete obj.$op
  delete obj._id
  delete obj.__v
  delete obj.updatedAt
  delete obj.createdAt
  delete obj.status

  let amount = 0
  let total = 0

  for (const key in obj) {
    total = total + 1

    if (obj[key]) {
      amount = amount + 1
    }
  }

  let status = Math.floor((amount / total) * 100)

  return status
}
