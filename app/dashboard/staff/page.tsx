import BackButton from "@/components/BackButton";
import { auth } from "@/auth";
import { StaffRole } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { toggleStaffVisibility } from "./actions";

const allowedRoles: StaffRole[] = [
  StaffRole.OWNER,
  StaffRole.CO_OWNER,
  StaffRole.MANAGER,
  StaffRole.HEAD_ADMIN,
  StaffRole.ADMIN,
  StaffRole.HEAD_MODERATOR,
  StaffRole.MODERATOR,
];

export default async function StaffDashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    redirect("/");
  }

  const roles = await prisma.rolePreset.findMany({
    orderBy: {
      displayOrder: "asc",
    },
    include: {
      members: {
        orderBy: {
          displayName: "asc",
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <BackButton
          href="/dashboard"
          label="Back to Dashboard"
        />

        <div className="mt-8">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-red-500">
            Dashboard
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase sm:text-5xl">
            Staff Management
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            View synced Discord staff, control public visibility, and manage
            role presets.
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {roles.map((role) => (
            <section
              key={role.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500">
                    Display order {role.displayOrder}
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    {role.name}
                  </h2>

                  <p className="mt-3 max-w-3xl text-zinc-400">
                    {role.description}
                  </p>
                </div>

                <div className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-bold text-zinc-300">
                  {role.members.length} member
                  {role.members.length === 1 ? "" : "s"}
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {role.members.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-zinc-800 p-4 text-sm text-zinc-500">
                    No Discord members are currently assigned to this role.
                  </p>
                ) : (
                  role.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-black/50 p-4"
                    >
                      <div>
                        <p className="font-bold text-white">
                          {member.displayName}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          Discord ID: {member.discordId}
                        </p>
                      </div>

                      <form
                        action={async () => {
                          "use server";

                          await toggleStaffVisibility(
                            member.id,
                            member.visible,
                          );
                        }}
                      >
                        <button
                          type="submit"
                          className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider transition ${
                            member.visible
                              ? "bg-green-950 text-green-400 hover:bg-green-900"
                              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                          }`}
                        >
                          {member.visible ? "Visible" : "Hidden"}
                        </button>
                      </form>
                    </div>
                  ))
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}