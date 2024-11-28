<script lang="ts" setup>
import MenuComponent from '@/components/MenuComponent.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <menu-component />
    </header>
    <main class="p-8 flex-grow">
      <router-view></router-view>
    </main>
  </div>
</template>