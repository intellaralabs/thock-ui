"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function ProgressDemo() {
  const [v, setV] = useState(30);
  useEffect(() => {
    const t = setInterval(() => setV((x) => (x >= 100 ? 0 : x + 10)), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="grid w-full max-w-sm gap-6">
      <Progress value={v} aria-label="Upload" />
      <Progress value={v} segments={12} aria-label="Level" />
      <Progress value={null} aria-label="Loading" />
    </div>
  );
}
