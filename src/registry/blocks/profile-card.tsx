"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ProfileCardProps = {
  name?: string;
  handle?: string;
  bio?: string;
  avatar?: string;
  initials?: string;
  status?: "online" | "away" | "busy" | "offline";
  tags?: string[];
  stats?: { label: string; value: number }[];
  defaultFollowing?: boolean;
  onFollowChange?: (following: boolean) => void;
  onMessage?: () => void;
  className?: string;
};

const compact = (n: number) => new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);

/** A creator card: avatar with status, bio, tag caps, stat wells and follow/message keys. */
export function ProfileCard({
  name = "Sam Carter",
  handle = "@samcarter",
  bio = "Building tactile UI for the web. New components every week.",
  avatar,
  initials = "RZ",
  status = "online",
  tags = ["React", "Tailwind", "Design"],
  stats = [
    { label: "Posts", value: 248 },
    { label: "Followers", value: 48200 },
    { label: "Following", value: 312 },
  ],
  defaultFollowing = false,
  onFollowChange,
  onMessage,
  className,
}: ProfileCardProps) {
  const [following, setFollowing] = useState(defaultFollowing);
  const followerIdx = stats.findIndex((s) => s.label.toLowerCase() === "followers");

  return (
    <div data-slot="profile-card" className={cn("tactile-tray grid w-full max-w-xs gap-5 rounded-[28px] p-5", className)}>
      <div className="tactile-well relative h-24 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--tactile-accent-glow),transparent_60%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_7px,var(--tactile-line)_7px_8px)] opacity-60" />
      </div>
      <div className="-mt-14 flex items-end justify-between px-1">
        <Avatar size="lg" status={status} className="size-20 text-xl">
          {avatar && <AvatarImage src={avatar} alt={name} />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <Badge variant="well" status={status === "online" ? "success" : "neutral"}>
          {status === "online" ? "Available" : "Away"}
        </Badge>
      </div>
      <div className="grid gap-1 px-1">
        <h3 className="text-lg font-semibold text-fg">{name}</h3>
        <p className="font-mono text-xs text-subtle">{handle}</p>
        <p className="mt-2 text-sm leading-relaxed text-subtle">{bio}</p>
      </div>
      <div className="flex flex-wrap gap-2 px-1">
        {tags.map((t) => <Badge key={t}>{t}</Badge>)}
      </div>
      <dl className="grid grid-cols-3 gap-2">
        {stats.map((s, i) => (
          <div key={s.label} className="tactile-well grid justify-items-center gap-0.5 rounded-xl py-2.5">
            <dd className="font-mono text-base font-semibold tabular-nums text-fg">
              {compact(s.value + (i === followerIdx && following !== defaultFollowing ? (following ? 1 : -1) : 0))}
            </dd>
            <dt className="text-[11px] text-subtle">{s.label}</dt>
          </div>
        ))}
      </dl>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant={following ? "default" : "accent"}
          aria-pressed={following}
          onClick={() => {
            setFollowing(!following);
            onFollowChange?.(!following);
          }}
        >
          {following ? "Following" : "Follow"}
        </Button>
        <Button onClick={onMessage}>Message</Button>
      </div>
    </div>
  );
}
