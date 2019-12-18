<template>
    <div class="detail">
      <div class="header">
        <router-link tag="div" to="/phoneBook" class="iconfont back-icon">&#xe606;</router-link>
      </div>
      <div class="image">
        <div class="info">
          <img :src="getImageUrl(phoneBooks.image)" alt="头像" @click="showGalleryClick">
        </div>
        <div class="action">
          <button @click="imageClick">修改头像</button>
          <input type="file" name="file" accept="image/png,image/gif,image/jpeg,image/jpg" ref="file" @change="upload">
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

      <gallery v-show="showGallery"
               :galleryImag="galleryImag"
                @hideGlleryClick="hideGlleryClick"></gallery>
    </div>
</template>

<script>
    import axios from 'axios'
    import {getServerUrl} from "../../config/sys"
    import Gallery from '@/pages/common/Gallery'

    export default{
        name: "Add",
        data(){
          return{
            phoneBooks:{image:'010.png'},
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
            this.galleryImag=this.getImageUrl(this.phoneBooks.image);
            this.showGallery=true
          },
          hideGlleryClick(){
            this.showGallery=false
          },
          upload(e){
            //event.target表示直接接受事件的dom对象,此为获取多选文件的第一个
            let file =  e.target.files[0];
            //定义form数据
            let param=new FormData();
            //添加数据传输给后台  （名字，数据）
            param.append('file',file,file.name);
            /*param.append('test','liuly');
            console.log(param);
            console.log(param.get('test'));*/

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
                  this.phoneBooks.image= res.data.data.title;
                }
              }).catch(error=>{
              this.errorInfo=error;
            })
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
