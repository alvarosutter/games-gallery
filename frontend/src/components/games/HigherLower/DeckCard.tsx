import type { Card } from './higherLower.utils';

type CardProps = {
  card: Card;
};

export default function DeckCard({ card }: CardProps) {
  return (
    <div className="flex max-h-48 max-w-fit flex-col items-center justify-center bg-[#ffffffef] px-1 outline outline-[4px] outline-neutral-400">
      <p
        className="mb-1 flex items-center justify-center text-center text-[12rem] text-[#121212]"
        style={card?.type === 'hearts' || card?.type === 'diamonds' ? { color: '#ff0000ee' } : {}}
      >
        {card?.unicode}
      </p>
    </div>
  );
}
