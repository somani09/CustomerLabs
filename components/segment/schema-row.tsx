"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function SchemaRow({
  index,
  value,
  availableOptions,
  onSelect,
  onRemove,
  variant,
}: {
  index: number;
  value: string;
  availableOptions: { value: string; label: string; trait: "user" | "group" }[];
  onSelect: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  variant: "selected" | "unselected";
}) {
  return (
    <div className="flex items-center gap-2 rounded-md p-1.5 transition-all duration-300">
      <Select value={value} onValueChange={(v) => onSelect(index, v)}>
        <SelectTrigger
          className={cn(
            "flex-1",
            variant === "selected"
              ? "border-blue-400 bg-blue-100/40 focus:ring-blue-400"
              : "border-gray-300 bg-transparent",
          )}
        >
          <SelectValue placeholder="Select a schema" />
        </SelectTrigger>
        <SelectContent>
          {availableOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    opt.trait === "user" && "bg-green-500",
                    opt.trait === "group" && "bg-pink-500",
                  )}
                />
                {opt.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="ghost"
        onClick={() => onRemove(index)}
        className="border border-red-500 py-1 text-lg text-red-500 hover:border-red-600 hover:text-red-600"
      >
        –
      </Button>
    </div>
  );
}
