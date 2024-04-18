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
              <button className='sharebtn xtweet' onClick={OnTweetShare}>
                  <span>Share</span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                  </svg>
              </button>
              <button className='sharebtn' onClick={OnClickTextShare}>
                  <span>Share</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
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
