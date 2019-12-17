<template>
  <div class="list">
    <div class="phoneBook">
      <div class="title">A</div>
      <div class="item">
        <img src="../../assets/img/001.png" >
        <div class="content border-bottom">阿里巴巴A</div>
      </div>
    </div>
    <div class="phoneBook">
      <div class="title">B</div>
      <div class="item">
        <img src="../../assets/img/002.png" >
        <div class="content border-bottom">Bibi</div>
      </div>
      <div class="item">
        <img src="../../assets/img/003.png">
        <div class="content border-bottom">B哥</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "List"
  }
</script>

<style lang="stylus" scoped>

  @import "~@/assets/styles/varibles.styl"

  .border-bottom
    &:before
      border-color: $borderColor

  .list
    overflow: hidden
    position: absolute
    top: 1.58rem
    left: 0
    right: 0
    bottom: 0
    .title
      line-height: .54rem
      background: $bgColor
      padding-left: .2rem
      color: #666
      font-size: .26rem
    .item
      line-height: .76rem
      margin: .2rem
      img
        float: left
        width: .8rem
        height: .8rem
        border-radius: .2rem
      .content
        padding-left: 1rem
        font-size: .4rem
        padding-bottom: .3rem

</style>
