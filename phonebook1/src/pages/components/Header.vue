<template>
  <div class="header">
    通讯录
    <div class="iconfont add-icon">&#xe6db;</div>
  </div>
</template>

<script>
    export default {
        name: "Head"
    }
</script>

<style lang="stylus" scoped>
  @import "~@/assets/styles/varibles.styl"
  .header
    position: relative;
    overflow: hidden;
    background: $bgColor;
    font-size: .48rem;
    font-weight: 400;
    text-align: center;
    height: .86rem;
    line-height: .86rem;
    .add-icon
      position fixed
      top 0rem
      right .45rem
      font-size .5rem
</style>
