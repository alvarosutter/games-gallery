export type Card = '🎃' | '🤡' | '👽' | '👻' | '👾' | '🤖' | '⚽' | '🎱' | '💎' | '🚀';
export const cardsSet: Array<Card> = [
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

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateSet(): Promise<Array<Card>> {
  const randomSet: Array<Card> = [];
  const cards: Array<Card> = [...cardsSet];
  while (cards.length !== 0) {
    const randomNumber = Math.floor(Math.random() * cards.length);
    randomSet.push(cards.splice(randomNumber, 1)[0]);
  }
  return randomSet;
}
