<template>
  <div class="ai">
       <van-nav-bar 
       title="小爱同学"
        class="page-nav-bar" 
        left-arrow 
        @click-left="$router.back()"> 
    </van-nav-bar>
    <!-- 消息列表 -->
    <van-cell-group  class="messagelist">
  <van-cell title="单元格" />
  <van-cell title="单元格" />
  <van-cell title="单元格" />
  <van-cell title="单元格" />
  <van-cell title="单元格" />
  <van-cell title="单元格" />
  <van-cell title="单元格" />
  <van-cell title="单元格" />
  <van-cell title="单元格" />
  <van-cell title="单元格" />
  <van-cell title="单元格" />
  <van-cell title="单元格" />
  <van-cell title="单元格" />
  <van-cell title="单元格" />
  <van-cell title="单元格" />
</van-cell-group>

<!-- 聊天框 -->
<van-cell-group class="send-message">
  <van-field
    v-model="message"
    placeholder="请输入消息"
    :border="false"
    >  
  </van-field>
  <van-button size="small" type="primary">发送</van-button>
</van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
// 建立连接
// const socket=io('http://toutiao.itheima.net')
// socket.on('connect',function(){
//   console.log("连接建立成功了");
// })
// socket.on('disconnect',function(){
//   console.log("断开连接了");
// })
// console.log(io);
export default {
    name:'ai',
    data() {
      return {
        message:''
      }
    },
}
</script>
<style lang="less" scoped>
.messagelist{
  position: fixed;
  left: 0;
  right: 0;
  top: 0.7rem;
  bottom:0.6rem;
  overflow-y: auto;
}
  .send-message{
    position: fixed;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 0.2rem;
    align-items: center;

  }
</style>