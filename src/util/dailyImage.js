import { DateTime } from 'luxon'
import {List} from '../List/imagesList'
import {getDateFromLocal} from './Storage'
import { clipStyle } from '../List/ClipStyle'

export const Today = () => {
    const timezone = 'Asia/Tokyo';
    const now = DateTime.now().setZone(timezone);

    return {datetime:now, year:now.year, month:now.month, day:now.day}
}

export const isToday = () => {
    const localdate = getDateFromLocal();
    if(!localdate) return false;

    const today = Today();

    return (localdate.year === today.year && localdate.month === today.month && localdate.day === today.day);
}

export const getIndexByDay = () => {
    const DayOfms = 86400000;

    const now = Today().datetime;

    const start = DateTime.utc(2022, 4, 11);
    const today = DateTime.utc(now.year, now.month, now.day);
    const nextday = today.plus({days: 1}).minus({minutes: now.offset}).valueOf();

    const index = Math.floor((today.valueOf() - start.valueOf()) / DayOfms);

    console.log(`${index} / ${List.length}`)
    const image = List[index % List.length];

    return {Listindex:index, CardData:image, today:now, nextday:nextday};
}

export const {Listindex, CardData, today, nextday} = getIndexByDay();

export const getDailyImage = () => {

    return new Promise((resolve, reject) => {
        let dailyImage = new Image();
        dailyImage.src = `https://cpk0521.github.io/CUECardsViewer/Cards/${CardData.cardId}/Card_${CardData.cardId}_${CardData.Blooming?'2':'1'}_b.png`;

        dailyImage.onload = () => resolve(dailyImage)
        dailyImage.onerror = (e) => reject(e);
    })
}

export const isCorrect = (currguses) => {
    let skip = currguses.Skip === true;
    let correct = (currguses.Cardid == CardData.cardId);
    let almost = !correct && (currguses.Charid == CardData.heroineId);

    return {correct:correct, almost:almost, skip:skip}
}

export const clipImage = async (canvasRef, times) => {
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = await getDailyImage()

    // season 2
    canvas.width = 1334;
    canvas.height = 750;

    ctx.fillStyle = "#cccccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let clipsize = clipStyle.clipSize
    let setid = (today.day * today.month * today.year) % clipStyle.area.length
    let area = clipStyle.area[3]
    let max = times >= area.length? area.length : times + 1

    for (let index = 0; index < max; index++) {
        let {x, y} = area[index]
        ctx.drawImage(image, x, y, clipsize, clipsize, x, y, clipsize, clipsize);
    }

    // season 1
    // let clipsize = 300
    // canvas.width = clipsize;
    // canvas.height = clipsize;

    // let sPx = (today.day * today.month * today.year) % (image.width - image.height * .52);
    // let sPy = (today.day * today.year) % (image.height - image.height * .52);

    // let size = image.height * (.1 + (.07*times));


    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.drawImage(image, sPx, sPy, size, size, 0, 0, canvas.width, canvas.width);
}
