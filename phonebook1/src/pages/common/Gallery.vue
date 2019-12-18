<template>
    <div class="container" @click="handleClick">
      <div class="wrapper">
        <img :src="galleryImag"/>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Gallery",
        props:{
          galleryImag:String
        },
        methods:{
          handleClick(){
            this.$emit('hideGlleryClick')
          }
        }
    }
</script>

<style lang="stylus" scoped>
  .container
    z-index 4
    display flex
    position fixed
    background-color black
    align-items center
    left: 0
    right: 0
    top: 0
    bottom: 0
    .wrapper
      width 100%
      img
        width 100%
</style>
