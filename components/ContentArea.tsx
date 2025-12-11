'use client'

import { useState } from 'react'
import { Module, getRandomModules } from '@/lib/modules'
import ReactMarkdown from 'react-markdown'
import { getApiKey, getApiBaseUrl } from '@/lib/storage'
import { X, AlertCircle, Shuffle } from 'lucide-react'
import { getRandomTheme } from '@/lib/themes'

interface ContentAreaProps {
  selectedModule: Module
  onOpenSettings?: () => void
}

export default function ContentArea({ selectedModule, onOpenSettings }: ContentAreaProps) {
  const [theme, setTheme] = useState('')
  const [contents, setContents] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedModules, setSelectedModules] = useState<Module[]>([])

  const handleRandomTheme = () => {
    const randomTheme = getRandomTheme()
    setTheme(randomTheme)
  }

  const handleGenerate = async () => {
    // 如果没有输入主题，自动使用随机主题
    const finalTheme = theme.trim() || getRandomTheme()
    
    if (!finalTheme) {
      setError('请输入主题或点击随机生成')
      return
    }

    const apiKey = getApiKey()
    if (!apiKey) {
      setError('请先在设置中配置 API Key')
      return
    }

    setIsLoading(true)
    setContents({})
    setError(null)

    // 随机选择2个模组（不包括文风滤镜）
    const randomModules = getRandomModules(2)
    setSelectedModules(randomModules)

    try {
      // 并行调用两个模组生成内容，应用选中的文风滤镜，使用流式输出
      const promises = randomModules.map(async (module) => {
        const response = await fetch('/api/generate-stream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
            body: JSON.stringify({
            moduleId: module.id,
            theme: finalTheme,
            apiKey,
            apiBaseUrl: getApiBaseUrl(),
            styleFilterId: selectedModule.id, // 传递选中的文风滤镜ID
          }),
        })

        if (!response.ok) {
          let message = '生成失败'
          try {
            const errorText = await response.text()
            const errorData = JSON.parse(errorText)
            message = errorData.error || errorData.message || message
          } catch {
            // ignore parse error, use fallback
          }
          throw new Error(message)
        }

        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let content = ''
        let buffer = ''

        if (!reader) {
          throw new Error('无法读取响应流')
        }

        while (true) {
          const { done, value } = await reader.read()
          
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          buffer += chunk
          const lines = buffer.split('\n')
          // 保留最后一行的残余，等待下一次补全
          buffer = lines.pop() || ''

          for (const line of lines) {
            const trimmedLine = line.trim()
            if (!trimmedLine) continue
            
            if (trimmedLine.startsWith('data: ')) {
              const data = trimmedLine.slice(6).trim()
              
              if (data === '[DONE]' || data === '') {
                continue
              }

              try {
                const json = JSON.parse(data)
                if (json.content) {
                  content += json.content
                  // 实时更新对应模组的内容
                  setContents(prev => ({
                    ...prev,
                    [module.id]: content,
                  }))
                }
              } catch (e) {
                // 忽略解析错误
              }
            }
          }
        }

        return { moduleId: module.id, content }
      })

      await Promise.all(promises)
      setError(null)
    } catch (error: any) {
      // 处理网络错误
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError('网络连接失败，请检查网络设置或 API Base URL 是否正确')
      } else {
        setError(error.message || '生成失败，请检查 API Key 和网络连接')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-black">
      <div className="p-8 border-b border-gray-800">
        <h2 className="text-3xl font-bold text-white">{selectedModule.name}</h2>
        <p className="text-gray-400 mt-1 text-sm">{selectedModule.nameEn}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 网站介绍 */}
          <div className="text-center py-4">
            <p className="text-gray-300 text-base leading-relaxed">
              选择文风滤镜，输入或随机生成主题，AI 将为你创作独特的小说片段
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-400">
                请输入主题
              </label>
              <button
                onClick={handleRandomTheme}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-gray-300 rounded-lg hover:bg-gray-800 border border-gray-800 transition-all duration-200 text-sm"
              >
                <Shuffle size={16} />
                <span>随机生成</span>
              </button>
            </div>
            <textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="例如：办公室里，我习惯性的又抠起了脚..."
              className="w-full h-40 px-5 py-4 bg-gray-900 text-white border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent resize-none placeholder:text-gray-600 text-sm leading-relaxed transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">
              参考网络热点事件随机生成主题。用户可以不用输入，同时也允许用户手动输入。
            </p>
          </div>

          <div>
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-white text-black px-6 py-4 rounded-lg hover:bg-gray-100 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white font-medium text-sm"
            >
              {isLoading ? '生成中...' : '生成碎片'}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-red-400 text-sm font-medium mb-1">错误</p>
                <p className="text-red-300 text-sm">{error}</p>
                {error.includes('API Key') && onOpenSettings && (
                  <button
                    onClick={() => {
                      setError(null)
                      onOpenSettings()
                    }}
                    className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
                  >
                    前往设置
                  </button>
                )}
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {selectedModules.length > 0 && (
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
              <div className="text-sm text-gray-400 space-y-1">
                <div>
                  <span className="font-medium text-gray-300">文风滤镜：</span>
                  <span className="text-white">{selectedModule.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-300">本次使用模组：</span>
                  {selectedModules.map((m, i) => (
                    <span key={m.id} className="text-gray-300">
                      {i > 0 && '、'}
                      {m.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedModules.length > 0 && (
            <div className="mt-8 space-y-6">
              {selectedModules.map((module) => (
                <div key={module.id} className="p-8 bg-gray-900 rounded-lg border border-gray-800 shadow-lg">
                  <div className="mb-4 pb-4 border-b border-gray-800">
                    <h3 className="text-lg font-bold text-white">{module.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{module.nameEn}</p>
                  </div>
                  <div className="prose prose-sm max-w-none prose-invert prose-headings:text-white prose-p:text-gray-200 prose-strong:text-white">
                    {contents[module.id] ? (
                      <ReactMarkdown>{contents[module.id]}</ReactMarkdown>
                    ) : (
                      <div className="text-gray-500 text-sm">
                        {isLoading ? '生成中...' : '等待生成'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


