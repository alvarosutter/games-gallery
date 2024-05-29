'use client';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function GlobalError() {
  return (
    <main className="flex h-[90vh] flex-col content-center items-center justify-center gap-4 px-4">
      <p className="text-2xl font-medium tracking-wider">500</p>
      <h1 className="my-4 text-center text-3xl font-bold tracking-wider">Internal Server Error</h1>
      <div className="rounded-xl px-1 py-1 hover:bg-cyan-800">
        <Link
          aria-label="Go to home page"
          className="flex flex-row gap-2 rounded-lg bg-cyan-600 px-3 py-2 font-medium text-white"
          href="/"
        >
          Back to Home
          <ArrowRightIcon width={24} height={24} />
        </Link>
      </div>
    </main>
  );
}
