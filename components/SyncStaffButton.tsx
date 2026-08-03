"use client";

import { useState } from "react";

export default function SyncStaffButton() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSync() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/staff/sync", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Sync failed.");
      }

      setMessage(`Synced ${data.synced} staff members.`);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Sync failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <button
        onClick={handleSync}
        disabled={loading}
        className="rounded-md bg-red-600 px-6 py-3 font-black uppercase text-white disabled:opacity-50"
      >
        {loading ? "Syncing..." : "Sync Discord Staff"}
      </button>

      {message && (
        <p className="mt-3 text-sm text-zinc-400">{message}</p>
      )}
    </div>
  );
}