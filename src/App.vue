<template>
  <!-- <customConfig></customConfig> -->
  <router-view />
</template>

<script setup>
import customConfig from '@/components/custom-config'

</script>
<style>
html,
body {
  padding: 0;
  margin: 0;
}
#app {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
