import ky from 'ky'

const API_URL = 'http://localhost:3333'

export const api = ky.create({
  prefixUrl: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
