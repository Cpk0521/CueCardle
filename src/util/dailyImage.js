import { DateTime } from 'luxon'
import List from '../List/imagesList'
import {getDateFromLocal} from './Storage'
import { Application, Sprite } from 'pixi.js';
import {PixelateFilter} from '@pixi/filter-pixelate';


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
    
    //s1: 399, s2: 340, 
    const oldVersionTotal = 739;
    
    console.log(`index : ${index - oldVersionTotal} / ${List.length}`);
    const image = List[(index - oldVersionTotal) % List.length];

    return {Listindex:index, CardData:image, today:now, nextday:nextday};
}

export const {Listindex, CardData, today, nextday} = getIndexByDay();

export const isCorrect = (currguses) => {
    let skip = currguses.Skip === true;
    let correct = (currguses.Cardid == CardData.cardId);
    let almost = !correct && (currguses.Charid == CardData.heroineId);

    return {correct:correct, almost:almost, skip:skip}
}

export const getImages = () => {
    return Sprite.from(`https://cpk0521.github.io/CUECardsViewer/Cards/${CardData.cardId}/Card_${CardData.cardId}_${CardData.Blooming?'2':'1'}_b.png`);
}

const filter = new PixelateFilter();

export const initCanvas = async (canvasRef, guesses) => {
    
    const app = new Application({
        view : canvasRef.current,
        // width : canvasRef.current.width,
        // height : canvasRef.current.height,
        width : 1920,
        height : 1080,
        hello : false,
    })
    app.stage.filters = [filter];

    filter.size = guesses.length < 6 ? (6 - guesses.length) * 20 : 20;

    const image = getImages();
    image.width = 1920;
    image.height = 1080;
    app.stage.addChild(image);
}

export const updateCanvas = async (canvasRef, times) => {
    if ( times >= 6 ) { return }
    filter.size = (6 - times) * 20;
}
