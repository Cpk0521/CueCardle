// import React, { useEffect, useState } from 'react'

export default function Processbox({Pos, guesses}) {

    let process = guesses[Pos-1];
    let styleid = process?process.correct?'correct':process.almost?'almost':'error':'';

    return (
        <div className='square' id={styleid}></div>
    )
}
