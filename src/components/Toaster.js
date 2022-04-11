import React from 'react'

export default function Toaster({String}) {
  return (
    <div className='toaster'>
        <div className='toaster-content out'>
            {String?String:''}
        </div>
    </div>
  )
}
