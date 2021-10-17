import axios from 'axios'

async function requestCepAPI(cep) {
  const url = `https://ws.apicep.com/cep/${cep}.json`

  const response = await axios.get(url)

  return response
}

export default requestCepAPI
