type OptionBtnProps = {
  title: string;
  pick: string;
  borderColor: string;
  onClick?: () => void;
  disable?: boolean;
};

export default function OptionBtn({
  title,
  pick,
  borderColor,
  onClick,
  disable = false,
}: OptionBtnProps) {
  return (
    <button
      className="h-36 w-36 rounded-full border-8 bg-[#ffffffef] text-center text-7xl hover:scale-105"
      type="button"
      title={title}
      onClick={onClick}
      style={{ borderColor: `${borderColor}` }}
      disabled={disable}
    >
      {pick}
    </button>
  );
}
