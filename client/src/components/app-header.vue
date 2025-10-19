<template>
  <el-header>
    <el-row>
      <el-col :span="24">
        <el-button circle @click="toggleDark()">
          <Sunny style="width: 1em; height: 1em;" v-if="!isDark" />
          <Moon style="width: 1em; height: 1em;" v-else />
        </el-button>
      </el-col>
    </el-row>
  </el-header>
</template>

<script setup lang="ts">
import { useToggle, useDark } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
}
</style>
