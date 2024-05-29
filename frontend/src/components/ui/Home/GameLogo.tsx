import Image from 'next/image';
import Link from 'next/link';

type GameLogoProps = {
  name: string;
  href: string;
  src: string;
  alt: string;
};

export default function GameLogo({ name, href, src, alt }: GameLogoProps) {
  return (
    <Link
      className="flex h-36 w-72 items-center justify-center"
      aria-label={`Go to game ${name}`}
      href={href}
    >
      <Image src={src} alt={alt} width={288} height={144} />
    </Link>
  );
}
