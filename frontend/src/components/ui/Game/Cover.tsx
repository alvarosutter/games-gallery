import GameLogo from './GameLogo';
import PlayButton from './PlayButton';
import ScoreBox from './ScoreBox';
import type { Game } from '../../../types/game';

type CoverProps = {
  game: Game;
  onClick: () => void;
};

export default function Cover({ game, onClick }: CoverProps) {
  const { name, logo, description, score, color, href } = game;

  return (
    <section className="flex flex-col items-center justify-center gap-8 p-4">
      <GameLogo name={name} href={href} src={logo} alt={name} />
      <p className="m-1 p-2 text-center text-lg">{description}</p>
      <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-32">
        <ScoreBox score={score} color={color} />
        <PlayButton text="play game" color={color} onClick={onClick} />
      </div>
    </section>
  );
}
