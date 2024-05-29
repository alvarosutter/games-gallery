import Link from 'next/link';

export default function Logo() {
  return (
    <Link aria-label="Go to home page" href="/" className="">
      <span className="text-blue-500">GAMES</span>
      GALLERY
    </Link>
  );
}
