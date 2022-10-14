<template>
  <div class="laosu-crumbs">
    <el-tag
      class="laosu-crumbs-item"
      size="small"
      :effect="nowPath('/')?'dark':'light'"
      @click="handleJump('/')"
    >首页</el-tag>
    <el-tag
      class="laosu-crumbs-item"
      closable
      v-for="(item ,index) in crumbsList"
      size="small"
      :key="index"
      :effect="nowPath(item.path)?'dark':'light'"
      @close='handleClose(item.path)'
      @click="handleJump(item.path)"
    >{{item.name}}</el-tag>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup(props, { emit }) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      crumbsList: store.getters.crumbs
    })

    const nowPath = (data) => {
      return data === route.path

    }

    const handleClose = path => {
      store.commit('delCrumbs', path)
      state.crumbsList = store.getters.crumbs
      let crumbsLength = state.crumbsList.length
      let jumpPath
      if (crumbsLength === 0) {
        jumpPath = '/'
      } else {
        jumpPath = state.crumbsList[crumbsLength - 1].path
      }
      router.push(jumpPath)
      emit('handleMenu', jumpPath, path)
    }

    const handleJump = path => {
      router.push(path)
    }

    return {
      ...toRefs(state),
      handleClose,
      handleJump,
      nowPath
    }
  }
}
</script>

<style lang="scss" scoped>
</style>