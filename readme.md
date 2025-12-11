# 小说高潮生成器

一个基于 Next.js 的 AI 写作辅助工具，帮助用户生成不同类型的小说片段。

## 功能特点

- 10 种不同的写作模组
- 极简黑白灰设计风格
- 支持自定义 API Key
- Markdown 渲染支持
- 响应式布局

## 技术栈

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Lucide React (图标)
- React Markdown

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 运行开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问 http://localhost:3000

## 使用说明

1. **配置 API Key**：
   - 点击左下角"设置"按钮
   - 输入您的 DeepSeek API Key（默认已配置 DeepSeek API 地址）
   - 如需使用其他 API（如 OpenAI、Moonshot），可修改 API Base URL
   - 点击"保存"

2. **生成小说片段**：
   - 从左侧侧边栏选择一个模组
   - 在输入框中输入主题
   - 点击"生成碎片"按钮
   - 查看生成的小说片段

## API 配置

### DeepSeek（默认）
- **API Base URL**: `https://api.deepseek.com/v1`
- **模型**: `deepseek-chat`
- **获取 API Key**: 访问 [DeepSeek 开放平台](https://platform.deepseek.com/)

### 其他支持的 API
应用支持所有 OpenAI 兼容格式的 API，包括：
- OpenAI
- Moonshot (月之暗面)
- 其他兼容 OpenAI 格式的 API 服务

只需在设置中修改 API Base URL 和对应的模型名称即可。

## 模组说明

- **Action (高燃动作)**: 专注于战斗和微观慢动作
- **Atmosphere (沉浸环境)**: 专注于场景与光影
- **Dialogue (博弈对话)**: 专注于言语交锋
- **Psychology (深潜心理)**: 专注于意识流
- **Lore (史诗传说)**: 伪纪录片风格的历史记载
- **Craft (匠心技艺)**: 专业技能的操作描写
- **Crowd (宏大群像)**: 群体行为与混乱场面
- **Dream (荒诞梦境)**: 超现实主义描写
- **Intimacy (情感拉扯)**: 细腻的暧昧与张力
- **Style (文风滤镜)**: 不改剧情，只改叙事风格


