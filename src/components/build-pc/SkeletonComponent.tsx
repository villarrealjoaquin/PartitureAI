import { Skeleton } from "../ui/skeleton";

export const SkeletonComponent = () => {
  return (
    <div className="flex flex-col gap-4 text-white m-auto mt-5 pt-5 pr-4 max-w-4xl">
      <Skeleton className="w-4/5 h-[8px]" />
      <Skeleton className="w-10/12 h-[8px]" />
      <Skeleton className="w-full h-[8px]" />
      <Skeleton className="w-9/12 h-[8px]" />
      <Skeleton className="w-11/12 h-[8px]" />
      <Skeleton className="w-full h-[8px]" />
      <Skeleton className="w-10/12 h-[8px]" />
    </div>
  );
};
