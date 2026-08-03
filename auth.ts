import { PrismaAdapter } from "@auth/prisma-adapter";
import { StaffRole } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

type DiscordProfile = {
  id?: string;
  username?: string;
  global_name?: string | null;
};

type DiscordGuildMember = {
  roles: string[];
};

const rolePriority: Array<{
  envName: string;
  role: StaffRole;
}> = [
  { envName: "OWNER_ROLE_ID", role: StaffRole.OWNER },
  { envName: "CO_OWNER_ROLE_ID", role: StaffRole.CO_OWNER },
  { envName: "MANAGER_ROLE_ID", role: StaffRole.MANAGER },
  { envName: "HEAD_ADMIN_ROLE_ID", role: StaffRole.HEAD_ADMIN },
  { envName: "ADMIN_ROLE_ID", role: StaffRole.ADMIN },
  {
    envName: "HEAD_MODERATOR_ROLE_ID",
    role: StaffRole.HEAD_MODERATOR,
  },
  { envName: "MODERATOR_ROLE_ID", role: StaffRole.MODERATOR },
  { envName: "HELPER_ROLE_ID", role: StaffRole.HELPER },
  { envName: "TRYOUT_HOST_ROLE_ID", role: StaffRole.TRYOUT_HOST },
];

function determineHighestRole(discordRoles: string[]): StaffRole {
  for (const item of rolePriority) {
    const roleId = process.env[item.envName];

    if (roleId && discordRoles.includes(roleId)) {
      return item.role;
    }
  }

  return StaffRole.GUEST;
}

async function getDiscordMemberRoles(
  discordUserId: string,
): Promise<string[]> {
  const guildId = process.env.DISCORD_GUILD_ID;
  const botToken = process.env.DISCORD_BOT_TOKEN;

  if (!guildId || !botToken) {
    console.error("Missing Discord guild ID or bot token.");
    return [];
  }

  const response = await fetch(
    `https://discord.com/api/v10/guilds/${guildId}/members/${discordUserId}`,
    {
      headers: {
        Authorization: `Bot ${botToken}`,
      },
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error(
      `Discord member lookup failed with status ${response.status}.`,
    );
  }

  const member = (await response.json()) as DiscordGuildMember;

  return member.roles;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID!,
      clientSecret: process.env.AUTH_DISCORD_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, profile }) {
      const discordProfile = profile as DiscordProfile | undefined;
      const discordId = discordProfile?.id;

      if (!user.id || !discordId) {
        return false;
      }

      let staffRole: StaffRole = StaffRole.GUEST;

      try {
        const discordRoles = await getDiscordMemberRoles(discordId);
        staffRole = determineHighestRole(discordRoles);
      } catch (error) {
        console.error("Discord role synchronization failed:", error);
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          discordId,
          username: discordProfile.username ?? null,
          displayName:
            discordProfile.global_name ??
            discordProfile.username ??
            user.name ??
            null,
          role: staffRole,
        },
      });

      return true;
    },
  },

  session: {
    strategy: "database",
  },
});