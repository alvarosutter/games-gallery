type ScoreTextProps = {
  score: number;
  text?: string;
};

export default function ScoreText({ score, text = 'Score' }: ScoreTextProps) {
  return <p className="text-center text-4xl">{`${text}: ${score}`}</p>;
}
