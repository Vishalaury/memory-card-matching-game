

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import WinModal from './components/WinModal';
import { generateDeck } from './utils/shuffle';
import { useTimer } from './hooks/useTimer';
import './App.css';

const DIFFICULTY_SETTINGS = {
  easy: 8,   // 16 cards (4x4)
  medium: 12, // 24 cards (6x4)
  hard: 18   // 36 cards (6x6)
};

function App() {
  const [difficulty, setDifficulty] = useState('easy');
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [bestScore, setBestScore] = useState(null);

  const { seconds, formatTime, resetTimer } = useTimer(isGameActive, hasWon);

  // 1. Load best score (Moves + Time Object) from local storage
  useEffect(() => {
    const savedBest = localStorage.getItem(`memory-best-${difficulty}`);
    if (savedBest) {
      try {
        setBestScore(JSON.parse(savedBest)); // Parse JSON object
      } catch (e) {
        // Fallback agar pehle se purana sirf number wala score save ho
        setBestScore({ moves: parseInt(savedBest), time: 0 });
      }
    } else {
      setBestScore(null);
    }
    initializeGame();
  }, [difficulty]);

  // 2. Check for win condition & Update Best Score
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setHasWon(true);
      setIsGameActive(false);
      
      // Update best score (Check if less moves, OR same moves but less time)
      if (!bestScore || moves < bestScore.moves || (moves === bestScore.moves && seconds < bestScore.time)) {
        const newBestScore = { moves: moves, time: seconds };
        localStorage.setItem(`memory-best-${difficulty}`, JSON.stringify(newBestScore));
        setBestScore(newBestScore);
        setIsNewBest(true);
      }
    }
  }, [cards, moves, bestScore, difficulty, seconds]); // Dependencies fixed!

  const initializeGame = () => {
    const pairsCount = DIFFICULTY_SETTINGS[difficulty];
    setCards(generateDeck(pairsCount));
    setFlippedCards([]);
    setMoves(0);
    resetTimer();
    setIsGameActive(false);
    setHasWon(false);
    setIsNewBest(false);
  };

  const handleCardClick = (clickedCard) => {
    if (!isGameActive && !hasWon) setIsGameActive(true);

    const updatedCards = cards.map(card => 
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      checkForMatch(newFlipped, updatedCards);
    }
  };

  const checkForMatch = ([card1, card2], currentCards) => {
    if (card1.Icon === card2.Icon) {
      setTimeout(() => {
        setCards(currentCards.map(card => 
          card.id === card1.id || card.id === card2.id 
            ? { ...card, isMatched: true, isFlipped: false } 
            : card
        ));
        setFlippedCards([]);
      }, 500);
    } else {
      setTimeout(() => {
        setCards(currentCards.map(card => 
          card.id === card1.id || card.id === card2.id 
            ? { ...card, isFlipped: false } 
            : card
        ));
        setFlippedCards([]);
      }, 1000);
    }
  };

  // Format best score for display (e.g., "🏆 18 Moves | 00:42")
  const formattedBestScore = bestScore 
    ? `🏆 ${bestScore.moves} Moves | ${formatTime(bestScore.time)}` 
    : null;

  return (
    <div className="app">
      <Header 
        moves={moves} 
        formattedTime={formatTime(seconds)} 
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        bestScore={formattedBestScore}
        onRestart={initializeGame}
        isGameActive={isGameActive} // Naya prop: Header me bheja taaki dropdown lock ho sake
      />
      <main className="main-content">
        <Board 
          cards={cards} 
          onCardClick={handleCardClick} 
          disabled={flippedCards.length === 2} 
        />
      </main>
      <WinModal 
        show={hasWon} 
        moves={moves} 
        time={formatTime(seconds)} 
        onRestart={initializeGame}
        isNewBest={isNewBest}
      />
    </div>
  );
}

export default App;