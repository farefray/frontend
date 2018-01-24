import service from './service'
import { getToken } from '@/utils/auth'
export function storePrediction(prediction) {
  // const self = this
  return service.post('/api/v1/predictions', prediction, {
      headers: {
        auth: getToken()
      }
  })
    .then(response => {
      console.log(response); // Todo proper response on backend(not it fails even when success)
      if (response && response.status === 200) {
        return true
      }

      console.log(response.data);
      return false
    })
}

export function updatePrediction(prediction) {
  return service.put('/api/v1/predictions', prediction, {
    headers: {
      auth: getToken()
    }
  })
    .then(response => {
      console.log(response);
      if (response && response.status === 200) {
        return true
      }

      console.log(response.data);
      return false
    })
}

export function removePrediction(prediction) {
  return service.delete('/api/v1/predictions', {
    data: prediction,
    headers: {
      auth: getToken()
    }
  })
}

export function getPredictions(params = {}) {
  params.sort = '-date,createdAt';
  // todo user validation
  return service.get('/api/v1/predictions', {
    headers: {
      auth: getToken()
    },
    params: params
  })
    .then(response => {
      console.log(response);
      return response;
    })
}
