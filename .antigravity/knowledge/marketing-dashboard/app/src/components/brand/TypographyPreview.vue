<template>
  <div class="bg-surface border border-border rounded-xl p-6">
    <h3 class="text-lg font-heading font-semibold mb-4">Typography</h3>

    <div v-if="!tokens" class="text-text-secondary">Loading typography...</div>

    <div v-else class="space-y-8">
      <!-- Font Families -->
      <div class="space-y-4">
        <div>
          <p class="text-xs text-text-secondary uppercase tracking-wider mb-2">Heading Font</p>
          <p :style="{ fontFamily: headingFont }" class="text-3xl">
            Aa Bb Cc 123 !@#
          </p>
          <p class="text-xs font-mono text-text-muted mt-1">{{ headingFont || 'Not configured' }}</p>
        </div>

        <div>
          <p class="text-xs text-text-secondary uppercase tracking-wider mb-2">Body Font</p>
          <p :style="{ fontFamily: bodyFont }" class="text-3xl">
            Aa Bb Cc 123 !@#
          </p>
          <p class="text-xs font-mono text-text-muted mt-1">{{ bodyFont || 'Not configured' }}</p>
        </div>

        <div v-if="monoFont">
          <p class="text-xs text-text-secondary uppercase tracking-wider mb-2">Monospace Font</p>
          <p :style="{ fontFamily: monoFont }" class="text-3xl">
            Aa Bb Cc 123 !@#
          </p>
          <p class="text-xs font-mono text-text-muted mt-1">{{ monoFont }}</p>
        </div>
      </div>

      <!-- Font Sizes -->
      <div v-if="tokens?.primitive?.fontSize">
        <p class="text-xs text-text-secondary uppercase tracking-wider mb-3">Font Size Scale</p>
        <div class="space-y-2">
          <div
            v-for="(size, key) in tokens.primitive.fontSize"
            :key="key"
            class="flex items-baseline gap-4"
          >
            <span class="text-xs text-text-muted w-12">{{ key }}</span>
            <span :style="{ fontSize: size.$value }" class="font-body">
              The quick brown fox
            </span>
            <span class="text-xs font-mono text-text-secondary ml-auto">{{ size.$value }}</span>
          </div>
        </div>
      </div>

      <!-- Font Weights (optional) -->
      <div v-if="tokens?.primitive?.fontWeight">
        <p class="text-xs text-text-secondary uppercase tracking-wider mb-3">Font Weight Scale</p>
        <div class="space-y-2">
          <div
            v-for="(weight, key) in tokens.primitive.fontWeight"
            :key="key"
            class="flex items-baseline gap-4"
          >
            <span class="text-xs text-text-muted w-20">{{ key }}</span>
            <span :style="{ fontWeight: weight.$value }" class="text-xl font-body">
              The quick brown fox jumps over the lazy dog
            </span>
            <span class="text-xs font-mono text-text-secondary ml-auto">{{ weight.$value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tokens: {
    type: Object,
    default: null
  }
})

// Resolve font values – support cả cấu trúc cũ (semantic.typography) lẫn mới (semantic.fontFamily / primitive.fontFamily)
const headingFont = computed(() => {
  const t = props.tokens
  if (!t) return null
  return t?.semantic?.typography?.['font-heading']?.$value
    || t?.semantic?.fontFamily?.heading?.$value
    || t?.primitive?.fontFamily?.heading?.$value
    || null
})

const bodyFont = computed(() => {
  const t = props.tokens
  if (!t) return null
  return t?.semantic?.typography?.['font-body']?.$value
    || t?.semantic?.fontFamily?.body?.$value
    || t?.primitive?.fontFamily?.body?.$value
    || null
})

const monoFont = computed(() => {
  const t = props.tokens
  if (!t) return null
  return t?.semantic?.typography?.['font-mono']?.$value
    || t?.primitive?.fontFamily?.mono?.$value
    || null
})
</script>
