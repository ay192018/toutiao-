
<template>
  <div class="home-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image round fit="cover" class="avatar" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 已登录头部 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" class="mobile-img" />
        <span class="text">登录/注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 导航 -->
    <!-- 消息通知 ，小爱同学 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小爱同学" is-link />
      <van-cell
        title="退出登录"
        class="lgout-cell"
        v-if="user"
        @click="onlogout"
        clickable
      />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getuserinfo } from "@/Api/user.js";
export default {
  name: "myIndex",
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    if (this.user) {
      this.loaduserinfo();
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async loaduserinfo() {
      try {
        const { data } = await getuserinfo();
        // console.log(data);
        this.userInfo = data.data;
      } catch (err) {
        this.$toast("获取数据失败");
      }
    },
    onlogout() {
      // console.log(1);
      //退出提示
      //确实退出：清除登录状态(容器中的user+本地存储中的user)
      this.$dialog
        .confirm({
          title: "你想退出吗",
        })
        .then(() => {
          // on confirm
          // console.log("确认会执行这里");
          // this.$router.push("/login");
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
          // console.log("取消会执行这里");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  .header {
    height: 4.8rem;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-content: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      .mobile-img {
        width: 2.8em;
        height: 1.8rem;
        margin-bottom: 0.12rem;
        margin-left: 0.1rem;
      }
      .text {
        font-size: 0.45rem;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 3.07rem;
      padding: 1.4rem 0.5rem 0.3rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 2.5em;
          height: 2.5em;
          margin-right: 0.3rem;
          border: 1px solid skyblue;
        }
        .name {
          font-size: 0.4rem;
          color: #fff;
        }
      }
    }
    .data-stats {
      // height: 1.73rem;
      display: flex;
      .data-item {
        height: 1.73rem;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 0.4rem;
        }
        .text {
          font-size: 0.4rem;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 2.6rem;
      i.toutiao {
        font-size: 0.75rem;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 0.4rem;
      }
    }
  }
  .lgout-cell {
    text-align: center;
    color: #e28c8c;
  }
}
</style>

