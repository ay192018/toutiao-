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
//收藏文章
export const addcollect=(articleId)=>{
    return request ({
        method:"POST",
        url:"/v1_0/article/collections",
        data:{
            target:articleId
        }
    })
}
//取消收藏
export const deletecollect=(articleId)=>{
    return request ({
        method:"DELETE",
        url:`/v1_0/article/collections/${articleId}`,

    })
}
//收添加点赞
export const addLike=(articleId)=>{
    return request ({
        method:"POST",
        url:"/v1_0/article/likings",
        data:{
            target:articleId
        }
    })
}
//取消点赞
export const deleteLike=(articleId)=>{
    return request ({
        method:"DELETE",
        url:`/v1_0/article/likings/${articleId}`,

    })
}
