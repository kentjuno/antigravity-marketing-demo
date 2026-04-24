<template>
  <div class="p-8 space-y-8">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-3xl font-heading font-bold text-gradient mb-2">{{ t('brand.title') }}</h1>
        <p class="text-text-secondary">
          {{ t('brand.desc') }}
        </p>
      </div>
      <button
        v-if="brandStore.tokens"
        @click="brandStore.fetchAll()"
        class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white btn-gradient rounded-lg"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {{ t('brand.refreshBtn') }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="brandStore.loading && !brandStore.tokens" class="flex flex-col items-center justify-center py-24 gap-4">
      <div class="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      <p class="text-text-secondary">{{ t('brand.loading') }}</p>
    </div>

    <!-- ✅ Brand data loaded – show full UI -->
    <template v-else-if="brandStore.tokens">
      <!-- Collapsible quick-tips (luôn hiển thị dù đã có data) -->
      <div class="rounded-xl border border-border bg-surface overflow-hidden">
        <button
          @click="showTips = !showTips"
          class="w-full flex items-center justify-between px-5 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all"
        >
          <span class="flex items-center gap-2">
            <span>⚡</span>
            <span class="font-medium">{{ t('brand.tipsTitle') }}</span>
            <span class="text-xs text-text-muted">– {{ t('brand.tipsHint') }}</span>
          </span>
          <svg :class="showTips ? 'rotate-180' : ''" class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-if="showTips" class="px-5 pb-4 pt-1 grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-border">
          <button @click="copyCmd('/akm:design-system Cập nhật design tokens cho thương hiệu: [Tên]')" class="text-left bg-black/30 border border-accent/20 hover:border-accent/50 rounded-lg px-3 py-2.5 transition-all group">
            <p class="text-xs font-semibold text-accent mb-1">🎨 Design Tokens</p>
            <code class="text-[10px] text-text-muted font-mono">/akm:design-system Cập nhật...</code>
          </button>
          <button @click="copyCmd('/akm:brand Xây dựng brand voice và guidelines cho: [Tên]')" class="text-left bg-black/30 border border-accent/20 hover:border-accent/50 rounded-lg px-3 py-2.5 transition-all group">
            <p class="text-xs font-semibold text-accent mb-1">🗣️ Brand Voice</p>
            <code class="text-[10px] text-text-muted font-mono">/akm:brand Xây dựng brand voice...</code>
          </button>
          <div class="text-left bg-black/30 border border-border rounded-lg px-3 py-2.5">
            <p class="text-xs font-semibold text-text-secondary mb-1">🖼️ Logo</p>
            <code class="text-[10px] text-text-muted font-mono">Đặt file vào assets/logos/</code>
          </div>
        </div>
      </div>

      <!-- Data grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ColorPalette :tokens="brandStore.tokens" />
        <TypographyPreview :tokens="brandStore.tokens" />
        <SpacingScale :tokens="brandStore.tokens" />
        <ComponentShowcase :tokens="brandStore.tokens" />
        <LogoGallery :logos="brandStore.logos" :loading="brandStore.loading" @upload="handleLogoUpload" />
        <VoiceSummary :voice="brandStore.voice" :loading="brandStore.loading" :error="brandStore.error" />
      </div>
    </template>

    <!-- 🚀 Empty / Error state – Getting Started guide -->
    <div v-else class="space-y-6">

      <!-- Hero Banner -->
      <div class="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-surface to-secondary/10 p-8">
        <div class="absolute -top-16 -right-16 w-64 h-64 bg-primary/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-16 -left-16 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div class="text-6xl">💎</div>
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-text-primary mb-2">{{ t('brand.emptyTitle') }}</h2>
            <p class="text-text-secondary leading-relaxed" v-html="t('brand.emptyDesc')"></p>
          </div>
        </div>
      </div>

      <!-- Workflow Steps -->
      <div>
        <h3 class="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
          <span class="text-secondary">⚡</span> Cách thiết lập Brand Center (3 bước)
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

          <!-- Step 1 -->
          <div class="relative bg-surface border border-border rounded-xl p-5 hover:border-primary/50 transition-all group">
            <div class="absolute top-4 right-4 text-xs font-bold text-text-tertiary bg-surface-elevated px-2 py-0.5 rounded-full">Bước 1</div>
            <div class="text-3xl mb-3">🎨</div>
            <h4 class="font-bold text-text-primary mb-1">Tạo Design Tokens</h4>
            <p class="text-xs text-text-secondary mb-4">Định nghĩa màu sắc, font chữ, spacing của thương hiệu</p>
            <button
              @click="copyCmd('/akm:design-system Tạo design tokens cho thương hiệu: [Tên Thương Hiệu]')"
              class="w-full text-left group-hover:border-primary/50 transition-all"
            >
              <code class="block text-[10px] text-accent bg-black/50 border border-accent/20 px-3 py-2 rounded-lg font-mono truncate hover:border-accent/50 cursor-pointer">
                /akm:design-system Tạo design tokens...
              </code>
            </button>
            <p class="text-[10px] text-text-tertiary mt-2">→ AI tạo file <span class="text-accent font-mono">assets/design-tokens.json</span></p>
          </div>

          <!-- Step 2 -->
          <div class="relative bg-surface border border-border rounded-xl p-5 hover:border-secondary/50 transition-all group">
            <div class="absolute top-4 right-4 text-xs font-bold text-text-tertiary bg-surface-elevated px-2 py-0.5 rounded-full">Bước 2</div>
            <div class="text-3xl mb-3">🗣️</div>
            <h4 class="font-bold text-text-primary mb-1">Viết Brand Voice</h4>
            <p class="text-xs text-text-secondary mb-4">Định nghĩa giọng nói, tone và personality của thương hiệu</p>
            <button
              @click="copyCmd('/akm:brand Xây dựng brand voice và guidelines cho: [Tên Thương Hiệu]')"
              class="w-full text-left"
            >
              <code class="block text-[10px] text-accent bg-black/50 border border-accent/20 px-3 py-2 rounded-lg font-mono truncate hover:border-accent/50 cursor-pointer">
                /akm:brand Xây dựng brand voice...
              </code>
            </button>
            <p class="text-[10px] text-text-tertiary mt-2">→ AI tạo file <span class="text-accent font-mono">docs/brand-guidelines.md</span></p>
          </div>

          <!-- Step 3 -->
          <div class="relative bg-surface border border-border rounded-xl p-5 hover:border-accent/50 transition-all group">
            <div class="absolute top-4 right-4 text-xs font-bold text-text-tertiary bg-surface-elevated px-2 py-0.5 rounded-full">Bước 3</div>
            <div class="text-3xl mb-3">🖼️</div>
            <h4 class="font-bold text-text-primary mb-1">Upload Logo</h4>
            <p class="text-xs text-text-secondary mb-4">Thêm logo vào thư mục để Brand Center quản lý tập trung</p>
            <code class="block text-[10px] text-accent bg-black/50 border border-accent/20 px-3 py-2 rounded-lg font-mono">
              assets/logos/logo.png
            </code>
            <p class="text-[10px] text-text-tertiary mt-2">→ Drag & drop hoặc copy file vào thư mục trên</p>
          </div>

        </div>
      </div>

      <!-- What you'll see -->
      <div>
        <h3 class="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
          <span class="text-accent">👁️</span> Sau khi thiết lập, Brand Center sẽ hiển thị:
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div v-for="item in previewItems" :key="item.title"
            class="bg-surface border border-border rounded-xl p-4 text-center hover:border-primary/30 transition-all">
            <div class="text-2xl mb-2">{{ item.icon }}</div>
            <div class="text-xs font-medium text-text-primary">{{ item.title }}</div>
            <div class="text-[10px] text-text-tertiary mt-1">{{ item.desc }}</div>
          </div>
        </div>
      </div>

      <!-- Retry button -->
      <div class="text-center pt-4">
        <button
          @click="brandStore.fetchAll()"
          class="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white btn-gradient rounded-lg"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {{ t('brand.retryBtn') }}
        </button>
      </div>

    </div>

    <!-- Toast -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="toastMsg" class="fixed bottom-6 right-6 z-50 bg-surface-elevated border border-border rounded-lg shadow-xl px-4 py-3 flex items-center gap-2 text-sm">
          <span class="text-green-400">✓</span> {{ toastMsg }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBrandStore } from '../stores/brand'
import { useI18n } from 'vue-i18n'

import ColorPalette from '../components/brand/ColorPalette.vue'
import TypographyPreview from '../components/brand/TypographyPreview.vue'
import SpacingScale from '../components/brand/SpacingScale.vue'
import ComponentShowcase from '../components/brand/ComponentShowcase.vue'
import LogoGallery from '../components/brand/LogoGallery.vue'
import VoiceSummary from '../components/brand/VoiceSummary.vue'

const brandStore = useBrandStore()
const { t } = useI18n()
const toastMsg = ref('')
const showTips = ref(false)

const previewItems = [
  { icon: '🎨', title: 'Color Palette', desc: 'Bảng màu primary/secondary/accent' },
  { icon: '🔤', title: 'Typography', desc: 'Font heading, body, code' },
  { icon: '📏', title: 'Spacing Scale', desc: 'Thước đo padding/margin' },
  { icon: '🧩', title: 'Components', desc: 'Button, badge, card mẫu' },
  { icon: '🖼️', title: 'Logo Gallery', desc: 'Quản lý logo thương hiệu' },
  { icon: '🗣️', title: 'Brand Voice', desc: 'Tone, personality, keywords' },
]

const copyCmd = async (cmd) => {
  try {
    await navigator.clipboard.writeText(cmd)
    toastMsg.value = '📋 Đã copy lệnh! Dán vào AI để chạy.'
    setTimeout(() => toastMsg.value = '', 3000)
  } catch {
    toastMsg.value = 'Copy thủ công nhé!'
    setTimeout(() => toastMsg.value = '', 2000)
  }
}

function handleLogoUpload(file) {
  brandStore.uploadLogo(file)
}

onMounted(async () => {
  await brandStore.fetchAll()
})
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px); }
</style>
