<template>
  <div class="detail">
    <div class="header">
      <router-link tag="div" to="/phoneBook" class="iconfont back-icon">&#xe606;</router-link>
    </div>
    <div class="image">
      <div class="info">
        <img :src="getImageUrl(phoneBook.image)" alt="头像" @click="showGalleryClick">
      </div>
      <div class="action">
        <button @click="imageClick">修改头像</button>
        <input type="file" name="file" accept="image/png,image/gif,image/jpeg,image/jpg" ref="file" @change="upload">
      </div>
    </div>

    <div class="userInfo">
      <div class="item border-bottom">
        <span>姓名</span>
        <input type="text" v-model="phoneBook.name">
      </div>
      <div class="item border-bottom">
        <span>手机号码</span>
        <input type="text" v-model="phoneBook.phoneNumber">
      </div>
      <div class="item border-bottom">
        <span>座机电话号码</span>
        <input type="text" v-model="phoneBook.teleNumber">
      </div>
      <div class="item border-bottom">
        <span>工作单位地址</span>
        <textarea v-model="phoneBook.workAddress"></textarea>
      </div>
      <div class="item border-bottom">
        <span>家庭地址</span>
        <textarea v-model="phoneBook.homeAddress"></textarea>
      </div>
      <div class="item border-bottom">
        <span>备注</span>
        <textarea v-model="phoneBook.remark"></textarea>
      </div>
    </div>

    <div class="action">
      <div class="item border-bottom">
        <a @click="updateInfo">保存修改</a>
      </div>
    </div>

    <gallery v-show="showGallery"
             :galleryImag="galleryImag"
             @hideGlleryClick="hideGlleryClick"></gallery>
  </div>
</template>

<script>
  import axios from 'axios'
  import {getServerUrl} from "../../config/sys"
  import Gallery from '@/pages/common/Gallery'
  import Pubsub from 'pubsub-js'

  export default{
    name: "Detail",
    data(){
      return{
        phoneBook:{image:'010.png'},
        showGallery:false,
        galleryImag:''
      }
    },
    components:{
      Gallery
    },
    methods:{
      getImageUrl(image){
        return getServerUrl('image/'+image);
      },
      imageClick(){
        //关联操作标签对象,触发点击事件
        this.$refs.file.click();
      },
      showGalleryClick(){
        this.galleryImag=this.getImageUrl(this.phoneBook.image);
        this.showGallery=true
      },
      hideGlleryClick(){
        this.showGallery=false
      },
      updateInfo(){
        let url=getServerUrl('phoneBook/save');
        let token=window.localStorage.getItem('token')
        axios.defaults.headers.common['token'] = token;
        if(this.phoneBook.name==null || this.phoneBook.name.trim()==''){
          alert("姓名不能为空！");
          return;
        }
        if(this.phoneBook.phoneNumber==null || this.phoneBook.phoneNumber.trim()==''){
          alert("手机号码不为空！")
          return;
        }
        if(!(/^1[3456789]\d{9}$/.test(this.phoneBook.phoneNumber))){
          alert("手机号码有误，请重填");
          return;
        }
        /*if(this.phoneBook.teleNumber!=null && this.phoneBook.teleNumber.trim()!='' && !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.phoneBook.teleNumber)){
          alert('固定电话有误，请重填');
          return false;
        }*/
        axios.post(url,
          {"id":this.phoneBook.id,
            "name":this.phoneBook.name,
            "phoneNumber":this.phoneBook.phoneNumber,
            "teleNumber":this.phoneBook.teleNumber,
            "workAddress":this.phoneBook.workAddress,
            "homeAddress":this.phoneBook.homeAddress,
            "image":this.phoneBook.image,
            "remark":this.phoneBook.remark,
            "image":this.phoneBook.image})
          .then(res=>{
            if(res.data.code==0){
              alert("修改成功");
              //用Pubsub进行方法回调，后面为回调函数的参数
              Pubsub.publish('refreshPhoneBook','');
              this.$router.replace('/phoneBook');
            }else{
              alert(res.data.msg)
            }
          }).catch(error=>{
          alert(error)
        })
      },
      upload(e){
        let file =  e.target.files[0];
        //定义form数据
        let param=new FormData();
        //添加数据传输给后台  （名字，数据）
        param.append('file',file,file.name);

        let token = window.localStorage.getItem("token");
        // axios.defaults.headers.common['token']=token;
        let url=getServerUrl("uploadImage");
        // multipart/form-data：指定传输数据为二进制数据，例如图片、mp3、文件
        let config={
          header:{"Content-Type":'multipart/form-data','token':token}
        }
        axios.post(url,param,config)
          .then(res=>{
            if(res.data.code==0){
              this.phoneBook.image= res.data.data.title;
            }
          }).catch(error=>{
          this.errorInfo=error;
        })
      },
      getInfo(){
        let url=getServerUrl('phoneBook/findById');
        let token=window.localStorage.getItem('token');
        axios.defaults.headers.common['token'] = token;
        //get请求要有params参数数组，前后端要保持参数名一致
        axios.get(url,{
          params:{
            id:this.$route.params.id
          }
        }).then(res=>{
            this.phoneBook=res.data.phoneBook;
          }).catch(error=>{
          alert(error)
        })
      }
    },
    mounted() {
      console.log(this.$route);
      this.getInfo();
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
