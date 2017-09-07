<template>
  <div class="index__commentArea__src-videoPage-commentArea-">
    <h3 class="index__headline__src-videoPage-commentArea-">评论
      <span class="index__comNum__src-videoPage-commentArea-" >{{count}}</span>
    </h3>
    <div class="index__itemWrap__src-videoPage-commentArea-" v-for="(item,index) in commentList" v-if="index < 5">
      <div class="index__commentItem__src-videoPage-commentArea-">
        <a class="index__imgWrap__src-videoPage-commentArea-" href="//m.bilibili.com/space/1462488">  <img :src="item.member.avatar">
        </a>
        <a href="//m.bilibili.com/space/1462488" class="index__upName__src-videoPage-commentArea-">{{item.member.uname}}</a>
        <span class="index__commentTime__src-videoPage-commentArea-">{{timeConversion(item.ctime)}}前</span>
        <p class="index__commentTxt__src-videoPage-commentArea-">{{item.content.message}}</p>
      </div>
    </div>
    <span class="index__downLoadBtn__src-videoPage-commentArea-" @click="downapp">下载bilibili客户端，查看全部评论</span>
  </div>
</template>
<script>
import { pushTime } from 'api/time'
import { getComment } from 'api/comment'
import { ERR_OK } from 'api/config'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      commentList: [],
      count: 0
    }
  },
  props: {
    aid: {
      type: String,
      default: '12853735'
    }
  },
  created() {
    this._getComment(this.aid)
  },
  methods: {
    _getComment(id) {
      getComment(id)
        .then((res) => {
          if (ERR_OK === res.code) {
            this.commentList = res.data.replies
            this.count = res.data.page.count
          }
        })
    },
    timeConversion(time) {
      let Computetime = parseInt(time + '000'),
        date = new Date(Computetime),
        nowdate = new Date().getTime()
      if (this.istoday(time)) {
        Computetime = nowdate - Computetime
        return pushTime(Computetime, false)
      }
    },
    istoday(time) {
      let Computetime = parseInt(time + '000'),
        nowDate = new Date().getTime()
      Computetime = nowDate - Computetime
      if (Computetime < 86400000) {
        return true
      } else {
        return false
      }
    },
    downapp() {
      this.$emit('downapp')
    }
  },
  computed: {
    ...mapGetters([
      'videoId'
    ])
  },
  watch: {
    videoId(val) {
      this._getComment(val)
    }
  },
}

</script>
<style>


</style>
