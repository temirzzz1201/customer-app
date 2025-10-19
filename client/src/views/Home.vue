<template>
  <div class="auth-container">
    <div class="auth-header">
      <img :src="appIcon" width="60px" alt="App Icon" />
      <h3>{{ isRegister ? "Регистрация" : "Добро пожаловать" }}</h3>
      <p>
        {{
          isRegister
            ? "Создайте новый аккаунт, чтобы начать"
            : "Войдите в свой аккаунт"
        }}
      </p>
    </div>

    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      class="auth-form"
    >
      <template v-if="isRegister">
        <el-form-item label="Ваше имя" prop="name">
          <el-input v-model="form.name" placeholder="Введите имя" />
        </el-form-item>
      </template>

      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="Введите email" />
      </el-form-item>

      <template v-if="isRegister">
        <el-form-item label="Телефон" prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="+7 999 999 99 99"
            maxlength="18"
          />
        </el-form-item>
      </template>

      <el-form-item label="Пароль" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="Введите пароль"
        />
      </el-form-item>

      <template v-if="isRegister">
        <el-form-item label="Подтверждение пароля" prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="Повторите пароль"
          />
        </el-form-item>

        <el-form-item label="Ваша роль" prop="role">
          <el-select v-model="form.role" placeholder="Выберите роль">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="form.role === 'provider'"
          label="Адрес оказания услуги"
          prop="address"
        >
          <el-input
            v-model="form.address"
            placeholder="Введите адрес (если исполнитель)"
          />
        </el-form-item>
      </template>

      <el-button
        type="primary"
        round
        size="large"
        class="w-full"
        @click="onSubmit(formRef)"
        :loading="loading"
      >
        {{ isRegister ? "Зарегистрироваться" : "Войти" }}
      </el-button>

      <p class="auth-form__links">
        {{ isRegister ? "Уже есть аккаунт?" : "Нет аккаунта?" }}
        <el-link type="info" @click="toggleMode" class="auth-form__links-link">
          {{ isRegister ? " Войти" : " Зарегистрироваться" }}
        </el-link>
      </p>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import axios from "axios";
import { clientUrl } from "../utils/constants";
import appIcon from "../assets/icon.png";

const isRegister = ref(false);
const formRef = ref<FormInstance>();
const loading = ref(false);
const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "",
  address: "",
});

const options = [
  { value: "client", label: "Заказчик" },
  { value: "provider", label: "Исполнитель" },
];

const phoneRegex = /^(\+?\d{1,3}[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "Введите имя", trigger: "blur" },
    {
      min: 4,
      message: "Имя должно содержать не менее 4 символов",
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "Введите email", trigger: "blur" },
    { type: "email", message: "Введите корректный email", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "Введите номер телефона", trigger: "blur" },
    {
      pattern: phoneRegex,
      message: "Введите корректный номер телефона",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "Введите пароль", trigger: "blur" },
    {
      min: 6,
      message: "Пароль должен быть не менее 6 символов",
      trigger: "blur",
    },
  ],
  confirmPassword: [
    { required: true, message: "Подтвердите пароль", trigger: "blur" },
    {
      validator: (_, value, callback) => {
        if (value !== form.password) callback(new Error("Пароли не совпадают"));
        else callback();
      },
      trigger: "blur",
    },
  ],
  role: [{ required: true, message: "Выберите роль", trigger: "change" }],
  address: [
    {
      validator: (_, value, callback) => {
        if (form.role === "provider" && !value)
          callback(new Error("Введите адрес оказания услуги"));
        else callback();
      },
      trigger: "blur",
    },
  ],
});

const toggleMode = () => {
  isRegister.value = !isRegister.value;
  (Object.keys(form) as (keyof typeof form)[]).forEach((key) => {
    form[key] = "" as any;
  });
};

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (!valid) {
      ElMessage.warning("Проверьте правильность заполнения полей");
      return;
    }

    loading.value = true;
    try {
      if (isRegister.value) {
        const payload = {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: form.role,
          address: form.address || null,
        };

        const res = await axios.post(
          `${clientUrl}/auth/register`,

          payload
        );
        localStorage.setItem("token", res.data.access_token);
        router.push("/profile");

        ElMessage.success("Регистрация успешна!");
      } else {
        const payload = {
          email: form.email,
          password: form.password,
        };

        const res = await axios.post(`${clientUrl}/auth/login`, payload);
        localStorage.setItem("token", res.data.access_token);
        router.push("/profile");
        ElMessage.success("Вход выполнен!");
      }

      formEl.resetFields();
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Произошла ошибка при запросе";
      ElMessage.error(msg);
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth-header {
  text-align: center;
  margin-bottom: 1rem;
}

.auth-header h3 {
  margin: 5px 0;
}

.auth-header p {
  font-size: 0.9rem;
}

.auth-form {
  width: 100%;
  max-width: 360px;
  padding: 1rem;
  border-radius: 20px;
  box-shadow: var(--el-box-shadow-light);
  transition: background 0.3s ease;
}

.auth-form__links {
  display: flex;
  align-items: center;
  margin-top: 25px;
}

.auth-form__links-link {
  margin-bottom: 2px;
  padding-left: 5px;
  color: violet;
}

.w-full {
  width: 100%;
}
</style>
