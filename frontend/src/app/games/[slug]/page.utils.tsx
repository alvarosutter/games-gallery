export default function getGame(name: string) {
  switch (name) {
    case 'Rock-Paper-Scissors':
      return <p>{name}</p>;
    case 'Higher-Lower':
      return <p>{name}</p>;
    case 'Pig-Game':
      return <p>{name}</p>;
    case 'Dice-Poker':
      return <p>{name}</p>;
    case 'Hangman':
      return <p>{name}</p>;
    case 'Simon-Game':
      return <p>{name}</p>;
    case 'Memory':
      return <p>{name}</p>;
    default:
      return <p>GAME NOT FOUND</p>;
  }
}
