import { levelClass, type Level, type Tier } from "../lib/manifest";

const LEVEL_ICON: Record<Level, string> = {
  Beginner: "🟢",
  Intermediate: "🟡",
  Advanced: "🟠",
  Expert: "🔴",
};

export function LevelBadge({ level }: { level: Level }) {
  return (
    <span className={`badge badge--level ${levelClass(level)}`} title={`Difficulty: ${level}`}>
      <span aria-hidden>{LEVEL_ICON[level]}</span> {level}
    </span>
  );
}

export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span className={`badge badge--tier tier-${tier.toLowerCase()}`} title={`Tier: ${tier}`}>
      {tier}
    </span>
  );
}

export function LevelDot({ level }: { level: Level }) {
  return <span className={`level-dot ${levelClass(level)}`} aria-label={level} title={level} />;
}
