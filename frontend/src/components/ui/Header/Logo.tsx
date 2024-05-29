import Link from 'next/link';

export default function Logo() {
  return (
    <Link aria-label="Go to home page" href="/" className="text-2xl font-bold tracking-[0.15em]">
      <span className="text-[#47fe90]">GAMES</span>
      GALLERY
    </Link>
  );
}
