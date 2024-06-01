'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import DicePokerGame from '../../../components/games/DicePoker';
import HigherLowerGame from '../../../components/games/HigherLower';
import Memory from '../../../components/games/Memory';
import PigGame from '../../../components/games/PigGame';
import RockPaperScissors from '../../../components/games/RockPaperScissors';
import Cover from '../../../components/ui/Game/Cover';
import useLocalStorage from '../../../hooks/useLocalStorage';
import type { Game } from '../../../types/game';
import GamesData from '../../gamesData.json';
import NotFound from '../../not-found';

export default function Main() {
  const pathname = usePathname();
  const games = GamesData.games as Array<Game>;
  const game = games.filter((g) => g.href === pathname)[0];
  const [gameRunning, setGameRunning] = useState(false);

  if (game === undefined) return <NotFound />;

  // eslint-disable-next-line react-hooks/rules-of-hooks
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
        return <DicePokerGame game={game} score={savedScore} setScore={setScore} />;
      case 'hangman':
        return <p>{name}</p>;
      case 'simongame':
        return <p>{name}</p>;
      case 'memory':
        return <Memory game={game} score={savedScore} setScore={setScore} />;
      default:
        return <NotFound />;
    }
  }

  return (
    <main>
      <Cover game={{ ...game, score: savedScore }} onClick={() => setGameRunning(true)} />
    </main>
  );
}
