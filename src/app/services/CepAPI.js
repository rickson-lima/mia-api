import axios from 'axios'

function requestCepAPI(cep) {
  const url = `https://ws.apicep.com/cep/${cep}.json`

  const response = axios.get(url)

  return response
}

export default requestCepAPI
