import { DateTime } from 'luxon'
import List from '../List/imagesList'
import {getDateFromLocal} from './Storage'

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

    // console.log(List.length) //399
    console.log(`index : ${index % List.length} / ${List.length}`);
    const image = List[index % List.length];

    return {Listindex:index, CardData:image, today:now, nextday:nextday};
}

export const {Listindex, CardData, today, nextday} = getIndexByDay();

let dailyImage;
export const getDailyImage = () => {

    return new Promise((resolve, reject) => {
        dailyImage = new Image();
        dailyImage.src = `https://cpk0521.github.io/CUECardsViewer/Cards/${CardData.cardId}/Card_${CardData.cardId}_${CardData.Blooming?'2':'1'}_b.png`;
        dailyImage.crossOrigin = "Anonymous";

        dailyImage.onload = () => resolve(dailyImage)
        dailyImage.onerror = (e) => reject(e);
    })
}

let imageData
export const getDailyImageData = () => {
    return new Promise(async(resolve, reject) => {
        const image = dailyImage ?? await getDailyImage();
        const _canvas = document.createElement('canvas');
        _canvas.width = image.width;
        _canvas.height = image.height;

        let context = _canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        imageData = context.getImageData(0, 0, _canvas.width, _canvas.height);
        
        resolve(imageData)
    })
}

export const isCorrect = (currguses) => {
    let skip = currguses.Skip === true;
    let correct = (currguses.Cardid == CardData.cardId);
    let almost = !correct && (currguses.Charid == CardData.heroineId);

    return {correct:correct, almost:almost, skip:skip}
}

export const initCanvas = async (canvasRef, guesses) => {
    const canvas = canvasRef.current;    
    const ctx = canvas.getContext('2d');
    const imgdata = imageData ?? await getDailyImageData();
    
    const mosaicSize = guesses.length < 6 ? (6 - guesses.length) * 14 : 14;

    createMosaic(ctx, canvas.width, canvas.height, mosaicSize, imgdata);
}

export const updateCanvas = async  (canvasRef, times) => {
    if ( times >= 6 ) { return }

    const canvas = canvasRef.current;    
    const ctx = canvas.getContext('2d');
    const imgdata = imageData ?? await getDailyImageData();
    const mosaicSize = (6 - times) * 14;

    createMosaic(ctx, canvas.width, canvas.height, mosaicSize, imgdata);
}

const createMosaic = (context, width, height, size, data) => {
    for (let y = 0; y < height; y += size) {
        for (let x = 0; x < width; x += size) {
          
            // const index = ((y * width + x) * 4)
            // let cR = data.data[index],
            //     cG = data.data[index + 1],
            //     cB = data.data[index + 2],
            //     cA = data.data[index + 3];

            let colorSum = [0, 0, 0, 0];
            let pixelCount = 0;
            for (let j = y; j < y + size; j++){
                for (let i = x; i < x + size; i++){
                    const index = (j * width + i) * 4;
                    
                    if(data.data[index]){
                        colorSum[0] += data.data[index];
                        colorSum[1] += data.data[index + 1];
                        colorSum[2] += data.data[index + 2];
                        colorSum[3] += data.data[index + 3];
                        pixelCount++;
                    }
                }
            }

            const avgColor = [
                colorSum[0] / pixelCount,
                colorSum[1] / pixelCount,
                colorSum[2] / pixelCount,
                colorSum[3] / pixelCount,
            ];

            // context.fillStyle = `rgba(${cR},${cG},${cB},${cA})`;
            context.fillStyle = `rgba(${avgColor[0]},${avgColor[1]},${avgColor[2]},${avgColor[3]})`;
            context.fillRect(x, y, x + size, y + size);
        }
    }
};

// season 2
// export const initCanvas = async (canvasRef, guesses) => {
//     const allcanvas = canvasRef.current;    
//     const image = dailyImage ?? await getDailyImage()
//     let clipsize = clipStyle.clipSize
//     let setid = (today.day * today.month * today.year) % clipStyle.area.length
//     let area = clipStyle.area[setid]

//     allcanvas.forEach((canvas, index) => {
//         let ctx = canvas.getContext('2d');
//         ctx.fillStyle = "#cccccc";
//         ctx.fillRect(0, 0, canvas.width, canvas.height);

//         if(index <= guesses.length){
//             let record = guesses[index - 1] || {}
//             if(!record['correct']){
//                 let {x, y} = area[index]
//                 ctx.drawImage(image, x, y, clipsize, clipsize, 0, 0, canvas.width, canvas.width);
//             }
//         }
//     });
// }

// export const updateCanvas = async  (canvasRef, times) => {
//     if ( times >= 6 ) { return }

//     const canvas = canvasRef.current[times];
//     const image = dailyImage ?? await getDailyImage()
//     let clipsize = clipStyle.clipSize
//     let setid = (today.day * today.month * today.year) % clipStyle.area.length
//     let area = clipStyle.area[setid]

//     let ctx = canvas.getContext('2d');
//     let {x, y} = area[times]
//     ctx.drawImage(image, x, y, clipsize, clipsize, 0, 0, canvas.width, canvas.width);
// }


// season 1
// export const clipImage = async (canvasRef, times) => {
//     let clipsize = 300
//     canvas.width = clipsize;
//     canvas.height = clipsize;
//     let sPx = (today.day * today.month * today.year) % (image.width - image.height * .52);
//     let sPy = (today.day * today.year) % (image.height - image.height * .52);
//     let size = image.height * (.1 + (.07*times));
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(image, sPx, sPy, size, size, 0, 0, canvas.width, canvas.width);
// }