import axios from 'axios'
import RequestError from '../validations/RequestError'

async function requestCepAPI(cep) {
  const url = `https://ws.apicep.com/cep/${cep}.json`

  const response = await axios.get(url)

  if (response.data.status === 400) {
    throw new RequestError(response.data.message)
  }

  return response
}

export default requestCepAPI
