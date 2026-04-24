<template>
  <div class="flex flex-col h-screen bg-background">
    <AppNavbar />
    <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background max-w-7xl mx-auto w-full">
      <slot />
    </main>
  </div>
</template>

<script setup>
import AppNavbar from './AppNavbar.vue'
</script>
