import service from './service'

export function storePrediction(prediction) {
  // const self = this
  // Todo rework into api/v1
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

export function getPredictions() {
  // todo user validation
  return service.get('/api/v1/predictions')
    .then(response => {
      console.log(response);
      return response;
    })
}
