<template>
  <div class="container" v-if="showDialog">
    <div class="jxsg-dialog-wrap" :style="{height: pageHeight+'px'}">
      <div class="jxsg-dialog">
        <div class="jxsg-dialog-hd"></div>
        <div class="jxsg-dialog-bd">
          <text class="jxsg-dialog-text">{{maskContent}}</text>
        </div>
        <div class="jxsg-dialog-ft">
          <template v-if="type === 'alert'">
            <slot name="dialog-sure">
              <text class="jxsg-dialog-btn sure row-col" @click="cancelFunc">{{maskSureBtnText}}</text>
            </slot>
          </template> 
          <template v-else-if="type === 'confirm'">
            <slot name="dialog-cancel">
              <text class="jxsg-dialog-btn cancel row-col" @click="cancelFunc">{{maskCancelBtnText}}</text>
            </slot>
            <div class="line"></div>
            <slot name="dialog-confirm">
              <text class="jxsg-dialog-btn confirm row-col" @click="confirmFunc">{{maskSureBtnText}}</text>
            </slot>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'JxsgDialog',
    data() {
      return {
        maskContent: this.content,
        maskSureBtnText: this.sureBtnText,
        maskCancelBtnText: this.cancelBtnText,
        type: this.maskType,
        pageHeight: 1334
      }
    },
    props:{
      content:{
        type: String,
        default: '内容文字'
      },
      sureBtnText:{
        type: String,
        default: '确定'
      },
      cancelBtnText:{
        type: String,
        default: '取消'
      },
      maskType:{
        type: String,
        default: 'confirm'
      },
      showDialog:{
        type: Boolean,
        default: false
      },
    },
    methods: {
      cancelFunc () {
        let self = this;
        this.show = false;
        this.$emit('jxsgDialogCancelBtnClicked', {
          type: 'confirmcancel'
        });
      },
      confirmFunc (e) {
        this.show = false;
        this.$emit('jxsgDialogConfirmBtnClicked', {
          type: 'confirm'
        });
      },
    },
    created() {
      const { env: { deviceHeight, deviceWidth } } = weex.config;
      this.pageHeight = deviceHeight / deviceWidth * 750;
    },
  }
</script>

<style scoped>
  .container {
    position: fixed;
    left:0;
    top:0;
    width: 750px;
    /*兼容H5异常*/
    z-index: 99999;
  }
  .jxsg-dialog-wrap {
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    justify-content: center;
    align-items: center;
  }
  .jxsg-dialog-text {
    color: #333;
    font-size: .4rem;
    display: table-cell;
    vertical-align: middle;
  }
  .fade-enter-active {
    transition: all 0.5s;
  }
  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter {
    opacity: 0;
  }
  .fade-leave-to {
    opacity: 0;
  }
  .jxsg-dialog{
    width: 590px;
    min-height: 290px;
    background-color: #fff;
    border-radius: 20px;
    align-items: center;
  }
  .jxsg-dialog-bd{
    padding: 60px 79px 45px 79px;
  }
  .jxsg-dialog-text{
    font-size: 36px;
    font-weight: bold;
    color: #414141;
    text-align: center;
  }
  .jxsg-dialog-ft{
    flex-direction: row;
    width: 590px;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: #efefef;
  }
  .jxsg-dialog-btn{
    box-sizing: border-box;
    font-size: 32px;
    color: #414141;
  }
  .line{
    width: 0;
    height: 90px;
    border-right-style: solid;
    border-right-width: 1px;
    border-right-color: #efefef;
  }
  .row-col {
    height: 90px;
    line-height: 90px;
		flex: 1;
		justify-content: center;
    align-items: center;
    text-align: center;
	}
  .confirm{
    color: #fb3180;
  }
  .cancel{
    color: #414141;
  }
  .sure{
    color: #414141;
  }
</style>