import React from 'react'

export default function ImageBox({canvasRef}) {
  return (
    <div className='imageBox'>
       <canvas ref={canvasRef} width={1334} height={750} className='imageCanvas'/>
    </div>
  )
}
