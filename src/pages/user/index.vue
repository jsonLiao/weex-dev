<template>
  <div class="wrapper">
       <text class="title">个人中心</text>
       <slider class="slider" interval="3000" @change="onchange">
         <div class="img-box" v-for="(img, idx) of imgList" :key="idx">
           <image class="imgs" resize="cover" :src="img.src"/>
           <text class="imgs-title">{{img.title}}</text>
         </div>
         <indicator class="indicator"></indicator>
       </slider>
       <div class="navi">
         <text class="jump-link" @click="jumpPage">跳到我的社群</text>
       </div>
  </div>
</template>

<script>
const navigator = weex.requireModule('navigator')
export default {
  components:{
    
  },
  data(){
    return {
      imgList: [
        { title: 'item A', src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
        { title: 'item B', src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'},
        { title: 'item C', src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'}
      ]
    }
  },
  created(){

  },
  methods:{
    onchange(e) {
      console.log(e.index)
    },
    jumpPage() {
      // navigator.push({
      //   url: '/store/my-group'
      // })
      this.$router.push(`/store/my-group`)
    }
  }
}
</script>

<style scoped>
.wrapper{
  justify-content:center;
}
.title{
  font-size: 100px;
  color: #41B883;
  text-align: center;
}
.slider {
  width: 700px;
  height: 500px;
  margin-left: 25px;
  margin-right: 25px;
}
.img-box {
  position: relative;
  width: 700px;
  height: 500px;
}
.imgs {
  width: 700px;
  height: 500px;
}
.indicator {
  position: absolute;
  left: 0;
  bottom: 80px;
  width: 700px;
  height: 30px;
  item-color: #222;
  item-selected-color: #fff;
  item-size: 30px;
}
.imgs-title {
  position: absolute;
  left: 50px;
  right: 50px;
  bottom: 30px;
  font-size: 32px;
  color: #fb3180;
}
</style>