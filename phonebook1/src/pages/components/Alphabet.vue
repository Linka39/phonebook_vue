<template>
    <ul class="list">
      <li class="item"
          @click="handleLetterClick"
          v-for="(item,key) of letters">{{item}}</li>
    </ul>
</template>

<script>
    export default {
        name: "Alphabet",
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
          }
        }
    }
</script>

<style lang="stylus" scoped>
  .list
    display :flex
    flex-direction column
    justify-content center
    position absolute
    top:1.58rem
    right 0
    bottom: 0
    width: .4rem;
    .item
      line-height .4rem
      text-align center
</style>
