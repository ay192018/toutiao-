<template>
  <div class="undate-birthday">
      <van-datetime-picker
  v-model="currentDate"
  type="date"
  title="选择生日"
  :min-date="minDate"
  :max-date="maxDate"
  @cancel="$emit('close')"
  @confirm="onConfirm"
/>
  </div>
</template>

<script>
import {changeuserbirthday} from '@/Api/user.js'
import dayjs from 'dayjs'
export default {
name:"undatebirthday",
 data() {
    return {
      minDate: new Date(1900, 4, 20),
      maxDate: new Date(),
      currentDate: new Date(this.birthday),
    };
  },
  props:{
      birthday:{
          type:String,
          required:true,
      }
  },
  methods: {
      async onConfirm(){
        // console.log('onConfirm');
          this.$toast.loading({
           message: "保存中",
           forbidClick:true
       })
    //    const date =`${this.currentDate.getFullYear()}
    //    -${this.currentDate.getMonth()+1}-${this.currentDate.getDate()}`
            //请求提交更新用户生日
            const date =dayjs(this.currentDate).format('YYYY-MM-DD')
            await changeuserbirthday({
            birthday:date,
        })
        //更新成功 覆盖父组件的name 、
        this.$toast.success('保存成功')
        //关闭弹出层
        this.$emit("undate-birthday",date)
        this.$emit('close')
  }
}
}
</script>

<style>

</style>