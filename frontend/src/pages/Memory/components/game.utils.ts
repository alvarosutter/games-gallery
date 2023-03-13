export type Card = '🎃' | '🤡' | '👽' | '👻' | '👾' | '🤖' | '⚽' | '🎱' | '💎' | '🚀';
export const cardsSet: Card[] = [
  '🎃',
  '🎃',
  '🤡',
  '🤡',
  '👽',
  '👽',
  '👻',
  '👻',
  '👾',
  '👾',
  '🤖',
  '🤖',
  '⚽',
  '⚽',
  '🎱',
  '🎱',
  '💎',
  '💎',
  '🚀',
  '🚀',
];

export async function generateSet(): Promise<Card[]> {
  const randomSet: Card[] = [];
  const cards: Card[] = [...cardsSet];
  while (cards.length !== 0) {
    const randomNumber = Math.floor(Math.random() * cards.length);
    randomSet.push(cards.splice(randomNumber, 1)[0]);
  }
  return randomSet;
}
