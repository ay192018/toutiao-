// 请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store/index.js'
const request= axios.create({
    baseURL:'http://toutiao.itheima.net/',
    transformResponse:[function (data){
      try {
        return JSONbig.parse(data)
      } catch (err) {
        // console.log('转换失败',err);
        return data 
      }
    }]
})
//请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log(config);
    const { user}=store.state
    if(user&&user.token){
        config.headers.Authorization=`Bearer ${user.token}`
    }
    //务必返回token对象
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

//响应拦截器
export default request
