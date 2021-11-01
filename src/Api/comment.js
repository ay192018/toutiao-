//文章评论相关请求模块
import request from '@/Utils/request.js'




export const getcomments=(params)=>{
    return request ({
        method:"GET",
        url:"/v1_0/comments",
        params
    })
}
//添加评论或者评论回复
export const addcomment=(data)=>{
    return request ({
        method:"POST",
        url:"/v1_0/comments",
        data
    })
}