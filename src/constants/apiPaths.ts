const V1 = '/api/v1'
const V2 = '/api/v2'

const API_V1 = {
  common: `${V1}`,
  role: `${V1}/role`,
  user: `${V1}/user`,
  conversation: `${V1}/conversation`,
  message: `${V1}/message`,
  todo: `${V1}/todo`
}

const API_V2 = {
  example: `${V2}/example`
}

export { API_V1, API_V2 }
