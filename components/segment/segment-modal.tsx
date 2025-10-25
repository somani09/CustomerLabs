"use client";

import { useState, useEffect } from "react";
import GlassLayout from "@/components/layouts/glass-layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SCHEMAS } from "./schema-config";
import { cn, shadowDepthPrimary } from "@/lib/utils";

export default function SegmentModal() {
  const [open, setOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [schemaRows, setSchemaRows] = useState<{ value: string }[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Auto-close success/error after 5s
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccessModal || showErrorModal) {
      timer = setTimeout(() => {
        setShowSuccessModal(false);
        setShowErrorModal(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessModal, showErrorModal]);

  const handleAddSchemaRow = () => {
    setSchemaRows((prev) => [...prev, { value: "" }]);
  };

  const handleSchemaSelect = (index: number, value: string) => {
    const updated = [...schemaRows];
    updated[index].value = value;
    setSchemaRows(updated);
  };

  const handleRemoveSchema = (index: number) => {
    setSchemaRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const allSelected = schemaRows.every((row) => row.value);
    if (!segmentName.trim() || !allSelected || schemaRows.length === 0) return;

    const isMockSuccess = Math.random() > 0.5;
    if (isMockSuccess) {
      setOpen(false);
      setSegmentName("");
      setSchemaRows([]);
      setShowSuccessModal(true);
    } else {
      setShowErrorModal(true);
    }
  };

  const hasEmptyDropdown = schemaRows.some((row) => row.value === "");
  const isValid =
    segmentName.trim() !== "" && schemaRows.length > 0 && !hasEmptyDropdown;

  const tooltipText =
    schemaRows.length === 0
      ? "Add at least one schema to proceed"
      : hasEmptyDropdown
        ? "Please select a schema from the drop-down, or remove it"
        : "";

  return (
    <>
      {/* Primary Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Save Segment</Button>
        </DialogTrigger>

        <DialogContent
          className="max-w-lg rounded-2xl border-none bg-transparent p-0"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <GlassLayout
            className={cn("rounded-2xl", shadowDepthPrimary, "bg-white")}
            contentClassName="sm:p-8 bg-white/70 p-6 "
          >
            <DialogHeader>
              <DialogTitle className="text-heading text-2xl font-bold">
                Save Segment
              </DialogTitle>
            </DialogHeader>

            {/* Segment Name */}
            <div className="mt-4">
              <label className="text-text mb-1 block text-sm font-medium">
                Enter the Name of the Segment
              </label>
              <Input
                placeholder="Name of the segment"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Info */}
            <p className="text-accent-secondary mt-4 text-sm">
              To save your segment, you need to add the schemas to build the
              query.
            </p>

            {/* Legend */}
            <div className="mt-3 flex justify-end gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-subheading">User Traits</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-pink-500" />
                <span className="text-subheading">Group Traits</span>
              </div>
            </div>

            {/* Schema List */}
            <div className="mt-4 space-y-3 rounded-md backdrop-blur-md">
              {schemaRows.map((row, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Select
                    value={row.value}
                    onValueChange={(value) => handleSchemaSelect(index, value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue
                        placeholder="Select a schema"
                        className="text-muted"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {SCHEMAS.map((opt) => (
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
                    onClick={() => handleRemoveSchema(index)}
                    className="text-lg text-red-500"
                  >
                    –
                  </Button>
                </div>
              ))}
            </div>

            {/* Add New Schema Button */}
            <div className="mt-3">
              <button
                type="button"
                onClick={handleAddSchemaRow}
                className="text-accent hover:text-accent-hover cursor-pointer text-sm font-medium"
              >
                + Add new schema
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      onClick={handleSubmit}
                      disabled={!isValid}
                    >
                      Save the Segment
                    </Button>
                  </TooltipTrigger>
                  {!isValid && tooltipText && (
                    <TooltipContent>{tooltipText}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </GlassLayout>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-sm rounded-2xl border-none bg-transparent p-0">
          <GlassLayout
            className={cn(
              "rounded-2xl bg-white/70 text-center backdrop-blur-lg",
              shadowDepthPrimary,
            )}
            contentClassName="p-6 sm:p-8"
          >
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-green-600">
                ✅ Segment Saved Successfully!
              </DialogTitle>
            </DialogHeader>
            <p className="text-subheading mt-2 text-sm">
              Your segment has been saved. This window will close automatically.
            </p>
            <Button
              variant="default"
              className="mt-4"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </Button>
          </GlassLayout>
        </DialogContent>
      </Dialog>

      {/* Error Modal */}
      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent className="max-w-sm rounded-2xl border-none bg-transparent p-0">
          <GlassLayout
            className={cn(
              "rounded-2xl bg-white/70 text-center backdrop-blur-lg",
              shadowDepthPrimary,
            )}
            contentClassName="p-6 sm:p-8"
          >
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-red-600">
                ❌ Error Saving Segment
              </DialogTitle>
            </DialogHeader>
            <p className="text-subheading mt-2 text-sm">
              Something went wrong while saving your segment. Please try again.
            </p>
            <Button
              variant="default"
              className="mt-4"
              onClick={() => setShowErrorModal(false)}
            >
              Close
            </Button>
          </GlassLayout>
        </DialogContent>
      </Dialog>
    </>
  );
}
