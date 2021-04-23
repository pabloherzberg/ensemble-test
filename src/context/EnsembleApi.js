import axios from 'axios'

const baseURL = 'https://job.ensemble.com.br/api'

const ensembleApi = axios.create({
  baseURL:baseURL,
  headers:{
    'ens-api-token':'UzCzeKdRFU2kvIZwUNYr',
    'Accept':'application/json',
    'Content-Type': 'application/json'
  }
})

const auth = async ({username, password}) => {
  const res = await ensembleApi.post('/auth',{username, password})
        .then(res=>res.data)
        .catch(e=>e)
  return res
}

const feedNotification = async ({authToken}) => {
  ensembleApi.defaults.headers['ens-auth-token'] = authToken

  const res = await ensembleApi.get('/feed')
    .then(res=>res.data)
    .catch(e=>e)

  return res
}

const getFeed = async ({authToken, startSeq=1, limit=100, order='asc'}) => {
  ensembleApi.defaults.headers['ens-auth-token'] = authToken

  const res = await ensembleApi.get(`feed?startSeq=${startSeq}&limit=${limit}&order=${order}`)
    .then(res=>res.data)
    .catch(e=>e)

  return res
}

const postOnFeed = async ({authToken, message}) => {
  ensembleApi.defaults.headers['ens-auth-token'] = authToken

  const res = await ensembleApi.post('/feed', {message: message})
    .then(res=>res.data)
    .catch(e=>e)

  return res
}

export { auth, feedNotification, getFeed, postOnFeed}