import React from 'react';
import Card from './Card';

const Board = ({ cards, onCardClick, disabled }) => {
  // Dynamically set columns based on number of cards
  const gridColumns = cards.length === 16 ? 4 : cards.length === 24 ? 6 : 6;

  return (
    <div 
      className="board" 
      style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
    >
      {cards.map((card) => (
        <Card 
          key={card.id} 
          card={card} 
          onClick={onCardClick} 
          disabled={disabled} 
        />
      ))}
    </div>
  );
};

export default Board;