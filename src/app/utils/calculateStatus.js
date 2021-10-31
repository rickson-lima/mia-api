export default function (obj) {
  const removeKeys = ({
    $op,
    _id,
    __v,
    updatedAt,
    createdAt,
    status,
    ...rest
  }) => rest

  const address = obj.address
  delete obj.address

  const newObj = removeKeys(obj)

  const contributor = { ...newObj, ...address }

  let totalIntents = 0
  let filledIntents = 0

  for (const key in contributor) {
    totalIntents = totalIntents + 1

    if (contributor[key]) {
      filledIntents = filledIntents + 1
    }
  }

  let percentage = Math.floor((filledIntents / totalIntents) * 100)
  percentage = percentage + '%'

  let lastIntent = filledIntents

  return { percentage, lastIntent }
}
