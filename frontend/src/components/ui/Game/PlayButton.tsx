type PlayButtonProps = {
  text: string;
  color: string;
  onClick: () => void;
};

export default function PlayButton({ text, color, onClick }: PlayButtonProps) {
  return (
    <div className="rounded-xl px-1 py-1 hover:bg-[#363636]">
      <button
        type="button"
        onClick={onClick}
        className="w-36 rounded-lg p-3 text-lg font-bold text-[#121212]"
        style={{ backgroundColor: `${color}` }}
      >
        {text.toUpperCase()}
      </button>
    </div>
  );
}
