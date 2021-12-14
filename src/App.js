import Navbar from './Navbar';
import './App.css';
import { useCallback, useEffect, useState, useRef } from 'react';
import faker from 'faker';


function App() {

  // By word or by letter? If by letter have to find a way to track whena  word is completed nextIndex is a space or if last one just make sure lenght ===??
  const [secondsRemaining, setSecondsRemaining] = useState(100);
  const [intervalId, setIntervalId] = useState(null);
  const [playerInput, setPlayerInput] = useState('');
  const [sentence, setSentence] = useState([]);
  const [score, setScore] = useState(0);
  const [currIndex, setCurrentIndex] = useState(0);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

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

  // Generate words
  useEffect(() => {
    const words = faker.lorem.words(10).split(' ');
    const wordsWithSpaces = words.map((word, i) => {
      if (i !== words.length - 1) {
        word = word + ' ';
      }
      return word.toUpperCase();
    })
    // put into an array of words each (space included)
    setSentence(wordsWithSpaces);
  }, [])

  // Start timer
  useEffect(() => {
    const id = setInterval(() => {
      setSecondsRemaining(prevState => prevState - 1);
    }, 1000);
    setIntervalId(id);
    return () => clearInterval(id);

  }, []);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      clearInterval(intervalId);
      setIsGameCompleted(true);
    }
  }, [secondsRemaining, intervalId]);




  // Logic after a user either backspaces or enters a correct letter
  useEffect(() => {
    // If Word is completed
    if (currIndex > 0 && currIndex === word.length) {
      console.log('new word...');
      setWordIndex(prevState => prevState + 1);
      setPlayerInput('');
      setCurrentIndex(0);
      setScore(prevState => prevState + 10);

    }

    // If game is completed
    if (sentence.length > 0 && wordIndex === sentence.length) {
      setIsGameCompleted(true);
    }

  }, [currIndex, sentence, word.length, wordIndex])

  const play = () => {

  }

  console.log('seconds remaining', secondsRemaining)

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

  return (
    <div className="App">
      <Navbar />
      <main class="main-content">

        {isGameCompleted ?
          <div>
            Game done
          </div>

          :
          <div>
            <div class="score">{score}</div>
            <div class="timer">{minutesRemaining}</div>

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



            <input onCopy={preventCopyPasting} onPaste={preventCopyPasting} onCut={preventCopyPasting} class="playerInput" onChange={determine} type="text" placeholder="Type text here" value={playerInput} />
            <button class="restart">Restart</button>
            <button class="play-btn" onClick={play}>Play</button>
          </div>



        }
      </main >

      <footer>
        <a href="https://iconscout.com/icons/keyboard" target="_blank" rel="noreferrer">Keyboard Icon</a> by <a href="https://iconscout.com/contributors/kiran-shastry">Kiran Shastry</a> on <a href="https://iconscout.com">Iconscout</a>
      </footer>
    </div >

  );
}

export default App;
