<template>
  <div class="main">
    <el-switch
      v-model="isDark"
      class="mt-2"
      style="margin-left: 24px"
      inline-prompt
      @change="toggleDark"
    />
  </div>
</template>
<script setup>
// const { ref } = require("@vue/reactivity");
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)


</script>
<style lang="scss" scoped>
.main {
  position: fixed;
  top: 20px;
  left: 0;
  padding-right: 10px;
  border-top-right-radius: 21px;
  border-bottom-right-radius: 21px;
  box-shadow: 1px 0 5px 1px #333;
}
</style>