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
        Copyright © 2012-2019 <a href="https://i-tiny-leo.github.io/" target="_blank"> &nbsp;&nbsp;I-tiny-leo</a></p>
    </div>
</template>

<script>
  import axios from 'axios'
  import {getServerUrl} from "../config/sys";

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
                  console.log(res.data.token);
                  window.localStorage.setItem("token",res.data.token);
                  this.$router.replace('/phoneBook');
                }
              }).catch(error=>{
                this.errorInfo=error;
            })
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
    padding-left: 1.7rem;
    font-size: .3rem;
</style>
