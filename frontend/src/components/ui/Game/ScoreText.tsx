type ScoreTextProps = {
  score: number;
};

export default function ScoreText({ score }: ScoreTextProps) {
  return <p className="text-center text-4xl">{`Score: ${score}`}</p>;
}
