import Staff from "@/components/Staff";
import { getStaff } from "@/lib/staff";

export default async function StaffSection() {
  const roles = await getStaff();

  const staffGroups = roles
    .filter((role) => role.members.length > 0)
    .map((role) => ({
      id: role.id,
      role: role.name,
      icon: role.icon,
      description: role.description,
      names: role.members.map(
        (member) =>
          member.user?.displayName ??
          member.user?.name ??
          member.displayName,
      ),
    }));

  return <Staff staffGroups={staffGroups} />;
}