import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import './Utils/dayjs.js'
//加载vant组件库
import 'vant/lib/index.css'
//注册组件库
Vue.use(Vant);

//加载全局样式
import "./styles/index.less"
// import './styles/icon.less'
//动态设置rem基准值
import "amfe-flexible"
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


