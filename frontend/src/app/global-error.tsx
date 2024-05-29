'use client';

import Link from 'next/link';

export default function GlobalError() {
  return (
    <main className="flex h-screen flex-col content-center items-center justify-center gap-4">
      <p className="">500</p>
      <h1 className="">Internal Server Error</h1>
      <div className="">
        <Link aria-label="Go to home page" className="" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
