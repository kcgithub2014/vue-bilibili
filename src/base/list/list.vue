<template>
    <div class="hotlist">
        <div class="hot-box">
            <div class="hot-list">
                <div class="hot-tit">
                    <p class="hot-recemmend" >最新视频</p>
                </div>
                <div class="hot-content">
                    <router-link :to="{path:'play',query:{id:'av'+item.aid}}" class="hot-item" v-for="item in list" tag="a" :key="item.aid">
                        <div class="hot-src">
                            <img v-lazy="item.pic">
                            <div class="hot-btn">
                                <div class="play-icon">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-dianshiju"></use>
                                    </svg>
                                </div>
                                <div class="play-sz">
                                    <p>{{_getPlay(item.stat.danmaku)}}</p>
                                </div>
                                <div class="guankan-icon">
                                    <i class="icon iconfont icon-erji"></i>
                                </div>
                                <div class="guankan-index">
                                    <p>{{item.stat.view}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="hot-title">
                            <p>{{item.title}}</p>
                        </div>
                    </router-link>

                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {getPlay} from 'common/js/dom'
    import {mapMutations} from 'vuex'
    export default{
        props:{
            list:{
                type:Array,
                default:[]
            }
        },
        mounted(){
            this._getPlay()
        },
        methods:{
            _getPlay(state){
                return getPlay(state)
            },
            ...mapMutations({
                'setinfo':'SET_INFO'
            })
        }
    }
    
</script>
<style lang="stylus" rel="stylesheet/stylus">
.hotlist
    height:100%
    overflow:hidden;
    .hot-box
        height:100%
        overflow:hidden;
        .hot-tit
            position: relative;
            margin-left: .512rem;
            &::before
                content: "";
                display: block;
                height: 0;
                clear: both;
            .hot-icon
                position: relative;
                float: left;
                margin-top: 0.6rem;
                width: 1.19467rem;
                height: .95573rem;
                font-size:27px
                color:rgb(241, 71, 103)
            .hot-recemmend
                position: relative;
                float: left;
                margin-left: .1rem;
                width: 3.41333rem;
                font-size: .68267rem;
                line-height: 2.26133rem;
                text-align: left;
                color: #212121;
        .hot-rank
            position: absolute;
            right: .512rem;
            top: .85333rem;
            .paihang
                position: relative;
                float: left;
                width: 2.4rem;
                margin-top: .14933rem;
                p
                    font-size: .59733rem;
                    color:#999
                    text-align: center;
                    line-height: .59733rem;
            .more
                position: relative;
                width: .59733rem;
                height: .59733rem;
                margin-top: .14933rem;
                margin-left: .21333rem;
                float: left;
                img
                    display:block;
                    margin-top:-1px
        .hot-content
            position: relative;
            padding-left: .256rem;
            padding-right: .256rem;
            &::before
                content: "";
                display: block;
                height: 0;
                clear: both;
            .hot-item
                display: block;
                text-decoration: none;
                position: relative;
                width: 50%;
                float: left;
                margin-bottom: .68267rem;
                .hot-src
                    position: relative;
                    width: 7.232rem;
                    height: 4.52267rem;
                    overflow: hidden;
                    display: block;
                    margin: auto;
                    border-radius: .256rem;
                    -webkit-border-radius: .256rem;
                    background-color: #e7e7e7;
                    z-index: 1;
                    background-image: linear-gradient(transparent 50%,rgba(0,0,0,.5));
                    img
                        position: absolute;
                        top: 0;
                        z-index: 2;
                        width:100%
                    .hot-btn
                        position: absolute;
                        z-index: 3;
                        left: 0;
                        padding-left: .34133rem;
                        width: 100%;
                        bottom: 0;
                        height: .68267rem;
                        background: linear-gradient(180deg,rgba(33,33,33,0),rgba(33,33,33,.5));
                        .play-icon
                            position: relative;
                            float:left
                            width:16px
                            height:16px
                            top:-8px
                            .icon
                                width:16px
                                height:16px
                                fill:#fff
                        .play-sz
                            position: relative;
                            float: left;
                            margin-left: .256rem;
                            width: 2.048rem;
                            p
                                text-align: left;
                                font-size: .46933rem;
                                color: #fff;
                                line-height: .59733rem;
                        .guankan-icon
                            margin-left: .61867rem;
                            float:left
                            width:18px
                            height:18px
                            margin-top:-9px
                            .icon
                                width:18px
                                height:18px
                                color:#fff
                        .guankan-index
                            position: relative;
                            float: left;
                            margin-left: .156rem;
                            width: 2.048rem;
                            p
                                text-align: left;
                                font-size: .46933rem;
                                color: #fff;
                                line-height: .59733rem;
                .hot-title
                    width: 7.232rem;
                    position: relative;
                    margin: auto;
                    margin-top: .21333rem;
                    height: 1.36533rem;
                    overflow: hidden;
                    p
                        font-size: .55467rem;
                        color: #212121;
                        letter-spacing: 0;
                        line-height: .68267rem;
                        text-align: left;            
                            
                    
</style>