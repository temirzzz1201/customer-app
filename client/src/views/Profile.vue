<template>
  <el-container class="app-container">
    <!-- Верхний бар -->
    <el-header class="header">
      <span class="app-title">CustomerApp</span>
      <el-avatar icon="UserFilled" />
    </el-header>

    <el-row>
      <el-button @click="logout(router)">Выйти</el-button>
    </el-row>
    <!-- Основной контент -->
    <el-main class="main">
      <h2 class="greeting">Добро пожаловать 👋</h2>

      <div class="actions">
        <el-button type="primary" round size="large" icon="Search"
          >Поиск услуг</el-button
        >
        <el-button type="success" round size="large" icon="Calendar"
          >Мои заказы</el-button
        >
        <el-button type="info" round size="large" icon="ChatDotRound"
          >Сообщения</el-button
        >
      </div>
    </el-main>

    <!-- Нижняя панель -->
    <el-footer class="footer">
      <el-row justify="space-around">
        <el-button text icon="HomeFilled"></el-button>
        <el-button text icon="BellFilled"></el-button>
        <el-button text icon="UserFilled"></el-button>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuth } from "../composibles/useAuth";
import { useRouter } from "vue-router";

const router = useRouter();

const { user, fetchProfile, logout } = useAuth();

onMounted(async () => {
  if (!user.value) await fetchProfile();
});
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: transparent;
}

.app-title {
  font-weight: 600;
  font-size: 1.2rem;
  color: #1f2d3d;
}

.greeting {
  text-align: center;
  margin-top: 2rem;
  color: #1f2d3d;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem;
}

.footer {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  padding: 0.5rem 0;
  margin-top: auto;
}
</style>
