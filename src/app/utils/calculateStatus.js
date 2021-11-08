import { Intents } from '../models/Intents.schema'
import { removeObjKeys } from './removeObjKeys'

export default function (obj) {
  const newObj = removeObjKeys(obj)

  const contributor = { ...newObj }

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

  let currentIntent = Intents[filledIntents - 1]
  let nextIntent = Intents[filledIntents]

  return { percentage, currentIntent, nextIntent }
}
