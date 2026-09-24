import { Textarea } from '@/components/ui/textarea'
import { Button } from '@base-ui/react'
import { convertToExcalidrawElements } from '@excalidraw/excalidraw/index'
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types'
import {
  Monitor,
  Network,
  PencilRuler,
  Smartphone,
  Sparkles,
  Workflow,
  X,
  ArrowUp
} from 'lucide-react'
import React, { useState } from 'react'

type Props={
  excalidrawApi:ExcalidrawImperativeAPI | null
}

function AIFloatingSidebar({excalidrawApi}:Props) {
  const [selectedTool, setSelectedTool] = useState("Generate Diagrams");
  const AI_PLACEHOLDER_ID ='ai-generation-placeholder';
  const AiTools = [
    {
      name: 'Generate Diagram',
      desc: 'Create a visual diagram from an idea',
      icon: PencilRuler,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
    },
    {
      name: 'Flowchart',
      desc: 'Turn ideas into visual flows',
      icon: Workflow,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
    },
    {
      name: 'Architecture',
      desc: 'Design system architecture diagrams',
      icon: Network,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-50',
    },
    {
      name: 'Web Mockup',
      desc: 'Generate website wireframes',
      icon: Monitor,
      iconColor: 'text-cyan-600',
      iconBg: 'bg-cyan-50',
    },
    {
      name: 'Mobile Mockup',
      desc: 'Create mobile app wireframes',
      icon: Smartphone,
      iconColor: 'text-pink-600',
      iconBg: 'bg-pink-50',
    },
  ]

  const getEmptyCanvasPosition = () =>{
    if(!excalidrawApi)
    {
      return {x:100,y:100}
    }

    const elements = excalidrawApi.getSceneElements().filter(element=>!element.isDeleted)

    if(elements.length==0)
    {
      return {x:100,y:100}
    }

    const maxRight=Math.max(...elements.map((element)=>element.x+element.width))
    const minTop=Math.min(...elements.map((element)=>element.y))

    return {
      x:maxRight + 150,
      y:minTop
    }
  }

  const addAiPlaceholder =() =>{
    if(!excalidrawApi) return ;

    const position=getEmptyCanvasPosition();

    const placeholderElements=convertToExcalidrawElements([
      {
        type:'rectangle',
        id: AI_PLACEHOLDER_ID,
        x: position.x,
        y: position.y,
        width:420,
        height:250,
        backgroundColor:'#f5f3ff',
        strokeColor:'#8b5cf6',
        fillStyle:"solid",
        strokeWidth: 2,
        roughness: 0,
        roundness: {
          type: 3
        }
      }
    ])
    const currentElements = excalidrawApi.getSceneElements();

    excalidrawApi.updateScene({
      elements:[
        ...currentElements,
        ...placeholderElements
      ]
    })
  }

  const onClickGenerate=()=>{
    addAiPlaceholder();
  }

  return (
    <div
      className="
        absolute z-50 right-6 bottom-20
        w-390px
        overflow-hidden
        rounded-2xl
        border border-gray-200/80
        bg-white/95
        shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]
        backdrop-blur-xl
      "
    >
      {/* Header */}
      <div className="border-b border-gray-100 px-5 pt-5 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl
                bg-linear-to-br from-violet-500 to-blue-500
                text-white
                shadow-sm
              "
            >
              <Sparkles size={18} />
            </div>

            <div>
              <h2 className="text-[15px] font-semibold text-gray-900">
                AI Assistant
              </h2>
              <p className="mt-0.5 text-xs text-gray-400">
                Turn ideas into visuals
              </p>
            </div>
          </div>

          <button
            aria-label="Close AI assistant"
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg
              text-gray-400
              transition
              hover:bg-gray-100
              hover:text-gray-700
            "
          >
            <X size={17} onClick={close} />
          </button>
        </div>
      </div>

      {/* Tools */}
      <div className="px-5 pt-4">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Create with AI
          </span>

          <span className="text-[11px] text-gray-400">
            5 tools
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {AiTools.map((tool, index) => {
            const Icon = tool.icon

            return (
              <button
                key={index}
                className="
                  group
                  flex items-start gap-2.5
                  rounded-xl
                  border border-gray-100
                  bg-gray-50/50
                  p-3
                  text-left
                  transition-all
                  duration-200
                  hover:border-gray-200
                  hover:bg-white
                  hover:shadow-sm
                "
              >
                <div
                  className={`
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-lg
                    ${tool.iconBg}
                    ${tool.iconColor}
                    transition-transform
                    group-hover:scale-105
                  `}
                >
                  <Icon size={16} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-gray-800">
                    {tool.name}
                  </p>

                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-gray-400">
                    {tool.desc}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Prompt */}
      <div className="px-5 pb-5 pt-5">
        <div className="mb-2">
          <label className="text-xs font-semibold text-gray-700">
            Describe what you want to create
          </label>
          <p className="mt-0.5 text-[11px] text-gray-400">
            Be as specific as you'd like
          </p>
        </div>

        <div
          className="
            relative
            rounded-xl
            border border-gray-200
            bg-gray-50
            transition
            focus-within:border-violet-300
            focus-within:bg-white
            focus-within:ring-2
            focus-within:ring-violet-100
          "
        >
          <Textarea
            placeholder="E.g. Customer onboarding flow with decision points..."
            className="
              min-h-90px
              resize-none
              border-0
              bg-transparent
              pr-12
              text-xs
              shadow-none
              focus-visible:ring-0
            "
          />

          <Button
            className="
              absolute
              bottom-2.5
              right-2.5
              flex h-8 w-8
              items-center justify-center
              rounded-lg
              bg-gray-900
              p-0
              text-white
              shadow-sm
              transition
              hover:bg-gray-800
              disabled:opacity-50
            "
            onClick={onClickGenerate}
          > Generate
            <ArrowUp size={14} />
          </Button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] text-gray-400">
            AI-generated content may need review
          </span>

          <span className="text-[10px] text-gray-400">
            ⌘ ↵ to generate
          </span>
        </div>
      </div>
    </div>
  )
}

export default AIFloatingSidebar