<template>
  <el-config-provider size="large">
    <div class="page-center ">
      <div class="page-content container-shadow">
        <el-form :model="form">
          <el-form-item
            label='姓名'
            prop='name'
          >
            <el-input
              v-model="form.name"
              clearable
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label='密码'
            prop='password'
          >
            <el-input
              v-model="form.password"
              clearable
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            class="w100"
            @click="login"
          > 登 录 </el-button>
        </el-form>
      </div>
    </div>
  </el-config-provider>
</template>
 <script>
import { reactive, toRefs } from 'vue-demi'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    let data = reactive({
      form: {
        name: '',
        password: ''
      }
    })

    /**登录 */
    const login = () => {
      //存入登陆状态
      store.commit('setLoginState', true)
      
      //存入用户菜单
      store.commit('setUserMenu', router.options.routes.filter(item => item.path !== '/login').map(item => {
        return {
          name: item.name,
          path: item.path,
          children: item.children
        }
      }))
      //跳转
      router.replace('/')
    }


    return {
      ...toRefs(data),
      login
    }
  }



}
</script>
<style  lang="scss" scoped>
.page {
  &-center {
    width: 100%;
    height: 100%;
  }
  &-content {
    width: 500px;
    padding: 20px;
    border-radius: 5px;
  }
}
</style>