import { DateTime } from 'luxon'
import {List} from '../List/imagesList'
import {getDateFromLocal, setTodayToLocal} from './Storage'

export const Today = () => {
    const timezone = 'Asia/Tokyo';
    const now = DateTime.now().setZone(timezone);

    return {datetime:now, year:now.year, month:now.month, day:now.day}
}

export const isToday = () => {
    const localdate = getDateFromLocal();
    if(!localdate) return false;

    const today = Today();

    return (localdate.year == today.year && localdate.month == today.month && localdate.day == today.day);
}

export const getIndexByDay = () => {
    // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const DayOfms = 86400000;

    const now = Today().datetime;

    const start = DateTime.utc(2022, 4, 11);
    const today = DateTime.utc(now.year, now.month, now.day);
    const nextday = today.plus({days: 1}).minus({minutes: now.offset}).valueOf();

    const index = Math.floor((today.valueOf() - start.valueOf()) / DayOfms);

    const image = List[index % List.length];

    return {Listindex:index, CardData:image, today:now, nextday:nextday};
}

export const {Listindex, CardData, today, nextday} = getIndexByDay();

export const createImage = () => {

    // const img = new Image();
    // img.src = `https://cpk0521.github.io/CUECardsViewer/Cards/${CardData.cardId}/Card_${CardData.cardId}_${CardData.Blooming?'2':'1'}_b.png`;

    // console.log(img.src);

    // img.onload = () => {
    //     const sPx = (today.day * today.month * today.year) % (img.width - img.height * .52);
    //     const sPy = (today.day * today.year) % (img.height - img.height * .52);
    //   
    // }

    // return {CardImage:img, sPx:sPx, sPy:sPy}

    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = `https://cpk0521.github.io/CUECardsViewer/Cards/${CardData.cardId}/Card_${CardData.cardId}_${CardData.Blooming?'2':'1'}_b.png`;

        img.onload = () => {
            const sPx = (today.day * today.month * today.year) % (img.width - img.height * .52);
            const sPy = (today.day * today.year) % (img.height - img.height * .52);

            resolve({CardImage:img, sPx:sPx, sPy:sPy});
        }

        img.onerror = (e) => reject(e);
    })

    // const sPx = (today.day * today.month * today.year)% img.width;
    // const sPy = (today.day * today.year) % img.height;
}

export const isCorrect = (currguses) => {
    
    let skip = currguses.Skip == true;
    let correct = (currguses.Cardid == CardData.cardId) && (CardData.cardId>9000000?true:currguses.Blooming == CardData.Blooming);
    let almost = !correct && (currguses.Charid == CardData.heroineId || (CardData.cardId>9000000?true:currguses.Blooming == CardData.Blooming));

    return {correct:correct, almost:almost, skip:skip}
}

export const clipImage = (canvasRef, times) => {
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // let {CardImage, sPx, sPy} =  createImage();
    createImage().then((res) => {
        const {CardImage, sPx, sPy} = res;

        let size = CardImage.height * (.1 + (.07*times));

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(CardImage, sPx, sPy, size, size, 0, 0, canvas.width, canvas.width);
    });

    // let nPx = sPx-(size/2)<=0?0:sPx+size>CardImage.width?CardImage.width-size:sPx-(size/2);
    // let nPy = sPy-(size/2)<=0?0:sPy+size>CardImage.height?CardImage.height-size:sPy-(size/2);

    // CardImage.onload = () => {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     ctx.drawImage(CardImage, sPx, sPy, size, size, 0, 0, canvas.width, canvas.height);
    // };  

}
