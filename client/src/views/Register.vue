<template>
  <el-container>
    <el-row>
      <el-col>
        <el-text class="mx-3" size="large">Зарегестрироваться</el-text>
        <app-form />
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup lang="ts">
import appForm from "../components/app-form.vue";
</script>
