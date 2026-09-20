import { PencilRuler, Sparkle, X } from 'lucide-react'
import React from 'react'

function AIFloatingSidebar() {

  const AiTools = [
    {
        name: 'Generate Diagrams',
        desc: 'Generate diagrams in seconds',
        icon: <PencilRuler />,
        color: "text-blue-600"
    }
  ]
  return (
    <div className='absolute z-50 right-15 bottom-24 
    w-380px p-5 max-h-620px 
    overflow-hidden border rounded-xl shadow-2xl bg-white'>
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='font-medium text-xl flex items-center gap-2'><Sparkle /> AI Assistant </h2>
                <X />
            </div>
            <p className='text-gray-400 text-sm'>Turn ideas to visuals in seconds</p>
        </div>
    </div>
  )
}

export default AIFloatingSidebar