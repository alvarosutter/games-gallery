type WordProps = {
  word: string;
  guesses: Array<string>;
  gameRunning: boolean;
};

export default function Word({ word, guesses, gameRunning }: WordProps) {
  return (
    <div className="flex w-full flex-row flex-wrap content-center items-center justify-center gap-4">
      {word.split('').map((letter, i) => {
        const notEmpty = (
          <div
            className="flex h-10 w-10 items-center justify-center border-b-2 border-white p-2"
            // eslint-disable-next-line react/no-array-index-key
            key={letter + i}
          >
            <p
              className="text-[#121212]"
              style={
                guesses.includes(letter) || !gameRunning
                  ? { color: '#ffffff' }
                  : { visibility: 'hidden' }
              }
            >
              {letter}
            </p>
          </div>
        );
        // eslint-disable-next-line react/no-array-index-key
        const empty = <div style={{ visibility: 'hidden' }} key={letter + i} />;
        return letter !== ' ' ? notEmpty : empty;
      })}
    </div>
  );
}
