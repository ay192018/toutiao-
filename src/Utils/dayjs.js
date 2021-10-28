import Vue from 'vue'
import dayjs from   'dayjs'
//dayjs默认是英文 这个是加载中文
import 'dayjs/locale/zh-hk'
import relativeTime from 'dayjs/plugin/relativeTime'
//配置使用处理相对时间的插件
dayjs.extend(relativeTime)
dayjs.locale('zh-hk')
//获取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD'));
Vue.filter('relativeTime',value=>{
return dayjs().to(dayjs(value))
})