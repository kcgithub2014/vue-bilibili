<template>
  <div id="app">
      <my-header></my-header>
      <transition name="tablist">
          <show-tab v-show="show" @notabId="notabId" @notablist="notablist"></show-tab>
      </transition>
      <tab @showtablist="showtablist" :id="id"></tab>
        <router-view></router-view>
  </div>
</template>

<script>

import MyHeader from 'components/my-header/my-header'
import Tab from 'components/tab/tab'
import ShowTab from 'components/showtab/showtab'
export default {
    data(){
      return {
        show:false,
        id:0
      }
    },
    methods:{
      showtablist(){
       this.show = !this.show
      },
      notablist(){
       this.show = !this.show
      },
      notabId(item){
        this.id = item.id
        this.show = !this.show
      }
    },
  	components:{
  		MyHeader,
      Tab,
      ShowTab
  	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    background:#f4f4f4
  .tablist-enter-active,.tablist-leave-active
    transition:all 0.3s
  .tablist-enter,.tablist-leave-to
    transform:translate3d(0,-100%,0)
</style>
