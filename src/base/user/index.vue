<template>
  <div style="position:relative;z-index:999;top:1.87733rem;background:#f4f4f4;">
    <div class="index__banner__src-space-banner-">
      <img src="//s1.hdslb.com/bfs/static/mult/images/bannerTop.png" alt="">
      <div class="index__loginField__src-space-banner-" v-if="!username">
        <div class="index__register__src-space-banner-">
          <router-link tag="a" :to="{path:'login'}">注册</router-link>
        </div>
        <div class="index__login__src-space-banner-">
          <router-link tag="a" :to="{path:'login'}">登录</router-link>
        </div>
        <div class="index__clear__src-space-banner-"></div>
      </div>
    </div>
    <div class="index__info__src-space-info-" v-if="username">
      <div class="index__face__src-space-info-"><img src="//static.hdslb.com/images/member/noface.gif" alt=""></div>
      <div class="index__myInfo__src-space-info-" @click="showinfo">
        <p>账号资料</p>
      </div>
      <div class="index__nameField__src-space-info-">
        <div class="index__name__src-space-info-">
          <p>{{username}}</p>
        </div>
        <div class="index__sex__src-space-info-">
          <svg class="index__icon__src-space-info- " aria-hidden="true">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-zhongxing"></use>
          </svg>
        </div>
        <div class="index__exp__src-space-info-">
          <div class="index__lvIcon__src-space-info-"><img src="//s1.hdslb.com/bfs/static/mult/images/lv0.png" alt=""></div>
          <div class="index__tube__src-space-info- ">
            <div class="index__dynamic__src-space-info- "></div>
            <div class="index__desc__src-space-info-">
              <p>0/200</p>
            </div>
          </div>
          <div class="index__clear__src-space-info-"></div>
        </div>
        <div class="index__clear__src-space-info-"></div>
      </div>
      <div class="index__details__src-space-info-">
        <div class="index__line1__src-space-info-">
          <div class="index__follow__src-space-info-">
            <p><span>0 </span> 关注
            </p>
          </div>
          <div class="index__fans__src-space-info-">
            <p><span>0 </span> 粉丝
            </p>
          </div>
          <div class="index__clear__src-space-info-"></div>
        </div>
        <div class="index__intro__src-space-info-">
          <div class="index__wordsContainer__src-space-info-">
            <p></p>
          </div>
        </div>
      </div>
    </div>
    <div class="index__tabs__src-space-tabs-">
      <div class="index__tab__src-space-tabs- index__cur__src-space-tabs-">
        <p>历史记录</p>
        <div class="index__line__src-space-tabs-"></div>
      </div>
      <div class="index__tab__src-space-tabs-">
        <p>投稿</p>
      </div>
      <div class="index__clear__src-space-tabs-"></div>
    </div>
    <div class="index__history__src-space-history-" style="display:block;">
      <div class="index__today__src-space-history-">
        <p>今天</p>
        <router-link :to="{path:'play',query:{id:'av'+item.mid}}" class="index__historyItem__src-space-historyItem-" v-for="item in today" :key="item.mid">
          <div class="index__imgContainer__src-space-historyItem-">
            <img src="//s1.hdslb.com/bfs/static/mult/images/tv.png" class="index__tv__src-space-historyItem-" alt="">
            <img :src="item.pic" alt="" class="index__normal__src-space-historyItem-">
          </div>
          <div class="index__info__src-space-historyItem-">
            <div class="index__title__src-space-historyItem-">
              <p>{{item.title}}</p>
            </div>
            <div class="index__time__src-space-historyItem-">
              <p>今天{{timeConversion(item.view_at)}}</p>
            </div>
          </div>
          <div class="index__clear__src-space-historyItem-"></div>
        </router-link>
      </div>
      <div class="index__earlier__src-space-history-">
        <p>更早</p>
        <router-link :to="{path:'play',query:{id:'av'+item.mid}}" class="index__historyItem__src-space-historyItem-" v-for="item in before" :key="item.mid">
          <div class="index__imgContainer__src-space-historyItem-"><img src="//s1.hdslb.com/bfs/static/mult/images/tv.png" class="index__tv__src-space-historyItem-" alt=""><img :src="item.pic" alt="" class="index__normal__src-space-historyItem-"></div>
          <div class="index__info__src-space-historyItem-">
            <div class="index__title__src-space-historyItem-">
              <p>{{item.title}}</p>
            </div>
            <div class="index__time__src-space-historyItem-">
              <p>{{timeConversion(item.view_at)}}</p>
            </div>
          </div>
          <div class="index__clear__src-space-historyItem-"></div>
        </router-link>
      </div>
      <div class="index__loadMore__src-space-history-" v-show="!showmost" @click="showmost=true">刚刚看到这里，点击加载更多~</div>
      <div class="index__loadMore__src-space-history-" v-show="showmost" @click="openDown">去客户端看看？</div>
    </div>
    <div class="index__masterpiece__src-space-masterpiece-" style="display:none">
      <div class="index__noInfo__src-space-masterpiece-"><img src="//s1.hdslb.com/bfs/static/mult/images/login.png" alt="">
        <p>你还没有登录哦~</p>
        <p>赶快登录打开新世界的大门</p>
      </div>
    </div>
    <Myfooter></Myfooter>
    <div class="index__personal__src-space-personal-" :style="transform" v-if="username">
      <div class="index__topArea__src-space-personal-topArea-">
        <div class="index__backIcon__src-space-personal-topArea-" @click="transform.transform='translateX(16rem)'"><img src="//s1.hdslb.com/bfs/static/mult/images/back.png"></div>
        <div class="index__titleWords__src-space-personal-topArea-">
          <p>账号资料</p>
        </div>
        <a class="index__uuuBtn__src-space-personal-topArea-">
          <p>下载客户端</p>
        </a>
      </div>
      <div class="index__msgItem__src-space-personal-">
        <div class="index__title__src-space-personal- index__withImg__src-space-personal-">
          <p>头像</p>
        </div>
        <div class="index__face__src-space-personal-"><img src="//static.hdslb.com/images/member/noface.gif" alt=""></div>
        <div class="index__clear__src-space-personal-"></div>
      </div>
      <div class="index__msgItem__src-space-personal-">
        <div class="index__title__src-space-personal-">
          <p>昵称</p>
        </div>
        <div class="index__words__src-space-personal-">
          <p>{{username}}</p>
        </div>
        <div class="index__clear__src-space-personal-"></div>
      </div>
      <div class="index__msgItem__src-space-personal-">
        <div class="index__title__src-space-personal-">
          <p>UID</p>
        </div>
        <div class="index__words__src-space-personal-">
          <p>201416047</p>
        </div>
        <div class="index__clear__src-space-personal-"></div>
      </div>
      <div class="index__msgItem__src-space-personal-">
        <div class="index__title__src-space-personal-">
          <p>性别</p>
        </div>
        <div class="index__words__src-space-personal-">
          <p>保密</p>
        </div>
        <div class="index__clear__src-space-personal-"></div>
      </div>
      <div class="index__msgItem__src-space-personal-">
        <div class="index__title__src-space-personal-">
          <p 出生年月</p>
        </div>
        <div class="index__words__src-space-personal-">
          <p>0000-01-01</p>
        </div>
        <div class="index__clear__src-space-personal-"></div>
      </div>
      <div class="index__msgItem__src-space-personal-">
        <div class="index__title__src-space-personal-">
          <p>个性签名</p>
        </div>
        <div class="index__words__src-space-personal-">
          <p></p>
        </div>
        <div class="index__clear__src-space-personal-"></div>
      </div>
      <div class="index__exit__src-space-personal-"><a @click.stop="outlogin">退出登录</a></div>
      <Myfooter style="marginTop:0rem"></Myfooter>
    </div>
  </div>
</template>
<script>
import Myfooter from 'components/my-footer/my-footer.vue'
import { mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      showmost: false,
      transform: {
        transform: 'translateX(16rem)'
      }
    }
  },
  components: {
    Myfooter
  },
  methods: {
    outlogin() {
      this.setislogin({})
    },
    showinfo() {
      this.transform.transform = 'translateX(0px)'
    },
    openDown() {
      window.open('https://dl.hdslb.com/mobile/latest/iBiliPlayer-html5_seo.apk')
    },
    istoday(time) {
      let Computetime = parseInt(time + '000'),
        date = new Date(Computetime).toDateString(),
        nowDate = new Date().toDateString()
      if (date === nowDate) {
        return true
      } else if (date < nowDate) {
        return false
      }
    },
    timeConversion(time) {
      let Computetime = parseInt(time + '000'),
        date = new Date(Computetime)
      if (this.istoday(time)) {
        return this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes())
      } else {
        return date.toLocaleString()
      }
    },
    addZero(time) {
      if (time < 10 && time > 0) {
        return '0' + time
      } else {
        return time
      }
    },
    ...mapMutations({
      'setislogin': 'SET_ISLOGIN'
    })
  },
  computed: {
    history() {
      return this.$store.state.history
    },
    username() {
      if (this.islogin) {
        return this.islogin.username
      } else {
        return false
      }
    },
    today() {
      let todayArr = []
      if (this.history) {
        for (let i = 0; i < this.history.length; i++) {
          if (this.istoday(this.history[i].view_at)) {
            todayArr.push(this.history[i])
          }
        }
      }
      return todayArr
    },
    before() {
      let beforeArr = []
      if (this.history) {
        for (let i = 0; i < this.history.length; i++) {
          if (!this.istoday(this.history[i].view_at)) {
            beforeArr.push(this.history[i])
          }
        }
      }
      beforeArr.sort(function(a, b) {
        return b.view_at - a.view_at
      })
      return this.showmost ? beforeArr : beforeArr.slice(0, 19)
    },
    ...mapGetters([
      'islogin'
    ])
  }
}

</script>
<style>
.index__banner__src-space-banner- {
  position: relative;
  width: 100%;
  height: 5.54667rem
}

.index__banner__src-space-banner- img {
  display: block;
  width: 100%
}

.index__banner__src-space-banner- .index__loginField__src-space-banner- {
  position: absolute;
  top: 2.98667rem;
  left: 3.84rem;
  width: 8.32rem;
  height: 1.23733rem
}

.index__banner__src-space-banner- .index__loginField__src-space-banner- .index__register__src-space-banner- {
  position: relative;
  float: left;
  width: 3.072rem;
  height: 100%;
  background-color: #fff;
  border-radius: .17067rem
}

.index__banner__src-space-banner- .index__loginField__src-space-banner- .index__register__src-space-banner- a {
  display: block;
  width: 100%;
  line-height: 1.23733rem;
  font-size: .59733rem;
  color: #fb7299;
  text-align: center
}

.index__banner__src-space-banner- .index__loginField__src-space-banner- .index__login__src-space-banner- {
  position: relative;
  float: right;
  width: 3.072rem;
  height: 100%;
  background-color: #fb7299;
  border-radius: .17067rem
}

.index__banner__src-space-banner- .index__loginField__src-space-banner- .index__login__src-space-banner- a {
  display: block;
  width: 100%;
  line-height: 1.23733rem;
  font-size: .59733rem;
  color: #fff;
  text-align: center
}

.index__banner__src-space-banner- .index__loginField__src-space-banner- .index__clear__src-space-banner- {
  clear: both
}

.index__tabs__src-space-tabs- {
  position: relative;
  padding: 0 .512rem;
  background-color: #fff
}

.index__tabs__src-space-tabs- .index__tab__src-space-tabs- {
  position: relative;
  float: left;
  padding-left: .17067rem;
  padding-right: .17067rem;
  margin-right: 1.19467rem
}

.index__tabs__src-space-tabs- .index__tab__src-space-tabs- p {
  font-size: .59733rem;
  line-height: 1.62133rem;
  color: #666;
  text-align: center
}

.index__tabs__src-space-tabs- .index__tab__src-space-tabs-.index__cur__src-space-tabs- p {
  color: #fb7299
}

.index__tabs__src-space-tabs- .index__tab__src-space-tabs-.index__cur__src-space-tabs- .index__line__src-space-tabs- {
  position: absolute;
  left: 0;
  bottom: .08533rem;
  width: 100%;
  height: .08533rem;
  background-color: #fb7299;
  border-radius: .04267rem
}

.index__tabs__src-space-tabs- .index__clear__src-space-tabs- {
  clear: both
}

.index__history__src-space-history- {
  position: relative;
  overflow: hidden;
  background: #f4f4f4
}

.index__history__src-space-history- .index__loading__src-space-history- {
  padding-top: 2.13333rem
}

.index__history__src-space-history- .index__loading__src-space-history- p {
  font-size: .59733rem;
  color: #999;
  line-height: 1.45067rem;
  text-align: center
}

.index__history__src-space-history- .index__noInfo__src-space-history- {
  position: relative;
  padding-top: 3.62667rem
}

.index__history__src-space-history- .index__noInfo__src-space-history- img {
  display: block;
  position: relative;
  width: 11.94667rem;
  margin: auto;
  margin-bottom: 0
}

.index__history__src-space-history- .index__noInfo__src-space-history- p {
  font-size: .68267rem;
  color: #999;
  line-height: .85333rem;
  text-align: center
}

.index__history__src-space-history- .index__noInfo__src-space-history- p a {
  color: #fb7299
}

.index__history__src-space-history- .index__earlier__src-space-history-,
.index__history__src-space-history- .index__today__src-space-history-,
.index__history__src-space-history- .index__yesterday__src-space-history- {
  position: relative;
  padding: 0 .512rem;
  margin-top: .34133rem
}

.index__history__src-space-history- .index__earlier__src-space-history- p,
.index__history__src-space-history- .index__today__src-space-history- p,
.index__history__src-space-history- .index__yesterday__src-space-history- p {
  font-size: .59733rem;
  color: #999;
  line-height: 1.45067rem;
  text-align: left
}

.index__history__src-space-history- .index__loadMore__src-space-history- {
  position: relative;
  padding: 0 .512rem;
  margin-top: .512rem;
  line-height: 1.728rem;
  font-size: .55467rem;
  color: #fb7299;
  background-color: #e7e7e7;
  text-align: center
}

.index__clearfix__src-space-historyItem-:after,
.index__clearfix__src-space-historyItem-:before {
  content: "";
  display: block;
  height: 0;
  clear: both
}

.index__historyItem__src-space-historyItem- {
  display: block;
  text-decoration: none;
  position: relative;
  margin-bottom: .81067rem
}

.index__historyItem__src-space-historyItem- .index__imgContainer__src-space-historyItem- {
  position: relative;
  float: left;
  width: 4.992rem;
  height: 3.11467rem;
  overflow: hidden;
  display: block;
  margin: auto;
  border-radius: .256rem;
  -webkit-border-radius: .256rem;
  background-color: #e7e7e7;
  z-index: 1;
  background-image: linear-gradient(transparent 50%, rgba(0, 0, 0, .5))
}

.index__historyItem__src-space-historyItem- .index__imgContainer__src-space-historyItem- img.index__tv__src-space-historyItem- {
  position: relative;
  width: 3.11467rem;
  height: 3.11467rem;
  z-index: 1
}

.index__historyItem__src-space-historyItem- .index__imgContainer__src-space-historyItem- img {
  display: block;
  position: relative;
  margin: auto;
  width: 100%
}

.index__historyItem__src-space-historyItem- .index__imgContainer__src-space-historyItem- img.index__normal__src-space-historyItem- {
  position: absolute;
  top: 0;
  z-index: 2
}

.index__historyItem__src-space-historyItem- .index__imgContainer__src-space-historyItem- .index__process__src-space-historyItem- {
  position: absolute;
  right: .256rem;
  bottom: .34133rem;
  z-index: 3
}

.index__historyItem__src-space-historyItem- .index__imgContainer__src-space-historyItem- .index__process__src-space-historyItem- p {
  font-size: .42667rem;
  color: #fff;
  text-align: right;
  line-height: .42667rem
}

.index__historyItem__src-space-historyItem- .index__imgContainer__src-space-historyItem- .index__processBar__src-space-historyItem- {
  position: absolute;
  width: 100%;
  height: .128rem;
  bottom: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, .6)
}

.index__historyItem__src-space-historyItem- .index__imgContainer__src-space-historyItem- .index__processBar__src-space-historyItem- .index__bar__src-space-historyItem- {
  position: relative;
  width: 100%;
  height: .128rem;
  background-color: #fb7299
}

.index__historyItem__src-space-historyItem- .index__imgContainer__src-space-historyItem->img {
  display: block;
  width: 100%
}

.index__historyItem__src-space-historyItem- .index__info__src-space-historyItem- {
  width: 9.472rem;
  position: relative;
  float: left;
  margin: auto;
  margin-left: .512rem
}

.index__historyItem__src-space-historyItem- .index__info__src-space-historyItem- .index__title__src-space-historyItem- {
  position: relative;
  width: 100%;
  height: 1.45067rem;
  overflow: hidden
}

.index__historyItem__src-space-historyItem- .index__info__src-space-historyItem- .index__title__src-space-historyItem- p {
  font-size: .59733rem;
  color: #212121;
  letter-spacing: 0;
  line-height: .72533rem;
  text-align: left
}

.index__historyItem__src-space-historyItem- .index__info__src-space-historyItem- .index__time__src-space-historyItem- {
  position: relative;
  margin-top: 1.152rem
}

.index__historyItem__src-space-historyItem- .index__info__src-space-historyItem- .index__time__src-space-historyItem- p {
  font-size: .42667rem;
  color: #999;
  line-height: .42667rem;
  text-align: left
}

.index__historyItem__src-space-historyItem- .index__clear__src-space-historyItem- {
  clear: both
}

.index__historyItem__src-space-historyItem-:last-child {
  margin-bottom: .256rem
}

.index__info__src-space-info- {
  position: relative;
  width: 100%;
  background-color: #fff;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -ms-perspective: 1000;
  perspective: 1000
}

.index__info__src-space-info- .index__face__src-space-info- {
  position: absolute;
  top: -1.70667rem;
  z-index: 1;
  left: .512rem;
  width: 3.41333rem;
  height: 3.41333rem;
  border-radius: 50%;
  background: url("//static.hdslb.com/images/member/noface.gif") no-repeat;
  background-size: 100% 100%;
  overflow: hidden
}

.index__info__src-space-info- .index__face__src-space-info- img {
  position: absolute;
  display: block;
  width: auto;
  height: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%)
}

.index__info__src-space-info- .index__big__src-space-info- {
  position: absolute;
  z-index: 2;
  top: .85333rem;
  left: 3.2rem
}

.index__info__src-space-info- .index__big__src-space-info- .index__bigIcon__src-space-info- {
  position: relative;
  float: left;
  width: .74667rem
}

.index__info__src-space-info- .index__big__src-space-info- .index__bigIcon__src-space-info- img {
  display: block;
  width: 100%
}

.index__info__src-space-info- .index__big__src-space-info- .index__call__src-space-info- {
  position: relative;
  float: left;
  width: 1.536rem;
  margin-top: .064rem;
  margin-left: .29867rem;
  background-color: #fb7299;
  border-radius: .08533rem
}

.index__info__src-space-info- .index__big__src-space-info- .index__call__src-space-info- p {
  font-size: .42667rem;
  line-height: .59733rem;
  color: #fff;
  text-align: center
}

.index__info__src-space-info- .index__myInfo__src-space-info- {
  position: absolute;
  z-index: 2;
  top: .42667rem;
  right: .512rem;
  border: .02133rem solid #fb7299;
  border-radius: .17067rem;
  width: 3.072rem
}

.index__info__src-space-info- .index__myInfo__src-space-info- p {
  font-size: .59733rem;
  line-height: 1.19467rem;
  color: #fb7299;
  text-align: center
}

.index__info__src-space-info- .index__nameField__src-space-info- {
  position: relative;
  padding-top: 2.56rem;
  margin-left: .512rem
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__name__src-space-info- {
  position: relative;
  float: left
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__name__src-space-info- p {
  font-size: .85333rem;
  color: #212121;
  line-height: 1.024rem
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__sex__src-space-info- {
  position: relative;
  float: left;
  width: .68267rem;
  height: .768rem;
  margin-left: .49067rem;
  margin-top: .21333rem
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__sex__src-space-info- .index__icon__src-space-info- {
  display: block;
  width: 100%;
  height: 100%;
  fill: #ce21e8
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__sex__src-space-info- .index__icon__src-space-info-.index__male__src-space-info- {
  fill: #89cff0
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__sex__src-space-info- .index__icon__src-space-info-.index__female__src-space-info- {
  fill: #fb7299
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- {
  position: relative;
  float: left;
  margin-left: .256rem;
  margin-top: .17067rem
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__lvIcon__src-space-info- {
  position: relative;
  float: left;
  z-index: 1;
  margin-top: .128rem;
  width: 1.19467rem;
  height: .59733rem;
  background-color: #fff
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__lvIcon__src-space-info- img {
  display: block;
  width: 100%
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__tube__src-space-info- {
  position: relative;
  float: left;
  z-index: 0;
  margin-left: -.29867rem;
  margin-top: .21333rem;
  width: 3.73333rem;
  height: .512rem;
  border-radius: .256rem;
  overflow: hidden;
  background-color: #757575;
  -webkit-transform: translateZ(0)
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__tube__src-space-info- .index__dynamic__src-space-info- {
  position: relative;
  width: 100%;
  -webkit-transform: translate3d(-3.43467rem, 0, 0);
  height: 100%;
  background-color: red;
  -webkit-transition: -webkit-transform 1s
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__tube__src-space-info- .index__dynamic__src-space-info-.index__lv0__src-space-info-,
.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__tube__src-space-info- .index__dynamic__src-space-info-.index__lv1__src-space-info- {
  background-color: #bfbfbf
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__tube__src-space-info- .index__dynamic__src-space-info-.index__lv2__src-space-info- {
  background-color: #95ddb2
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__tube__src-space-info- .index__dynamic__src-space-info-.index__lv3__src-space-info- {
  background-color: #92d1e5
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__tube__src-space-info- .index__dynamic__src-space-info-.index__lv4__src-space-info- {
  background-color: #ffb37c
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__tube__src-space-info- .index__dynamic__src-space-info-.index__lv5__src-space-info- {
  background-color: #ff6c00
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__tube__src-space-info- .index__dynamic__src-space-info-.index__lv6__src-space-info- {
  background-color: red
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__tube__src-space-info- .index__desc__src-space-info- {
  position: absolute;
  width: 2.13333rem;
  top: 0;
  right: 0
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__tube__src-space-info- .index__desc__src-space-info- p {
  text-align: center;
  color: #fff;
  font-size: .34133rem;
  line-height: .512rem
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__uid__src-space-info- {
  position: relative;
  float: left;
  margin-left: .256rem;
  margin-top: .08533rem
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__uid__src-space-info- p {
  font-size: .59733rem;
  color: #212121;
  text-align: left;
  line-height: .68267rem
}

.index__info__src-space-info- .index__nameField__src-space-info- .index__clear__src-space-info-,
.index__info__src-space-info- .index__nameField__src-space-info- .index__exp__src-space-info- .index__clear__src-space-info- {
  clear: both
}

.index__info__src-space-info- .index__details__src-space-info- {
  position: relative;
  margin-left: .512rem;
  margin-top: .512rem;
  margin-right: .512rem
}

.index__info__src-space-info- .index__details__src-space-info- .index__line1__src-space-info- {
  position: relative
}

.index__info__src-space-info- .index__details__src-space-info- .index__line1__src-space-info- .index__follow__src-space-info- {
  position: relative;
  float: left
}

.index__info__src-space-info- .index__details__src-space-info- .index__line1__src-space-info- .index__follow__src-space-info- p {
  font-size: .59733rem;
  line-height: .72533rem;
  color: #757575;
  text-align: left
}

.index__info__src-space-info- .index__details__src-space-info- .index__line1__src-space-info- .index__follow__src-space-info- p span {
  color: #212121
}

.index__info__src-space-info- .index__details__src-space-info- .index__line1__src-space-info- .index__fans__src-space-info- {
  position: relative;
  float: left;
  margin-left: .896rem
}

.index__info__src-space-info- .index__details__src-space-info- .index__line1__src-space-info- .index__fans__src-space-info- p {
  font-size: .59733rem;
  line-height: .72533rem;
  color: #757575;
  text-align: left
}

.index__info__src-space-info- .index__details__src-space-info- .index__line1__src-space-info- .index__fans__src-space-info- p span {
  color: #212121
}

.index__info__src-space-info- .index__details__src-space-info- .index__line1__src-space-info- .index__clear__src-space-info- {
  clear: both
}

.index__info__src-space-info- .index__details__src-space-info- .index__intro__src-space-info- {
  position: relative;
  margin-top: .55467rem
}

.index__info__src-space-info- .index__details__src-space-info- .index__intro__src-space-info- .index__switchContainer__src-space-info- {
  position: absolute;
  top: 0;
  width: 1.38667rem;
  height: 1.87733rem;
  right: 0
}

.index__info__src-space-info- .index__details__src-space-info- .index__intro__src-space-info- .index__switchContainer__src-space-info- .index__icon__src-space-info- {
  display: block;
  width: .68267rem;
  height: .68267rem;
  margin: auto;
  margin-right: 0;
  fill: #aaa
}

.index__info__src-space-info- .index__details__src-space-info- .index__intro__src-space-info- .index__wordsContainer__src-space-info- {
  position: relative;
  width: 12.8rem;
  height: .68267rem;
  transition: all .5s;
  -webkit-transition: all .5s;
  overflow: hidden
}

.index__info__src-space-info- .index__details__src-space-info- .index__intro__src-space-info- .index__wordsContainer__src-space-info- p {
  font-size: .55467rem;
  line-height: .68267rem;
  color: #999;
  text-align: left;
  word-wrap: break-word
}

.index__personal__src-space-personal- {
  position: fixed;
  z-index: 8;
  top: 0;
  width: 100%;
  height: 116%;
  overflow-y: hidden;
  background-color: #f4f4f4;
  -webkit-transform: translateX(16rem);
  -webkit-transition: -webkit-transform .6s
}

.index__personal__src-space-personal- .index__msgItem__src-space-personal- {
  position: relative;
  background-color: #fff;
  padding: .42667rem .512rem;
  border-bottom: .02133rem solid #eee
}

.index__personal__src-space-personal- .index__msgItem__src-space-personal- .index__title__src-space-personal- {
  position: relative;
  float: left
}

.index__personal__src-space-personal- .index__msgItem__src-space-personal- .index__title__src-space-personal- p {
  text-align: left;
  font-size: .64rem;
  line-height: 1.06667rem;
  color: #505050
}

.index__personal__src-space-personal- .index__msgItem__src-space-personal- .index__title__src-space-personal-.index__withImg__src-space-personal- {
  margin-top: .49067rem
}

.index__personal__src-space-personal- .index__msgItem__src-space-personal- .index__face__src-space-personal- {
  position: relative;
  float: right;
  width: 2.048rem;
  height: 2.048rem;
  border-radius: 50%;
  background: url("//static.hdslb.com/images/member/noface.gif") no-repeat;
  background-size: 100% 100%;
  overflow: hidden
}

.index__personal__src-space-personal- .index__msgItem__src-space-personal- .index__face__src-space-personal- img {
  position: absolute;
  display: block;
  width: auto;
  height: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%)
}

.index__personal__src-space-personal- .index__msgItem__src-space-personal- .index__words__src-space-personal- {
  position: relative;
  float: right;
  width: 9.6rem;
  overflow: hidden
}

.index__personal__src-space-personal- .index__msgItem__src-space-personal- .index__words__src-space-personal- p {
  text-align: right;
  font-size: .64rem;
  line-height: 1.06667rem;
  color: #999
}

.index__personal__src-space-personal- .index__msgItem__src-space-personal- .index__clear__src-space-personal- {
  clear: both
}

.index__personal__src-space-personal- .index__exit__src-space-personal- {
  position: relative;
  margin-top: 1.49333rem;
  width: 100%;
  background-color: #fff
}

.index__personal__src-space-personal- .index__exit__src-space-personal- a {
  display: block;
  font-size: .64rem;
  color: #505050;
  line-height: 1.92rem;
  text-align: center
}

.index__topArea__src-space-personal-topArea- {
  position: relative;
  width: 100%;
  height: 1.32267rem;
  padding: .27733rem 0;
  background-color: #fff;
  margin-bottom: .512rem
}

.index__topArea__src-space-personal-topArea- .index__backIcon__src-space-personal-topArea- {
  position: absolute;
  display: block;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  width: 1.536rem
}

.index__topArea__src-space-personal-topArea- .index__backIcon__src-space-personal-topArea- img {
  position: relative;
  display: block;
  width: 25%;
  margin: auto
}

.index__topArea__src-space-personal-topArea- .index__titleWords__src-space-personal-topArea- {
  position: absolute;
  width: 3.328rem;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%)
}

.index__topArea__src-space-personal-topArea- .index__titleWords__src-space-personal-topArea- p {
  font-size: .68267rem;
  line-height: 1.024rem;
  color: #fb7299;
  text-align: center
}

.index__topArea__src-space-personal-topArea- a.index__uuuBtn__src-space-personal-topArea- {
  position: absolute;
  display: block;
  top: 50%;
  -webkit-transform: translateY(-50%);
  right: .55467rem;
  width: 3.41333rem;
  height: 1.28rem;
  border: .04267rem solid #fb7299;
  border-radius: .17067rem
}

.index__topArea__src-space-personal-topArea- a.index__uuuBtn__src-space-personal-topArea- p {
  font-size: .59733rem;
  line-height: 1.28rem;
  text-align: center;
  color: #fb7299
}

</style>
