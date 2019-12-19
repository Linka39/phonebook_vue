<template>
    <ul class="list">
      <li class="item"
          @click="handleLetterClick"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
          v-for="(item,key) of letters"
          :key="item"
          :ref="item">{{item}}</li>
    </ul>
</template>

<script>
    export default {
        name: "Alphabet",
        data(){
          return{
            touchStatus:false,
            startY:0,
            timer:''
          }
        },
        props:{
          phoneBooks:Object
        },
        computed:{
          letters(){
            const lettes=[];
            for (let i in this.phoneBooks){
              lettes.push(i)
            }
            //computed属性要在最后返回一个值
            return lettes;
          }
        },
        methods:{
          handleLetterClick(e){
            console.log(e.target.innerText);
            //子组件向父组件传值
            this.$emit("change",e.target.innerText);
          },
          handleTouchStart(){
            this.touchStatus=true;
            console.log("start");
          },
          handleTouchMove(e){
            console.log("move");
            //用setTimeout来进行性能优化
            if(this.timer){
              clearTimeout(this.timer);
            }
            this.timer=setTimeout(()=>{
              if(this.touchStatus){
                //offsetTop为dom元素距顶部高度
                const touchY=e.touches[0].clientY-79;
                console.log("startY:" + this.startY);
                //Math.floor(a) 对a进行向下取整
                const index=Math.floor((touchY-this.startY)/20);
                if(index >=0 && index<this.letters.length){
                  this.$emit("change",this.letters[index]);
                }
              }
            },14)
          },
          handleTouchEnd(){
            this.touchStatus=false;
            console.log("end");
          },
        },
      //dom挂载完，并且数据传输过来
      updated() {
        this.startY=this.$refs['A'][0].offsetTop;
      }
    }
</script>

<style lang="stylus" scoped>
  .list
    display :flex
    flex-direction column
    justify-content center
    position absolute
    top:3.8rem
    right 0
    bottom: 0
    width: .4rem;
    .item
      line-height .4rem
      text-align center
</style>
