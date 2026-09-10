"use client"
import React, { useRef, useState } from 'react'
import dynamic from "next/dynamic"
import "@excalidraw/excalidraw/index.css"
import axios from 'axios'
import { useParams } from 'next/navigation'
import { toast } from '@/components/ui/toast'
import './whiteboard.css'
import { ArrowRight, Circle, Diamond, Eraser, Hand, Image, Minus, MousePointer2, Pencil, Square, Type } from 'lucide-react'
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types'


const tools = [
  {
    name:'selection',
    icon:MousePointer2,
    color:"text-blue-600"
  },
  {
    name:'hand',
    icon:Hand,
    color:"text-cyan-600"
  },
   {
    name:'rectangle',
    icon: Square,
    color:"text-blue-600"
  },
  {
    name:'diamond',
    icon: Diamond,
    color:"text-emerald-500"
  },
  {
    name:'ellipse',
    icon: Circle,
    color:"text-amber-500"
  },
  {
    name:'arrow',
    icon: ArrowRight,
    color:"text-violet-500"
  },
  {
    name:'line',
    icon: Minus,
    color:"text-pink-500"
  },
  {
    name:'freedraw',
    icon: Pencil,
    color:"text-orange-500"
  },
  {
    name:'text',
    icon: Type,
    color:"text-indigo-500"
  },
  {
    name:'image',
    icon: Image,
    color:"text-green-600"
  },
  {
    name:'eraser',
    icon: Eraser,
    color:"text-black-500"
  }
]

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((module) => module.Excalidraw),
  { ssr: false }
)

function Whiteboard() {

  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI|null>(null);
  const saveTimeRef=useRef<any>(null);
  const {projectid} = useParams();
  const [activeTool, setActiveTool] = useState('selection');

  const handleCanvasChange =(elements:readonly any[], appState:any, files:any)=>{
    //Cancel Prev Time
    if (saveTimeRef?.current)
    {

      clearTimeout(saveTimeRef.current)

    }
    saveTimeRef.current=setTimeout(() => {
      void (async () => {
        try {
          await saveCanvasChanges(elements, appState, files);
          toast.add({
            title:'Changes Saved!',
            type:'success'
          })
        } catch {
          toast.add({
            title:'Failed to save changes',
            type:'error'
          })
        }
      })();
    },10000)
  };

  const saveCanvasChanges = async (elements:readonly any[], appState:any, files:any) => {

    const result = await axios.post('/api/whiteboard',{
        elements:elements,
        appState:appState,
        files:files,
        projectId:projectid
    }, {
      validateStatus: (status) => status >= 200 && status < 300
    });

  }

  const changeTool = (tool:any) => {
    if(!excalidrawAPI) return;

    setActiveTool(tool);
    excalidrawAPI.setActiveTool({
      type:tool
    })

  } 

  return (
    <div style={{height: "90vh"}}>
      <Excalidraw
      //@ts-ignore
      excalidrawAPI={(api)=>setExcalidrawAPI(api)} 
      onChange={handleCanvasChange} />
      <div className='absolute left-4 top-1/2 z-50 -translate-1/2 
      flex flex-col gap-1 rounded-2xl bg-white border p-1.5 shadow-xl'>

        {tools.map((tool) => {
           const Icon=tool.icon
           return (
            <button className={`flex h-10 w-10 items-center justify-center 
            rounded-xl transition hover:bg-primary/10 hover:cursor-pointer 
            ${activeTool==tool.name ? "bg-primary/10": null}`} 
            aria-label={tool.name}
            aria-pressed={activeTool === tool.name}
            onClick={()=>changeTool(tool.name)}>
                <Icon size='19' className={tool.color} />
            </button>
           )
        })}

      </div>
    </div>
  )
}

export default Whiteboard
