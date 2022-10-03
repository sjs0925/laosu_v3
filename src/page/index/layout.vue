<template>
  <div class="laosu">
    <!-- 头部信息 -->
    <div class="laosu_header">
      <img
        class="laosu_img"
        src="@/assets/logo.png"
      />
      <el-button @click="loginOut">登出</el-button>
    </div>
    <!-- 菜单及内容信息 -->
    <div class="laosu_container">
      <!-- 菜单 -->
      <div class="laosu_menu">
        <Menu :menuData='menu'></Menu>
      </div>
      <!-- 网页主体 -->
      <div class="laosu_content">
        <!-- 面包屑 -->
        <Crumbs></Crumbs>
        <!-- 人有冲天之志，非运不能自通 -->

        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script>
import { reactive, toRaw, toRefs } from 'vue-demi'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Menu from './menu'
import Crumbs from './crumbs'

export default {
  components: {
    Menu,
    Crumbs
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      menu: toRaw(store.getters.userMenu)
    })

    const loginOut = () => {
      //存入登陆状态
      store.commit('setLoginState', false)
      //跳转
      router.replace('/login')
    }

    return {
      ...toRefs(state),
      loginOut,
    }
  }
}
</script>

<style lang="scss" scoped>
</style>