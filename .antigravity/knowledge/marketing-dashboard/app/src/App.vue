<template>
  <LicenseGate>
    <AppLayout>
      <RouterView />
    </AppLayout>
  </LicenseGate>
</template>

<script setup>
import AppLayout from './components/layout/AppLayout.vue'
import LicenseGate from './components/layout/LicenseGate.vue'
</script>
