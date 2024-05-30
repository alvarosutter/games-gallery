import type { Score } from '../../../types/score';

type ScoreBoxProps = {
  score: Score;
  color: string;
};

export default function ScoreBox({ score, color }: ScoreBoxProps) {
  const entries = Object.entries(score);

  return (
    <div
      className="flex w-fit items-center justify-center gap-4 rounded-xl border-[5px] bg-[#ffffffef] p-4 text-[#121212]"
      style={{ borderColor: `${color}` }}
    >
      {entries.map((entry) => {
        let label = entry[0].charAt(0).toUpperCase() + entry[0].slice(1);
        if (label.startsWith('Highest')) label = label.replace('t', 't ');
        const value = entry[1];
        return (
          <div className="flex flex-col content-center items-center justify-center" key={entry[0]}>
            <p className="text-center text-lg font-bold">{label}</p>
            <p className="text-center text-lg font-medium">{value === -1 ? '-' : value}</p>
          </div>
        );
      })}
    </div>
  );
}
