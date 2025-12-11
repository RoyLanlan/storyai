// 模组配置和System Prompt预设
export interface Module {
  id: string
  name: string
  nameEn: string
  systemPrompt: string
}

// 所有模组（用于随机生成）
export const allModules: Module[] = [
  {
    id: 'action',
    name: '高燃动作',
    nameEn: 'Action',
    systemPrompt: '[占位符] 专注于战斗和微观慢动作的系统提示词。你将生成充满张力的动作场景，注重细节描写和节奏感。',
  },
  {
    id: 'atmosphere',
    name: '沉浸环境',
    nameEn: 'Atmosphere',
    systemPrompt: '[占位符] 专注于场景与光影的系统提示词。你将生成富有氛围感的场景描写，注重环境细节和感官体验。',
  },
  {
    id: 'dialogue',
    name: '博弈对话',
    nameEn: 'Dialogue',
    systemPrompt: '[占位符] 专注于言语交锋的系统提示词。你将生成充满张力的对话场景，注重语言技巧和心理博弈。',
  },
  {
    id: 'psychology',
    name: '深潜心理',
    nameEn: 'Psychology',
    systemPrompt: '[占位符] 专注于意识流的系统提示词。你将生成深入的心理描写，展现角色的内心世界和思维过程。',
  },
  {
    id: 'lore',
    name: '史诗传说',
    nameEn: 'Lore',
    systemPrompt: '[占位符] 伪纪录片风格的历史记载系统提示词。你将生成史诗般的叙述，采用历史记录或传说的口吻。',
  },
  {
    id: 'craft',
    name: '匠心技艺',
    nameEn: 'Craft',
    systemPrompt: '[占位符] 专业技能的操作描写系统提示词。你将生成详细的专业技能操作过程，注重技术细节和手法。',
  },
  {
    id: 'crowd',
    name: '宏大群像',
    nameEn: 'Crowd',
    systemPrompt: '[占位符] 群体行为与混乱场面系统提示词。你将生成宏大的群体场景，展现集体行为和混乱场面的动态。',
  },
  {
    id: 'dream',
    name: '荒诞梦境',
    nameEn: 'Dream',
    systemPrompt: '[占位符] 超现实主义描写系统提示词。你将生成荒诞离奇的梦境场景，打破现实逻辑，充满想象力。',
  },
  {
    id: 'intimacy',
    name: '情感拉扯',
    nameEn: 'Intimacy',
    systemPrompt: '[占位符] 细腻的暧昧与张力系统提示词。你将生成充满情感张力的场景，注重微妙的情感和心理描写。',
  },
]

// 文风滤镜的明细选项
export const styleOptions: Module[] = [
  {
    id: 'style-classic',
    name: '古典文风',
    nameEn: 'Classic',
    systemPrompt: '[占位符] 采用古典文学风格，使用典雅的语言和修辞手法，营造庄重典雅的叙事氛围。',
  },
  {
    id: 'style-modern',
    name: '现代文风',
    nameEn: 'Modern',
    systemPrompt: '[占位符] 采用现代文学风格，语言简洁明快，节奏紧凑，符合当代阅读习惯。',
  },
  {
    id: 'style-poetic',
    name: '诗意文风',
    nameEn: 'Poetic',
    systemPrompt: '[占位符] 采用诗意化的语言风格，注重意象和隐喻，营造诗意的叙事氛围。',
  },
  {
    id: 'style-minimalist',
    name: '极简文风',
    nameEn: 'Minimalist',
    systemPrompt: '[占位符] 采用极简主义风格，语言精炼，去除冗余，用最少的文字表达最丰富的内容。',
  },
  {
    id: 'style-gothic',
    name: '哥特文风',
    nameEn: 'Gothic',
    systemPrompt: '[占位符] 采用哥特式文学风格，营造神秘、阴郁、恐怖的氛围，注重环境描写和心理刻画。',
  },
  {
    id: 'style-stream',
    name: '意识流',
    nameEn: 'Stream of Consciousness',
    systemPrompt: '[占位符] 采用意识流写作手法，展现角色的内心独白和思维流动，打破传统叙事结构。',
  },
  {
    id: 'style-journalistic',
    name: '新闻体',
    nameEn: 'Journalistic',
    systemPrompt: '[占位符] 采用新闻体风格，客观、准确、简洁，注重事实陈述和逻辑清晰。',
  },
  {
    id: 'style-dialect',
    name: '方言体',
    nameEn: 'Dialect',
    systemPrompt: '[占位符] 采用方言体风格，使用地方特色语言，增强地域感和真实感。',
  },
  {
    id: 'style-meme',
    name: '沙雕吐槽',
    nameEn: 'Meme & Roast',
    systemPrompt: '采用沙雕吐槽类文风，具有以下特点：\n1. 解构严肃：用幽默消解悲剧色彩，把惨事当段子讲，用轻松调侃的方式处理沉重话题。\n2. 打破第四面墙：主角内心戏极其丰富，喜欢自我吐槽（自黑），经常跳出剧情对读者或自己进行调侃。\n3. 网络热梗：夹杂大量互联网黑话、表情包式的描述，使用流行网络用语、梗文化，让文字充满现代感和趣味性。\n4. 夸张对比：情绪转换极快，上一秒哭下一秒笑，用强烈的反差制造喜剧效果。\n\n整体风格轻松幽默，语言活泼，充满自嘲和调侃，让读者在笑声中感受故事。',
  },
]

// 获取所有模组（用于随机选择，不包括文风滤镜）
export function getAllModules(): Module[] {
  return allModules
}

// 随机选择N个模组（不包括文风滤镜）
export function getRandomModules(count: number = 2): Module[] {
  const all = getAllModules()
  const shuffled = [...all].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function getModuleById(id: string): Module | undefined {
  const all = getAllModules()
  return all.find(m => m.id === id)
}


