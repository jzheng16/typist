import { useEffect, useState, useRef } from 'react';
import car from './images/sports-car.png';
import Scoreboard from './Scoreboard';
import { generateNewSentence, generateUniqueId } from './helpers';
const SECONDS_PER_ROUND = 120;
const COUNTDOWN_IN_SECONDS = 5;

function Game() {

  // By word or by letter? If by letter have to find a way to track whena  word is completed nextIndex is a space or if last one just make sure lenght ===??
  const [countdownInterval, setCountdownInterval] = useState(null);
  const [countdown, setCountdown] = useState(COUNTDOWN_IN_SECONDS);
  const [scores, setScores] = useState([]);
  const [secondsRemaining, setSecondsRemaining] = useState(SECONDS_PER_ROUND);
  const [intervalId, setIntervalId] = useState(null);
  const [playerInput, setPlayerInput] = useState('');
  const [sentence, setSentence] = useState(generateNewSentence());
  const [currIndex, setCurrentIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState('not-started');
  const [wordIndex, setWordIndex] = useState(0);
  const [wpm, setWpm] = useState(0);
  const playerInputEl = useRef(null);

  const preventCopyPasting = (e) => e.preventDefault();

  // Handle player keypress
  const determine = (e) => {
    const word = sentence[wordIndex];
    const currKey = e.target.value[e.target.value.length - 1];

    // Backspace logic: Only subtract currIndex if the user deletes already correct letters in the input field 
    if (playerInput.length > e.target.value.length) {
      if (currIndex > 0 && e.target.value.slice(0, currIndex) !== word.slice(0, currIndex)) {
        setCurrentIndex((prevState) => prevState - 1);
      }
    } else if (currKey === word[currIndex] && playerInput.length === currIndex) { // Check correct answer (make sure user has same amount of characters and no pending error characters)
      setCurrentIndex((prevState) => prevState + 1);
    }
    setPlayerInput(e.target.value);
  };

  // Get existing scores
  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
    setScores(savedScores);
  }, []);

  //Complete game if timer runs out
  useEffect(() => {
    if (secondsRemaining <= 0) {
      setGameStatus('completed');
    }
  }, [secondsRemaining]);


  // Logic after a user either backspaces or enters a correct letter
  useEffect(() => {

    // If game is completed
    if (sentence.length > 0 && wordIndex === sentence.length) {
      setGameStatus('completed');
    } else {
      // If Word is completed
      const word = sentence[wordIndex];
      if (currIndex > 0 && currIndex === word.length) {
        setWordIndex(prevState => prevState + 1);
        setPlayerInput('');
        setCurrentIndex(0);
        const timeElapsed = SECONDS_PER_ROUND - secondsRemaining;
        const wpm = Math.floor((wordIndex + 1) / (timeElapsed / 60));
        setWpm(wpm);
      }
    }
  }, [currIndex, sentence, wordIndex, secondsRemaining])

  const play = () => {
    setGameStatus('start');
  }

  useEffect(() => {
    if (countdown === 0) {
      setGameStatus('in-progress');
      setCountdown(COUNTDOWN_IN_SECONDS);
      clearInterval(countdownInterval);
      setCountdownInterval(null);
    }
  }, [countdown, countdownInterval])

  useEffect(() => {

    if (gameStatus === 'start' && !countdownInterval) {
      setSentence(generateNewSentence());
      setWpm(0);
      setWordIndex(0);
      setCurrentIndex(0);
      setPlayerInput('');
      const id = setInterval(() => {
        setCountdown(prevState => prevState - 1);
      }, 1000);
      setCountdownInterval(id);
    } else if (gameStatus === 'in-progress' && !intervalId) {
      const id = setInterval(() => {
        setSecondsRemaining(prevState => prevState - 1);
      }, 1000);
      setIntervalId(id);
      playerInputEl.current.focus();
    } else if (gameStatus === 'completed' && intervalId) {
      scores.push({ time: Date.now(), wpm });
      localStorage.setItem('scores', JSON.stringify(scores));
      setScores(scores);
      setIntervalId(null);
      clearInterval(intervalId);
      setSecondsRemaining(SECONDS_PER_ROUND);
    }
  }, [gameStatus, intervalId, wpm, scores, countdownInterval])

  // Calculate minutes remaining formatted
  let minutesRemaining = '';
  if (Math.floor(secondsRemaining / 60) > 0) {
    if (secondsRemaining % 60 < 10) {
      minutesRemaining = `${Math.floor(secondsRemaining / 60)}:0${secondsRemaining % 60}`;
    } else {
      minutesRemaining = `${Math.floor(secondsRemaining / 60)}:${secondsRemaining % 60}`;
    }
  } else {
    minutesRemaining = `:${secondsRemaining % 60}`;
  }


  if (gameStatus === 'not-started' || gameStatus === 'start') {
    return (
      <div>
        <h1>Typeracer - See how fast you can type and compete against others</h1>
        <div className={`countdownContainer ${countdownInterval ? 'visible' : 'invisible'}`}>
          <div className="circle red"></div>
          <div className={`circle yellow ${countdown > 1 ? 'active' : ''}`}></div>
          <div className={`circle green ${countdown === 1 ? 'active' : ''}`}></div>
          <p>:0{countdown}</p>
        </div>
        {!countdownInterval &&
          <div>
            <h2>Your High Scores</h2>
            <Scoreboard scores={scores} />
            <button className="play-btn" onClick={play}>Play</button>
          </div>
        }
      </div>
    )
  } else if (gameStatus === 'in-progress') {
    return (
      <div>
        <section className="stats-container">
          <div className="time-container">
            <p className="game-description">The race is on! Type the text below:</p>
            <div className="stats">
              <p className="wpm">{wpm} wpm</p>
              <p className="timer">{minutesRemaining}</p>
            </div>
          </div>
          <div className="progress-bar">
            <img className="car" alt="car" src={car} style={{ left: `${(wordIndex / sentence.length) * 100}%` }} />
          </div>
        </section>

        <div className="gameContainer">
          <div className="phraseContainer">
            {wordIndex > 0 && sentence.slice(0, wordIndex).map((word, i) => {
              return (
                <span key={generateUniqueId()} className="word completed">{word}</span>
              )
            })
            }
            <div className="current">
              {sentence.length !== wordIndex && sentence[wordIndex].split('').map((letter, i) => {
                let status = '';
                if (playerInput[i] === letter && currIndex >= i) {
                  status = 'correct';
                } else if (playerInput.length > i && playerInput[i] !== letter) {
                  status = 'incorrect';
                }
                if (letter === ' ') {
                  return (
                    <span key={generateUniqueId()} className={`character ${status} ${i === currIndex ? 'active' : ''}`}> </span>
                  )
                }
                return (
                  <span key={generateUniqueId()} className={`character underlined ${status} ${i === currIndex ? 'active' : ''}`}>{letter}</span>
                )
              })}
            </div>

            {sentence.slice(wordIndex + 1).join('').split('').map((letter, i) => {
              if (i < playerInput.length - sentence[wordIndex].length) {
                return (
                  <span key={generateUniqueId()} className={`character incorrect`}>{letter}</span>
                )
              }

              return (
                <span key={generateUniqueId()} className={`character`}>{letter}</span>
              )
            })}
          </div>
          <input
            className="playerInput"
            type="text"
            placeholder="Type text here"
            value={playerInput}
            ref={playerInputEl}
            onCopy={preventCopyPasting}
            onPaste={preventCopyPasting}
            onCut={preventCopyPasting}
            onChange={determine}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
        </div>

      </div>
    )
  } else {
    return (
      <div className="endContainer">
        <div className="summary">
          <h1>Summary</h1>
        </div>

        <h2>Your High Scores</h2>
        <Scoreboard scores={scores} />
        <button className="play-btn" onClick={play}>New Race</button>
      </div>


    )
  }
}

export default Game;
