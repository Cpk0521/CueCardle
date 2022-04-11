import { useEffect, useState, useRef } from "react";

import ImageBox from "./components/ImageBox";
import Board from "./components/Board";
import Guess from "./components/Guess";
import Modal from './components/Modal'

import {clipImage, isCorrect, isToday, Today} from './util/dailyImage'
import Hello from './util/Hello'
import {CopyToClipBoard, TweetShare} from './util/Share'
import {setStatusToLocal, getStatusFromLocal, setTodayToLocal} from './util/Storage'
import {addStatistics, loadStatistics} from './util/Statistics'

import './App.css'

function App() {

  const canvasRef = useRef(null);
  const [isWon, setWon] = useState(false);
  const [isLost, setLost] = useState(false);
  const [isModalOpen, SetModalOpen] = useState(false);

  const [guesses, setGuesses] = useState(()=>{

    if(!(isToday())){
      setTodayToLocal(Today());
      return [];
    }

    let record = getStatusFromLocal();
    if(record?.isGameover.Won){
      setWon(true);
    }
    if(record?.isGameover.Lost){
      setLost(true);
    }
    return record?record.guesses:[];
  });
  
  const [stats, setStats] = useState(loadStatistics());

  useEffect(()=>{
    clipImage(canvasRef, guesses.length);
    Hello();
  },[canvasRef, guesses])

  useEffect(()=>{
    setStatusToLocal(guesses, {Won:isWon, Lost:isLost});
  },[guesses, isWon, isLost])

  useEffect(()=>{
    if(isWon||isLost)
      SetModalOpen(true);
  },[isWon, isLost])

  const onEnter = (currguess) => { 

    if(isWon || isLost){return SetModalOpen(true)}

    let staute = isCorrect(currguess);

    setGuesses((prev)=>{
      return [...prev, staute];
    })

    if(staute.correct){
      setStats(addStatistics(stats, guesses.length));
      return setWon(true);
    }else{
      clipImage(canvasRef, guesses.length + 1);
    }

    if(guesses.length + 1 >= 6){
      setStats(addStatistics(stats, guesses.length + 1));
      return setLost(true);
    }
  }

  const closeModal = ()=>{
    SetModalOpen(!isModalOpen);
  }  

  const OnTextShare = () => {
    CopyToClipBoard(guesses, isWon, isLost);
  }

  const OnTweetShare = () => {
    TweetShare(guesses, isWon, isLost);
  }

  return (
    <>
      {isModalOpen?<Modal closeModal={closeModal} OnTextShare={OnTextShare} OnTweetShare={OnTweetShare}/>:<></>}
      <div className="App">
        <nav>
          <h1>CUE!Cardle</h1>
        </nav>
        <div className="game">
          <div className="w">
            <ImageBox canvasRef={canvasRef}/>
            <Board guesses={guesses} />
          </div>
          <Guess onEnter={onEnter} isGameover={(isWon||isLost)}/>
        </div>
      </div>
    </>
  );
}

export default App;
