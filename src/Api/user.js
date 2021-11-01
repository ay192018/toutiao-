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
export const getuserchannels=(userId)=>{
    return request ({
        method: "GET",
        url:"v1_0/user/channels",
        data:{
            target:userId
        }
    })
}
//关注用户
export const addFollow=(userId)=>{
    return request ({
        method: "DELETE",
        url:`/v1_0/user/followings/${userId}`,
    })
}
//取消关注
export const deleteFollow=()=>{
    return request ({
        method: "GET",
        url:"v1_0/user/channels",
    })
}
//用户资料
export const getuserprofiles=()=>{
    return request ({
        method: "GET",
        url:"/v1_0/user/profile",
    })
}
//编辑用户个人资料
export const changeusername=(name)=>{
    return request ({
        method: "PATCH",
        url:"/v1_0/user/profile",
        name
    })
}
//用户生日修改
export const changeuserbirthday=(name)=>{
    return request ({
        method: "PATCH",
        url:"/v1_0/user/profile",
        name
    })
}
//修改用户资料
export const changeuserphoto=(data)=>{
    return request ({
        method: "PATCH",
        url:"/v1_0/user/photo",
        data
    })
}
