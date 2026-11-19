export default function Loading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-48 rounded bg-well" />
      <div className="h-4 w-96 max-w-full rounded bg-well/60" />
      <div className="h-[520px] rounded-2xl bg-well/60" />
    </div>
  );
}
