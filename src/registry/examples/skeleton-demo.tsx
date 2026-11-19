import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonDemo() {
  return (
    <div className="tactile-tray grid w-80 gap-4 rounded-3xl p-5">
      <div className="flex items-center gap-3">
        <Skeleton className="size-11 rounded-full" />
        <div className="grid flex-1 gap-2">
          <Skeleton className="h-3.5 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-32 rounded-2xl" />
      <div className="grid gap-2">
        <Skeleton className="h-3" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  );
}
