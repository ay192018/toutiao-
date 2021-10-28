//搜索請求模塊
import request from '@/Utils/request.js'

//獲取搜索聯想建議
export const  getsearchjianyi =q=>{
    return request({
        method: "GET",
        url:'/v1_0/suggestion',
        params:{
           q //聯想搜索關鍵詞
        }
        
    })
}
//获取搜索结果
export const  getsearchresult =params=>{
    return request({
        method: "GET",
        url:'/v1_0/search',
        params
    })
}