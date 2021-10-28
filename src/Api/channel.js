//频道相关请求模块
import request from '@/Utils/request.js'




export const getAllchannels=()=>{
    return request ({
        method:"GET",
        url:"/v1_0/channels",
    })
}

export const adduserchannel=(data)=>{
    return request ({
        method:"PATCH",
        url:"/v1_0/user/channels",
        data:data
    })
}
//删除用户指定频道
export const deleteuserchannel=(channelId)=>{
    return request ({
        method:"DELETE",
        url:`/v1_0/user/channels${channelId}`,
        data:data
    })
}