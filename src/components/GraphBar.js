import React from 'react'

export default function graphBar({index, value, widthStyle}) {
    return (
        <div className='graph'>
            <span className='guess'>{index}</span>
            <div className='graph-bar'>
                {console.log(widthStyle)}
                <div className='bar' style={{width: `calc(${widthStyle}% + 20px)`}}>
                    <span className='bar-num'>{value}</span>
                </div>
            </div>
        </div>
    )
}
