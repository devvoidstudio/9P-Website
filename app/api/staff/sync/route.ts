import { auth } from "@/auth";
import { StaffRole } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type DiscordUser = {
  id: string;
  username: string;
  global_name?: string | null;
  bot?: boolean;
};

type DiscordMember = {
  nick?: string | null;
  roles: string[];
  user: DiscordUser;
};

const staffRoles = [
  { env: "OWNER_ROLE_ID", preset: "Owner" },
  { env: "CO_OWNER_ROLE_ID", preset: "Co-Owner" },
  { env: "MANAGER_ROLE_ID", preset: "Manager" },
  { env: "HEAD_ADMIN_ROLE_ID", preset: "Head Admin" },
  { env: "ADMIN_ROLE_ID", preset: "Admin" },
  { env: "HEAD_MODERATOR_ROLE_ID", preset: "Head Moderator" },
  { env: "MODERATOR_ROLE_ID", preset: "Moderator" },
  { env: "TRYOUT_HOST_ROLE_ID", preset: "Tryout Host" },
  { env: "HELPER_ROLE_ID", preset: "Helper" },
];

const dashboardRoles: StaffRole[] = [
  StaffRole.OWNER,
  StaffRole.CO_OWNER,
  StaffRole.MANAGER,
  StaffRole.HEAD_ADMIN,
  StaffRole.ADMIN,
  StaffRole.HEAD_MODERATOR,
  StaffRole.MODERATOR,
  StaffRole.HELPER,
];

function findPresetName(memberRoles: string[]) {
  for (const role of staffRoles) {
    const roleId = process.env[role.env];

    if (roleId && memberRoles.includes(roleId)) {
      return role.preset;
    }
  }

  return null;
}

async function fetchDiscordMembers() {
  const guildId = process.env.DISCORD_GUILD_ID;
  const botToken = process.env.DISCORD_BOT_TOKEN;

  if (!guildId || !botToken) {
    throw new Error("Missing Discord guild ID or bot token.");
  }

  const members: DiscordMember[] = [];
  let after: string | undefined;

  while (true) {
    const url = new URL(
      `https://discord.com/api/v10/guilds/${guildId}/members`,
    );

    url.searchParams.set("limit", "1000");

    if (after) {
      url.searchParams.set("after", after);
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bot ${botToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Discord API returned ${response.status}.`);
    }

    const page = (await response.json()) as DiscordMember[];

    members.push(...page);

    if (page.length < 1000) {
      break;
    }

    after = page[page.length - 1].user.id;
  }

  return members;
}

export async function POST() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser || !dashboardRoles.includes(currentUser.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const discordMembers = await fetchDiscordMembers();
    
   console.log(
  discordMembers
    .filter((member) => !member.user.bot)
    .map((member) => ({
      user: member.user.username,
      roles: member.roles,
    })),
);
    const syncedDiscordIds: string[] = [];

    for (const member of discordMembers) {
      if (member.user.bot) continue;

      const presetName = findPresetName(member.roles);

      if (!presetName) continue;

      const preset = await prisma.rolePreset.findUnique({
        where: {
          name: presetName,
        },
      });

      if (!preset) continue;

      const linkedUser = await prisma.user.findUnique({
        where: {
          discordId: member.user.id,
        },
      });

      const displayName =
        member.nick ??
        member.user.global_name ??
        member.user.username;

      await prisma.staffMember.upsert({
        where: {
          discordId: member.user.id,
        },
        update: {
          displayName,
          visible: true,
          roleId: preset.id,
          userId: linkedUser?.id ?? null,
        },
        create: {
          discordId: member.user.id,
          displayName,
          visible: true,
          roleId: preset.id,
          userId: linkedUser?.id ?? null,
        },
      });

      syncedDiscordIds.push(member.user.id);
    }

    await prisma.staffMember.deleteMany({
      where: {
        discordId: {
          notIn: syncedDiscordIds,
        },
      },
    });

    return NextResponse.json({
      success: true,
      synced: syncedDiscordIds.length,
    });
  } catch (error) {
    console.error("Staff synchronization failed:", error);

    return NextResponse.json(
      { error: "Staff synchronization failed." },
      { status: 500 },
    );
  }
}