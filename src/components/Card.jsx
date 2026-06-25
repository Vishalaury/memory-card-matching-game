import React from 'react';
import { motion } from 'framer-motion';
import { FaQuestion } from 'react-icons/fa';

const Card = ({ card, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <motion.div
        className="card-inner"
        initial={false}
        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="card-front">
          <FaQuestion className="question-icon" />
        </div>
        <div className={`card-back ${card.isMatched ? 'matched' : ''}`}>
          <card.Icon className="card-icon" />
        </div>
      </motion.div>
    </div>
  );
};

export default Card;