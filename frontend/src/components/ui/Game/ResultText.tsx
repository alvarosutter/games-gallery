type ResultTextProps = {
  text: string;
  color: string;
};

export default function ResultText({ text, color }: ResultTextProps) {
  return (
    <p className="text-center text-5xl font-medium" style={{ color: `${color}` }}>
      {text.toUpperCase()}
    </p>
  );
}
