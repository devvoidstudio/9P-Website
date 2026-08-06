import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";
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

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      displayName: true,
      username: true,
      image: true,
      role: true,
    },
  });

  if (!currentUser || !dashboardRoles.includes(currentUser.role)) {
    redirect("/");
  }

  const displayName =
    currentUser.displayName ??
    currentUser.username ??
    session.user.name ??
    "User";

  const avatarUrl = currentUser.image ?? session.user.image;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            href="/dashboard"
            className="text-sm font-black uppercase tracking-[0.25em] text-red-500 transition hover:text-red-400"
          >
            9P Control Center
          </Link>

          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 transition hover:border-red-700 hover:bg-red-950/10 [&::-webkit-details-marker]:hidden">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-zinc-700 bg-zinc-900">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={`${displayName}'s avatar`}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-black text-red-500">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="max-w-36 text-left">
                <p className="truncate text-sm font-black text-white">
                  {displayName}
                </p>

                <p className="truncate text-xs font-black uppercase tracking-wider text-red-500">
                  {currentUser.role.replaceAll("_", " ")}
                </p>
              </div>

              <span className="text-xs text-zinc-500 transition-transform group-open:rotate-180">
                ▼
              </span>
            </summary>

            <div className="absolute right-0 top-[calc(100%+0.75rem)] w-56 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl shadow-black/70">
              <Link
                href="/"
                className="block rounded-lg px-4 py-3 text-sm font-bold text-zinc-300 transition hover:bg-red-950/30 hover:text-white"
              >
                Back to Website
              </Link>

              <div className="my-2 border-t border-zinc-800" />

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
                  className="w-full rounded-lg px-4 py-3 text-left text-sm font-bold text-red-400 transition hover:bg-red-950/30 hover:text-red-300"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </details>
        </div>
      </header>

      {children}
    </div>
  );
}