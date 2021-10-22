import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem} from '@/Utils/starage.js'
Vue.use(Vuex)
const token_key='toutiao_user'
export default new Vuex.Store({
  state: {
    //一个对象，存储当前用户信息(token等数据)
    // user:null
    user:getItem(token_key)
    
  },
  mutations: {
    setUser(state,data){
      state.user=data
        setItem(token_key,state.user)
      //为了防止刷新丢失数据， 我们需要吧数据备份到本地存储
      // window.localStorage.setItem(token_key,JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
