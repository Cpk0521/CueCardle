const statusKey = 'gameStatus';
const inheritedGameStatKey = 'statistics';
const DateKey = 'Date';

export const setStatusToLocal = (guesses, isGameover) => {
    localStorage.setItem(statusKey, JSON.stringify({guesses:guesses, isGameover:isGameover}));
}

export const getStatusFromLocal = () => {
    let record = localStorage.getItem(statusKey);
    if (record) {
        return (JSON.parse(record));
    } else {
        return null;
    }
}

export const setStatisticsToLocal = (record) => {
    localStorage.setItem(inheritedGameStatKey, JSON.stringify(record));
}

export const getStatisticsFromLocal = () => {
    let record = localStorage.getItem(inheritedGameStatKey);
    return record?JSON.parse(record):null;
}

export const setTodayToLocal = (date) => {
    localStorage.setItem(DateKey, JSON.stringify(date));
}

export const getDateFromLocal = () => {
    const date = localStorage.getItem(DateKey);
    return date?JSON.parse(date):null;
}

export const ClearAllLocal = () => {
    localStorage.clear();
}