import {Listindex} from './dailyImage'

export const generateEmojiTile = (guesses) => {
    let tiltes = guesses.map((guess)=>{
        let {correct, almost, skip} = guess;
        let Emoji = skip?'🔳':correct?'🟩':almost?'🟨':'⬜';
        return Emoji;
    }).join('');

    return tiltes;
}

export const CopyToClipBoard = (guesses, isWon, isLost) => {
    navigator.clipboard.writeText(`CUE!Cardle³ #${Listindex + 1} ${isWon?guesses.length:isLost?'X':''}/6\n${generateEmojiTile(guesses)}\nhttps://cpk0521.github.io/CueCardle/`);
}

export const TweetShare = (guesses, isWon, isLost) => {
    let ShareText = `CUE!Cardle³%20%23${Listindex + 1}%20${isWon?guesses.length:isLost?'X':''}/6%0a${generateEmojiTile(guesses)}%0a&hashtags=キュー,新人声優育成中,写真が下手ですみません&url=https://cpk0521.github.io/CueCardle/%0a`
    window.open(`https://twitter.com/intent/tweet?text=${ShareText}`, "_blank")
}

export const BlueskyShare = (guesses, isWon, isLost) => {
    let ShareText = encodeURIComponent(`CUE!Cardle³ #${Listindex + 1} ${isWon?guesses.length:isLost?'X':''}/6\n${generateEmojiTile(guesses)}\n#キュー #新人声優育成中 #写真が下手ですみません\n`)
    window.open(`https://misskey-hub.net/share/?text=${ShareText}&url=https://cpk0521.github.io/CueCardle/&visibility=public&localOnly=0`, "_blank")
}

//CUE!Cardle³ #index x/6
//🔲🔳⬜🟨🟩
//https://cpk0521.github.io/CueCardle/

