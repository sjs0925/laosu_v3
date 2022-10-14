<template>
  <div class="laosu-theme">
    <el-switch
      v-model="isDark"
      class="mt-2"
      inline-prompt
      :active-icon="Sunny"
      :inactive-icon="Moon"
      active-color="#dcdfe6"
      @change="toggleDark"
    />
  </div>
</template>
<script setup>
import { Sunny, Moon } from '@element-plus/icons-vue'
import { ref } from 'vue'

const isDark = ref(true)


</script>
<style lang="scss" scoped>
</style>