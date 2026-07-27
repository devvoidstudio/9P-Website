import Image from "next/image";

const stats = [
  {
    value: "40+",
    label: "Members",
  },
  {
    value: "2026",
    label: "Founded",
  },
  {
    value: "Roblox",
    label: "Platform",
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-red-950/40 bg-black px-6 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(220,38,38,0.18),transparent_38%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.92)_38%,rgba(0,0,0,0.35)_68%,rgba(0,0,0,0.75)_100%)]" />

      <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-0">
        <div className="relative z-20 pt-10 lg:pt-0">
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-11 bg-red-600" />

            <p className="text-xs font-black uppercase tracking-[0.36em] text-red-500 sm:text-sm">
              Roblox RIVALS Clan
            </p>
          </div>

          <h1 className="max-w-3xl text-6xl font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-7xl lg:text-[94px]">
            Built for
            <span className="block text-red-600">
              competition<span className="text-white">.</span>
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400 sm:text-xl">
            A competitive Roblox RIVALS clan focused on teamwork, discipline,
            improvement, and building a strong community.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#discord"
              className="rounded-md bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_28px_rgba(220,38,38,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_0_42px_rgba(220,38,38,0.42)]"
            >
              Join Discord
            </a>

            <a
              href="#about"
              className="rounded-md border border-red-900/80 bg-black/50 px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition duration-300 hover:-translate-y-1 hover:border-red-600 hover:bg-red-950/20"
            >
              Learn More
            </a>
          </div>

          <div className="mt-14 flex flex-wrap border-t border-zinc-800 pt-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`min-w-[130px] ${
                  index === 0
                    ? "pr-8"
                    : "border-l border-zinc-800 px-8"
                }`}
              >
                <p className="text-3xl font-black text-white">{stat.value}</p>

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center lg:h-full">
          <div className="absolute h-[72%] w-[72%] rounded-full bg-red-700/25 blur-[120px]" />

          <div className="relative aspect-square w-full max-w-[760px]">
            <Image
              src="/9p-artwork.png"
              alt="9P clan artwork"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 58vw"
              className="object-contain object-center drop-shadow-[0_0_45px_rgba(220,38,38,0.28)]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/5 to-transparent lg:from-black/70 lg:via-black/10" />

            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/75 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />
    </section>
  );
}