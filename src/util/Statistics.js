import {setStatisticsToLocal, getStatisticsFromLocal} from './Storage'

export const defaultdata = {
    gamePlayed : 0,
    gameWon: 0,
    gameFailed : 0,
    winDistribution:[0, 0, 0, 0, 0, 0]
}

export const addStatistics = (Stats, times) =>{
    const record = {...Stats};
    record.gamePlayed += 1;

    if(times >= 6){
        record.gameFailed +=1;
    }else{
        record.gameWon +=1;
        record.winDistribution[times] += 1;
    }

    setStatisticsToLocal(record);
    return record;
}

export const loadStatistics = () =>{
    return getStatisticsFromLocal() || defaultdata;
}
