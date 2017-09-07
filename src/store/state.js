import operation from 'common/js/localStorage'

const state = {
  TopTlist: [],
  clsId: 0,
  info: {},
  videoId: {},
  mostVideo: {},
  islogin: operation.get('user'),
  history: operation.get('history')
}

export default state
