import SyncStaffButton from "@/components/SyncStaffButton";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { StaffRole } from "@/generated/prisma/client";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/");
  }

  const allowedRoles: StaffRole[] = [
    StaffRole.OWNER,
    StaffRole.CO_OWNER,
    StaffRole.MANAGER,
    StaffRole.HEAD_ADMIN,
    StaffRole.ADMIN,
    StaffRole.HEAD_MODERATOR,
    StaffRole.MODERATOR,
  ];

  if (!allowedRoles.includes(user.role)) {
    redirect("/");
  }

  return (
  <main className="min-h-screen bg-black p-10 text-white">
    <h1 className="text-5xl font-black">
      Dashboard
    </h1>

    <p className="mt-4 text-zinc-400">
      Welcome {user.displayName}
    </p>

    <p className="mt-2 text-red-500">
      {user.role}
    </p>

    <SyncStaffButton />

  </main>
);
}