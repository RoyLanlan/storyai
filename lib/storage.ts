// 本地存储管理API Key
const API_KEY_STORAGE_KEY = 'novel_generator_api_key'
const API_BASE_URL_STORAGE_KEY = 'novel_generator_api_base_url'

export function getApiKey(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(API_KEY_STORAGE_KEY) || ''
}

export function setApiKey(key: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(API_KEY_STORAGE_KEY, key)
}

export function getApiBaseUrl(): string {
  if (typeof window === 'undefined') return 'https://api.deepseek.com/v1'
  return localStorage.getItem(API_BASE_URL_STORAGE_KEY) || 'https://api.deepseek.com/v1'
}

export function setApiBaseUrl(url: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(API_BASE_URL_STORAGE_KEY, url)
}


