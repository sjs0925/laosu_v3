<template>
  <el-menu
    ref="menuRef"
    router
    :unique-opened='true'
    :default-active='activeIndex'
    :default-openeds='defaultOpenedsArray'
  >
    <template
      v-for="(item,index) of menu"
      :key="index"
    >
      <el-sub-menu
        v-if="item.children.length>1"
        :index="item.path"
      >
        <template #title>
          <span>{{item.name}}
          </span>
        </template>
        <el-menu-item
          v-for="cItem of item.children"
          :key="cItem.path"
          :index="cItem.path"
          @click="openPage($event,cItem.name)"
        >
          <template #title>
            {{cItem.name}}
          </template>
        </el-menu-item>
      </el-sub-menu>


      <el-menu-item
        v-else
        :index="item.path"
        @click="openPage($event,item.name)"
      >
        <template #title>
          {{item.name}}
        </template>
      </el-menu-item>




    </template>
  </el-menu>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
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
    const menuRef = ref(null)
    const state = reactive({
      menu: props.menuData,
      activeIndex: '',
      defaultOpenedsArray: []

    })
    /**打开指定页面 */
    const openPage = (e, name) => {
      store.commit('setCrumbs',
        {
          path: e.index,
          name: name
        }
      )
    }
    /**自动 打开/关闭 页面 */
    const handleMenu = (openPath) => {
      state.activeIndex = openPath
      if (openPath === '/') {
        // state.defaultOpenedsArray = ['/']
      }
    }
    return {
      ...toRefs(state),
      openPage,
      handleMenu,
      menuRef
    }
  }
}
</script>

<style lang="scss" scoped>
</style>