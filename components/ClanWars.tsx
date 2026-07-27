import { ShieldCheck, Swords, Trophy } from "lucide-react";

const clanWars = [
  { opponent: "Soul Reapers" },
  { opponent: "S1NGULAR1TY" },
  { opponent: "DLC" },
  { opponent: "V3X" },
];

export default function ClanWars() {
  return (
    <section
      id="clan-wars"
      className="border-t border-zinc-900 bg-zinc-950 py-12 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="mb-2 text-sm font-black uppercase tracking-[0.35em] text-red-500">
            Clan Wars
          </p>

          <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Forged Through Competition.
          </h2>

          <p className="mt-3 text-lg leading-7 text-zinc-400">
            Every clan war is another opportunity to improve, compete, and
            represent 9P. These battles reflect our commitment to teamwork,
            strategy, and continuous growth.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-black p-5 transition-all duration-300 hover:border-red-600">
            <Trophy className="mb-3 text-red-500" size={30} />

            <p className="text-4xl font-black">4</p>

            <p className="mt-1 text-sm font-bold uppercase tracking-widest text-zinc-400">
              Clan Wins
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black p-5 transition-all duration-300 hover:border-red-600">
            <ShieldCheck className="mb-3 text-green-500" size={30} />

            <p className="text-4xl font-black">100%</p>

            <p className="mt-1 text-sm font-bold uppercase tracking-widest text-zinc-400">
              Win Rate
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black p-5 transition-all duration-300 hover:border-red-600">
            <Swords className="mb-3 text-red-500" size={30} />

            <p className="text-4xl font-black">4</p>

            <p className="mt-1 text-sm font-bold uppercase tracking-widest text-zinc-400">
              Clan Wars
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {clanWars.map((war) => (
            <article
              key={war.opponent}
              className="group rounded-2xl border border-zinc-800 bg-black p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-600 hover:shadow-[0_0_25px_rgba(220,38,38,0.14)]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-green-900 bg-green-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-green-400">
                  WIN
                </span>

                <ShieldCheck
                  size={20}
                  className="text-green-500 transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-4 text-2xl font-black">
                {war.opponent}
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                A competitive clan war where 9P demonstrated teamwork,
                coordination, and determination against a strong opponent.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}