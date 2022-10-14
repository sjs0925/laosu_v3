<template>
  <div class="demo-collapse">
    <el-collapse
      v-model="activeName"
      accordion
    >
    </el-collapse>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeName = ref("");
</script>