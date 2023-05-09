import React from 'react'

export default function ImageBox({canvasRef}) {
  return (
    <div className='imageContent'>
      <div className='imageBox'>
        <canvas ref={(el) => canvasRef.current[0] = el} className='imageCanvas' width={500} height={500}/>
        <canvas ref={(el) => canvasRef.current[1] = el} className='imageCanvas' width={500} height={500}/>
        <canvas ref={(el) => canvasRef.current[2] = el} className='imageCanvas' width={500} height={500}/>
        <canvas ref={(el) => canvasRef.current[3] = el} className='imageCanvas' width={500} height={500}/>
        <canvas ref={(el) => canvasRef.current[4] = el} className='imageCanvas' width={500} height={500}/>
        <canvas ref={(el) => canvasRef.current[5] = el} className='imageCanvas' width={500} height={500}/>
      </div>
    </div>
  )
}
