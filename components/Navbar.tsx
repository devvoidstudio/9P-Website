import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 lg:px-10">

        {/* LOGO */}

        <a
          href="#home"
          className="transition duration-300 hover:scale-105"
        >
          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-red-900/60 shadow-[0_0_18px_rgba(220,38,38,0.30)]">
            <Image
              src="/9p-artwork.png"
              alt="9P Logo"
              fill
              priority
              sizes="56px"
              className="object-cover object-center scale-110"
            />
          </div>
        </a>

        {/* MENU */}

        <div className="hidden items-center gap-12 md:flex">
          <a
            href="#about"
            className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-300 transition duration-300 hover:text-red-500"
          >
            About
          </a>

          <a
            href="#staff"
            className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-300 transition duration-300 hover:text-red-500"
          >
            Staff
          </a>

          <a
            href="#clan-wars"
            className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-300 transition duration-300 hover:text-red-500"
          >
            Clan Wars
          </a>

          <a
            href="#tryouts"
            className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-300 transition duration-300 hover:text-red-500"
          >
            Tryouts
          </a>
        </div>

        {/* DISCORD BUTTON */}

       <a
  href="https://discord.gg/u5tNbwc45j"
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-md bg-red-600 px-6 py-3 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] transition-all duration-300 hover:scale-105 hover:bg-red-500"
>
  Join Discord
</a>
      </nav>
    </header>
  );
}