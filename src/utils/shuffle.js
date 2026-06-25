import { uniqueCards } from './cards';

export const generateDeck = (pairsCount) => {
  // Take required number of pairs from our icon list
  const selectedIcons = uniqueCards.slice(0, pairsCount);
  
  // Duplicate them to create pairs
  const deck = [...selectedIcons, ...selectedIcons].map((Icon, index) => ({
    id: index,
    Icon,
    isFlipped: false,
    isMatched: false,
  }));

  // Fisher-Yates Shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
};