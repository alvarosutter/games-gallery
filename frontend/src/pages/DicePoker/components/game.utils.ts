export type Dice = {
  letter: string;
  value: number;
};

export const dicesSet = [
  {
    letter: 'A',
    value: 14,
  },
  {
    letter: '9',
    value: 9,
  },
  {
    letter: '10',
    value: 10,
  },
  {
    letter: 'J',
    value: 11,
  },
  {
    letter: 'Q',
    value: 12,
  },
  {
    letter: 'K',
    value: 13,
  },
];

function roll(): Dice {
  const randomNumber = Math.floor(Math.random() * 6);
  return dicesSet[randomNumber];
}
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

function getSum(arr: number[]) {
  return arr.reduce((acc, num) => acc + num, 0);
}

function checkDices(dices: Dice[]) {
  const dicesValues = getDicesValues(dices);
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
  let checkResult = { result: '', player: '', pc: '' };

  if (playerResult.level === pcResult.level) {
    checkResult = { result: 'draw', player: playerResult.type, pc: pcResult.type };
    if (playerResult.sum > pcResult.sum) {
      checkResult = { result: 'player', player: playerResult.type, pc: pcResult.type };
    }
    if (playerResult.sum < pcResult.sum) {
      checkResult = { result: 'pc', player: playerResult.type, pc: pcResult.type };
    }
  }
  if (playerResult.level > pcResult.level) {
    checkResult = { result: 'player', player: playerResult.type, pc: pcResult.type };
  }
  if (playerResult.level < pcResult.level) {
    checkResult = { result: 'pc', player: playerResult.type, pc: pcResult.type };
  }

  return checkResult;
}
