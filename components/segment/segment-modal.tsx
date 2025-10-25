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
  const [showConfirmCloseModal, setShowConfirmCloseModal] = useState(false);
  const [webhookResponse, setWebhookResponse] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccessModal || showErrorModal) {
      timer = setTimeout(() => {
        setShowSuccessModal(false);
        setShowErrorModal(false);
      }, 5000);
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

    try {
      const response = await fetch("/api/save-segment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          segmentName,
          schemas: schemaRows.map((row) => row.value),
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Webhook request failed");
      }

      setWebhookResponse(
        result.response?.slice(0, 200) || "Success (no message returned)",
      );

      // ✅ Success: reset UI
      setOpen(false);
      setSegmentName("");
      setSchemaRows([]);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error posting to webhook:", error);
      setWebhookResponse(null);
      setShowErrorModal(true);
    }
  };

  const handleCancel = () => {
    const hasUnsavedData =
      segmentName.trim() !== "" || schemaRows.some((row) => row.value !== "");
    if (hasUnsavedData) {
      setShowConfirmCloseModal(true);
    } else {
      setOpen(false);
    }
  };

  const hasEmptyDropdown = schemaRows.some((row) => row.value === "");
  const isValid =
    segmentName.trim() !== "" && schemaRows.length > 0 && !hasEmptyDropdown;

  const tooltipText = !segmentName.trim()
    ? "Please add a name for the segment"
    : schemaRows.length === 0
      ? "Please add at least one schema to proceed"
      : hasEmptyDropdown
        ? "Please select a schema from the drop-down, or remove it"
        : "";

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Save Segment</Button>
        </DialogTrigger>

        <DialogContent
          showCloseButton={false}
          className="max-w-lg rounded-2xl border-none bg-transparent p-0"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <GlassLayout
            className={cn("rounded-2xl", shadowDepthPrimary, "bg-white")}
            contentClassName="sm:p-8 bg-white/70 p-6"
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
                    className="border border-red-500 py-1 text-lg text-red-500 hover:border-red-600 hover:text-red-600"
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
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="inline-block">
                      <Button
                        variant="default"
                        onClick={handleSubmit}
                        disabled={!isValid}
                        className={cn(
                          !isValid && "cursor-not-allowed opacity-60",
                        )}
                      >
                        Save the Segment
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!isValid && tooltipText && (
                    <TooltipContent side="top">{tooltipText}</TooltipContent>
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
              Your segment has been saved successfully. This window will close
              automatically.
            </p>

            {webhookResponse && (
              <div className="mt-3 rounded-md bg-gray-100 p-3 text-left text-xs text-gray-700">
                <strong>Webhook Response:</strong>
                <pre className="mt-1 break-words whitespace-pre-wrap">
                  {webhookResponse}
                </pre>
              </div>
            )}

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

      {/* Confirm Close Modal */}
      <Dialog
        open={showConfirmCloseModal}
        onOpenChange={setShowConfirmCloseModal}
      >
        <DialogContent className="max-w-sm rounded-2xl border-none bg-transparent p-0">
          <GlassLayout
            className={cn(
              "rounded-2xl bg-white/70 text-center backdrop-blur-lg",
              shadowDepthPrimary,
            )}
            contentClassName="p-6 sm:p-8"
          >
            <DialogHeader>
              <DialogTitle className="text-heading text-lg font-semibold">
                Discard changes?
              </DialogTitle>
            </DialogHeader>
            <p className="text-subheading mt-2 text-sm">
              Closing this modal will clear your entered name and selected
              schemas.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowConfirmCloseModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setSegmentName("");
                  setSchemaRows([]);
                  setShowConfirmCloseModal(false);
                  setOpen(false);
                }}
              >
                Discard
              </Button>
            </div>
          </GlassLayout>
        </DialogContent>
      </Dialog>
    </>
  );
}
