function setLocalStorage(name, data) {
  if (window.localStorage) {
    localStorage.setItem(name, JSON.stringify(data))
    return getLocalStorage(name)
  }
}

function getLocalStorage(name) {
  if (window.localStorage) {
    return JSON.parse(localStorage.getItem(name))
  }
}

function removeLocalStorage(name) {
  if (window.localStorage) {
    localStorage.removeItem(name)
    return !getLocalStorage(name)
  }
}
const operation = {
  set: setLocalStorage,
  get: getLocalStorage,
  remove: removeLocalStorage
}
export default operation
