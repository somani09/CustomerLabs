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
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { SCHEMAS } from "./schema-config";
import { cn, shadowDepthPrimary } from "@/lib/utils";

import SchemaList from "./schema-list";
import Legend from "./legend";
import AddSchemaButton from "./add-schema-button";
import StatusModal from "./status-modal";

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

  const handleAddSchemaRow = () => setSchemaRows((p) => [...p, { value: "" }]);
  const handleSchemaSelect = (i: number, v: string) => {
    const updated = [...schemaRows];
    updated[i].value = v;
    setSchemaRows(updated);
  };
  const handleRemoveSchema = (i: number) =>
    setSchemaRows((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    const allSelected = schemaRows.every((r) => r.value);
    if (!segmentName.trim() || !allSelected || schemaRows.length === 0) return;
    try {
      const res = await fetch("/api/save-segment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          segmentName,
          schemas: schemaRows.map((r) => r.value),
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) throw new Error("Webhook request failed");

      setWebhookResponse(result.response?.slice(0, 200) || "Success");
      setOpen(false);
      setSegmentName("");
      setSchemaRows([]);
      setShowSuccessModal(true);
    } catch (e) {
      console.error(e);
      setWebhookResponse(null);
      setShowErrorModal(true);
    }
  };

  const handleCancel = () => {
    const hasUnsaved =
      segmentName.trim() !== "" || schemaRows.some((r) => r.value !== "");
    hasUnsaved ? setShowConfirmCloseModal(true) : setOpen(false);
  };

  const hasEmptyDropdown = schemaRows.some((r) => r.value === "");
  const isValid =
    segmentName.trim() !== "" && schemaRows.length > 0 && !hasEmptyDropdown;

  const tooltipText = !segmentName.trim()
    ? "Please add a name for the segment"
    : schemaRows.length === 0
      ? "Please add at least one schema to proceed"
      : hasEmptyDropdown
        ? "Please select a schema from the drop-down, or remove it"
        : "";

  const allSchemasSelected =
    schemaRows.length >= SCHEMAS.length ||
    SCHEMAS.every((schema) =>
      schemaRows.some((row) => row.value === schema.value),
    );

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

            <Legend />
            <SchemaList
              schemaRows={schemaRows}
              handleSchemaSelect={handleSchemaSelect}
              handleRemoveSchema={handleRemoveSchema}
            />
            <AddSchemaButton
              onAdd={handleAddSchemaRow}
              disabled={allSchemasSelected}
            />

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

      <StatusModal
        type="success"
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message="Your segment has been saved successfully."
        webhookResponse={webhookResponse}
      />
      <StatusModal
        type="error"
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message="Something went wrong while saving your segment. Please try again."
      />
      <StatusModal
        type="confirm"
        open={showConfirmCloseModal}
        onClose={() => setShowConfirmCloseModal(false)}
        message="Closing this modal will clear your entered name and selected schemas."
        onDiscard={() => {
          setSegmentName("");
          setSchemaRows([]);
          setShowConfirmCloseModal(false);
          setOpen(false);
        }}
      />
    </>
  );
}
