import service from './service'

export function loginByUsername(uname, pass) {
  return service.post('/auth/local', {
    username: uname,
    password: pass
  }).then((response) => {
      console.log(response);
      if (response.status !== 200) {
          return Promise.reject(false);
      }

      console.log(response);
      return Promise.resolve(true);
  }).catch((error) => {
      console.log(error)
      // validation rules failed response.data.data.name == ValidationError
      // let errorMessage = error;

      return Promise.reject(false);
  })
}

export function verifyToken(token, id, email) {
  console.log('verifing token: ' + token)
  return service.post('/verifyLogin', {
    token: token,
    id: id,
    email: email
  })
    .then(response => {
      if (response.status === 200 && response.data && response.data.message === "OK") {
        return true
      }

      console.log(response)
      return false
    })
    .catch(error => {
      console.log(error)
      return false
    })
}

export function registerUser(userInfo) {
  const self = this
  return service.post('/signup', userInfo)
    .then(response => {
      console.log(response);
      if (response && response.status === 200) {
        return true
      }

      console.log(response.data);
      let errorMessage = '';
      // some validation rules failed when saving user
      if (response.data && response.data.errors) {
        errorMessage = response.data._message + ': '
        Object.keys(response.data.errors).forEach(function(key, index) {
          // key: the name of the object key
          // index: the ordinal position of the key within the object
          if (index > 0) {
            errorMessage += ', '
          }

          errorMessage += response.data.errors[key].message
        });
      } else if (response.data && response.data.message) {
        errorMessage = response.data.message
      }

      console.log(errorMessage);
      self.$message({
        message: errorMessage,
        type: 'error',
        duration: 5 * 1000
      });

      return false
    })
}
