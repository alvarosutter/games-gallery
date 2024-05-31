import PlayButton from './PlayButton';
import ScoreBox from './ScoreBox';
import type { Score } from '../../../types/score';

type ClosureProps = {
  score: Score;
  color: string;
  onClick: () => void;
  children: React.ReactNode | Array<React.ReactNode>;
};

export default function Closure({ score, color, onClick, children }: ClosureProps) {
  return (
    <section className="flex flex-col items-center justify-center gap-8 p-4">
      <div className="flex flex-row flex-wrap content-center items-center justify-center">
        {children}
      </div>
      <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-32">
        <ScoreBox score={score} color={color} />
        <PlayButton text="play again" color={color} onClick={onClick} />
      </div>
    </section>
  );
}
