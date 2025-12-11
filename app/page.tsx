'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import ContentArea from '@/components/ContentArea'
import SettingsModal from '@/components/SettingsModal'
import { styleOptions, Module } from '@/lib/modules'

export default function Home() {
  const [selectedModule, setSelectedModule] = useState<Module>(styleOptions[0])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Sidebar
        selectedModule={selectedModule}
        onSelectModule={setSelectedModule}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <ContentArea 
        selectedModule={selectedModule}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  )
}


