<template>
    <div>
      <phone-book-header></phone-book-header>
      <phone-book-search></phone-book-search>
      <phone-book-list
        :letter="letter"
        :phoneBooks="phoneBooks"></phone-book-list>
      <phone-book-alphabet
        @change="handleLetterChange"
        :phoneBooks="phoneBooks"></phone-book-alphabet>
    </div>
</template>

<script>
  import axios from 'axios'
  import {getServerUrl} from "../config/sys";
  import PhoneBookHeader from "./components/Header"
  import PhoneBookSearch from "./components/Search"
  import PhoneBookList from "./components/List"
  import PhoneBookAlphabet from  "./components/Alphabet"

    export default {
      name: "PhoneBook",
      data(){
        return{
          phoneBooks:{},
          letter:''
        }
      },
      components:{
        PhoneBookHeader,
        PhoneBookSearch,
        PhoneBookList,
        PhoneBookAlphabet
      },
      methods:{
        refreshToken(){
          let token = window.localStorage.getItem("token");
          axios.defaults.headers.common['token']=token;
          let url = getServerUrl("refreshToken");
          axios.get(url)
            .then(res=>{
              console.log("token刷新："+res.data.token);
              window.localStorage.setItem("token",res.data.token);
            }).catch(error=>{
            console.log(error);
          })
        },
        getPhoneBooks(){
          let token = window.localStorage.getItem("token");
          axios.defaults.headers.common['token']=token;
          let url = getServerUrl("phoneBook/loadAll");
          axios.get(url)
            .then(res=>{
              console.log(res);
              this.phoneBooks=res.data.data;
            }).catch(error=>{
            console.log(error);
          })
        },
        handleLetterChange(letter){
          console.log("list组件传来的值为：" + letter);
          this.letter=letter;
        }
      },
      mounted() {
        setInterval(this.refreshToken,1000*60*10);//10分钟刷新一次
        this.getPhoneBooks(); //加载所有电话簿信息
      }
    }
</script>

<style scoped>

</style>
