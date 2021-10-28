
<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon name="cross" slot="left" @click="$router.back()" />
    </van-nav-bar>

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginRef">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao icon-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="剩余ss s"
            v-if="iskowmshow"
            @finish="iskowmshow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            size="small"
            type="primary"
            @click="onSendSms"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" color="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/Api/user.js";
export default {
  name: "loginIndex",
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      iskowmshow: false,
    };
  },
  methods: {
    async onSubmit() {
      //获取表单数据
      //表单验证
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //为0则一直展示登录状态
      });
      //提交表单请求登录
      //根据七扭去响应结果处理后续操作
      const user = this.user;
      try {
        const { data } = await login(this.user);
        console.log(data);
        this.$store.commit("setUser", data.data);
        this.$toast.success("登录成功");
        //登陆成功，跳转原来界面
        this.$router.back();
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或者验证码错误");
        } else {
          this.$toast.fail("登录失败，请稍后再试");
        }
      }
    },
    async onSendSms() {
      try {
        await this.$refs.loginRef.validate("mobile");
        console.log("验证通过");
      } catch (err) {
        console.log("验证失败", err);
        return;
      }
      this.iskowmshow = true;
      //校验手机号
      //验证通过 显示倒计时
      //请求发送验证码
      try {
        const res = await sendSms(this.user.mobile);
      } catch (err) {
        this.iskowmshow = false;
        //发送失败关闭倒计时
        if (err.response.status === 429) {
          this.$toast("发送太频繁了,过一会儿在试试叭");
        }
      }
    },
  },
};
</script>

<style lang="less">
.login-container {
  .toutiao {
    font-size: 0.8rem;
  }
  .send-sms-btn {
    border-radius: 0.5rem;
  }
  .login-btn-wrap {
    padding: 0.8rem 0.66rem;
    .login-btn {
      background: #6db4fb;
      border: none;
    }
  }
}
