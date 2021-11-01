<template>
  <div class="user-profile">
      <van-nav-bar 
      title="个人资料"
       class="page-nav-bar" 
       left-arrow 
       @click-left="$router.back()" >
    </van-nav-bar>
    <input 
    type="file" 
    hidden 
    ref="file"
    accept="image/*"
    @change="onFileChange"
    >
<van-cell title="头像" is-link center @click="$refs.file.click()"><van-image
  width="30"
  height="30"
  round
  fit="cover"
  :src="userprofile.photo"
/></van-cell>
<van-cell @click="isnameshow=true" title="昵称" is-link :value="userprofile.name"></van-cell>
<van-cell @click="isgendershow=true" title="性别" is-link :value="userprofile.gender===0?'男':'女'"></van-cell>
<van-cell @click="isbirthdayshow=true" title="生日" is-link :value="userprofile.birthday"></van-cell>
<van-popup 
v-model="isnameshow" 
 position="bottom" 
:style="{ height: '100%' }"
 >
 <Undatename
  @close="isnameshow=false" 
  :userId="userprofile.name"
  @undate-name="userprofile.name=$event"
 />
</van-popup>
<!-- 修改性别 -->
<van-popup 
v-model="isgendershow" 
 position="bottom" 

 >
 <Undategender @close="isgendershow=false"
  :gender="userprofile.gender"
  @undate-gender="userprofile.gender=$event"
  />
 </van-popup>
 <!-- 修改生日 -->
 <van-popup 
v-model="isbirthdayshow" 
 position="bottom" 

 >
 <Undatebirthday @close="isbirthdayshow=false"
  :birthday="userprofile.birthday"
  @undate-birthday="userprofile.birthday=$event"
  />
 </van-popup>
 <!-- 修改头像-->
 <van-popup 
v-model="isphotoshow" 
 style="height: 100%"
 position="bottom" 
 >
<Undatephoto 
:file="previewimg"
@close="isphotoshow=false"
@undate-photo="userprofile.photo=$event"
></Undatephoto>
 </van-popup>
  </div>
</template>

<script>
import Undatephoto from './componets/undate-photo.vue'
import Undatename from './componets/undate-name.vue'
import Undatebirthday from './componets/undate-birthday.vue'
import Undategender from './componets/undate-gender.vue'
import {getuserprofiles} from '@/Api/user.js'
export default {
    components: {
        Undatename,
        Undategender,
        Undatebirthday,
        Undatephoto,
    },
    created(){
        this.loaduserprofile()
    },
    methods:{
       async loaduserprofile(){
           const {data} =await getuserprofiles()
        //    console.log(data.data);
           this.userprofile=data.data
        },
        onFileChange(){
                    
            const file= this.$refs.file.files[0]
               this.previewimg=file
            // console.log(file);
             this.isphotoshow=true
            this.$refs.file.value = ''

        }
        
    },

    data() {
        return {
            userprofile:{},//用户对象
            isnameshow:false,//编辑的显示状态
            isgendershow:false,//编辑性别的显示状态
            isbirthdayshow:false,//编辑圣体状态
            isphotoshow:false,//修改用户头像状态
            previewimg:null
        }
    },
}
</script>

<style lang="less" scoped>
    .van-popup{
        background-color:#f5f7f9
    }
</style>