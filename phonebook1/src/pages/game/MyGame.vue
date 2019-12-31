<template>
    <div class="mygame">
      <label>
        <input type="checkbox" />
        <div class="card">
          <div class="front">Front</div>
          <div class="back" @click="goback">Back</div>
        </div>
      </label>
      <transition name="fade">
        <div v-if="show">hello world</div>
      </transition>

      <button @click="handleClick">toggle</button>
    </div>
</template>

<script>
    export default {
      name: "mygame",
      data(){
        return{
          show:true
        }
      },
      methods:{
        goback(){
          this.$router.back();
        },
        handleClick: function(){
          this.show = !this.show;
        }

      }
    }
</script>

<style scoped>
  .fade-enter{
    opacity: 0;
  }
  .fade-enter-active{
    transition: opacity 1s;
  }
  .fade-leave-to{
    opacity: 0;
  }
  .fade-leave-active{
    transition: opacity 1s;
  }
  .mygame{
    height: 16.4rem;
    background: #ff7171;
    font-size: 50px;
    color: #222;
  }

  label {
    -webkit-perspective: 1000px;
    perspective: 1000px;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    display: block;
    width: 300px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  .card {
    position: relative;
    height: 100%;
    width: 100%;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transition: all 600ms;
    transition: all 600ms;
    z-index: 20;
  }

  .card div {
    position: absolute;
    height: 100%;
    width: 100%;
    background: #FFF;
    text-align: center;
    line-height: 200px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 2px;
  }

  .card .back {
    background: #222;
    color: #FFF;
    -webkit-transform: rotateX(180deg);
    transform: rotateX(180deg);
  }

  label:hover .card {
    -webkit-transform: rotateX(20deg);
    transform: rotateX(20deg);
    box-shadow: 0 20px 20px rgba(50, 50, 50, 0.2);
  }

  input {
    display: none;
  }

  :checked + .card {
    transform: rotateX(180deg);
    -webkit-transform: rotateX(180deg);
  }

  label:hover :checked + .card {
    transform: rotateX(160deg);
    -webkit-transform: rotateX(160deg);
    box-shadow: 0 20px 20px rgba(255, 255, 255, 0.2);
  }
</style>
