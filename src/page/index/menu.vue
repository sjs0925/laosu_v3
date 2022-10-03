<template>
  <el-menu
    :unique-opened='true'
    router
  >
    <template
      v-for="(item,index) of menu"
      :key="index"
    >
      <el-sub-menu
        v-if="item.children"
        :index="item.path"
      >
        <template #title>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item
          v-for="cItem of item.children"
          :key="cItem.path"
          :index="cItem.path"
          @click="handleMenu($event,cItem.name)"
        >
          <template #title>
            {{cItem.name}}
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item
        v-else
        :index="item.path"
        @click="handleMenu($event,item.name)"
      >
        <template #title>
          {{item.name}}
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    menuData: Array,
    default() {
      return []
    }
  },
  setup(props) {
    const store = useStore()

    const state = reactive({
      menu: props.menuData,

    })
    const handleMenu = (e, name) => {
      store.commit('setCrumbs',
        {
          path: e.index,
          name: name
        }
      )
    }
    return {
      ...toRefs(state),
      handleMenu,

    }
  }
}
</script>

<style lang="scss" scoped>
</style>