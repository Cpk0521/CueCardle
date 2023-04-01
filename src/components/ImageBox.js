import React from 'react'

export default function ImageBox({canvasRef}) {
  return (
    <div className='imageContent'>
      <div className='imageBox'>
        <canvas ref={canvasRef} className='imageCanvas' />
        {/* <canvas ref={canvasRef} className='imageCanvas' width={300|1334} height={300|750}/> */}
      </div>
    </div>
  )
}
