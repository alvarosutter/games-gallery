import GamesData from './gamesData.json';
import GameLogo from '../components/ui/Home/GameLogo';
import type { Game } from '../types/Game';

export default function Main() {
  const games = GamesData.games as Array<Game>;
  return (
    <main className="mt-6 flex w-full max-w-[80%] flex-row flex-wrap content-start items-start justify-evenly gap-x-8 gap-y-12 p-4">
      {games.map((game) => (
        <GameLogo
          key={game.name}
          name={game.name}
          href={game.href}
          src={game.logo}
          alt={game.name}
        />
      ))}
    </main>
  );
}
