"use client"
import { Separator } from '@/components/ui/separator'
import { ToolbarButton } from '@base-ui/react'
import { Circle, Diamond, Palette, Square, Type } from 'lucide-react'
import React, { useState } from 'react'


type Props = {
    selectedElement:any
    position:{
        left: number
        top: number
    }
    onDelete?: () => void
    onDuplicate?: () => void
    onLock?: () => void

    onBringToFront?: () => void
    onSendToBack?: () => void 

    onPropertyChange?: (
      property: string,
      value: any
    ) => void
}

const COLORS = [
  "#1e1e1e",
  "e313131"
]

/**
 * Displays the selected element's type and palette button at an absolute
 * position, or renders nothing when there is no selected element.
 */
function FloatingProperties({ selectedElement, position, 
    onDelete, 
    onDuplicate, 
    onLock, 
    onBringToFront, 
    onSendToBack,  
    onPropertyChange }: Props) {

  
  const [dragOffset, setDragOffset] = useState({
    x: 0,
    y: 0,
  });

  if (!selectedElement) return null;
  
  const type = selectedElement.type;


  const isText = type === "text";
  const isShape = ["rectangle","ellipse","diamond"].includes(type);
  const isLine = type === "line";
  const isArrow = type === "arrow";
  const isFreeDraw = type === "freedraw"; 


  return (
    <div className='absolute z-100 flex -translate-x-1/2 items-center gap-1' style={{
        left: position.left,
        top: position.top, 
    }}>
      {/* Element Properties */}
      <div className='flex h-9 items-center gap-2 rounded-lg px-2 text-sm'>
        {type === "rectangle" && <Square size={17} />}
        {type === "ellipse" && <Circle size={17} />}
        {type === "diamond" && <Diamond size={17} />}
        {isText && <Type size={17} />}
        {isLine && <Type size={17} />}
        {isArrow && <Type size={17} />}
        {isFreeDraw && <Type size={17 }/>}

        <span className='capitalize'>{type}</span>

      </div>

    <Separator />
   

      {/* COMMON PROPERTY */}
      <button className='flex h-9 v-9 items-center justify-center rounded-xl'>
        <Palette size={18} />
      </button>

       {/* TEXT */}

       {isText && (
          <>
            <Separator />
            <button className='h-9 rounded-lg px-3 text-sm hover:bg-green-50'>
              Font
            </button>
            <button className='h-9 rounded-lg px-3 text-sm hover:bg-green-50'>
              {selectedElement.fontSize || 20}px

            </button>
          </>
       )}

       {/* LINE */}

       {isLine && (
          <>
            <Separator />
            <button className='h-9 rounded-lg px-3 text-sm hover:bg-green-50'>
              Font
            </button>
            <button className='h-9 rounded-lg px-3 text-sm hover:bg-green-50'>
              {selectedElement.fontSize || 20}px

            </button>
          </>
       )}

       {/* ARROW */}

       {isArrow && (
          <>
            <Separator />
            <button className='h-9 rounded-lg px-3 text-sm hover:bg-green-50'>
              Font
            </button>
            <button className='h-9 rounded-lg px-3 text-sm hover:bg-green-50'>
              {selectedElement.fontSize || 20}px

            </button>
          </>
       )}

       {/* FREEDRAW */}

       {isFreeDraw && (
          <>
            <Separator />
            <button className='h-9 rounded-lg px-3 text-sm hover:bg-green-50'>
              Font
            </button>
            <button className='h-9 rounded-lg px-3 text-sm hover:bg-green-50'>
              {selectedElement.fontSize || 20}px

            </button>
          </>
       )}






    </div>
  )
}

export default FloatingProperties;
