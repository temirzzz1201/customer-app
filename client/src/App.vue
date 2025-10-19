<script setup lang="ts">
import appFooter from "./components/app-footer.vue";
import appHeader from "./components/app-header.vue";
</script>

<template>
  <div class="common-layout">
    <app-header />
    <el-main>
      <router-view />
    </el-main>
    <app-footer />
  </div>
</template>

<style scoped>
.common-layout {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
