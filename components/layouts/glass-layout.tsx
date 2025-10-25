"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import bgLine from "@/components/icons/bg-line.svg";

interface GlassLayoutProps {
  children: ReactNode;
  className?: string;
  backgroundClassName?: string;
  contentClassName?: string;
  disableBackgroundStyles?: boolean;
  disableContentStyles?: boolean;
  noImage?: boolean;
}

export default function GlassLayout({
  children,
  className,
  backgroundClassName = "",
  contentClassName = "",
  disableBackgroundStyles = false,
  disableContentStyles = false,
  noImage = false,
}: GlassLayoutProps) {
  return (
    <div
      className={cn(
        "shadow-primary/50 relative h-full w-full overflow-hidden shadow-2xl",
        className,
      )}
    >
      {/* Background Layer */}
      <div
        className={cn(
          "absolute inset-0 z-0 h-full w-full p-4",
          !disableBackgroundStyles &&
            "border-border/50 bg-glass/5 border blur-[6px]",
          backgroundClassName,
        )}
        aria-hidden="true"
      >
        <div className="relative h-full w-full">
          {!noImage && (
            <Image
              src={bgLine}
              alt="Decorative Background"
              fill
              className="pointer-events-none object-fill select-none"
              priority
              draggable={false}
            />
          )}
        </div>
      </div>

      {/* Foreground Content */}
      <div
        className={cn(
          "relative z-10 h-full w-full rounded-2xl",
          !disableContentStyles &&
            "border-border/50 bg-glass/10 border backdrop-blur-[10px]",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
