import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80svh] flex flex-col items-center justify-center text-center px-6">
      <span className="eyebrow">404</span>
      <h1 className="font-display text-display-xl mt-4">Scene Not Found</h1>
      <p className="text-mist mt-4 max-w-md">
        This frame doesn&rsquo;t exist. Let&rsquo;s cut back to the reel.
      </p>
      <Link href="/" className="mt-10 link-underline">
        Return Home
      </Link>
    </section>
  );
}
