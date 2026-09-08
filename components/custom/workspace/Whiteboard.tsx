"use client"
import React, { useState } from 'react'
import dynamic from "next/dynamic"
import "@excalidraw/excalidraw/index.css"

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((module) => module.Excalidraw),
  { ssr: false }
)

function Whiteboard() {

  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const handleCanvasChange =(elements:readonly any[], appState:any)=>{
    console.log(appState);
  };

  return (
    <div style={{height: "90vh"}}>
      <Excalidraw
      //@ts-ignore
      excalidrawAPI={(api)=>setExcalidrawAPI(api)} 
      onChange={handleCanvasChange} />
    </div>
  )
}

export default Whiteboard
