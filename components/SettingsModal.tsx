'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { getApiKey, setApiKey, getApiBaseUrl, setApiBaseUrl } from '@/lib/storage'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [apiKey, setApiKeyState] = useState('')
  const [apiBaseUrl, setApiBaseUrlState] = useState('')

  useEffect(() => {
    if (isOpen) {
      setApiKeyState(getApiKey())
      setApiBaseUrlState(getApiBaseUrl())
    }
  }, [isOpen])

  const handleSave = () => {
    setApiKey(apiKey)
    setApiBaseUrl(apiBaseUrl)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">设置</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKeyState(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder:text-gray-600"
              placeholder="输入您的API Key"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              API Base URL (可选)
            </label>
            <input
              type="text"
              value={apiBaseUrl}
              onChange={(e) => setApiBaseUrlState(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder:text-gray-600"
              placeholder="https://api.deepseek.com/v1"
            />
            <p className="text-xs text-gray-500 mt-2">
              默认: https://api.deepseek.com/v1 (DeepSeek)
            </p>
            <p className="text-xs text-gray-600 mt-1">
              也支持 OpenAI、Moonshot 等其他兼容格式的 API
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 bg-white text-black px-4 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium"
          >
            保存
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-800 text-gray-300 px-4 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 border border-gray-700"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  )
}


