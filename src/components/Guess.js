import React, {useEffect, useState} from 'react'
import {Cards} from '../List/CardsList'
import {Charactor} from '../List/Charactor'
import Toaster from './Toaster'

import '../App.css'

export default function Guess({onEnter, isGameover}) {

  const [currentSakura, setCurrentSakura] = useState(false);
  const [currentChar, setCurrentChar] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);

  const [isToasterOpen, SetToasterOpen] = useState(false);
  const [chooseList, setChooseList] = useState([]);

  const onChangeChar = (e) => {
    setCurrentChar(e.target.value);
    setCurrentCard(0);
  }
  
  const onChangeCard = (e) => {
    setCurrentCard(e.target.value);
  }

  const onSakura = ()=>{
    setCurrentSakura(!currentSakura);
  }

  useEffect(()=>{
    let tilte = Cards.filter(x => x.heroineId == currentChar)
    setChooseList(tilte);
  },[currentChar])


  const onsubmit = () => {
    if((currentChar != 0 && currentCard != 0 )|| isGameover){
      onEnter({Charid:currentChar, Cardid:currentCard, Blooming:currentSakura});
    }
    else
      SetToasterOpen(true);
      setTimeout(() => {
        SetToasterOpen(false);
      }, 1500);
  }

  const onSkip = () => {
    onEnter({});
  }

  const test = (e) => {
    e.target.size = 4;
  }

  return (
    <>
      {isToasterOpen?<Toaster String={'Please select correctly'}/>:<></>}
      <div className='Guess'>
        <div className='inputrow selectlist'>
          <select defaultValue={currentChar} onChange={onChangeChar}>
            <option value={0} disabled>----</option>
            {
              Charactor?Charactor.map(char => <option key={char.id} value={char.id}>{char.Name}</option>):<></>
            }
          </select>
          <select onChange={onChangeCard} defaultValue={0}>
            <option value={0}>----</option>
            {
              chooseList.map(item => <option key={item.cardId} value={item.cardId}>{item.alias == '0'?'【】':item.alias}</option>)
            }
          </select>
          <button onClick={onSakura} className={currentSakura?'Sakura':''}>開花</button>
        </div>
        <div className='inputrow submitlist'>
          <button onClick={onSkip}>Skip(zoom+)</button>
          <button onClick={onsubmit}>Submit</button>
        </div>
      </div>
    </>
  )
}