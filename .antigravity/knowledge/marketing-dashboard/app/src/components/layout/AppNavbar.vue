<template>
  <header class="bg-surface border-b border-border sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo & Brand -->
        <div class="flex items-center space-x-3 shrink-0">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <!-- Marketing Target/Megaphone SVG -->
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
          <h1 class="text-xl font-heading font-bold text-gradient hidden sm:block">Kit Marketing</h1>
        </div>

        <!-- Navigation Links -->
        <nav class="hidden md:flex flex-1 items-center justify-center space-x-2">
          <RouterLink
            to="/content"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
            :class="isActive('/content') ? 'bg-primary/15 text-primary shadow-[inset_0_-2px_0_0_#B026FF]' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span>{{ t('nav.contentHub') }}</span>
          </RouterLink>

          <RouterLink
            to="/"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
            :class="isActive('/') ? 'bg-primary/15 text-primary shadow-[inset_0_-2px_0_0_#B026FF]' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{{ t('nav.assets') }}</span>
          </RouterLink>

          <RouterLink
            to="/brand"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
            :class="isActive('/brand') ? 'bg-primary/15 text-primary shadow-[inset_0_-2px_0_0_#B026FF]' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <span>{{ t('nav.brand') }}</span>
          </RouterLink>

          <RouterLink
            to="/settings"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
            :class="isActive('/settings') ? 'bg-primary/15 text-primary shadow-[inset_0_-2px_0_0_#B026FF]' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
            <span>{{ t('nav.settings') }}</span>
          </RouterLink>

          <RouterLink
            to="/docs"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
            :class="route.path.startsWith('/docs') ? 'bg-primary/15 text-primary shadow-[inset_0_-2px_0_0_#B026FF]' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{{ t('nav.docs') }}</span>
          </RouterLink>
        </nav>

        <!-- Right Side (Version info / Mobile Menu Toggle) -->
        <div class="flex items-center space-x-3">
          <span class="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            <span class="w-1.5 h-1.5 bg-primary rounded-full mr-1.5 animate-pulse"></span>
            {{ t('nav.localActive') }}
          </span>
          
          <button @click="switchLanguage" class="flex items-center justify-center w-8 h-8 rounded-lg bg-surface border border-white/10 text-gray-400 hover:text-white hover:border-primary/50 transition-all font-mono text-xs uppercase">
            {{ locale }}
          </button>
          
          <!-- Mobile menu button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-elevated">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="mobileMenuOpen" class="md:hidden border-t border-border bg-surface">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <RouterLink to="/content" @click="mobileMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium" :class="isActive('/content') ? 'bg-primary/15 text-primary' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'">{{ t('nav.contentHub') }}</RouterLink>
        <RouterLink to="/" @click="mobileMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium" :class="isActive('/') ? 'bg-primary/15 text-primary' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'">{{ t('nav.assets') }}</RouterLink>
        <RouterLink to="/brand" @click="mobileMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium" :class="isActive('/brand') ? 'bg-primary/15 text-primary' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'">{{ t('nav.brand') }}</RouterLink>
        <RouterLink to="/docs" @click="mobileMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium" :class="route.path.startsWith('/docs') ? 'bg-primary/15 text-primary' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'">{{ t('nav.docs') }}</RouterLink>
        <RouterLink to="/settings" @click="mobileMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium" :class="isActive('/settings') ? 'bg-primary/15 text-primary' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'">{{ t('nav.settings') }}</RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const mobileMenuOpen = ref(false)

const { t, locale } = useI18n()

const switchLanguage = () => {
  locale.value = locale.value === 'vi' ? 'en' : 'vi'
  localStorage.setItem('language', locale.value)
}

function isActive(path) {
  return route.path === path
}
</script>
