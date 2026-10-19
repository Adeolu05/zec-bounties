"use client";

import { useBounty } from "@/lib/bounty-context";

export const FORCE_TASK_CREATION_BLOCKED = true;

// "account": an admin turned off task creation for this user.
// "paused": task creation is switched off for everyone (FORCE_TASK_CREATION_BLOCKED).
// An account block wins, since it outlasts a platform-wide pause.
export type TaskCreationBlockReason = "account" | "paused";

export const TASK_CREATION_BLOCKED_COPY: Record<
  TaskCreationBlockReason,
  { title: string; description: string; label: string }
> = {
  account: {
    title: "An admin has disabled task creation for your account",
    description: "An admin has blocked your account from creating tasks.",
    label: "New bounty (disabled for your account)",
  },
  paused: {
    title: "Task creation is paused for everyone right now",
    description:
      "Task creation is temporarily paused for all users. You can still browse bounties, apply, and submit work.",
    label: "New bounty (paused for everyone)",
  },
};

export function useTaskCreationBlockReason(): TaskCreationBlockReason | null {
  const { currentUser } = useBounty();
  if (currentUser?.canCreateTasks === false) return "account";
  if (FORCE_TASK_CREATION_BLOCKED) return "paused";
  return null;
}
