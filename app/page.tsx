export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <section className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-red-500">
          Competitive Roblox RIVALS Clan
        </p>

        <h1 className="text-7xl font-black tracking-tight sm:text-8xl md:text-9xl">
          9P
        </h1>

        <h2 className="mt-5 text-2xl font-bold text-zinc-200 sm:text-4xl">
          Built for competition.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
          Join a growing competitive Roblox RIVALS community focused on skill,
          teamwork, fair competition, and an active player base.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#discord"
            className="rounded-md bg-red-700 px-8 py-4 text-sm font-bold uppercase tracking-wider transition hover:scale-105 hover:bg-red-600"
          >
            Join Discord
          </a>

          <a
            href="#about"
            className="rounded-md border border-zinc-700 px-8 py-4 text-sm font-bold uppercase tracking-wider text-zinc-200 transition hover:scale-105 hover:border-red-600 hover:text-white"
          >
            Learn More
          </a>
        </div>
      </section>
    </main>
  );
}