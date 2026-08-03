import "dotenv/config";
import { prisma } from "../lib/prisma";

const roles = [
  {
    name: "Owner",
    icon: "Crown",
    description:
      "Lead the clan, make major decisions, oversee the staff team, and guide the long-term vision of 9P while ensuring the community continues to grow and succeed.",
    displayOrder: 1,
  },
  {
    name: "Co-Owner",
    icon: "Shield",
    description:
      "Support the owners in leading the clan, help manage staff, make strategic decisions, and ensure the community remains active and well organized.",
    displayOrder: 2,
  },
  {
    name: "Manager",
    icon: "Settings",
    description:
      "Manages the Discord server, website, and technical operations while handling most of the behind-the-scenes development and infrastructure that keeps 9P running smoothly.",
    displayOrder: 3,
  },
  {
    name: "Head Admin",
    icon: "ShieldCheck",
    description:
      "Leads the administration team, supervises admins, resolves complex situations, and ensures server rules and staff procedures are consistently followed.",
    displayOrder: 4,
  },
  {
    name: "Admin",
    icon: "Shield",
    description:
      "Maintains order across the server, assists members, enforces community rules, and helps create a welcoming environment for everyone.",
    displayOrder: 5,
  },
  {
    name: "Head Moderator",
    icon: "Gavel",
    description:
      "Coordinates the moderation team, oversees moderator activity, handles difficult cases, and helps maintain a fair and enjoyable community.",
    displayOrder: 6,
  },
  {
    name: "Moderator",
    icon: "Hammer",
    description:
      "Keeps chats clean, enforces the rules, assists members, and helps ensure the server remains friendly, active, and enjoyable.",
    displayOrder: 7,
  },
  {
    name: "Tryout Host",
    icon: "Target",
    description:
      "Organizes and hosts tryouts, evaluates new recruits, identifies talented players, and helps build a skilled, active, and competitive community for the future of 9P.",
    displayOrder: 8,
  },
  {
    name: "Helper",
    icon: "HelpingHand",
    description:
      "Answers questions, supports new members, and assists staff in making the community a welcoming place for everyone.",
    displayOrder: 9,
  },
];

async function main() {
  for (const role of roles) {
    await prisma.rolePreset.upsert({
      where: {
        name: role.name,
      },
      update: role,
      create: role,
    });
  }

  console.log("Role presets added successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });