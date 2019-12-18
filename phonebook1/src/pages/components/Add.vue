<template>
    <div class="detail">
      <div class="header">
        <router-link tag="div" to="/phoneBook" class="iconfont back-icon">&#xe606;</router-link>
      </div>
      <div class="image">
        <div class="info">
          <img :src="getImageUrl(phoneBooks.image)" alt="">
        </div>
        <div class="action">
          <button>修改头像</button>
          <input type="file" >
        </div>
      </div>

      <div class="userInfo">
        <div class="item border-bottom">
          <span>姓名</span>
          <input type="text">
        </div>
        <div class="item border-bottom">
          <span>手机号码</span>
          <input type="text">
        </div>
        <div class="item border-bottom">
          <span>座机电话号码</span>
          <input type="text">
        </div>
        <div class="item border-bottom">
          <span>工作单位地址</span>
          <textarea></textarea>
        </div>
        <div class="item border-bottom">
          <span>家庭地址</span>
          <textarea></textarea>
        </div>
        <div class="item border-bottom">
          <span>备注</span>
          <textarea></textarea>
        </div>
      </div>

      <div class="action">
        <div class="item border-bottom">
          <a href="">保存</a>
        </div>
      </div>
    </div>
</template>

<script>
    import {getServerUrl} from "../../config/sys";

    export default {
        name: "Add",
        data(){
          return{
            phoneBooks:{image:'010.png'}
          }
        },
        methods:{
          getImageUrl(image){
            return getServerUrl('image/'+image);
          }
        }
    }
</script>

<style lang="stylus" scoped>

  @import "~@/assets/styles/varibles.styl"
  .border-bottom
    &:before
      border-color: $borderColor

  .detail
    .header
      position: fixed;
      top: 0;
      overflow: hidden;
      height: $headerHight
      line-height: $headerHight
      text-align: left;
      padding-left: .2rem;
      padding-top: .1rem;
      background-color: #d3d3d3;
      width: 100%;
      z-index: 3;
      opacity: .8;
      .back-icon
        position fixed
        top 0rem
        left .2rem
        font-size .42rem
    .image
      margin-top: .86rem;
      text-align: center;
      width: 90%;
      height: 2.5rem;
      .info
        img
          float: left
          border-radius: .5rem
          overflow: hidden
          padding: .3rem
          width: 2rem
          height: 2rem
      .action
        padding-top: 1.55rem
        text-align: left
        button
          background-color: #4caf50
          border: none
          color: #fff
          padding: .15rem
          text-align: center
          text-decoration: none
          display: inline-block
          font-size: 16px
          border-radius: .2rem
        input
          display: none
    .userInfo
      padding-left .3rem
      padding-top:0
      .item
        padding-top .3rem
        padding-bottom .1rem
        span
          display block
          font-weight 800
        input
          padding-top .1rem
          width 100%
        textarea
          padding-top: .1rem
          width 100%
    .action
      padding-top: .5rem;
      padding-bottom: 2rem;
      .item
        width: 100%;
        text-align: center;
        padding-top: .3rem;
        padding-bottom: .3rem;
        a
          font-size: .4rem;
          color: #576b97;
</style>
