import {
  Crosshair,
  ShieldCheck,
  Swords,
  Target,
  Trophy,
} from "lucide-react";

const tryoutFormats = [
  {
    title: "DL",
    subtitle: "Default Loadout",
    mode: "1v1",
    icon: Swords,
  },
  {
    title: "CL",
    subtitle: "Custom Loadout",
    mode: "1v1",
    icon: Target,
  },
  {
    title: "SDL",
    subtitle: "Sniper Default Loadout",
    mode: "1v1",
    icon: Crosshair,
  },
];

const bypasses = [
  "Nemesis",
  "Archnemesis",
  "Onyx 3",
  "250+ Winstreak",
  "Level 300+",
  "85%+ Win Rate",
];

export default function Tryouts() {
  return (
    <section
      id="tryouts"
      className="border-t border-zinc-900 bg-zinc-950 py-20 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-black uppercase tracking-[0.35em] text-red-500">
            Recruitment
          </p>

          <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Earn Your Spot.
          </h2>

          <p className="mt-5 text-lg leading-8 text-zinc-400">
            Think you&apos;ve got what it takes to join{" "}
            <span className="font-bold text-white">9P</span>? Prove your
            mechanics, game sense, consistency, and composure through our
            tryout system—or qualify for a bypass.
          </p>
        </div>

        {/* Tryout Formats */}

        <div className="mt-16">
          <h3 className="mb-6 text-center text-2xl font-black uppercase">
            Tryout Formats
          </h3>

          <div className="grid gap-6 md:grid-cols-3">
            {tryoutFormats.map((format) => {
              const Icon = format.icon;

              return (
                <article
                  key={format.title}
                  className="group rounded-2xl border border-zinc-800 bg-black p-8 transition-all duration-300 hover:-translate-y-1 hover:border-red-600"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-600/10">
                    <Icon
                      size={28}
                      className="text-red-500 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <p className="text-sm font-black uppercase tracking-[0.25em] text-red-500">
                    {format.title}
                  </p>

                  <h4 className="mt-2 text-2xl font-black">
                    {format.subtitle}
                  </h4>

                  <div className="mt-5 inline-flex rounded-lg border border-zinc-700 px-3 py-1 text-sm font-semibold text-zinc-300">
                    {format.mode}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bypass Requirements */}

        <div className="mt-20">
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="text-green-500" size={30} />

            <h3 className="text-2xl font-black uppercase">
              9P Bypass Requirements
            </h3>
          </div>

          <p className="mx-auto mt-5 max-w-3xl text-center leading-8 text-zinc-400">
            Meet{" "}
            <span className="font-bold text-white">
              any one requirement
            </span>{" "}
            below to skip the standard tryout.
            <br />
            <span className="font-semibold text-white">
              Valid proof must be submitted and verified by 9P staff.
            </span>
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bypasses.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-black p-5 transition-all duration-300 hover:border-green-500 hover:bg-zinc-900"
              >
                <Trophy className="shrink-0 text-green-500" size={22} />

                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>

          {/* Exception Notice */}

          <div className="mt-8 rounded-2xl border border-yellow-900/40 bg-yellow-500/5 p-6">
            <h4 className="text-lg font-black uppercase text-yellow-400">
              Staff Discretion
            </h4>

            <p className="mt-3 leading-7 text-zinc-400">
              Exceptions may be made for players whose skill level is already
              known and recognized by the 9P staff team.
            </p>
          </div>
          
          {/* Final Recruitment Message */}

<div className="mt-20 border-t border-zinc-800 pt-12 text-center">
  <h3 className="text-3xl font-black uppercase">Ready to Join?</h3>

  <p className="mx-auto mt-5 max-w-2xl leading-8 text-zinc-400">
    Complete a tryout or qualify for a bypass. Once you&apos;re ready, head to
    the footer to join our Discord and open a recruitment ticket.
  </p>
</div>
        </div>
      </div>
    </section>
  );
}