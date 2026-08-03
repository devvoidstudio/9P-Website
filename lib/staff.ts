import { prisma } from "@/lib/prisma";

export async function getStaff() {
  return prisma.rolePreset.findMany({
    where: {
      isVisible: true,
    },
    orderBy: {
      displayOrder: "asc",
    },
    include: {
      members: {
        where: {
          visible: true,
        },
        include: {
          user: true,
        },
      },
    },
  });
}