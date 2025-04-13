import { DateTime } from 'luxon';
import List from '../List/imagesList';
import {getDateFromLocal} from './Storage';
import { clipStyle } from '../List/ClipStyle';

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

    // const start = DateTime.utc(2022, 4, 11);
    const start = DateTime.utc(2022, 4, 1);
    const today = DateTime.utc(now.year, now.month, now.day);
    const nextday = today.plus({days: 1}).minus({minutes: now.offset}).valueOf();

    const index = Math.floor((today.valueOf() - start.valueOf()) / DayOfms);
    
    //s1: 399, s2: 340, s3 : 
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

let dailyImage = null;
export const getImage = () => {
    return new Promise((resolve, reject) => {
        dailyImage = new Image();
        dailyImage.crossOrigin = 'anonymous';
        dailyImage.src = `https://cpk0521.github.io/CUECardsViewer/Cards/${CardData.cardId}/Card_${CardData.cardId}_${CardData.Blooming?'2':'1'}_b.png`;
        dailyImage.onload = () => resolve(dailyImage);
        dailyImage.onerror = () => reject('error');
    })
}

export const initCanvas = async (canvasRef, guesses) => {
    const allcanvas = canvasRef.current;    
    const image = dailyImage ?? await getImage()
    let clipsize = clipStyle.clipSize
    let setid = (today.day * today.month * today.year) % clipStyle.area.length
    let area = clipStyle.area[setid]

    pixelate(image, 15, guesses.length, (tempcanvas)=>{
        allcanvas.forEach((canvas, index) => {
            let ctx = canvas.getContext('2d');
            ctx.fillStyle = "#cccccc";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            if(index <= guesses.length){
                let record = guesses[index - 1] || {}
                if(!record['correct']){
                    let {x, y} = area[index]
                    ctx.drawImage(tempcanvas, x, y, clipsize, clipsize, 0, 0, canvas.width, canvas.width);
                }
            }
        });
    });


}

export const updateCanvas = async (canvasRef, times) => {
    if ( times >= 6 ) { return }

    const allcanvas = canvasRef.current;    
    const image = dailyImage;
    let clipsize = clipStyle.clipSize
    let setid = (today.day * today.month * today.year) % clipStyle.area.length
    let area = clipStyle.area[setid]

    pixelate(image, 15, times, (tempcanvas)=>{
        allcanvas.forEach((canvas, index) => {
            let ctx = canvas.getContext('2d');
            if(index <= times){
                let {x, y} = area[index]
                ctx.drawImage(tempcanvas, x, y, clipsize, clipsize, 0, 0, canvas.width, canvas.width);
            }
        });
    })

}

function pixelate(image, scale, times, func){
    scale *= 0.01;

    const canvas = document.createElement('canvas');

    canvas.width = image.width;
    canvas.height = image.height;

    let scaledW = canvas.width * scale;
    let scaledH = canvas.height * scale;

    let ctx = canvas.getContext('2d');

    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(image, 0, 0, scaledW, scaledH);
    ctx.drawImage(canvas, 0, 0, scaledW, scaledH, 0, 0, image.width, image.height);

    //grayscale
    if(times < 5){
        const imgPixels = ctx.getImageData(0, 0, image.width, image.height);
        for (let y = 0; y < imgPixels.height; y++) {
            for (let x = 0; x < imgPixels.width; x++) {
                let i = y * 4 * imgPixels.width + x * 4;
                let avg =
                    (imgPixels.data[i] +
                        imgPixels.data[i + 1] +
                        imgPixels.data[i + 2]) /
                    3;
                imgPixels.data[i] = avg;
                imgPixels.data[i + 1] = avg;
                imgPixels.data[i + 2] = avg;
            }
        }
        ctx.putImageData(
            imgPixels,
            0,
            0,
            0,
            0,
            imgPixels.width,
            imgPixels.height
        );
    }

    // document.body.appendChild(canvas);

    func(canvas);

    canvas.remove();
}