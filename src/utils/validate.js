export function isvalidUsername(str) {
  if (str === undefined || !str.length) {
    return false
  }

  const reg = /^[a-zA-Z0-9_]+$/
  return reg.test(str)
}

export const validateUsername = (rule, value, callback) => {
  if (!isvalidUsername(value)) {
    callback(new Error('Please enter the correct username'))
  } else {
    callback()
  }
}

export function isvalidPassword(str) {
  if (str === undefined || !str.length) {
    return false
  }

  const reg = /^[a-zA-Z0-9_]+$/
  return reg.test(str)
}

export const validatePassword = (rule, value, callback) => {
  if (value.length < 6 || !isvalidPassword(value)) {
    callback(new Error('The password can not be less than 6 digits'))
  } else {
    callback()
  }
}

function isvalidEmail(str) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(str)
}

export const validateEmail = (rule, value, callback) => {
  if (!isvalidEmail(value)) {
    callback(new Error('Please, enter correct email'))
  } else {
    callback()
  }
}

export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

