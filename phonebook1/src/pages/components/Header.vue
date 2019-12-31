<template>
  <div>
    <div class="header" :style="{'background':bgColor}">
      通讯录
      <div class="btn2" v-if="userColor=='liuly'">
        <label>
          <input type="checkbox"  />
          <div @click="handleClick" class="card">
            <div class="front">Check</div>
            <div class="back">Back</div>
          </div>
        </label>
      </div>
      <router-link tag="div" to="/add"  class="iconfont add-icon">&#xe6db;</router-link>
    </div>
    <transition name="fade">
    <div class="second-content"  v-show="showPage">
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
    </transition>
  </div>
</template>

<script>
  import {getServerUrl} from "@/config/sys";
    export default {
        name: "Head",
      mounted(){
        this.initData();
      },
      data(){
          return{
            userColor:'',
            bgColor:'#eee',
            showPage:false,
            list:[]
          }
      },
      props:["phoneBooks"],
      computed: {
        userData() {
          return this.$store.state.userInfo;
        },
        sortArray(){
          return this.$store.state.sortArray;
        }
      },
      methods:{
        getImageUrl(image){
          return getServerUrl("image/"+image);
        },
        handleClick() {
          if(this.bgColor=='#ff8dac'){
            this.bgColor='#eee'
          }else{
            this.bgColor='#ff8dac'
          }
          this.showPage=!this.showPage;
        },
        initData() {
          this.userColor = this.userData.userName;
          let result=[]
          /*setTimeout(function(){
            console.log(this.phoneBooks);
          },500);*/
          console.log(this.sortArray);
          setTimeout(()=>{
            for(let j=0;j<this.sortArray.length;++j){
              for(let i in this.phoneBooks){
                this.phoneBooks[i].forEach((value)=>{
                  if(value.id == this.sortArray[j]){
                    result.push(value);
                  }
                })
              }
            }
            this.list=result;
            console.log(this.list);
          },600)
        },
      }
    }
</script>

<style lang="stylus" scoped>
  @import "~@/assets/styles/varibles.styl"
  .fade-enter{
    opacity: 0;
  }
  .fade-enter-active{
    transition: opacity 1s;
  }
  .fade-leave-to{
    opacity: 0;
  }
  .fade-leave-active{
    transition: opacity 1s;
  }
  .btn2
    font-size 23px
    label {
      -webkit-perspective: 1000px;
      perspective: 1000px;
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
      display: block;
      width: 80px;
      height: 38px;
      position: absolute;
      left: 15%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      cursor: pointer;
    }
    .card {
      position: relative;
      height: 100%;
      width: 100%;
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
      -webkit-transition: all 600ms;
      transition: all 600ms;
      z-index: 20;
    }
    .card div {
      position: absolute;
      height: 100%;
      width: 100%;
      background: #ff8dac;
      text-align: center;
      line-height: 38px;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-radius: 2px;
    }
    .card .back {
      background: #eee;
      color: #ff8dac;
      -webkit-transform: rotateX(180deg);
      transform: rotateX(180deg);
    }
    label:hover .card {
      -webkit-transform: rotateX(20deg);
      transform: rotateX(20deg);
      box-shadow: 0 20px 20px rgba(50, 50, 50, 0.2);
    }
    input {
      display: none;
    }
    :checked + .card {
      transform: rotateX(180deg);
      -webkit-transform: rotateX(180deg);
    }

    label:hover :checked + .card {
      transform: rotateX(160deg);
      -webkit-transform: rotateX(160deg);
      box-shadow: 0 20px 20px rgba(255, 255, 255, 0.2);
    }

  .header
    position: relative;
    overflow: hidden;
    font-size: .4rem;
    font-weight: 400;
    text-align: center;
    height: .86rem;
    line-height: .86rem;
    box-shadow:0.02rem 0.02rem 0.5rem #eee inset;
    border-radius 3%
    .add-icon
      position fixed
      top 0rem
      right .45rem
      font-size .42rem

  .second-content
    /* z-index 是指在当前页面上叠加 */
    z-index: 9
    overflow: hidden;
    position: absolute;
    box-shadow:0.02rem 0.1rem 0.5rem  #eee inset;
    top: 1.577rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ff8dac;
    border-radius 3%
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
