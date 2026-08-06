"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { toggleStaffVisibility } from "@/app/dashboard/staff/actions";

type StaffVisibilityButtonProps = {
  staffMemberId: string;
  initialVisible: boolean;
};

export default function StaffVisibilityButton({
  staffMemberId,
  initialVisible,
}: StaffVisibilityButtonProps) {
  const router = useRouter();

  const [visible, setVisible] = useState(initialVisible);
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    const previousValue = visible;
    const nextValue = !visible;

    // Update the button immediately.
    setVisible(nextValue);

    startTransition(async () => {
      try {
        await toggleStaffVisibility(staffMemberId, previousValue);

        // Refresh server-rendered data after the database update.
        router.refresh();
      } catch (error) {
        // Restore the old state if the update fails.
        setVisible(previousValue);
        console.error("Unable to update staff visibility:", error);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      aria-pressed={visible}
      className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider transition disabled:cursor-wait disabled:opacity-60 ${
        visible
          ? "bg-green-950 text-green-400 hover:bg-green-900"
          : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
      }`}
    >
      {isPending
        ? "Saving..."
        : visible
          ? "Visible"
          : "Hidden"}
    </button>
  );
}