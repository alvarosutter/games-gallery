export type Card = {
  unicode: string;
  value: number;
  type: string;
};

function createCards(start: number, type: string): Array<Card> {
  const cards: Array<Card> = Array.from({ length: 14 }, (_, i) => {
    const hex = (start + i).toString(16);
    return {
      unicode: String.fromCodePoint(parseInt(hex, 16)),
      value: i + 1,
      type,
    };
  });

  return [...cards.slice(0, 11), ...cards.slice(11 + 1, cards.length)];
}

export const spades = createCards(127137, 'spades');
export const hearts = createCards(127153, 'hearts');
export const diamonds = createCards(127169, 'diamonds');
export const clubs = createCards(127185, 'clubs');
