<template>
  <div class="px-8 py-6 max-w-7xl mx-auto space-y-8">
    <header class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-heading font-bold text-gradient">{{ t('content.title') }}</h1>
        <p class="text-text-secondary mt-1" v-html="t('content.desc')"></p>
      </div>
      <button @click="fetchPosts" :disabled="loading" class="btn-primary flex items-center space-x-2 disabled:opacity-50">
        <svg class="w-4 h-4" :class="loading ? 'animate-spin' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>{{ loading ? t('content.scanning') : t('content.refreshBtn') }}</span>
      </button>
    </header>

    <!-- Bridge Panel: Tất cả lệnh có sẵn -->
    <div class="card p-6 border border-secondary/30 bg-gradient-to-br from-surface to-secondary/5 relative overflow-hidden">
      <!-- Decorative neon glow -->
      <div class="absolute -top-24 -right-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 relative z-10">
        <h2 class="text-xl font-bold flex items-center gap-2">
          <svg class="w-6 h-6 text-secondary drop-shadow-[0_0_8px_rgba(255,20,147,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {{ t('content.skillsTitle') }}
        </h2>
        
        <!-- Search Bar -->
        <div class="relative w-full md:w-64">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            :placeholder="t('content.searchPlaceholder')" 
            class="block w-full pl-9 pr-3 py-2 border border-border rounded-lg leading-5 bg-surface-elevated text-text-primary placeholder-text-tertiary focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors text-sm"
          >
        </div>
      </div>

      <div class="flex flex-wrap gap-2 mb-6 relative z-10">
        <button
          v-for="cat in commandCategories"
          :key="cat.id"
          @click="activeCategory = cat.id"
          :class="[
            'px-4 py-1.5 text-xs font-medium rounded-full border transition-all duration-300',
            activeCategory === cat.id
              ? 'bg-secondary text-white border-secondary shadow-[0_0_10px_rgba(255,20,147,0.4)]'
              : 'border-border text-text-secondary hover:border-secondary/50 hover:text-text-primary bg-surface/50'
          ]"
        >{{ cat.label }} <span class="ml-1.5 bg-black/30 text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums">{{ getCategoryCount(cat.id) }}</span></button>
      </div>

      <!-- Skills List Layout: Changed from uniform grid to masonry/flex-style -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative z-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <div
          v-for="cmd in searchedCommands"
          :key="cmd.id"
          class="bg-surface/80 p-4 rounded-xl border border-border/60 hover:border-accent hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all cursor-pointer group flex flex-col h-full"
          @click="copyCommand(cmd.command[locale] || cmd.command.vi)"
        >
          <div class="flex items-start justify-between mb-3">
            <h3 class="font-bold text-text-primary text-sm flex items-center gap-2">
              <span class="text-lg">{{ cmd.icon }}</span> 
              <span class="group-hover:text-accent transition-colors">{{ cmd.name[locale] || cmd.name.vi }}</span>
            </h3>
            <span class="text-[10px] uppercase font-bold tracking-wider text-text-tertiary px-1.5 py-0.5 rounded bg-surface border border-border">{{ cmd.category }}</span>
          </div>
          <p class="text-xs text-text-secondary mb-3 flex-grow">{{ cmd.desc[locale] || cmd.desc.vi }}</p>
          <code class="text-[10px] text-accent/80 block bg-black/40 px-2 py-1.5 rounded truncate font-mono border border-accent/10">{{ cmd.command[locale] || cmd.command.vi }}</code>
        </div>
        
        <div v-if="searchedCommands.length === 0" class="col-span-full py-8 text-center text-text-tertiary">
          {{ t('content.noSkillFound', { query: searchQuery }) }}
        </div>
      </div>
    </div>

    <!-- Post Grid -->
    <div>
      <h2 class="text-xl font-bold mb-4 font-heading border-b border-border pb-2">
        📬 {{ t('content.inboxTitle') }}
        <span v-if="posts.length" class="ml-2 text-sm font-normal text-text-secondary">({{ posts.length }} {{ t('content.postsCount') }})</span>
      </h2>

      <div v-if="loading" class="flex justify-center p-12">
        <div class="text-3xl animate-spin">◓</div>
      </div>

      <div v-else-if="posts.length === 0" class="text-center p-12 card border border-dashed border-border/50 text-text-secondary">
        <div class="text-4xl mb-3">📭</div>
        <p class="mb-2 font-medium">{{ t('content.emptyDir') }}</p>
        <p class="text-sm">{{ t('content.emptyDesc') }}</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="post in posts"
          :key="post.id"
          class="card hover-card flex flex-col h-full border border-border/50 hover:border-secondary/40 transition-all"
        >
          <div class="p-5 flex-grow">
            <div class="flex justify-between items-start mb-3">
              <span class="px-2 py-1 text-xs font-medium rounded-full bg-surface-elevated text-secondary border border-secondary/20">
                {{ post.category }}
              </span>
              <span class="text-xs text-text-tertiary">{{ formatDate(post.updatedAt) }}</span>
            </div>
            <h3 class="text-base font-bold text-text-primary mb-2 line-clamp-2" :title="post.title">{{ post.title }}</h3>
            <p class="text-xs text-text-tertiary font-mono truncate opacity-60">{{ post.filename }}</p>
          </div>

          <div class="px-5 py-3 border-t border-border bg-surface-elevated/30 flex gap-2">
            <button
              @click="readPost(post)"
              class="flex-1 flex items-center justify-center gap-1 text-sm text-accent hover:text-accent/80 font-medium transition-colors py-1.5 rounded hover:bg-accent/10"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              {{ t('content.readBtn') }}
            </button>
            <button
              @click="openInIDE(post.filename)"
              :disabled="openingFile === post.filename"
              class="flex-1 flex items-center justify-center gap-1 text-sm text-secondary hover:text-secondary/80 font-medium transition-colors py-1.5 rounded hover:bg-secondary/10 disabled:opacity-50"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
              {{ openingFile === post.filename ? t('content.opening') : t('content.editBtn') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Đọc Thử -->
    <Teleport to="body">
      <div
        v-if="activePost"
        class="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
        @click.self="closeModal"
      >
        <div class="bg-surface border border-border rounded-xl shadow-2xl w-full max-w-3xl my-8 flex flex-col max-h-[85vh]">
          <div class="flex justify-between items-start p-6 border-b border-border flex-shrink-0">
            <div class="flex-1 mr-4">
              <span class="px-2 py-0.5 text-xs rounded-full bg-surface-elevated text-secondary border border-secondary/20 mb-2 inline-block">
                {{ activePost.category }}
              </span>
              <h2 class="text-xl font-bold text-text-primary">{{ activePost.title }}</h2>
              <p class="text-xs text-text-tertiary mt-1 font-mono">{{ activePost.filename }}</p>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <button
                @click="openInIDE(activePost.filename)"
                class="flex items-center gap-1 text-xs text-secondary hover:text-secondary/80 border border-secondary/30 px-3 py-1.5 rounded-lg hover:bg-secondary/10 transition-colors"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
                {{ t('content.openIdeBtn') }}
              </button>
              <button @click="closeModal" class="text-text-secondary hover:text-text-primary transition-colors p-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="overflow-y-auto p-6 flex-1">
            <div v-if="loadingPost" class="flex justify-center py-8">
              <div class="text-2xl animate-spin">◓</div>
            </div>
            <pre v-else class="text-sm text-text-secondary whitespace-pre-wrap font-mono leading-relaxed">{{ postBody }}</pre>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Toast -->
    <Teleport to="body">
      <Transition name="toast">
        <div
          v-if="toastMsg"
          class="fixed bottom-6 right-6 z-50 bg-surface-elevated border border-border rounded-lg shadow-xl px-4 py-3 flex items-center gap-2 text-sm"
        >
          <span class="text-green-400">✓</span>
          {{ toastMsg }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import skillsData from '../data/skills.json';

const { t, locale } = useI18n();

const posts = ref([]);
const loading = ref(true);
const activePost = ref(null);
const postBody = ref('');
const loadingPost = ref(false);
const openingFile = ref(null);
const toastMsg = ref('');
const activeCategory = ref('all');

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3457/api';

const allCommands = ref(skillsData);

const commandCategories = [
  { id: 'all', label: '⚡ Tất cả' },
  { id: 'content', label: '📝 Content' },
  { id: 'seo', label: '🔍 SEO' },
  { id: 'ads', label: '💰 Ads' },
  { id: 'campaign', label: '📣 Campaign' },
  { id: 'growth', label: '🚀 Growth' },
  { id: 'community', label: '👥 Community' },
  { id: 'analytics', label: '📈 Analytics' },
  { id: 'brand', label: '💎 Brand' },
  { id: 'design', label: '✨ Design' },
  { id: 'cro', label: '🎯 CRO' },
  { id: 'ai', label: '🤖 AI Tools' },
  { id: 'video', label: '🎬 Video' },
  { id: 'research', label: '🔬 Research' },
  { id: 'ops', label: '⚙️ Ops' },
  { id: 'mcp', label: '🔌 MCP' },
  { id: 'dev', label: '💻 Dev' },
  { id: 'other', label: '🔧 Other' },
];

const filteredCommands = computed(() => {
  if (activeCategory.value === 'all') return allCommands.value;
  return allCommands.value.filter(c => c.category === activeCategory.value);
});

const searchQuery = ref('');

const getCategoryCount = (categoryId) => {
  if (categoryId === 'all') return allCommands.value.length;
  return allCommands.value.filter(c => c.category === categoryId).length;
};

const searchedCommands = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  const cmds = filteredCommands.value;
  
  const l = locale.value;
  return cmds.filter(c => {
    const cmdName = c.name[l] || c.name.vi;
    const cmdDesc = c.desc[l] || c.desc.vi;
    const cmdCommand = c.command[l] || c.command.vi;

    return (cmdName && cmdName.toLowerCase().includes(query)) || 
           (cmdDesc && cmdDesc.toLowerCase().includes(query)) || 
           (cmdCommand && cmdCommand.toLowerCase().includes(query)) ||
           c.id.toLowerCase().includes(query);
  });
});

// ===== Fetch skills dynamically =====
const fetchSkills = async () => {
  try {
    const res = await fetch(`${API_BASE}/skills`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const dynamicSkills = await res.json();
    
    // Merge logic: only add skills that are not already hardcoded
    const hardcodedIds = new Set(hardcodedCommands.map(c => c.id));
    const newSkills = dynamicSkills.filter(skill => !hardcodedIds.has(skill.id)).map(skill => ({
      ...skill,
      category: 'other' // Put dynamic skills into "Other Skills" category
    }));
    
    allCommands.value = [...hardcodedCommands, ...newSkills];
  } catch (error) {
    console.error('Failed to fetch dynamic skills:', error);
  }
};

// ===== Fetch posts =====
const fetchPosts = async () => {
  loading.value = true;
  try {
    const res = await fetch(`${API_BASE}/content`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    posts.value = await res.json();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  } finally {
    loading.value = false;
  }
};

const readPost = async (post) => {
  activePost.value = post;
  postBody.value = '';
  loadingPost.value = true;
  try {
    const res = await fetch(`${API_BASE}/content/${encodeURIComponent(post.filename)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    postBody.value = data.body || '(Không có nội dung)';
  } catch (error) {
    postBody.value = `Lỗi tải bài: ${error.message}`;
  } finally {
    loadingPost.value = false;
  }
};

const closeModal = () => {
  activePost.value = null;
  postBody.value = '';
};

const openInIDE = async (filename) => {
  openingFile.value = filename;
  try {
    const res = await fetch(`${API_BASE}/content/open-ide`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename })
    });
    const result = await res.json();
    showToast(result.success ? t('content.openSuccess', { file: filename }) : `❌ ${result.error}`);
  } catch {
    showToast(t('content.connectFail'));
  } finally {
    openingFile.value = null;
  }
};

const copyCommand = async (cmd) => {
  try {
    await navigator.clipboard.writeText(cmd);
    showToast(t('content.copySuccess'));
  } catch {
    showToast(t('content.copyFail'));
  }
};

const showToast = (msg) => {
  toastMsg.value = msg;
  setTimeout(() => { toastMsg.value = ''; }, 3000);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('vi-VN', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

const handleKeydown = (e) => { if (e.key === 'Escape') closeModal(); };

onMounted(() => {
  fetchSkills();
  fetchPosts();
  window.addEventListener('keydown', handleKeydown);
});
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px); }

/* Custom Scrollbar for Skills List */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 20, 147, 0.3);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 20, 147, 0.6);
}
</style>
