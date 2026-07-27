export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <img
            src="/9p-artwork.png"
            alt="9P Logo"
            className="h-24 w-24 object-contain drop-shadow-[0_0_22px_rgba(220,38,38,0.45)] transition-all duration-500 hover:scale-105 hover:drop-shadow-[0_0_35px_rgba(220,38,38,0.65)]"
          />

          <h2 className="mt-6 text-3xl font-black uppercase tracking-tight">
            Built For Competition.
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-zinc-400">
            Forged through teamwork, discipline, and a constant drive to
            improve. Every match is another opportunity to prove ourselves.
          </p>

          <a
            href="https://discord.gg/u5tNbwc45j"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 rounded-xl bg-red-600 px-8 py-4 text-lg font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_0_35px_rgba(220,38,38,0.55)]"
          >
            Join Discord
          </a>
        </div>

        <div className="mt-14 border-t border-zinc-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-zinc-500 md:flex-row">
            <p>© 2026 9P Clan. All rights reserved.</p>

            <p>
              Built by{" "}
              <span className="font-semibold text-zinc-300 transition-colors duration-300 hover:text-red-500">
                v0id
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}