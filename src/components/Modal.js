import React,{useState} from 'react'

import { DateTime } from 'luxon'
import Countdown from 'react-countdown';

import {CardData, nextday, Listindex} from '../util/dailyImage'
import Toaster from './Toaster'

export default function Modal({closeModal, OnTextShare, OnTweetShare}) {
  
  const [isToasterOpen, SetToasterOpen] = useState(false);
  
  const OnClickTextShare = () => {
    OnTextShare();
    SetToasterOpen(true);
    setTimeout(() => {
      SetToasterOpen(false);
    }, 1200);
  }

  const now = DateTime.now().setZone('Asia/Tokyo');
  let title = now.setLocale('ja-JP').toLocaleString(DateTime.DATE_FULL);

  return (
    <>
      {isToasterOpen?<Toaster String={'Copied to clipboard'}/>:<></>}
      <div className={`overlay show`}>
          <div className="content">
              <h2>{`${title} (#${Listindex + 1})`}</h2>
            <div className='content-countdown'>
              <span>The Next in </span>
              <Countdown date={nextday} daysInHours={true}/>
            </div>
            <img src={`https://cpk0521.github.io/CUECardsViewer/Cards/${CardData.cardId}/Card_${CardData.cardId}_${CardData.Blooming?'2':'1'}_b.png`}></img>
            <div className='cardname'>
              <span>{CardData.heroine}</span>
              <span>{CardData.alias}</span>
            </div>
            <div className='btnlist'>
              <button className='sharebtn tweet' onClick={OnTweetShare}>
                  <span>Tweet</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
              </button>
              <button className='sharebtn' onClick={OnClickTextShare}>
                  <span>Share</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill="var(#fff)" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                </svg>
              </button>
            </div>
            <button className="closebtn" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
              </svg>
            </button>
          </div>
        </div>
    </>
  )
}
