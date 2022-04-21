import React from 'react'
import GraphBar from './GraphBar'


export default function GuessGraph({record}) {

    const max = Math.max(...record);

    return (
        <div className='guess-distribution'>

            {
                record.map((val, index)=>
                    // console.log(`index: ${index} -- val: ${val}`);
                    <GraphBar key={index+1} index={index+1} value={val} widthStyle={90 * (val/max)}/>
                )
            }

            {/* <div className='graph'>
                <span className='guess'>1</span>
                <div className='graph-bar'>
                    <div className='bar' style={{width: `30%`}}>
                        <span className='bar-num'>100</span>
                    </div>
                </div>
            </div>

            <div className='graph'>
                <span className='guess'>1</span>
                <div className='graph-bar'>
                    <div className='bar'>
                        <span className='bar-num'>100</span>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
