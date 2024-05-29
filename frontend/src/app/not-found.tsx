'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col content-center items-center justify-center gap-4">
      <p className="">404</p>
      <h1 className="">Page could not be found</h1>
      <div className="">
        <Link aria-label="Go to home page" className="" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
