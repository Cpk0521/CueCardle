import React from 'react'

export default function ImageBox({canvasRef}) {
  return (
    <div className='ImageBox'>
      <canvas ref={canvasRef} width={300} height={300}/>
    </div>
  )
}
