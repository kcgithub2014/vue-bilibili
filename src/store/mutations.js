import * as types from './mutation-type'
import operation from 'common/js/localStorage'
const mutations = {
  [types.SET_LIST](state, list) {
    state.TopTlist = list
  },
  [types.SET_CLSID](state, id) {
    state.clsId = id
  },
  [types.SET_INFO](state, info) {
    state.info = info
  },
  [types.SET_VIDEOID](state, id) {
    state.videoId = id
  },
  [types.SET_ISLOGIN](state, user) {
    state.islogin = user
    operation.set('user', user)
  },
  [types.SET_HISTORY](state, data) {
    state.history = history
    operation.set('history', data)
  },
  [types.SET_MOSTVIDEO](state, data) {
    state.mostVideo = data
    operation.set('mostvideo', data)
  }
}


export default mutations
