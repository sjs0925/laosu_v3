<template>
  <!-- <CustomConfig></CustomConfig> -->
  <div class="laosu">
    <!-- 头部信息 -->
    <div class="laosu-header">
      <img
        class="laosu-img"
        src="@/assets/logo.png"
      />
      <el-button
        size="default"
        @click="loginOut"
      >登出</el-button>
    </div>
    <!-- 菜单及内容信息 -->
    <div class="laosu-container">
      <!-- 菜单 -->
      <div class="laosu-menu">
        <Menu
          ref="menuRef"
          :menuData='menu'
        ></Menu>
      </div>
      <!-- 网页主体 -->
      <div class="laosu-content">
        <!-- 面包屑 -->
        <Crumbs @handleMenu='handleMenu'></Crumbs>
        <div class="laosu-page">
          <router-view></router-view>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { reactive, ref, toRaw, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from "element-plus";
import { clearLocaStore, clearSessionStore, } from "../../util/localStorage";
import Menu from './menu'
import Crumbs from './crumbs'
import CustomConfig from './custom-config'

export default {
  components: {
    Menu,
    Crumbs,
    CustomConfig
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      menu: toRaw(store.getters.userMenu)
    })
    /**登出 */
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
    const menuRef = ref(null)
    const handleMenu = (openPath) => {
      menuRef.value.handleMenu(openPath)
    }

    return {
      ...toRefs(state),
      loginOut,
      handleMenu,
      menuRef,
    }
  }
}
</script>

<style lang="scss" scoped>
</style>