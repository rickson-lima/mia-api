export default function calculateStatus(obj) {
  delete obj.$op

  let count = 0

  for (const key in obj) {
    if (obj[key] === null) {
      count = count + 1
    }
  }

  return count
}
