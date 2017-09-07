<template>
  <div>
    <div class="index__videoInfo__src-videoPage-videoInfo-">
      <h1 class="index__title__src-videoPage-videoInfo-" itemprop="name">{{authorInfo.title}}</h1>
      <div class="index__info__src-videoPage-videoInfo-">
        <i class="index__clickIcon__src-videoPage-videoInfo-"></i>
        <span class="index__clickTxt__src-videoPage-videoInfo-">{{authorInfo.play}}</span>
        <i class="index__dmIcon__src-videoPage-videoInfo-"></i>
        <span class="index__dmTxt__src-videoPage-videoInfo-">{{authorInfo.video_review}}</span>
        <i class="index__foldBtn__src-videoPage-videoInfo- " @click="videoInfoActive()" :class="{'index__on__src-videoPage-videoInfo-':infoActive}"></i>
      </div>
      <div class="index__descWrap__src-videoPage-videoInfo-" ref="videoInfo">
        <div>
          <p class="index__desc__src-videoPage-videoInfo-">
            <span itemprop="description">{{authorInfo.description}}</span>
          </p>
          <div class="index__position__src-videoPage-videoInfo-">
            <a href="//m.bilibili.com/index.html" target="_self" class="index__crumb__src-videoPage-videoInfo-">主页</a>
            <a href="//m.bilibili.com/channel/1.html" target="_self" class="index__crumb__src-videoPage-videoInfo-">{{list[0]}}</a>
            <a href="//m.bilibili.com/channel/47.html" target="_self" class="index__crumb__src-videoPage-videoInfo-">{{list[1]}}</a>{{'av'+authorInfo.aid}}
          </div>
        </div>
      </div>
    </div>
    <div class="index__upInfo__src-videoPage-upInfo-">
      <a href="//m.bilibili.com/space/424141" class="index__upFace__src-videoPage-upInfo-">
    <img :src="authorInfo.face" ></a>
      <a href="//m.bilibili.com/space/424141" class="index__upName__src-videoPage-upInfo-" itemprop="author" itemscope="" itemtype="http://schema.org/Person">
    <span itemprop="name" >{{authorInfo.author}}</span>
    </a>
      <span class="index__time__src-videoPage-upInfo-">{{subtime}}前投</span>
      <a href="javascript:;" class="index__attentionBtn__src-videoPage-upInfo-">关注</a>
    </div>
    <div class="index__relativeTag__src-videoPage-relativeTag-">
      <h3 class="index__title__src-videoPage-relativeTag-">相关标签</h3>
      <a href="//m.bilibili.com/tag/312180" target="_self" class="index__tag__src-videoPage-relativeTag-">ブリキノダンス</a>
      <a href="//m.bilibili.com/tag/313702" target="_self" class="index__tag__src-videoPage-relativeTag-">马口铁之舞</a>
      <a href="//m.bilibili.com/tag/2516089" target="_self" class="index__tag__src-videoPage-relativeTag-">fgo</a>
      <a href="//m.bilibili.com/tag/2526574" target="_self" class="index__tag__src-videoPage-relativeTag-">Fate/Grand Order</a>
    </div>
    <div class="index__relativeVideo__src-videoPage-relativeVideo-">
      <h3 class="index__headline__src-videoPage-relativeVideo-">视频相关</h3>
      <div>
        <div class="index__itemWrap__src-videoPage-relativeVideo-">
          <a class="index__videoItem__src-videoPage-relativeVideo-" @click="setvideo(item.aid)" v-for="(item,index) in videolist" v-if="index < showNum.num">
            <span class="index__imgWrap__src-videoPage-relativeVideo-">
              <img :src="item.pic">
            </span>
            <div>
              <span class="index__title__src-videoPage-relativeVideo-">{{item.title}}</span>
              <span class="index__upName__src-videoPage-relativeVideo-">UP主：>{{item.owner.name}}</span>
                <div class="index__infoWrap__src-videoPage-relativeVideo-">
                  <span class="index__num__src-videoPage-relativeVideo-">>播放：>{{item.stat.view  | filterView}}</span>
                  <span class="index__num__src-videoPage-relativeVideo-">>弹幕：>{{item.stat.danmaku | filterView}}</span>
                </div>
            </div>
          </a>
        </div>
        <div class="index__loadMore__src-videoPage-relativeVideo-" v-show="!showNum.most" @click="showMost">刚刚看到这里，点击加载更多~</div>
        <div class="index__loadMore__src-videoPage-relativeVideo-" v-show="showNum.most" @click="downapp">没有更多了-去客户端看看？~</div>
      </div>
    </div>
  </div>
</template>
<script>
import { pushTime } from 'api/time'
import { getMostVideo } from 'api/video'
import { ERR_OK } from 'api/config'
import { mapMutations, mapGetters } from 'vuex'
import { TopList } from 'common/js/config'
export default {
  data() {
    return {
      infoActive: false,
      videolist: [],
      showNum: {
        most: false,
        num: 6
      },
      authorInfo: '',
      list: []
    }
  },
  props: {
    aid: {
      type: String,
      default: '12853735'
    }
  },
  filters: {
    filterView: (val) => {
      if (val > 10000) {
        return (val / 10000).toFixed(1) + '万'
      } else {
        return val
      }
    }
  },
  methods: {
    setvideo(id) {
      this.$emit('sethistory', 'av' + id)
      this.setvideoid(id)
    },
    videoInfoActive() {
      let height = this.$refs.videoInfo.style.height
      if (height) {
        this.$refs.videoInfo.style = ''
        this.infoActive = false
      } else {
        this.$refs.videoInfo.style.height = this.$refs.videoInfo.childNodes[0].offsetHeight + 'px'
        this.infoActive = true
      }
    },
    _getMostVideo(id) {
      getMostVideo(id)
        .then((res) => {
          if (res.data.code === ERR_OK) {
            this.videolist = res.data.data
          }
        })
    },
    showMost() {
      this.showNum.most = true
      this.showNum.num = 20
    },
    downapp() {
      this.$emit('downapp')
    },
    dataCache(data, id) {
      let authorInfo = '',
        oid = id || this.$router.history.current.query.id.match(/\d/g).join('') || this.aid
      if (data) {
        authorInfo = data
      } else {
        if (this.info.length) {
          authorInfo = this.info
        } else {
          authorInfo = JSON.parse(localStorage.getItem('info'))
        }
        if (window.localStorage && this.info.length) {
          let infoArr = JSON.parse(localStorage.getItem('info')) || []
          infoArr = infoArr.concat(this.info)
          localStorage.setItem('info', JSON.stringify(infoArr))
        }
      }
      if (authorInfo.length) {
        for (let i = 0; i < authorInfo.length; i++) {
          if (oid == authorInfo[i].aid) {
            return authorInfo[i]
          }
        }
      } else {
        return authorInfo
      }
    },
    timeConversion(time) {
      let oldTime = new Date(time).getTime(),
        nowTime = new Date().getTime(),
        result = nowTime - oldTime
      pushTime(result, true)
    },
    findlist(id, list) {
      let toplist = list
      for (let i = 0; i < toplist.length; i++) {
        if (toplist[i]['topTList'].length) {
          let obj = toplist[i]['topTList'],
            result = []
          for (let x in obj) {
            if (obj[x]['tid'] === id) {
              result.push(toplist[i]['title'])
              result.push(obj[x]['name'])
              return result
            }
          }
        }
      }
    },
    ...mapMutations({
      'setvideoid': 'SET_VIDEOID',
      'setflag': 'SET_FLAG',
      'setmostVideo': 'SET_MOSTVIDEO',
      'setInfo': 'SET_INFO'
    })
  },
  mounted() {
    this._getMostVideo(this.aid)
    this.authorInfo = this.dataCache()
    this.list = this.findlist(this.authorInfo.tid, TopList)
  },
  computed: {
    ...mapGetters([
      'info',
      'videoId'
    ]),
    subtime() {
      return this.timeConversion(this.authorInfo.create)
    }
  },
  watch: {
    videoId(val) {
      let videolist = this.videolist
      getMostVideo(val)
        .then((res) => {
          this.setInfo(res.data.data)
          for (let i = 0; i < videolist.length; i++) {
            if (val == videolist[i].aid) {
              let result = videolist[i]
              this.authorInfo = {
                aid: result.aid,
                author: result.owner.name,
                create: result.pubdate,
                description: result.desc,
                pic: result.pic,
                duration: result.duration,
                face: result.owner.face,
                play: result.stat.view,
                title: result.title,
                video_review: result.stat.danmaku,
                tid: result.tid
              }
              console.log(this.authorInfo)
              if (window.localStorage) {
                let infoArr = JSON.parse(localStorage.getItem('info')).concat(this.authorInfo)
                localStorage.setItem('info', JSON.stringify(infoArr))
              }
              this.videolist = res.data.data
              this.list = this.findlist(result.tid, TopList)
              this.$router.push({ path: '/play?id=av' + result.aid })
              this.$nextTick(() => {
                this.$refs.videoInfo.style.height = this.$refs.videoInfo.childNodes[0].offsetHeight + 'px'
              })
            }
          }
        })
    }
  }
}

</script>
<style>


</style>
