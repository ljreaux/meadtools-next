import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-1">
      <div className=" flex">
        <Skeleton className="h-16 w-[250px]" />
      </div>
      <div className=" flex justify-between">
        <Skeleton className="h-8 w-[120px]" />
        <Skeleton className="h-8 w-[120px]" />
      </div>
      <div className=" flex">
        <Skeleton className="h-8 w-[250px]" />
      </div>
    </div>
  );
}
