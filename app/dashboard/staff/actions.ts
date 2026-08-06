"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { StaffRole } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const allowedRoles: StaffRole[] = [
  StaffRole.OWNER,
  StaffRole.CO_OWNER,
  StaffRole.MANAGER,
  StaffRole.HEAD_ADMIN,
  StaffRole.ADMIN,
  StaffRole.HEAD_MODERATOR,
  StaffRole.MODERATOR,
];

export async function toggleStaffVisibility(
  staffMemberId: string,
  currentlyVisible: boolean,
) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("You must be signed in.");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    throw new Error("You do not have permission.");
  }

  await prisma.staffMember.update({
    where: {
      id: staffMemberId,
    },
    data: {
      visible: !currentlyVisible,
    },
  });

  revalidatePath("/dashboard/staff");
  revalidatePath("/");
}