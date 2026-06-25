'use client'

import { useState, useEffect } from 'react'
import { ReconstructionEngine } from './ReconstructionEngine'
import { MemoryConstellation } from './MemoryConstellation'
import { TimelineExcavation } from './TimelineExcavation'

const PROTOTYPES = [
  { id: 1, label: 'Reconstruction Engine',  hint: 'Fragments assemble into a sentence' },
  { id: 2, label: 'Memory Constellation',   hint: 'Nodes light up, connections form' },
  { id: 3, label: 'Timeline Excavation',    hint: 'History uncovered layer by layer' },
]

export function PrototypeSwitcher() {
  const [active, setActive] = useState(1)
  // Force remount on switch so GSAP timeline restarts cleanly
  const [key, setKey] = useState(0)

  function switchTo(id: number) {
    setActive(id)
    setKey((k) => k + 1)
  }

  return (
    <div className="relative">
      {/* Prototype */}
      <div key={key}>
        {active === 1 && <ReconstructionEngine />}
        {active === 2 && <MemoryConstellation />}
        {active === 3 && <TimelineExcavation />}
      </div>

      {/* Switcher tabs — fixed bottom-right, review only */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#CBC1B5]/30 mb-1">
          prototype
        </p>
        {PROTOTYPES.map((p) => (
          <button
            key={p.id}
            onClick={() => switchTo(p.id)}
            className={[
              'group flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-200',
              active === p.id
                ? 'border-[#A07C4A]/60 bg-[#A07C4A]/10 text-[#A07C4A]'
                : 'border-white/[0.07] bg-[#090D17]/80 text-[#CBC1B5]/50 hover:border-white/[0.14] hover:text-[#CBC1B5]',
            ].join(' ')}
          >
            <span
              className="h-1.5 w-1.5 rounded-full flex-shrink-0"
              style={{ background: active === p.id ? '#A07C4A' : 'rgba(203,193,181,0.3)' }}
            />
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}
