//用户请求模块
import request from '@/Utils/request.js'

export const login=data=>{
    return request ({
        method: "POST",
        url:'v1_0/authorizations',
        data:data 
    })
}
//每分钟只可以发送一次
export const sendSms=mobile=>{
    return request ({
        method: "GET",
        url:`v1_0/sms/codes/${mobile}`,

    })
}
//获取用户信息
export const getuserinfo=()=>{
    return request ({
        method: "GET",
        url:"v1_0/user",
        //发送请求头数据
        // headers:{
        //     //该接口需要提供授权
        //     Authorization: `Bearer ${store.state.user.token}`
        // }

    })
}
//获取用户频道列表
export const getuserchannels=()=>{
    return request ({
        method: "GET",
        url:"v1_0/user/channels",
    })
}
