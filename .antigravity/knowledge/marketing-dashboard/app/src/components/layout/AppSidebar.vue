<template>
  <aside
    class="bg-surface border-r border-border flex flex-col transition-all duration-300 ease-in-out"
    :class="collapsed ? 'w-16' : 'w-64'"
  >
    <!-- Logo Section -->
    <div class="px-3 py-4 border-b border-border flex items-center" :class="collapsed ? 'justify-center' : 'justify-between'">
      <div class="flex items-center" :class="collapsed ? '' : 'space-x-3'">
        <img src="/ck-logo.png" alt="AntigravityKit" class="w-8 h-8 flex-shrink-0" />
        <h1 v-if="!collapsed" class="text-lg font-heading font-bold text-gradient whitespace-nowrap">AntigravityKit</h1>
      </div>
      <button
        v-if="!collapsed"
        @click="toggleSidebar"
        class="p-1.5 rounded-md hover:bg-surface-elevated transition-colors text-text-secondary hover:text-text-primary"
        :title="t('nav.collapseSidebar')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- Expand button when collapsed -->
    <button
      v-if="collapsed"
      @click="toggleSidebar"
      class="mx-auto mt-2 p-1.5 rounded-md hover:bg-surface-elevated transition-colors text-text-secondary hover:text-text-primary"
      :title="t('nav.expandSidebar')"
    >
      <svg class="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
      </svg>
    </button>

    <nav class="flex-1 px-2 py-4 space-y-1">
      <RouterLink
        to="/"
        class="flex items-center py-3 text-sm font-medium rounded-lg transition-colors"
        :class="[
          isActive('/') ? 'bg-secondary/10 text-secondary' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary',
          collapsed ? 'justify-center px-2' : 'px-4'
        ]"
        :title="collapsed ? t('nav.assets') : ''"
      >
        <svg class="w-5 h-5 flex-shrink-0" :class="collapsed ? '' : 'mr-3'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span v-if="!collapsed" class="whitespace-nowrap">{{ t('nav.assets') }}</span>
      </RouterLink>

      <RouterLink
        to="/content"
        class="flex items-center py-3 text-sm font-medium rounded-lg transition-colors"
        :class="[
          isActive('/content') ? 'bg-secondary/10 text-secondary' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary',
          collapsed ? 'justify-center px-2' : 'px-4'
        ]"
        :title="collapsed ? t('nav.contentHub') : ''"
      >
        <svg class="w-5 h-5 flex-shrink-0" :class="collapsed ? '' : 'mr-3'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <span v-if="!collapsed" class="whitespace-nowrap">{{ t('nav.contentHub') }}</span>
      </RouterLink>

      <RouterLink
        to="/brand"
        class="flex items-center py-3 text-sm font-medium rounded-lg transition-colors"
        :class="[
          isActive('/brand') ? 'bg-secondary/10 text-secondary' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary',
          collapsed ? 'justify-center px-2' : 'px-4'
        ]"
        :title="collapsed ? t('nav.brand') : ''"
      >
        <svg class="w-5 h-5 flex-shrink-0" :class="collapsed ? '' : 'mr-3'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
        <span v-if="!collapsed" class="whitespace-nowrap">{{ t('nav.brand') }}</span>
      </RouterLink>

      <RouterLink
        to="/docs"
        class="flex items-center py-3 text-sm font-medium rounded-lg transition-colors"
        :class="[
          route.path.startsWith('/docs') ? 'bg-secondary/10 text-secondary' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary',
          collapsed ? 'justify-center px-2' : 'px-4'
        ]"
        :title="collapsed ? t('nav.docs') : ''"
      >
        <svg class="w-5 h-5 flex-shrink-0" :class="collapsed ? '' : 'mr-3'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span v-if="!collapsed" class="whitespace-nowrap">{{ t('nav.docs') }}</span>
      </RouterLink>

      <RouterLink
        to="/settings"
        class="flex items-center py-3 text-sm font-medium rounded-lg transition-colors"
        :class="[
          isActive('/settings') ? 'bg-secondary/10 text-secondary' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary',
          collapsed ? 'justify-center px-2' : 'px-4'
        ]"
        :title="collapsed ? t('nav.settings') : ''"
      >
        <svg class="w-5 h-5 flex-shrink-0" :class="collapsed ? '' : 'mr-3'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span v-if="!collapsed" class="whitespace-nowrap">{{ t('nav.settings') }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const STORAGE_KEY = 'sidebar-collapsed'

const route = useRoute()
const { t } = useI18n()
const collapsed = ref(localStorage.getItem(STORAGE_KEY) === 'true')

function isActive(path) {
  return route.path === path
}

function toggleSidebar() {
  collapsed.value = !collapsed.value
  localStorage.setItem(STORAGE_KEY, collapsed.value.toString())
}
</script>
