import axios from 'axios'
import jsonp from 'common/js/jsonp'
import { commonParams, options } from 'api/config'

export function getPlayUrl(aid) {
  const url = 'https://api.bilibili.com/playurl'
  const data = Object.assign({}, commonParams, {
    aid: aid,
    token: '155e61037a77b3ad227eeac56af98f43'
  })
  return jsonp(url, data, options)
}
export function getPlayXML(url) {
  return axios.get(url)
    .then((res) => {
      return Promise.resolve(res)
    })
}
export function getMostVideo(aid) {
  const url = 'https://comment.bilibili.com/recommendnew,' + aid
  return axios.get(url)
    .then((res) => {
      return Promise.resolve(res)
    })
}
