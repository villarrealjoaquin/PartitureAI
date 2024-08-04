import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#B94CED] dark:bg-slate-800",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
