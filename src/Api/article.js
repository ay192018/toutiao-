import request from '@/Utils/request.js'



//请求获取文章列表

export const getarticles=(params)=>{
    return request ({
        method:"GET",
        url:"v1_0/articles",
        params:params
    })
}
//获取文章详情
export const getarticlebyId=(articleId)=>{
    return request ({
        method:"GET",
        url:`/v1_0/articles/${articleId}`,

    })
}
