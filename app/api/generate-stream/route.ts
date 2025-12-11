import { NextRequest } from 'next/server'
import { getModuleById } from '@/lib/modules'
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { moduleId, theme, apiKey, apiBaseUrl, styleFilterId } = await request.json()

    if (!moduleId || !theme) {
      return new Response(JSON.stringify({ error: '缺少必要参数' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (!apiKey) {
      return new Response(JSON.stringify({ error: '请先设置API Key' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const module = getModuleById(moduleId)
    if (!module) {
      return new Response(JSON.stringify({ error: '模组不存在' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 获取文风滤镜（如果提供）
    let styleFilterPrompt = ''
    if (styleFilterId) {
      const styleFilter = getModuleById(styleFilterId)
      if (styleFilter) {
        styleFilterPrompt = styleFilter.systemPrompt
      }
    }

    // 组合系统提示词：先应用文风滤镜，再应用模组功能
    let combinedPrompt = module.systemPrompt
    if (styleFilterPrompt) {
      combinedPrompt = `${styleFilterPrompt}\n\n重要：在应用上述文风风格的基础上，执行以下功能要求：${module.systemPrompt}\n\n请确保生成的内容既符合文风要求，又体现模组的功能特色。`
    }

    // 调用DeepSeek API (兼容OpenAI格式，流式输出)
    const baseUrl = apiBaseUrl || 'https://api.deepseek.com/v1'
    const model = baseUrl.includes('deepseek') ? 'deepseek-chat' : 'gpt-3.5-turbo'
    
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: combinedPrompt,
          },
          {
            role: 'user',
            content: `根据以下主题生成小说片段：${theme}`,
          },
        ],
        temperature: 0.7,
        stream: true, // 启用流式输出
      }),
    })

    if (!response.ok) {
      // 尝试读取错误信息
      let errorMessage = 'API调用失败'
      try {
        const errorText = await response.text()
        const errorData = JSON.parse(errorText)
        errorMessage = errorData.error?.message || errorData.message || errorMessage
      } catch (e) {
        // 如果无法解析，使用默认错误信息
      }
      
      if (response.status === 401) {
        errorMessage = 'API Key 无效或已过期，请检查设置中的 API Key 是否正确'
      } else if (response.status === 403) {
        errorMessage = 'API Key 没有权限访问此服务'
      } else if (response.status === 429) {
        errorMessage = '请求过于频繁，请稍后再试'
      } else if (response.status === 500) {
        errorMessage = 'API 服务器错误，请稍后再试'
      }
      
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 创建流式响应
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        if (!reader) {
          controller.close()
          return
        }

        try {
          while (true) {
            const { done, value } = await reader.read()
            
            if (done) {
              controller.close()
              break
            }

            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk.split('\n')

            for (const line of lines) {
              const trimmedLine = line.trim()
              if (!trimmedLine) continue
              
              if (trimmedLine.startsWith('data: ')) {
                const data = trimmedLine.slice(6).trim()
                
                if (data === '[DONE]') {
                  controller.close()
                  return
                }

                if (data === '') continue

                try {
                  const json = JSON.parse(data)
                  const content = json.choices?.[0]?.delta?.content || ''
                  
                  if (content) {
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`))
                  }
                } catch (e) {
                  // 忽略解析错误
                }
              }
            }
          }
        } catch (error: any) {
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || '服务器错误' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

