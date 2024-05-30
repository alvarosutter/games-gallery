import GamesData from './gamesData.json';
import GameLogo from '../components/ui/Game/GameLogo';
import type { Game } from '../types/game';

export default function Main() {
  const games = GamesData.games as Array<Game>;
  return (
    <section className="flex flex-row flex-wrap content-start items-start justify-evenly gap-x-8 gap-y-12 p-4">
      {games.map((game) => (
        <GameLogo
          key={game.name}
          name={game.name}
          href={game.href}
          src={game.logo}
          alt={game.name}
        />
      ))}
    </section>
  );
}
