<template>
  <div class="h-full flex">
    <!-- Docs Sidebar -->
    <div class="w-64 border-r border-border bg-surface-elevated/30 flex flex-col hidden md:flex shrink-0">
      <div class="p-4 border-b border-border">
        <h2 class="font-heading font-semibold text-text-primary flex items-center gap-2">
          <svg class="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {{ t('docs.title') }}
        </h2>
      </div>
      <div class="flex-1 overflow-y-auto p-3">
        <div v-if="loadingTree" class="text-text-secondary text-sm flex items-center gap-2 p-4">
          <svg class="animate-spin h-4 w-4 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ t('docs.loading') }}
        </div>
        <div v-else-if="treeError" class="text-red-400 text-sm p-4 text-center">
          {{ t('docs.treeError') }}
        </div>
        <div v-else class="space-y-0.5">
          <template v-for="item in docsTree" :key="item.slug || item.name">
            <!-- Category header -->
            <div v-if="item.type === 'category'" class="pt-4 first:pt-1">
              <div class="px-3 pb-1.5 text-[10px] font-bold text-text-tertiary uppercase tracking-widest flex items-center gap-1.5">
                <span class="w-3 h-px bg-secondary/50 inline-block"></span>
                {{ item.name }}
              </div>
              <RouterLink
                v-for="child in item.children"
                :key="child.slug"
                :to="`/docs/${child.slug}`"
                class="flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-150 group"
                :class="isActive(child.slug)
                  ? 'bg-secondary/10 text-secondary font-medium border-l-2 border-secondary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface border-l-2 border-transparent'"
              >
                <span class="w-1.5 h-1.5 rounded-full shrink-0 transition-colors"
                  :class="isActive(child.slug) ? 'bg-secondary' : 'bg-border group-hover:bg-text-secondary'">
                </span>
                {{ child.name }}
              </RouterLink>
            </div>
            <!-- Top level doc -->
            <RouterLink
              v-else
              :to="`/docs/${item.slug}`"
              class="flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-150 group border-l-2"
              :class="isActive(item.slug)
                ? 'bg-secondary/10 text-secondary font-medium border-secondary'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface border-transparent'"
            >
              <svg class="w-3.5 h-3.5 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {{ item.name }}
            </RouterLink>
          </template>
        </div>
      </div>
    </div>

    <!-- Doc Content -->
    <div class="flex-1 overflow-y-auto bg-background">
      <!-- Loading state -->
      <div v-if="loadingContent" class="h-full flex items-center justify-center text-text-secondary">
        <svg class="animate-spin mr-3 h-6 w-6 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ t('docs.loadingContent') }}
      </div>

      <!-- Error state -->
      <div v-else-if="contentError" class="p-10 max-w-3xl mx-auto">
        <div class="bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center">
          <div class="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-lg font-heading font-semibold text-red-400 mb-2">{{ t('docs.notFoundTitle') }}</h3>
          <p class="text-text-secondary text-sm mb-4">{{ t('docs.notFoundDesc') }}</p>
          <button @click="$router.push('/docs')" class="px-4 py-2 bg-surface hover:bg-surface-elevated rounded-lg text-text-primary text-sm transition-colors">
            ← {{ t('docs.backBtn') }}
          </button>
        </div>
      </div>

      <!-- Welcome state -->
      <div v-else-if="!currentDoc && docsTree.length > 0" class="p-10 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div class="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-5 border border-secondary/20">
          <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 class="text-2xl font-heading font-bold text-text-primary mb-2">{{ t('docs.welcomeTitle') }}</h2>
        <p class="text-text-secondary max-w-md text-sm leading-relaxed">
          {{ t('docs.welcomeDesc') }}
        </p>
      </div>

      <!-- Content area -->
      <div v-else-if="currentDoc" class="max-w-3xl mx-auto px-8 py-10">
        <!-- Doc meta bar -->
        <div class="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <div class="flex items-center gap-2 text-xs text-text-tertiary">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{{ currentDocName }}</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-text-tertiary flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ readingTime }} {{ t('docs.minRead') }}
            </span>
          </div>
        </div>

        <!-- Rendered markdown -->
        <article class="prose" v-html="renderedContent" ref="articleRef"></article>

        <!-- Footer nav -->
        <div class="mt-12 pt-6 border-t border-border flex items-center justify-between text-sm text-text-secondary">
          <span>{{ t('docs.footerText') }}</span>
          <button @click="scrollToTop" class="flex items-center gap-1 hover:text-text-primary transition-colors text-xs">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
            {{ t('docs.backToTop') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const docsTree = ref([])
const loadingTree = ref(true)
const treeError = ref(false)

const currentDoc = ref(null)
const loadingContent = ref(false)
const contentError = ref(false)
const articleRef = ref(null)

// Configure marked with marked-highlight (correct API for marked v17)
marked.use(markedHighlight({
  emptyLangClass: 'hljs',
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  }
}))

marked.use({
  gfm: true,
  breaks: false,
})

const renderedContent = computed(() => {
  if (!currentDoc.value?.content) return ''
  const html = marked.parse(currentDoc.value.content)
  return DOMPurify.sanitize(html, { ADD_ATTR: ['class', 'data-lang'] })
})

const readingTime = computed(() => {
  if (!currentDoc.value?.content) return 0
  const words = currentDoc.value.content.split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
})

const currentDocName = computed(() => {
  if (!currentDoc.value) return ''
  const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
  // Find from tree
  for (const item of docsTree.value) {
    if (item.slug === slug) return item.name
    if (item.children) {
      const child = item.children.find(c => c.slug === slug)
      if (child) return child.name
    }
  }
  return slug || ''
})

function isActive(slug) {
  const routeSlug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
  return routeSlug === slug
}

function scrollToTop() {
  const contentEl = document.querySelector('.overflow-y-auto.bg-background')
  if (contentEl) contentEl.scrollTo({ top: 0, behavior: 'smooth' })
}

// Inject copy buttons into code blocks after render
async function injectCopyButtons() {
  await nextTick()
  if (!articleRef.value) return
  const pres = articleRef.value.querySelectorAll('pre')
  pres.forEach(pre => {
    // Avoid duplicate buttons
    if (pre.querySelector('.copy-btn')) return

    const code = pre.querySelector('code')
    if (!code) return

    // Add data-lang attribute for CSS ::before label
    const langMatch = code.className.match(/language-(\w+)/)
    if (langMatch) pre.setAttribute('data-lang', langMatch[1])

    // Create copy button
    const btn = document.createElement('button')
    btn.className = 'copy-btn'
    btn.textContent = t('docs.copyBtn')
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.innerText)
        btn.textContent = t('docs.copied')
        btn.classList.add('copied')
        setTimeout(() => {
          btn.textContent = t('docs.copyBtn')
          btn.classList.remove('copied')
        }, 2000)
      } catch {
        btn.textContent = t('docs.copyError')
      }
    })
    pre.appendChild(btn)
  })
}

async function fetchDocsTree() {
  loadingTree.value = true
  treeError.value = false
  try {
    const res = await fetch('/api/docs')
    if (!res.ok) throw new Error('Failed to fetch docs tree')
    const data = await res.json()
    docsTree.value = data.docs || []

    if (!route.params.slug && docsTree.value.find(d => d.slug === 'GETTING-STARTED')) {
      router.replace('/docs/GETTING-STARTED')
    }
  } catch (err) {
    console.error(err)
    treeError.value = true
  } finally {
    loadingTree.value = false
  }
}

async function fetchDocContent(slug) {
  if (!slug) {
    currentDoc.value = null
    contentError.value = false
    return
  }

  loadingContent.value = true
  contentError.value = false
  currentDoc.value = null

  try {
    const slugPath = Array.isArray(slug) ? slug.join('/') : slug
    const res = await fetch(`/api/docs/${slugPath}`)
    if (!res.ok) throw new Error('Failed to fetch doc content')
    const data = await res.json()
    currentDoc.value = data
    await nextTick()
    injectCopyButtons()
  } catch (err) {
    console.error(err)
    contentError.value = true
  } finally {
    loadingContent.value = false
  }
}

onMounted(() => {
  fetchDocsTree()
  if (route.params.slug) {
    fetchDocContent(route.params.slug)
  }
})

watch(() => route.params.slug, (newSlug) => {
  if (route.name === 'docs') {
    fetchDocContent(newSlug)
  }
})
</script>

<style>
/* Remove old prose styles from DocsView — now in style.css */
</style>
