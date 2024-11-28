<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';

const email = ref('');
const password = ref('');
const { login } = useAuth();

const handleLogin = async () => {
  try {
    await login(email.value, password.value);
  } catch (error) {
    console.error('Error during login:', error);
    alert('Login failed. Please check your credentials and try again.');
  }
};
</script>
<template>
  <div class="login">
    <el-card class="w-1/3">
      <el-form @submit.prevent="handleLogin" label-position="top">
        <el-form-item label="Correo">
          <el-input v-model="email"  required />
        </el-form-item>
        <el-form-item label="Contraseña">
          <el-input v-model="password" type="password" required />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login {
  @apply flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-white;
}
</style>