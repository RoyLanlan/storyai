'use client'

import { styleOptions, Module } from '@/lib/modules'
import { Settings } from 'lucide-react'

interface SidebarProps {
  selectedModule: Module
  onSelectModule: (module: Module) => void
  onOpenSettings: () => void
}

export default function Sidebar({ selectedModule, onSelectModule, onOpenSettings }: SidebarProps) {
  return (
    <div className="w-64 bg-black border-r border-gray-800 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">小说高潮生成器</h1>
        <p className="text-xs text-gray-500 mt-1">AI 写作辅助工具</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            文风滤镜
          </h2>
          <div className="space-y-2">
            {styleOptions.map((module) => (
              <button
                key={module.id}
                onClick={() => onSelectModule(module)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  selectedModule.id === module.id
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
                }`}
              >
                <div className="font-medium text-sm">{module.name}</div>
                <div className="text-xs mt-1 opacity-60">{module.nameEn}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-gray-300 rounded-lg hover:bg-gray-800 border border-gray-800 transition-all duration-200"
        >
          <Settings size={18} />
          <span>设置</span>
        </button>
      </div>
    </div>
  )
}


