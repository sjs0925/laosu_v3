<template>
  <div class="laosu">
    <!-- 头部信息 -->
    <div class="laosu_header">
      <img
        class="laosu_img"
        src="@/assets/logo.png"
      />
      <el-button
        size="default"
        @click="loginOut"
      >登出</el-button>
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
import { ElMessage, ElMessageBox } from "element-plus";
import { clearLocaStore, clearSessionStore, } from "../../util/localStorage";
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
      ElMessageBox.confirm("是否确认退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ElMessage.info("您已登出系统，期待下次再来");
          //清空所有本地缓存
          clearSessionStore();
          clearLocaStore()
          //跳转
          router.replace('/login')
        })
        .catch(() => {
          ElMessage.info("已取消登出");
        });

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