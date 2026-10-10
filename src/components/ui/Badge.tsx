import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded-full border border-primary/25 bg-primary/10 px-3 text-xs font-semibold tracking-wide text-primary",
        className,
      )}
      {...props}
    />
  );
}
