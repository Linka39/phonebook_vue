<template>
  <div>

    <div class="login-logo">通讯录</div>
    <form action="" class="login-cont">
      <ul>
        <li>
          <input v-model="userName" type="text" placeholder="请输入用户名">
        </li>
        <li>
          <input v-model="password" type="password" placeholder="请输入密码">
        </li>
      </ul>
      <a  class="submitButton" @click="submit">登  录</a>
      <p class="errorInfo">{{errorInfo}}</p>
    </form>
    <p class="copyright">
      Copyright © 2018-2019 <a href="https://i-tiny-leo.github.io/" target="_blank"> &nbsp;&nbsp;I-tiny-leo</a></p>
    <p class="game">
      <a @click="toGame" href="javascript:">&nbsp;<img src="../assets/img/game.png" height="30"/></a>
    </p>
    <p class="game2">
      <a  href="/tankGame">&nbsp;<img src="../assets/img/game3.png" height="30"/></a>
    </p>
  </div>
</template>

<script>
  import axios from 'axios'
  import {getServerUrl} from "../config/sys";
  import { mapActions, mapGetters } from "vuex";


  export default {
    name: "Login",
    data(){
      return{
        userName:'',
        password:'',
        errorInfo:''
      }
    },
    methods:{
      ...mapActions(['modifyUserData','modifyColor']), // 相当于this.$store.dispatch('modifyName'),提交这个方法
      submit(){
        let url= getServerUrl("login");
        if(this.userName.trim()==''){
          this.errorInfo="用户名不能为空！";
          return;
        }
        if(this.userName.trim()==''){
          this.errorInfo="密码不能为空！";
          return;
        }
        console.log('ok');
        console.log(url);
        axios.post(url,{'userName':this.userName,"password":this.password})
          .then(res=>{
            /*console.log(res);*/
            if(res.data.code==0){
              this.modifyUserData({
                userName:res.data.userData.userName,
                userColor:res.data.userData['color'],
              });
              this.modifyColor({});
              console.log(res.data.token);
              window.localStorage.setItem("token",res.data.token);
              this.$router.replace('/phoneBook');
            }else{
              this.errorInfo=res.data.msg;
            }
          }).catch(error=>{
          this.errorInfo=error;
        })
      },
      toGame(){
        this.$router.push('/myGame');
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .login-logo
    width: 3rem
    height: 3rem
    background: #10a78e
    margin 1rem auto .5rem
    color: #ffffff
    font-size .8rem
    border-radius : 90%
    overflow :hidden
    text-align: center
    line-height: 3rem

  .login-cont
    margin:1rem .8rem
    line-height :.4rem
    li
      border-bottom 1px solid #25a4bb
      height :1rem
      padding .3rem 0 0
      position : relative
      overflow: hidden
      input
        border:none
        line-height :.8rem
        width: 100%
        outline :none
    .submitButton
      background: #10a78e;
      color: #fff;
      border-radius: 1rem;
      height: 1rem;
      line-height: 1rem;
      font-size: .6rem;
      margin-top: 1rem;
      padding: 0;
      text-align: center;
      display: block;
    .errorInfo
      color: red
      padding-top :.3rem
  .copyright
    position: absolute;
    padding-top: 0;
    padding-left: 1.3rem;
    font-size: .3rem;
  .game
    position: relative
    display inline-block
    width: 6rem
    top -0.15rem
    left 0.3rem
  .game2
    position: relative
    display inline-block
    width: 1rem
    top -0.15rem
</style>
