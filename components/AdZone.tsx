type AdType = "leaderboard" | "inline" | "fullrow";

export default function AdZone({ type = "inline" }: { type?: AdType }) {
  const cls = type === "leaderboard"
    ? "ad ad-leader"
    : type === "fullrow"
    ? "ad ad-fullrow"
    : "ad ad-inline";

  const label = type === "leaderboard"
    ? "Ad — Leaderboard 728×90"
    : "Ad — Rectangle";

  return <div className={cls}>{label}</div>;
}
