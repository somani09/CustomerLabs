"use client";

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AddSchemaButton({
  onAdd,
  disabled,
}: {
  onAdd: () => void;
  disabled: boolean;
}) {
  return (
    <div className="mt-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline-block">
              <Button
                type="button"
                variant="ghost"
                onClick={onAdd}
                disabled={disabled}
                className={cn(
                  "text-accent hover:text-accent-hover cursor-pointer text-sm font-medium",
                  disabled && "cursor-not-allowed opacity-60",
                )}
              >
                + Add new schema
              </Button>
            </div>
          </TooltipTrigger>
          {disabled && (
            <TooltipContent side="top">
              All available schemas have been selected
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
