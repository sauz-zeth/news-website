"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h1>Error!</h1>
      <button onClick={() => reset()}>Try again</button>
      <Link href="/news">Back to news</Link>
    </div>
  );
}
