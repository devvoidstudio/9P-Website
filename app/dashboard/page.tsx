import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { StaffRole } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import SyncStaffButton from "@/components/SyncStaffButton";

const dashboardRoles: StaffRole[] = [
  StaffRole.OWNER,
  StaffRole.CO_OWNER,
  StaffRole.MANAGER,
  StaffRole.HEAD_ADMIN,
  StaffRole.ADMIN,
  StaffRole.HEAD_MODERATOR,
  StaffRole.MODERATOR,
];

export default async function DashboardPage() {
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
      role: true,
    },
  });

  if (!currentUser || !dashboardRoles.includes(currentUser.role)) {
    redirect("/");
  }

  const displayName =
    currentUser.displayName ?? currentUser.username ?? session.user.name ?? "User";

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div>
          
        <h1 className="text-5xl font-black uppercase">
            Dashboard
         </h1>

          <p className="mt-4 text-lg text-zinc-400">
            Welcome, {displayName}.
          </p>

          <p className="mt-1 text-sm font-black uppercase tracking-[0.2em] text-red-500">
            {currentUser.role.replaceAll("_", " ")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Link
            href="/dashboard/staff"
            className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition duration-300 hover:-translate-y-1 hover:border-red-700 hover:bg-red-950/10"
          >
            <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500">
              Management
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Staff
            </h2>

            <p className="mt-3 text-zinc-400">
              View synced Discord staff and control who appears on the public website.
            </p>

            <p className="mt-6 text-sm font-bold text-red-500 transition group-hover:translate-x-1">
              Open Staff Manager →
            </p>
          </Link>

          <div className="rounded-2xl border border-zinc-900 bg-zinc-950/50 p-6 opacity-60">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-600">
              Coming next
            </p>

            <h2 className="mt-3 text-2xl font-black text-zinc-400">
              Clan Wars
            </h2>

            <p className="mt-3 text-zinc-600">
              Add, edit, remove, and reorder clan-war results.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-900 bg-zinc-950/50 p-6 opacity-60">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-600">
              Coming soon
            </p>

            <h2 className="mt-3 text-2xl font-black text-zinc-400">
              Tryouts
            </h2>

            <p className="mt-3 text-zinc-600">
              Manage tryout formats, requirements, and bypass rules.
            </p>
          </div>
        </div>

        <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500">
            Discord
          </p>

          <h2 className="mt-3 text-2xl font-black">
            Sync Staff
          </h2>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Pull current staff roles and members from your Discord server into the website database.
          </p>

          <div className="mt-6">
            <SyncStaffButton />
          </div>
        </section>
      </div>
    </main>
  );
}