<template>
  <div>

    <div class="list" ref="wrapper">
      <!--为了使用betterScroll，需要在此定义div-->
      <div>
        <div class="phoneBook"
             v-for="(item,key) of phoneBooks"
             :key="key"
             :ref="key">
          <div class="title">{{key}}</div>
          <!--动态取值需要在:to内加上"``"-->
          <router-link class="item"
                       tag="div"
                       :to="`/detail/${innerItem.id}`"
                       v-for="innerItem of item"
                       :key="innerItem.id">
            <!--属性前加上冒号才能动态计算-->
            <img :src="getImageUrl(innerItem.image)" alt="image" >
            <div class="content border-bottom">{{innerItem.name}}</div>
          </router-link>
        </div>
      </div>

      <div class="phoneBook">
        <div class="title">B</div>
        <div class="item">
          <img src="../../assets/img/002.png" >
          <div class="content border-bottom">年年有余</div>
        </div>
        <div class="item">
          <img src="../../assets/img/003.png">
          <div class="content border-bottom">岁岁平安</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  //@ 在webpackbase里定义到src文件夹
  import {getServerUrl} from "@/config/sys";
  import Bscroll from "better-scroll"

  export default {
    name: "List",
    /*props:['phoneBooks']*/
    props:{
      phoneBooks:Object,
      letter:String,
    },
    methods:{
      getImageUrl(image){
        return getServerUrl("image/"+image);
      }
    },
    mounted() {
      //实例化,设置可以点击
      this.scroll=new Bscroll(this.$refs.wrapper,{click:true});
    },

    watch:{
      letter(){
        if(this.letter){
          //通过引用的名称来获取dom
          const element=this.$refs[this.letter][0];
          this.scroll.scrollToElement(element);
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>

  @import "~@/assets/styles/varibles.styl"

  .border-bottom
    &:before
      border-color: $borderColor

  .list
    overflow: hidden
    position: absolute
    top: 1.58rem
    left: 0
    right: 0
    bottom: 0
    .title
      line-height: .54rem
      background: $bgColor
      padding-left: .2rem
      color: #666
      font-size: .26rem
    .item
      line-height: .76rem
      margin: .2rem
      img
        float: left
        width: .8rem
        height: .8rem
        border-radius: .2rem
      .content
        padding-left: 1rem
        font-size: .4rem
        padding-bottom: .3rem

</style>
