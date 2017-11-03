import service from './service'

export function storePrediction(predictions) {
  // const self = this
  return service.post('/predictions/store', predictions)
    .then(response => {
      console.log(response);
      if (response && response.status === 200) {
        return true
      }

      console.log(response.data);
      return false
    })
}
