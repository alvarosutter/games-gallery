'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import HigherLowerGame from '../../../components/games/HigherLower';
import PigGame from '../../../components/games/PigGame';
import RockPaperScissors from '../../../components/games/RockPaperScissors';
import Cover from '../../../components/ui/Game/Cover';
import useLocalStorage from '../../../hooks/useLocalStorage';
import type { Game } from '../../../types/game';
import GamesData from '../../gamesData.json';

export default function Main() {
  const pathname = usePathname();
  const games = GamesData.games as Array<Game>;
  const game = games.filter((g) => g.href === pathname)[0];
  const [gameRunning, setGameRunning] = useState(false);
  const { value: savedScore, setValue: setScore } = useLocalStorage(
    `${game.name}-score`,
    game.score
  );

  if (gameRunning) {
    const name = pathname.replace('/games/', '');
    switch (name) {
      case 'rockpaperscissors':
        return <RockPaperScissors game={game} score={savedScore} setScore={setScore} />;
      case 'higherlower':
        return <HigherLowerGame game={game} score={savedScore} setScore={setScore} />;
      case 'piggame':
        return <PigGame game={game} score={savedScore} setScore={setScore} />;
      case 'dicepoker':
        return <p>{name}</p>;
      case 'hangman':
        return <p>{name}</p>;
      case 'simongame':
        return <p>{name}</p>;
      case 'memory':
        return <p>{name}</p>;
      default:
        return <p>{`GAME: ${name} NOT FOUND`}</p>;
    }
  }

  return (
    <main>
      <Cover game={{ ...game, score: savedScore }} onClick={() => setGameRunning(true)} />
    </main>
  );
}
