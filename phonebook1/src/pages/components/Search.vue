<template>
  <div>
    <div class="search">
      <input type="text"
             v-model="keyword"
             class="search-input"
             placeholder="搜索">
    </div>
    <div class="search-content" ref="search" v-show="keyword">
      <div>
        <div class="item"
             v-for="item of list"
             :key="item.id">
          <img :src="getImageUrl(item.image)" alt="image" >
          <div class="content border-bottom">{{item.name}}</div>
        </div>
        <div class="item center" v-show="!list.length">
          没有找到匹配数据
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getServerUrl} from "@/config/sys";
  import Bscroll from "better-scroll"

    export default {
      name: "Search",
      data(){
        return{
          keyword:'',
          list:[]
        }
      },
      props:{
        phoneBooks:Object,
      },
      methods:{
        getImageUrl(image){
          return getServerUrl("image/"+image);
        }
      },
      watch:{
        keyword(){
          if(!this.keyword){
            this.list=[];
            return
          }
          const result=[];
          //默认遍历其value值
          for(let i in this.phoneBooks){
            this.phoneBooks[i].forEach((value)=>{
              if(value.name.indexOf(this.keyword)>-1){
                result.push(value);
              }
            })
          }
          this.list=result;
        }
      },
      mounted() {
        this.scroll=new Bscroll(this.$refs.search)
      }
    }
</script>

<style lang="stylus" scoped>
  @import "~@/assets/styles/varibles.styl"
  .border-bottom
    &:before
      border-color: $borderColor

  .search
    padding: .1rem;
    height: .72rem;
    background: #eee;
    text-align: center;
    .search-input
      box-sizing: border-box;
      width: 100%;
      height: .62rem;
      line-height: .62rem;
      text-align: center;
      border-radius: .06rem;
      color: #666;
      padding: 0 .1rem;

  .search-content
    /* z-index 是指在当前页面上叠加 */
    z-index: 2
    overflow: hidden;
    position: absolute;
    top: 1.55rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: #eee;
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
    .center
       text-align:center

</style>
