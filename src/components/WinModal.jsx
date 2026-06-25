// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const WinModal = ({ show, moves, time, onRestart, isNewBest }) => {
//   return (
//     <AnimatePresence>
//       {show && (
//         <div className="modal-overlay">
//           <motion.div 
//             className="modal-content"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//           >
//             <h2>🎉 Congratulations! You Won! 🎉</h2>
//             <div className="modal-stats">
//               <p>Total Moves: <strong>{moves}</strong></p>
//               <p>Final Time: <strong>{time}</strong></p>
//             </div>
//             {isNewBest && <p className="new-best-text">🌟 New Best Score! 🌟</p>}
//             <button onClick={onRestart} className="btn-restart large">
//               Play Again
//             </button>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default WinModal;


import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WinModal = ({ show, moves, time, onRestart, isNewBest }) => {
  return (
    <AnimatePresence>
      {show && (
        /* YAHAN FIX KIYA HAI: key="win-modal" add karna zaroori tha */
        <div className="modal-overlay" key="win-modal">
          <motion.div 
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2> Congratulations! You Won! </h2>
            <div className="modal-stats">
              <p>Total Moves: <strong>{moves}</strong></p>
              <p>Final Time: <strong>{time}</strong></p>
            </div>
            {isNewBest && <p className="new-best-text"> New Best Score! </p>}
            <button onClick={onRestart} className="btn-restart large">
               Restart Game
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WinModal;