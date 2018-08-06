<template>
  <div class="app-wrapper">
    <router-view class="r-box"></router-view>
  </div>
</template>

<script>
  import util from './../src/utils/util.js';
  export default {
    name: 'App',
    data() {
      return {
        tabShow: false 
      }
    },
    components: {
    },
    beforeCreate() {
      util.initIconFont();
    },
    created() {
    },
    methods: {
      // onTabTo(_result) {
      //   let _key = _result.data.key || '';
      //   console.log('tag', _key)
      //   this.$router && this.$router.push('/' + _key)
      // }
    }
  }
</script>

<style scoped>
  .app-wrapper {
    background-color: #ffffff;
  }
  .r-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
