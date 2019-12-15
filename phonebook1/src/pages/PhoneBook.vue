<template>
    <div>电话簿主页</div>
</template>

<script>
  import axios from 'axios'
  import {getServerUrl} from "../config/sys";

    export default {
      name: "PhoneBook",
      methods:{
        getPhoneBooks(){
          let token = window.localStorage.getItem("token");
          axios.defaults.headers.common['token']=token;
          let url = getServerUrl("phoneBook/loadAll");
          axios.get(url)
            .then(res=>{
              console.log(res);
            }).catch(error=>{
            console.log(error);
          })
        }
      },
      mounted() {
        this.getPhoneBooks(); //加载所有电话簿信息
      }
    }
</script>

<style scoped>

</style>
