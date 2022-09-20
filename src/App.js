import { useEffect, useState, useRef } from "react";

import ImageBox from "./components/ImageBox";
import Board from "./components/Board";
import Guess from "./components/Guess";
import Modal from './components/Modal'
import StatsModal from './components/StatsModal'
import TechModal from "./components/TechModal";

import {clipImage, isCorrect, isToday, Today} from './util/dailyImage'
import Hello from './util/Hello'
import {CopyToClipBoard, TweetShare} from './util/Share'
import {setStatusToLocal, getStatusFromLocal, setTodayToLocal, setFirst, getFirst} from './util/Storage'
import {addStatistics, loadStatistics} from './util/Statistics'

import './App.css'

function App() {

  const canvasRef = useRef(null);
  const [isWon, setWon] = useState(false);
  const [isLost, setLost] = useState(false);
  const [isModalOpen, SetModalOpen] = useState(false);
  const [isStatsModalOpen, setStatsModalOpen] = useState(false);
  const [isTechModalOpen, setTechModalOpen] = useState(false);

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
  const [isFirst, setIsFirst] = useState(()=>{

    let bool = getFirst()

    if(bool){
      setTechModalOpen(true)
    }

    return bool
  });

  useEffect(()=>{
    Hello();
  },[])

  useEffect(()=>{
    clipImage(canvasRef, guesses.length);
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

  const switchStatsModal = ()=>{
    setStatsModalOpen(!isStatsModalOpen);
  }

  const switchTechModal = () => {
    setTechModalOpen(!isTechModalOpen)

    if(isFirst){
      setFirst(false)
    }
  }

  const OnTextShare = () => {
    CopyToClipBoard(guesses, isWon, isLost);
  }

  const OnTweetShare = () => {
    TweetShare(guesses, isWon, isLost);
  }

  return (
    <>
      {isTechModalOpen?<TechModal switchTechModal={switchTechModal}/>:<></>}
      {isModalOpen?<Modal closeModal={closeModal} OnTextShare={OnTextShare} OnTweetShare={OnTweetShare}/>:<></>}
      {isStatsModalOpen?<StatsModal switchStatsModal={switchStatsModal} stats={stats} />:<></>}
      <div className="App">
        <nav>
          <div className="nav-left">
            <a href="https://cpk0521.github.io/CUECardsViewer/#/">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 16 14">
                <path fill="var(#000)" d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
              </svg>
            </a>
          </div>
          <h1>CUE!Cardle</h1>
          <div className="nav-right">
          <button onClick={switchTechModal}>
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            </button>
            <button onClick={switchStatsModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 16 16">
                <path fill="var(#000)" d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
              </svg>
            </button>
          </div>
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
