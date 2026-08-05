import Image from "next/image";
import Link from "next/link";

import { auth, signIn, signOut } from "@/auth";
import { StaffRole } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

const dashboardRoles: StaffRole[] = [
  StaffRole.OWNER,
  StaffRole.CO_OWNER,
  StaffRole.MANAGER,
  StaffRole.HEAD_ADMIN,
  StaffRole.ADMIN,
  StaffRole.HEAD_MODERATOR,
  StaffRole.MODERATOR,
];

export default async function Navbar() {
  const session = await auth();

  const user = session?.user?.email
    ? await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        select: {
          displayName: true,
          username: true,
          image: true,
          role: true,
        },
      })
    : null;

  const canAccessDashboard =
    user !== null && dashboardRoles.includes(user.role);

  const displayName =
    user?.displayName ??
    user?.username ??
    session?.user?.name ??
    "User";

  const avatarUrl = user?.image ?? session?.user?.image;

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
              className="scale-110 object-cover object-center"
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

        {/* AUTH AREA */}

        {!session?.user ? (
          <form
            action={async () => {
              "use server";

              await signIn("discord", {
                redirectTo: "/",
              });
            }}
          >
            <button
              type="submit"
              className="rounded-md bg-red-600 px-6 py-3 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] transition-all duration-300 hover:scale-105 hover:bg-red-500"
            >
              Login
            </button>
          </form>
        ) : (
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-3 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 transition-all duration-300 hover:border-red-600 hover:bg-red-950/20 [&::-webkit-details-marker]:hidden">
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-red-900/70 bg-zinc-900">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={`${displayName}'s Discord avatar`}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-black text-red-500">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="hidden max-w-32 text-left sm:block">
                <p className="truncate text-sm font-black text-white">
                  {displayName}
                </p>

                <p className="truncate text-[10px] font-bold uppercase tracking-[0.15em] text-red-500">
                  {user?.role ?? "Guest"}
                </p>
              </div>

              <span className="text-xs text-zinc-500 transition-transform duration-200 group-open:rotate-180">
                ▼
              </span>
            </summary>

            <div className="absolute right-0 top-[calc(100%+0.75rem)] w-56 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl shadow-black/70">
              {canAccessDashboard && (
                <Link
                  href="/dashboard"
                  className="block rounded-lg px-4 py-3 text-sm font-bold text-zinc-200 transition hover:bg-red-950/40 hover:text-red-400"
                >
                  Dashboard
                </Link>
              )}

              <form
                action={async () => {
                  "use server";

                  await signOut({
                    redirectTo: "/",
                  });
                }}
              >
                <button
                  type="submit"
                  className="w-full rounded-lg px-4 py-3 text-left text-sm font-bold text-zinc-400 transition hover:bg-red-950/40 hover:text-red-400"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </details>
        )}
      </nav>
    </header>
  );
}