<script setup lang="ts">
import {
  Box,
  Document,
  SwitchButton
} from '@element-plus/icons-vue'
import router from '@/router'
import {useAuthStore} from "@/stores/authStore";
import {ref} from "vue";

const authStore = useAuthStore()

const routeMap: { [key: string]: string } = {
  '1': 'Projects',
  '2': 'Tasks',
}

const activeIndex = ref('1')

const handleSelect = async (key: string, keyPath: string[]) => {

  if (key === '3') {
    localStorage.removeItem('token')
    authStore.clearAuthData()
    await router.push('/login')
    return
  }

  const routeName = routeMap[key]

  if (routeName) {
    await router.push({name: routeName})
  } else {
    console.error(`No route found for key: ${key}`)
  }
}
</script>

<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo menu-style"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="1">
      <el-icon>
        <Box/>
      </el-icon>
      Proyectos
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon>
        <Document/>
      </el-icon>
      Tareas
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon>
        <SwitchButton />
      </el-icon>
      Salir
    </el-menu-item>
  </el-menu>
</template>

<style>
.menu-style {
  --el-menu-bg-color: #05557a;
  --el-menu-text-color: #fff;
  --el-menu-active-color: #73c2fb;
}
</style>