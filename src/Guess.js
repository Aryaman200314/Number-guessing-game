// NumberGuessingGame.js
import React, { useState } from 'react';
import './App.css'; 
import { range_number, attempts } from './Constants';

const NumberGuessingGame = () => {
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * range_number) + 1);
  const [userInput, setUserInput] = useState('');
  const [prevGuesses, setPrevGuesses] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(attempts);
  const [message, setMessage] = useState('');
  const [playGame, setPlayGame] = useState(true);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const guessedValue = parseInt(userInput);
    validateGuess(guessedValue);
  };

  const validateGuess = (guessedValue) => {
    if (isNaN(guessedValue)) {
      alert('Please enter a valid number!');
    } else if (guessedValue < 1) {
      alert('Please enter a number greater than 1!');
    } else if (guessedValue > range_number) {
      alert(`Please enter a number less than ${range_number}!`);
    } else {
      setPrevGuesses([...prevGuesses, guessedValue]);
      if (remainingGuesses <= 1) {
        displayGuess(guessedValue);
        displayMessage(`Game over! The random number was ${randomNumber}`);
        endGame();
      } else {
        displayGuess(guessedValue);
        checkGuess(guessedValue);
      }
    }
  };

  const checkGuess = (guessedValue) => {
    if (guessedValue === randomNumber) {
      displayMessage(`You guessed it right!`);
      endGame();
    } else if (guessedValue > randomNumber) {
      displayMessage(`Number is too high`);
    } else {
      displayMessage(`Number is too low`);
    }
  };

  const displayGuess = (guessedValue) => {
    setUserInput('');
    setRemainingGuesses(remainingGuesses - 1);
  };

  const displayMessage = (message) => {
    setMessage(message);
  };

  const newGame = () => {
    setRandomNumber(Math.floor(Math.random() * range_number) + 1);
    setPrevGuesses([]);
    setRemainingGuesses(attempts);
    setUserInput('');
    setMessage('');
    setPlayGame(true);
  };

  const endGame = () => {
    setPlayGame(false);
  };

  return (
    <div id="wrapper">
      <h1>Number Guessing Game</h1>
      <p>Try and guess a random number between 1 and {range_number}.</p>
      <p>You have {attempts} attempts to guess the right number.</p>
      <br />
      {playGame ? (
        <form onSubmit={handleSubmit} className="form">
          <label className='guess' htmlFor="guessField">Guess a number:</label>
          <input
            type="text"
            id="guessField"
            value={userInput}
            onChange={handleInputChange}
            className="guessField"
          />
          <input type="submit" value="Submit guess" className="guessSubmit" />
        </form>
      ) : (
        <button onClick={newGame} className="newGame">
          Start New Game
        </button>
      )}

      <div className="resultParas">
        <p>Previous Guesses: <span className="guesses">{prevGuesses.join(', ')}</span></p>
        <p>Guesses Remaining: <span className="lastResult">{remainingGuesses}</span></p>
        <p className="lowOrHi">{message}</p>
      </div>
    </div>
  );
};

export default NumberGuessingGame;
