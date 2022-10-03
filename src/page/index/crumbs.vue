<template>
  <div class="laosu_crumbs">
    <el-tag
      class="laosu_crumbs_item"
      @click="handleJump('/')"
    >首页</el-tag>
    <el-tag
      class="laosu_crumbs_item"
      closable
      v-for="(item ,index) in crumbsList"
      :key="index"
      @close='handleClose(item.path)'
      @click="handleJump(item.path)"
    >{{item.name}}</el-tag>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const state = reactive({
      crumbsList: store.getters.crumbs
    })

    const handleClose = (path) => {
      store.commit('delCrumbs', path)
      state.crumbsList = store.getters.crumbs
    }

    const handleJump = path => {
      router.push(path)
    }

    return {
      ...toRefs(state),
      handleClose,
      handleJump
    }
  }
}
</script>

<style lang="scss" scoped>
</style>