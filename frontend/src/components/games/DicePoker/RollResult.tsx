import type { Dice } from './dicePoker.utils';

type RollResultProps = {
  name: string;
  result: string;
  dices: Array<Dice>;
  color: string;
};

export default function RollResult({ name, result, dices, color }: RollResultProps) {
  return (
    <>
      <p className="text-2xl">{`${name}: ${result}`}</p>
      <div className="flex flex-row flex-wrap content-center items-center justify-center gap-4">
        {dices.map((dice) => (
          <div
            className="flex h-12 w-12 flex-col items-center justify-center rounded-xl border-4 bg-[#ffffffef] text-[#121212]"
            key={dice.id}
            style={{ borderColor: color }}
          >
            <p className="text-3xl font-bold">{dice.letter}</p>
          </div>
        ))}
      </div>
    </>
  );
}
