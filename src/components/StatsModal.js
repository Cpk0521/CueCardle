import React from 'react'
import GuessGraph from './GuessGraph'

export default function StatsModal({switchStatsModal, stats}) {

    const getSuccessRate = (gamePlayed, gameFailed) => {
        return Math.round(
          (100 * (gamePlayed - gameFailed)) / Math.max(gamePlayed, 1)
        )
    }

    return (
        <>
            <div className={`overlay show`}>
                <div className="content">
                    <h2>STATISTICS</h2>
                    <div className='statistic-container'>
                        <div className='stat'>
                            <h2>{stats.gamePlayed}</h2>
                            <h4>Played</h4>
                        </div>
                        <div className='stat'>
                            <h2>{getSuccessRate(stats.gamePlayed, stats.gameFailed)}</h2>
                            <h4>Win %</h4>
                        </div>
                        <div className='stat'>
                            <h2>{stats.currentStreak?stats.currentStreak:0}</h2>
                            <h4>Current Streak</h4>
                        </div>
                        <div className='stat'>
                            <h2>{stats.bestStreak?stats.bestStreak:0}</h2>
                            <h4>Max Streak</h4>
                        </div>
                    </div>
                    <div className='graph-container'>
                        <span>Guess Distribution</span>
                        <GuessGraph record={stats.winDistribution}/>
                    </div>
                    <button className="closebtn" onClick={switchStatsModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}
