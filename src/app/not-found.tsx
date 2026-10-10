import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted-foreground">The page you requested does not exist.</p>
      <Link href="/" className="mt-8 inline-flex min-h-11 items-center rounded-full bg-primary px-5 font-semibold text-primary-foreground">Return home</Link>
    </main>
  );
}
