import React from 'react'

export default function ImageBox({canvasRef}) {
  return (
    // <div className='imageBox-full'>
    //    <canvas ref={canvasRef} width={1334} height={750} className='imageCanvas'/>
    // </div>
    <div className='imageContent'>
      <div className='imageBox-grid'>
        <canvas ref={(el) => canvasRef.current[0] = el} className='imageCanvas' width={150} height={750}/>
        <canvas ref={(el) => canvasRef.current[1] = el} className='imageCanvas' width={150} height={750}/>
        <canvas ref={(el) => canvasRef.current[2] = el} className='imageCanvas' width={150} height={750}/>
        <canvas ref={(el) => canvasRef.current[3] = el} className='imageCanvas' width={150} height={750}/>
        <canvas ref={(el) => canvasRef.current[4] = el} className='imageCanvas' width={150} height={750}/>
        <canvas ref={(el) => canvasRef.current[5] = el} className='imageCanvas' width={150} height={750}/>
      </div>
    </div>
  )
}
