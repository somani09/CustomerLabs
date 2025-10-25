"use client";

import { useState } from "react";
import { cn } from "./utils";
import { pageConfig } from "./config";
import SegmentModal from "@/components/segment/segment-modal";

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex h-max min-h-screen flex-col px-8 pt-12 sm:pl-32 md:pr-32">
      {/* Header */}
      <h1 className="text-primary text-4xl font-bold lg:text-6xl">
        {pageConfig.title}
      </h1>

      {/* Description  */}
      <div className="text-secondary relative mt-6 text-sm sm:text-lg">
        {/* Small screens only — collapsible */}
        <div className="sm:hidden">
          <div
            className={cn(
              "relative transition-[max-height] duration-500 ease-in-out",
              isExpanded ? "overflow-visible" : "overflow-hidden",
            )}
            style={{
              maxHeight: isExpanded ? "none" : "2.5rem",
            }}
          >
            <p>{pageConfig.description}</p>
            {!isExpanded && (
              <div className="pointer-events-none absolute bottom-0 left-0 h-8 w-full bg-gradient-to-t from-white to-transparent" />
            )}
          </div>
          <div className="mt-1 flex justify-end">
            <button
              className="text-primary text-xs font-semibold underline"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? "Read less ↑" : "Read more ↓"}
            </button>
          </div>
        </div>

        {/* Larger screens only — always fully visible */}
        <div className="hidden sm:block">
          <p>{pageConfig.description}</p>
        </div>
      </div>

      <div className="bg-accent-1 mt-1 mb-8 h-0.5 max-w-48 rounded-full sm:my-8" />

      {/* Work Area */}
      <div className="flex w-full flex-1 flex-col gap-6 lg:flex-row">
        <div className="text-secondary relative flex min-w-[200px] flex-1 items-center justify-center rounded-xl p-12 lg:w-[30%] lg:min-w-[300px]">
          <SegmentModal />
        </div>
      </div>
    </div>
  );
};

export default Home;
