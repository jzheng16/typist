import { useCallback, useEffect, useState, useRef } from 'react';
import faker from 'faker';

const SECONDS_PER_ROUND = 100;

function Game() {

  // By word or by letter? If by letter have to find a way to track whena  word is completed nextIndex is a space or if last one just make sure lenght ===??
  const [secondsRemaining, setSecondsRemaining] = useState(SECONDS_PER_ROUND);
  const [intervalId, setIntervalId] = useState(null);
  const [playerInput, setPlayerInput] = useState('');
  const [sentence, setSentence] = useState([]);
  const [score, setScore] = useState(0);
  const [currIndex, setCurrentIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState('start');
  const [wordIndex, setWordIndex] = useState(0);
  const [wpm, setWpm] = useState(0);
  const playerInputEl = useRef(null);

  const preventCopyPasting = (e) => e.preventDefault();

  const word = sentence[wordIndex];

  // Handle player keypress
  const determine = (e) => {
    const currKey = e.target.value[e.target.value.length - 1];
    // console.log('file: App.js ~ line 37 ~ determine ~ currKey', currKey);
    // console.log('curr Correct Index', currIndex);
    // console.log('playerinput and currently typed in', playerInput, e.target.value)

    // Backspace logic: Only subtract currIndex if the user deletes already correct letters in the input field 
    if (playerInput.length > e.target.value.length) {
      if (currIndex > 0 && e.target.value.slice(0, currIndex) !== word.slice(0, currIndex)) {
        setCurrentIndex((prevState) => prevState - 1);
      }
    } else if (currKey === word[currIndex]) { // Check correct answer
      setCurrentIndex((prevState) => prevState + 1);
    }
    setPlayerInput(e.target.value);
  };

  const generateNewSentence = () => {
    const words = faker.lorem.words(10).split(' ');
    const wordsWithSpaces = words.map((word, i) => {
      if (i === 0) {
        word = word[0].toUpperCase() + word.slice(1);
      }

      if (i !== words.length - 1) {
        word = word + ' ';
      }

      if (i === words.length - 1) {
        word = word + '.';
      }
      return word;
    })
    return wordsWithSpaces;
    // put into an array of words each (space included)
  }

  useEffect(() => {
    if (secondsRemaining <= 0) {
      setGameStatus('completed');
    }
  }, [secondsRemaining]);


  // Logic after a user either backspaces or enters a correct letter
  useEffect(() => {
    // If Word is completed
    if (currIndex > 0 && currIndex === word.length) {
      console.log('new word...');
      setWordIndex(prevState => prevState + 1);
      setPlayerInput('');
      setCurrentIndex(0);
      setScore(prevState => prevState + 10);
      calculateWpm();
    }

    // If game is completed
    if (sentence.length > 0 && wordIndex === sentence.length) {
      setGameStatus('completed');
    }

  }, [currIndex, sentence, word, wordIndex])

  const play = () => {
    setGameStatus('in-progress');
  }

  useEffect(() => {
    if (gameStatus === 'in-progress' && !intervalId) {
      setScore(0);
      setWordIndex(0);
      setCurrentIndex(0);
      setPlayerInput('');
      setWpm(0);
      setSentence(generateNewSentence());
      const id = setInterval(() => {
        setSecondsRemaining(prevState => prevState - 1);
      }, 1000);
      setIntervalId(id);
      playerInputEl.current.focus();
    } else if (gameStatus === 'completed') {
      clearInterval(intervalId);
      setIntervalId(null);
      setSecondsRemaining(SECONDS_PER_ROUND);
    }
  }, [gameStatus, intervalId])

  const calculateWpm = () => {
    // How to calculate wpm??
    // Math.floor(Time elapsed * wordsCompleted / 60)
    const timeElapsed = SECONDS_PER_ROUND - secondsRemaining;
    const wpm = Math.floor((wordIndex + 1) / (timeElapsed / 60));
    setWpm(wpm);

  }

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

  if (gameStatus === 'start') {
    return (
      <div>
        <p>
          Start
        </p>
        <button class="play-btn" onClick={play}>Play</button>
      </div>
    )
  } else if (gameStatus === 'in-progress') {
    return (
      <div>
        <div class="score">{score}</div>
        <div class="timer">{minutesRemaining}</div>
        <div class="wpm">{wpm} wpm</div>
        <div className="something">

          <div className="phrase">
            {sentence.map((word, i) => {
              return (
                <span class={`word`}>{word}</span>
              )
            })}
          </div>
          <div className="playerPhrase">
            {wordIndex > 0 &&
              <div class="completedWords">
                {sentence.slice(0, wordIndex).map((word, i) => {
                  return (
                    <span class="word completed">{word}</span>
                  )
                })}
              </div>
            }
            <div>
              {playerInput.split('').slice(0, currIndex).map((letter, i) => {
                return (
                  <span class={`character correct`}>{letter}</span>
                )
              })}
              {playerInput.split('').slice(currIndex).map((letter, i) => {
                return (
                  <span class={`character incorrect`}>&nbsp;</span>
                )
              })}
            </div>
          </div>
        </div>
        <input onCopy={preventCopyPasting} onPaste={preventCopyPasting} onCut={preventCopyPasting} class="playerInput" onChange={determine} type="text" placeholder="Type text here" value={playerInput} ref={playerInputEl} />
      </div>
    )
  } else {
    return (
      <div className="endContainer">
        Game done
        <button class="restart" onClick={play}>New Race</button>
      </div>


    )
  }
}

export default Game;
