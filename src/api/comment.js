import jsonp from 'common/js/jsonp'
import { commonParams, options } from 'api/config'

export function getComment(aid) {
  const url = 'https://api.bilibili.com/x/v2/reply',
    data = Object.assign({}, {
      jsonp: 'jsonp',
      type: 1,
      sort: 2,
      oid: aid,
      pn: 1,
      nohot: 1,
      _: 1503543112768
    })
  return jsonp(url, data, options)
}
