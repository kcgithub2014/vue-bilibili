export const arr = ['年', '月', '天', '小时', '分钟', '秒']

export function pushTime(result, state) {
  let timeArr = []
  if (state) {
    timeArr.push(Math.round(result / 1000 / 60 / 60 / 24 / 30 / 12 % 1))
    timeArr.push(Math.round(result / 1000 / 60 / 60 / 24 / 30 % 1))
    timeArr.push(Math.round(result / 1000 / 60 / 60 / 24 % 1))
    timeArr.push(Math.round(result / 1000 / 60 / 60 % 24))
    timeArr.push(Math.round(result / 1000 / 60 % 60))
    timeArr.push(Math.round(result / 1000 % 60))
  } else {
    timeArr.push(result / 1000 / 60 / 60 / 24 / 30 / 12 % 1 | 0)
    timeArr.push(result / 1000 / 60 / 60 / 24 / 30 % 1 | 0)
    timeArr.push(result / 1000 / 60 / 60 / 24 % 1 | 0)
    timeArr.push(result / 1000 / 60 / 60 % 24 | 0)
    timeArr.push(result / 1000 / 60 % 60 | 0)
    timeArr.push(result / 1000 % 60 | 0)
  }
  for (let i = 0; i < timeArr.length; i++) {
    if (timeArr[i]) {
      return timeArr[i] + arr[i]
    } else {
      continue;
    }
  }
}
