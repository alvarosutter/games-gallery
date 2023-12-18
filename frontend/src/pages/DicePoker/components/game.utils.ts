export type Dice = {
  id: string;
  letter: string;
  value: number;
};

export const dicesSet = [
  {
    id: '',
    letter: 'A',
    value: 14,
  },
  {
    id: '',
    letter: '9',
    value: 9,
  },
  {
    id: '',
    letter: '10',
    value: 10,
  },
  {
    id: '',
    letter: 'J',
    value: 11,
  },
  {
    id: '',
    letter: 'Q',
    value: 12,
  },
  {
    id: '',
    letter: 'K',
    value: 13,
  },
];

function roll(): Dice {
  const randomNumber = Math.floor(Math.random() * 6);
  return { ...dicesSet[randomNumber], id: crypto.randomUUID() };
}

// eslint-disable-next-line @typescript-eslint/require-await
async function sort(dices: Dice[]) {
  return dices.sort((a, b) => a.value - b.value);
}

export async function getDices() {
  const dices = await sort([roll(), roll(), roll(), roll(), roll()]);
  return dices;
}

function getDicesValues(dices: Dice[]) {
  return dices.map((dice) => dice.value);
}

/** Returns the sum of all the values in an array */
function getSum(arr: number[]) {
  return arr.reduce((acc, num) => acc + num, 0);
}

function checkDices(dices: Dice[]) {
  const dicesValues = getDicesValues(dices);
  // Array with all the duplicates in order to find pairs, triples, and so on
  const duplicates = dicesValues.filter((dice) => dicesValues.indexOf(dice) !== dicesValues.lastIndexOf(dice));
  const sum = getSum(duplicates);

  // Check for Five of a Kind - Level 7
  if (dicesValues.every((dice) => dice === dicesValues[0])) {
    return { type: 'Five of a Kind', level: 7, sum: getSum(dicesValues) };
  }

  // Check for Four of a Kind - Level 6
  if (duplicates.length === 4 && new Set(duplicates).size === 1) {
    return { type: 'Four of a Kind', level: 6, sum };
  }

  // Check for Full House - Level 5
  if (duplicates.length === 5) {
    return { type: 'Full House', level: 5, sum };
  }

  // Check for Straight - Level 4
  const straightSum = getSum(dicesValues);
  if (duplicates.length === 0) {
    if (straightSum === 55 || straightSum === 60) {
      return { type: 'Straight', level: 4, sum };
    }
  }
  // Check for Three of a Kind - Level 3
  if (duplicates.length === 3) {
    return { type: 'Three of a Kind', level: 3, sum };
  }

  // Check for Two Pairs - Level 2
  if (duplicates.length === 4 && new Set(duplicates).size === 2) {
    return { type: 'Two Pairs', level: 2, sum };
  }

  // Check for Two of a Kind - Level 1
  if (duplicates.length === 2) {
    return { type: 'Two of a Kind', level: 1, sum };
  }

  return { type: `Highest Card ${dices.slice(-1)[0].letter}`, level: 0, sum: dices.slice(-1)[0].value };
}

export function check(playerDices: Dice[], pcDices: Dice[]): { result: string; player: string; pc: string } {
  const playerResult = checkDices(playerDices);
  const pcResult = checkDices(pcDices);

  if (playerResult.level === pcResult.level) {
    if (playerResult.sum > pcResult.sum) {
      return { result: 'player', player: playerResult.type, pc: pcResult.type };
    }
    if (playerResult.sum < pcResult.sum) {
      return { result: 'pc', player: playerResult.type, pc: pcResult.type };
    }
    return { result: 'draw', player: playerResult.type, pc: pcResult.type };
  }

  if (playerResult.level > pcResult.level) {
    return { result: 'player', player: playerResult.type, pc: pcResult.type };
  }

  // playerResult.level < pcResult.level
  return { result: 'pc', player: playerResult.type, pc: pcResult.type };
}
