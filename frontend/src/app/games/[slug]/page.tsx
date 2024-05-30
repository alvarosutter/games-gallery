'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import getGame from './page.utils';
import Cover from '../../../components/ui/Game/Cover';
import useLocalStorage from '../../../hooks/useLocalStorage';
import type { Game } from '../../../types/game';
import GamesData from '../../gamesData.json';

export default function Main() {
  const pathname = usePathname();
  const games = GamesData.games as Array<Game>;
  const game = games.filter((g) => g.href === pathname)[0];
  const [gameRunning, setGameRunning] = useState(false);
  const { value: savedScore } = useLocalStorage(`${game.name}-score`, game.score);

  if (gameRunning) {
    return getGame(game.name);
  }

  return (
    <main>
      <Cover game={{ ...game, score: savedScore }} onClick={() => setGameRunning(true)} />
    </main>
  );
}
