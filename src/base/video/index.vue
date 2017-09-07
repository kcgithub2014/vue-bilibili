<template>
  <div class="index__videoPage__src-videoPage-" itemscope="" itemtype="http://schema.org/Movie">

    <div class="index__player__src-videoPage-player-" id="bofqi">
      <div class="index__hint__src-videoPage-player-"  v-show="!loaded">
        <p>播放器加载中...</p>
      </div>
      <div class="player-container" v-show="loaded">
        <div class="dummy"></div>
        <div class="player-box">
          <video width="100%" height="100%" preload="auto" webkit-playsinline="true" playsinline="true" v-if="state !== 'stop'" ref="video" poster>
            <source :src="videoInfo.url" ref="videoSource">
          </video>
          <div class="display" ref="display" @click.self="controlsActive.active = !controlsActive.active">
            <div class="input-bar">
              <input class="text-input" type="text" placeholder="请在这里输入弹幕">
              <button class="send-btn">发送</button>
            </div>
            <div class="control-bar" ref="controlBar" v-show="!isiOS" :class="{hide:!controlsActive.active}">
              <span class="control-btn btn-play">
        <i class="player-icon icon-play"></i>
      </span>
              <span class="control-btn btn-pause hide">
        <i class="player-icon icon-pause"></i>
      </span>
              <div class="time-container">
                <span class="control-text time-current-text" ref="nowTime">{{currentTime}}</span>
                <span class="control-time-split"></span>
                <span class="control-text time-total-text">{{videoInfo.Time}}</span>
              </div>
              <div class="right">
                <span class="control-btn btn-mute hide">
        <i class="player-icon icon-mute"></i>
      </span>
                <span class="control-btn btn-unmute hide">
        <i class="player-icon icon-unmute"></i>
      </span>
                <span class="control-volume-slider hide">
        <div class="ui-slider-container">
          <div class="ui-slider-tracker">
        </div>
        <div class="ui-slider-label">: 100</div>
        <div class="ui-slider-thumb" style="width: 100%;"></div>
        <div class="ui-slider-event-layer"></div>
        </div>
      </span>
                <span class="control-btn btn-comment active">
        <i class="player-icon icon-comment"></i>
      </span>
                <span class="control-btn btn-repeat hide">
        <i class="player-icon icon-repeat"></i>
      </span>
                <span class="control-btn btn-widescreen">
        <i class="player-icon icon-widescreen"></i>
      </span>
                <span class="control-btn btn-fullscreen active hide">
        <i class="player-icon icon-fullscreen"></i>
      </span>
              </div>
              <div class="control-slider">
                <div class="ui-slider-container">
                  <div class="ui-slider-tracker"></div>
                  <div class="ui-slider-label">{{progressTime.time}}</div>
                  <div class="ui-slider-thumb" ref="progress"></div>
                  <div class="ui-slider-event-layer" ref="progressLayer" @touchstart="trackerVideo($event)" @touchmove.stop.prevent="trackerVideoMove($event)"></div>
                </div>
              </div>
            </div>
            <div class="comment-layer container" ref="commentLayer"></div>
            <div class="load-layer" v-show="state === 'stop'">
              <img :src="videoInfo.img" rel="noreferrer" @click.self="videoPlay">
              <i class="player-icon icon-preview" @click.self="videoPlay"></i>
              <div class="index__innerTop__src-videoPage-player-">
                <p>{{aid}}</p>
              </div>
              <div class="index__videoTime__src-videoPage-player-">
                <p>{{videoInfo.Time}}</p>
              </div>
              <div class="index__cccTips__src-videoPage-player-">
                <div class="index__banner__src-videoPage-player-">
                  <p>高清更流畅，就用bilibili客户端(*^_^*)</p>
                </div>
                <div class="index__openClientBtn__src-videoPage-player-" @click="downApp = !downApp">
                  <p>用客户端打开</p>
                </div>
                <div class="index__clear__src-videoPage-player-"></div>
              </div>
            </div>
            <div class="state-icon">
              <i class="buff-icon"></i>
              <i class="pause-icon" ref="pauseIcon" v-show="controlsActive.active" :class="{active:state === 'pause'}" @click="videoPlay"></i>
              <i class="play-icon" v-show="controlsActive.active" v-if="!isiOS" :class="{active:state === 'playing'}" @click="videoPause"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="index__floatHint__src-videoPage-player-" :class="{'index__hide__src-videoPage-player-':lastPlayState.state}" v-if="!isiOS" v-show="lastPlayState.frequency">
        <p v-show="lastPlayTime">您上次观看到{{lastPlayTime}}<span @click="toLastPlayTime">跳转</span></p>
      </div>
    </div>
    <div class="index__operateArea__src-videoPage-operateArea-">
      <div class="index__operateBtn__src-videoPage-operateArea-">
        <div class="index__showField__src-videoPage-operateArea-" @click="share = !share">
          <div class="index__icon__src-videoPage-operateArea-"><img src="//s1.hdslb.com/bfs/static/mult/images/share.png" alt=""></div>
          <p>分享</p>
          <div class="index__clear__src-videoPage-operateArea-"></div>
        </div>
      </div>
      <div class="index__operateBtn__src-videoPage-operateArea-">
        <div class="index__showField__src-videoPage-operateArea-">
          <div class="index__icon__src-videoPage-operateArea-"><img src="//s1.hdslb.com/bfs/static/mult/images/collect.png" alt=""></div>
          <p>收藏</p>
          <div class="index__clear__src-videoPage-operateArea-"></div>
        </div>
      </div>
      <div class="index__operateBtn__src-videoPage-operateArea-">
        <div class="index__showField__src-videoPage-operateArea-">
          <div class="index__icon__src-videoPage-operateArea-"><img src="//s1.hdslb.com/bfs/static/mult/images/download.png" alt=""></div>
          <p>缓存</p>
          <div class="index__clear__src-videoPage-operateArea-"></div>
        </div>
      </div>
      <div class="index__clear__src-videoPage-operateArea-"></div>
    </div>
    <videoinfo :aid="aidConversion(aid)" v-on:downapp="downapp" v-on:sethistory="sethistory"></videoinfo>
    <comment :aid="aidConversion(aid)" v-on:downapp="downapp"></comment>
    <div class="index__footer__src-videoPage-footer-">
      <div class="index__optionWrap__src-videoPage-footer-">
        <a class="index__optionLink__src-videoPage-footer-">
        <i class="index__pc__src-videoPage-footer-"></i>
        <span class="index__txt__src-videoPage-footer-">电脑版</span>
      </a>
        <a class="index__optionLink__src-videoPage-footer-" @click="downapp">
      <i class="index__mobile__src-videoPage-footer-"></i>
      <span class="index__txt__src-videoPage-footer-">客户端</span>
      </a>
        <a class="index__optionLink__src-videoPage-footer-">
      <i class="index__goTop__src-videoPage-footer-"></i>
      <span class="index__txt__src-videoPage-footer-">返回顶部</span>
      </a>
      </div>
      <p class="index__footerInfo__src-videoPage-footer-">沪ICP备13002172号-3 bilibili.com © 2009-2017</p>
    </div>
    <div class="index__maskLayer__src-commonComponent-PromptPannel-" v-show="downApp">
      <div class="index__contentLayer__src-commonComponent-PromptPannel-">
        <img class="index__alertIcon__src-commonComponent-PromptPannel-" src="//s1.hdslb.com/bfs/static/mult/images/alert-icon.png">
        <h3 class="index__title__src-commonComponent-PromptPannel-">请先下载客户端</h3>
        <p class="index__detail__src-commonComponent-PromptPannel-">即可使用弹幕播放器观看视频~</p><a class="index__optionBtn__src-commonComponent-PromptPannel- index__cancelBtn__src-commonComponent-PromptPannel-" @click="downApp = !downApp">我知道了</a>
        <a class="index__optionBtn__src-commonComponent-PromptPannel- index__rrrBtn__src-commonComponent-PromptPannel-" href="//dl.hdslb.com/mobile/latest/iBiliPlayer-html5_seo.apk" @click="downApp = !downApp">下载客户端</a>
      </div>
    </div>
    <div class="index__sharePrompt__src-videoPage-sharePrompt-" v-show="share">
      <div class="index__shareWrap__src-videoPage-sharePrompt- index__show__src-videoPage-sharePrompt-">
        <div class="index__headline__src-videoPage-sharePrompt-">
          分享到
          <span class="index__closeWraper__src-videoPage-sharePrompt-" @click="share = !share"><i class="index__closeBtn__src-videoPage-sharePrompt-"></i></span></div>
        <div class="index__shareOption__src-videoPage-sharePrompt-"><a class="index__shareItem__src-videoPage-sharePrompt-" target="_blank"><i class="index__shareIcon__src-videoPage-sharePrompt- index__sina__src-videoPage-sharePrompt-"></i><div class="index__shareTxt__src-videoPage-sharePrompt-">新浪微博</div></a><a class="index__shareItem__src-videoPage-sharePrompt-" target="_blank"><i class="index__shareIcon__src-videoPage-sharePrompt- index__qzone__src-videoPage-sharePrompt-"></i><div class="index__shareTxt__src-videoPage-sharePrompt-">QQ空间</div></a><a class="index__shareItem__src-videoPage-sharePrompt-" target="_blank"><i class="index__shareIcon__src-videoPage-sharePrompt- index__baidu__src-videoPage-sharePrompt-"></i><div class="index__shareTxt__src-videoPage-sharePrompt-">百度贴吧</div></a><a class="index__shareItem__src-videoPage-sharePrompt-" target="_blank"><i class="index__shareIcon__src-videoPage-sharePrompt- index__qfriend__src-videoPage-sharePrompt-"></i><div class="index__shareTxt__src-videoPage-sharePrompt-">QQ好友</div></a></div>
        <div class="index__shareFooter__src-videoPage-sharePrompt-">
          <div class="index__icon__src-videoPage-sharePrompt-"></div>
          <div class="index__txtWrap__src-videoPage-sharePrompt-">
            <p class="index__big__src-videoPage-sharePrompt-">下载bilibili客户端</p>
            <p class="index__small__src-videoPage-sharePrompt-">可分享微信好友与朋友圈~</p>
          </div><span class="index__dlBtn__src-videoPage-sharePrompt-" @click="downApp = !downApp">下载</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import videoContainerCss from '~common/video-container.css'
import videoPageCss from '~common/video-page.css'
import { getPlayUrl, getPlayXML } from 'api/video'
import videoinfo from './videoinfo'
import comment from './comment'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'hello',
  data() {
    return {
      videoInfo: {
        Time: '0:00',
        Size: 0,
        format: 'mp4',
        img: '',
        url: '',
        cid: null,
        barrage: ''
      },
      state: 'stop',
      controlsActive: {
        active: false,
        timer: ''
      },
      lastPlayState: {
        state: false,
        frequency: 0
      },
      currentTime: '0:00',
      progressTime: {
        time: 0,
        timer: '',
        state: false,
        moveTimer: '',
        isMove: 0
      },
      videoLength: 0,
      touchstartX: 0,
      progressW: 0,
      barrage: {
        timer: '',
        cm: '',
        hasXML: false
      },
      isiOS: false,
      downApp: false,
      share: false,
      setPlayTimer: '',
      loaded:false
    }
  },

  components: {
    videoinfo,
    comment
  },
  created() {
    this.sethistory(this.aid)
    this._getPlayUrl(this.aid)
  },
  methods: {
    _getPlayUrl(aid) {
      let id = this.aidConversion(aid)
      getPlayUrl(id).then((res) => {
        this.videoInfo.Time = this.TimeConversion(res.timelength)
        this.videoLength = res.timelength
        this.videoInfo.Size = res.durl[0].size
        this.videoInfo.img = res.img
        this.videoInfo.url = res.durl[0].url
        this.videoInfo.cid = res.cid
      })
    },
    _getPlayXML() {
      if (this.videoInfo.cid) {
        getPlayXML(this.videoInfo.cid)
          .then((res) => {
            this.videoInfo.barrage = res.data
          })
      }
    },
    downapp() {
      this.downApp = !this.downApp
    },
    videoPlay() {
      this.state = 'playing'
      if (!this.barrage.hasXML) {
        this.videoBarrage(window.CommentManager)
      }
      this.barrage.cm.start()
      this.barrage.timer = setInterval(() => {
        if (this.$refs.video) {
          this.barrage.cm.time(Math.round(this.$refs.video.currentTime * 1000))
        }
      }, 10)
      setTimeout(() => {
        this.$refs.video.play()
        this.$refs.videoSource.setAttribute('type', 'video/' + this.videoInfo.format)
      }, 20)
      if (true) {
        this.$refs.display.style.display = 'none'
        setTimeout(()=>{
          this.$refs.video.setAttribute('controls',true)
        },20)
      }
    },
    videoPause() {
      this.$refs.video.pause()
      this.state = 'pause'
      this.barrage.cm.stop()
      clearTimeout(this.barrage.timer)
    },
    trackerVideo(event) {
      this.progressTime.state = true
      let layerW = event.changedTouches[0].target.clientWidth
      this.touchstartX = event.changedTouches[0].pageX
      this.progressW = (parseInt(this.$refs.progress.style.width) * layerW) / 100
    },
    trackerVideoMove(event) {
      this.progressTime.state = true
      this.progressTime.isMove++
        clearTimeout(this.controlsActive.timer)
      clearInterval(this.progressTime.timer)
      clearInterval(this.progressTime.moveTimer)
      let nowPageX = event.changedTouches[0].pageX,
        moveX = nowPageX - this.touchstartX,
        layerW = event.changedTouches[0].target.clientWidth,
        width = ((this.progressW + moveX) / layerW) * 100
      if (width > 100) {
        width = 100
      } else if (width < 0) {
        width = 0
      }
      this.$refs.progress.style.width = width + '%'
      //减少请求
      this.progressTime.moveTimer = setTimeout(() => {
        this.setVideoCurrentTime(width * (this.videoLength / 1000) / 100)
        this.progressTime.state = false
        this.progressTime.isMove = 0
      }, 500)
    },
    toLastPlayTime() {
      let timeSplit = this.lastPlayTime.split(':'),
        time = parseInt(timeSplit[0]) * 60 + parseInt(timeSplit[1])
      this.setVideoCurrentTime(time)
    },
    TimeConversion(time) {
      let _time = (typeof time === 'number') ? time : 0,
        minute = _time / 1000 / 60 % 60 | 0,
        second = _time / 1000 % 60 | 0
      return minute + ':' + (second < 10 ? '0' + second : second)
    },
    aidConversion(aid) {
      return aid.match(/\d/g).join('')
    },
    setLastPlayTime(time) {
      let lastPlayTimeArr = this.getLocalStroage() || {},
        k = 'aid_' + this.aidConversion(this.aid) + '_play_1'
      lastPlayTimeArr[k] = {
        t: time
      }
      if (window.localStorage) {
        localStorage.setItem('last_play_time', JSON.stringify(lastPlayTimeArr))
      }
    },
    getLocalStroage() {
      if (window.localStorage) {
        return JSON.parse(localStorage.getItem('last_play_time'))
      }
    },
    setVideoCurrentTime(time) {
      this.$refs.video.currentTime = time
    },
    videoBarrage(CommentManager) {
      this.barrage.cm = new CommentManager(this.$refs.commentLayer)
      this.barrage.cm.init()
      this.barrage.cm.start()
      try {
        clearTimeout(this.barrage.timer)
      } catch (e) {
        // Foo
      }
      if (this.state === 'playing') {
        let cp = (new CommentProvider()).addStaticSource(
          CommentProvider.XMLProvider("GET", "http://comment.bilibili.com/" + this.aidConversion(this.videoInfo.cid) + '.xml'),
          CommentProvider.SOURCE_XML).addParser(
          new BilibiliFormat.XMLParser(),
          CommentProvider.SOURCE_XML).addTarget(this.barrage.cm)
        cp.start().catch(function(e) {
          alert(e)
        })
        this.barrage.cm.clear()
        this.barrage.hasXML = true
      }
    },
    browserVersion() {
      let u = navigator.userAgent,
        isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (this.isiOS) {
        this.$refs.pauseIcon.style.display = 'none'
        return false
      }
    },
    sethistory(id) {
      if (window.localStorage) {
        if (this.info.length) {
          for (let i = 0; i < this.info.length; i++) {
            if (this.info[i].aid == this.aidConversion(id)) {
              let result = this.info[i],
                history = JSON.parse(localStorage.getItem('history')) || [],
                date = '' + new Date().getTime(),
                obj = {
                  mid: result.aid,
                  title: result.title,
                  pic: result.pic,
                  view_at: date.substring(0, date.length - 3)
                }
              history.push(obj)
              localStorage.setItem('history', JSON.stringify(history))
            }
          }
        }

      }
    },
    ...mapMutations({
      setInfo: 'SET_INFO'
    })
  },
  computed: {
    aid() {
      return this.$route.query.id
    },
    lastPlayTime() {
      if (window.localStorage && this.getLocalStroage()) {
        let lastPlayTimeArr = this.getLocalStroage(),
          k = 'aid_' + this.aidConversion(this.aid) + '_play_1'
        if (lastPlayTimeArr[k]) {
          let second = lastPlayTimeArr[k].t
          return this.TimeConversion(second * 1000)
        } else {
          return '0:00'
        }
      }
    },
    ...mapGetters([
      'videoId',
      'flag',
      'info'
    ])
  },
  watch: {
    videoId(val) {
      this.$refs.display.style.display = 'block'
      clearInterval(this.barrage.timer)
      clearInterval(this.setPlayTimer)
      clearInterval(this.progressTime.timer)
      this._getPlayUrl('' + val)
      this._getPlayXML('' + val)
      this.state = 'stop'
    },
    state() {
      if (!this.lastPlayState.frequency) {
        this.lastPlayState.state = false
        setTimeout(() => {
          this.lastPlayState.state = true
        }, 5000)
        this.lastPlayState.frequency++
      }
      this.setPlayTimer = setInterval(() => {
        if (this.$refs.video) {
          this.setLastPlayTime(this.$refs.video.currentTime | 0)
          this.currentTime = this.TimeConversion((this.$refs.video.currentTime | 0) * 1000)
        }
      }, 1000)
      if (!this.progressTime.state) {
        this.progressTime.timer = setInterval(() => {
          if (this.$refs.video) {
            let videoLength = this.videoLength
            this.progressTime.time = this.$refs.video.currentTime
            this.$refs.progress.style.width = (this.progressTime.time / (videoLength / 1000)) * 100 + '%'
          }
        }, 180)
      }
      clearTimeout(this.controlsActive.timer)
    },
    'controlsActive.active': {
      handler(val, oldval) {
        clearTimeout(this.controlsActive.timer)
        if (this.controlsActive.active && this.state === 'playing' && !this.progressTime.state) {
          this.controlsActive.timer = setTimeout(() => {
            this.controlsActive.active = !this.controlsActive
          }, 3000)
        }
      },
      deep: true
    },
    'progressTime.state': {
      handler(val, oldval) {
        if (!this.progressTime.state) {
          this.controlsActive.timer = setTimeout(() => {
            this.controlsActive.active = !this.controlsActive
          }, 3000)
        }
      },
      deep: true
    }
  },
  mounted() {
    this.browserVersion()
    setTimeout(() =>{
      this.loaded = true
    },1500)
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.barrage.timer)
    clearInterval(this.setPlayTimer)
    clearInterval(this.progressTime.timer)
    next()
  }
}

</script>
<style scoped>


</style>
