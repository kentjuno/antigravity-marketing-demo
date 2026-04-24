<template>
  <div class="p-8 space-y-6">
    <!-- Header -->
    <div class="flex items-start justify-between gap-4">
      <div>
        <h2 class="text-3xl font-heading font-bold text-gradient mb-2">{{ t('assets.title') }}</h2>
        <p class="text-sm text-text-secondary leading-relaxed max-w-2xl">
          {{ t('assets.desc') }} <br />
          <span v-html="t('assets.descScan')"></span>
        </p>
        <!-- Workflow hint chips -->
        <div class="flex flex-wrap gap-2 mt-3">
          <span class="text-[10px] px-2.5 py-1 rounded-full bg-surface-elevated border border-border text-text-tertiary flex items-center gap-1">
            <span class="text-accent">1.</span> {{ t('assets.step1') }}
          </span>
          <span class="text-[10px] px-2.5 py-1 rounded-full bg-surface-elevated border border-border text-text-tertiary flex items-center gap-1">
            <span class="text-secondary">2.</span> <span v-html="t('assets.step2')"></span>
          </span>
          <span class="text-[10px] px-2.5 py-1 rounded-full bg-surface-elevated border border-border text-text-tertiary flex items-center gap-1">
            <span class="text-primary">3.</span> {{ t('assets.step3') }}
          </span>
        </div>
      </div>
      <button
        @click="handleScan"
        :disabled="assetsStore.loading"
        class="flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-white btn-gradient rounded-lg disabled:opacity-50"
      >
        <svg class="w-4 h-4" :class="assetsStore.loading ? 'animate-spin' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {{ assetsStore.loading ? t('assets.scanning') : t('assets.scanBtn') }}
      </button>
    </div>

    <LoadingSpinner v-if="assetsStore.loading" class="mt-12" />
    <div v-else-if="assetsStore.error" class="bg-red-900/20 border border-red-700 rounded-xl p-4 text-red-400">
      {{ t('assets.error') }}: {{ assetsStore.error }}
    </div>
    <AssetGrid v-else :folder="currentFolder" @view="handleView" @navigate="handleNavigate" />

    <AssetPreview
      v-if="previewAsset"
      :asset="previewAsset"
      :all-assets="assetsStore.assets"
      @close="handleClose"
      @select="handleView"
    />

    <Toast v-if="toast.show" :message="toast.message" :type="toast.type" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAssetsStore } from '../stores/assets'
import AssetGrid from '../components/assets/AssetGrid.vue'
import AssetPreview from '../components/assets/AssetPreview.vue'
import Toast from '../components/common/Toast.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const assetsStore = useAssetsStore()
const { t } = useI18n()

const previewAsset = ref(null)
const currentFolder = ref('')
const toast = ref({ show: false, message: '', type: 'success' })

function showToast(message, type = 'success') {
  toast.value = { show: true, message, type }
  setTimeout(() => toast.value.show = false, 3000)
}

function handleNavigate(folder) {
  currentFolder.value = folder
  // Update URL with folder query param, preserve asset if any
  updateUrlParams()
}

function handleView(asset) {
  previewAsset.value = asset
  // Update URL with asset ID query param
  updateUrlParams()
}

function handleClose() {
  previewAsset.value = null
  // Remove asset param, keep folder
  updateUrlParams()
}

function updateUrlParams() {
  const query = {}
  if (currentFolder.value) query.folder = currentFolder.value
  if (previewAsset.value) query.asset = previewAsset.value.id
  router.replace({ query })
}

async function handleScan() {
  try {
    const result = await assetsStore.scanAssets()
    showToast(t('assets.scanSuccess', { scanned: result.scanned, new: result.inserted, updated: result.updated }))
  } catch (e) {
    showToast(t('assets.scanFailed'), 'error')
  }
}

// Restore folder and asset from URL query params after assets load
watch(() => assetsStore.assets, (assets) => {
  if (assets.length) {
    // Restore folder from URL
    if (route.query.folder && !currentFolder.value) {
      currentFolder.value = route.query.folder
    }
    // Restore asset preview from URL
    if (route.query.asset && !previewAsset.value) {
      const asset = assets.find(a => a.id === route.query.asset)
      if (asset) previewAsset.value = asset
    }
  }
}, { immediate: true })

onMounted(() => {
  assetsStore.fetchAssets()
})
</script>
