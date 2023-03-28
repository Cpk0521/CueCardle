import React from 'react'
import GraphBar from './GraphBar'


export default function GuessGraph({record}) {

    const max = Math.max(...record);

    return (
        <div className='guess-distribution'>
            {
                record.map( (val, index) => <GraphBar key={index+1} index={index+1} value={val} widthStyle={90 * (val/max)}/> )
            }
        </div>
    )
}
