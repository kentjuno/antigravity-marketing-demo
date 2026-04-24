<template>
  <div v-if="!isLicensed" class="license-gate">
    <div class="license-modal" v-if="!loading || isLicensed === false">
      <div class="modal-header">
        <h2 class="brand-text">KJ Studio Pro</h2>
        <p>{{ t('license.verifyMessage') }}</p>
      </div>
      
      <div class="modal-body">
        <div v-if="error" class="error-msg">{{ error }}</div>
        
        <div class="input-group">
          <label for="github-pat">{{ t('license.tokenLabel') }}</label>
          <input 
            type="password" 
            id="github-pat" 
            v-model="token" 
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" 
            @keyup.enter="verifyLicense"
          />
          <p class="help-text">{{ t('license.needToken') }} <a href="https://github.com/settings/tokens/new?scopes=repo&description=KJ+Studio+License" target="_blank">{{ t('license.generateHere') }}</a>.</p>
        </div>
        
        <button 
          @click="verifyLicense" 
          class="verify-btn" 
          :disabled="isVerifying || !token"
        >
          {{ isVerifying ? t('license.verifying') : t('license.unlockBtn') }}
        </button>
      </div>
    </div>
  </div>
  <slot v-else></slot>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const isLicensed = ref(false);
const token = ref('');
const error = ref('');
const loading = ref(true);
const isVerifying = ref(false);

const checkStatus = async () => {
  try {
    const res = await fetch('/api/license/status');
    const data = await res.json();
    if (data.hasLicense) {
      isLicensed.value = true;
    }
  } catch (err) {
    console.error('Failed to check license status', err);
  } finally {
    loading.value = false;
  }
};

const verifyLicense = async () => {
  if (!token.value) return;
  
  isVerifying.value = true;
  error.value = '';
  
  try {
    const res = await fetch('/api/license/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token.value })
    });
    
    const data = await res.json();
    
    if (res.ok && data.success) {
      isLicensed.value = true;
    } else {
      error.value = data.error || t('license.verifyFailed');
    }
  } catch (err) {
    error.value = t('license.networkError');
  } finally {
    isVerifying.value = false;
  }
};

onMounted(() => {
  checkStatus();
});
</script>

<style scoped>
.license-gate {
  position: fixed;
  inset: 0;
  background: var(--bg-body);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.license-modal {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.brand-text {
  background: linear-gradient(90deg, #A855F7, #EC4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-top: 0;
}

.modal-header p {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0;
}

.error-msg {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-align: center;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.input-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-color);
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg-body);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-color);
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
}

input:focus {
  border-color: #A855F7;
  box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.2);
}

.help-text {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.help-text a {
  color: #A855F7;
  text-decoration: none;
}

.help-text a:hover {
  text-decoration: underline;
}

.verify-btn {
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(90deg, #A855F7, #EC4899);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
}

.verify-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.verify-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.verify-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
