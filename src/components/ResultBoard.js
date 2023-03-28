import React from 'react'
import Processbox from './Processbox'

export default function ResultBoard({guesses}) {

  return (
    <div className='resultBoard'>
      <Processbox Pos={1} guesses={guesses}/>
      <Processbox Pos={2} guesses={guesses}/>
      <Processbox Pos={3} guesses={guesses}/>
      <Processbox Pos={4} guesses={guesses}/>
      <Processbox Pos={5} guesses={guesses}/>
      <Processbox Pos={6} guesses={guesses}/>
    </div>
  )
}
