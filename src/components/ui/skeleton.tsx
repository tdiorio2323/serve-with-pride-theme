export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-neutral-200 dark:bg-neutral-800 ${className}`} />;
}
export default Skeleton;
