/* weex initialized here, please do not move this line */
import router from './router'
import App from '@/App.vue'

import mixins from '@/mixins'
import Toast from '@/utils/toast'
import Vuex from 'vuex'

// register global mixins.
Vue.mixin(mixins)
Vue.use(Vuex)
Vue.use(Toast)
  
const store = new Vuex.Store({
  state: {
    flag: 0
  },
  mutations: {
    changeFlag (state, n) {
      state.flag = n
    }
  }

})

/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router, store}, App));
router.push('/');
//router.push('/');
