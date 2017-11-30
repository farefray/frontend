import service from './service'
import { getToken } from '@/utils/auth'
export function storePrediction(prediction) {
  // const self = this
  return service.post('/api/v1/predictions', prediction)
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

export function getPredictions() {
  // todo user validation
  return service.get('/api/v1/predictions')
    .then(response => {
      console.log(response);
      return response;
    })
}
