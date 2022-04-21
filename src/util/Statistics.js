import {setStatisticsToLocal, getStatisticsFromLocal} from './Storage'

export const defaultdata = {
    gamePlayed : 0,
    gameWon: 0,
    gameFailed : 0,
    currentStreak : 0,
    bestStreak: 0,
    winDistribution:[0, 0, 0, 0, 0, 0]
}

export const addStatistics = (Stats, times) =>{
    const record = {...Stats};

    // if(!record.currentStreak)record.gamePlayed==record.gameWon?record.currentStreak=record.gameWon:record.currentStreak = 0;
    if(!record.currentStreak)record.currentStreak = 0;
    if(!record.bestStreak)record.bestStreak = 0;

    record.gamePlayed += 1;

    if(times >= 6){
        record.gameFailed +=1;
        record.currentStreak = 0;
    }else{
        record.gameWon +=1;
        record.winDistribution[times] += 1;
        record.currentStreak += 1;
    }

    if(record.bestStreak < record.currentStreak){
        record.bestStreak = record.currentStreak;
    }

    setStatisticsToLocal(record);
    return record;
}

export const loadStatistics = () =>{
    return getStatisticsFromLocal() || defaultdata;
}
