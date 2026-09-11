"use client"
import { Circle, Diamond, Palette, Square, Type } from 'lucide-react'
import React from 'react'


type Props = {
    selectedElement:any
    position:{
        left: number
        top: number
    }

}

function FloatingProperties({ selectedElement, position}: Props) {

  if (!selectedElement) return null;
  
  const type = selectedElement.type;


  const isText = type === "text";
  const isShape = ["rectangle","ellipse","diamond"].includes(type);
  const isLine = type === "line";
  const isArrow = type === "arrow";
  const isFreeDraw = type === "freedraw"; 


  return (
    <div className='absolute z-[100] flex -translate-x-1/2 items-center gap-1' style={{
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
   

      {/* COMMON PROPERTY */}
      <button>
        <Palette size={18} />
      </button>

    </div>
  )
}

export default FloatingProperties;
