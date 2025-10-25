"use client";

import { useState, useEffect } from "react";
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
import { cn } from "@/app/utils";

export default function SegmentModal() {
  const [open, setOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState<
    { label: string; value: string; trait: string }[]
  >([]);
  const [dropdownValue, setDropdownValue] = useState<string>("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Auto-close success or error modals after 5s
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

  const availableSchemas = SCHEMAS.filter(
    (schema) => !selectedSchemas.some((sel) => sel.value === schema.value),
  );

  const handleAddSchema = () => {
    if (!dropdownValue) return;
    const selected = SCHEMAS.find((s) => s.value === dropdownValue);
    if (!selected) return;
    setSelectedSchemas((prev) => [...prev, selected]);
    setDropdownValue("");
  };

  const handleSchemaChange = (index: number, newValue: string) => {
    const newSchema = SCHEMAS.find((s) => s.value === newValue);
    if (!newSchema) return;
    setSelectedSchemas((prev) => {
      const updated = [...prev];
      updated[index] = newSchema;
      return updated;
    });
  };

  const handleRemoveSchema = (index: number) => {
    setSelectedSchemas((prev) => prev.filter((_, i) => i !== index));
  };

  // --------------------------
  // MOCK HANDLER — Replace later
  // --------------------------
  const handleSubmit = async () => {
    // const isMockSuccess = Math.random() > 0.5; // flip between success & error for now
    const isMockSuccess = false; // flip between success & error for now

    if (isMockSuccess) {
      alert("✅ Segment saved successfully!");
      setOpen(false);
      setSegmentName("");
      setSelectedSchemas([]);
      setDropdownValue("");
      setShowSuccessModal(true);
    } else {
      alert("❌ Error saving segment!");
      setShowErrorModal(true);
    }
  };

  const isValid = segmentName.trim() !== "" && selectedSchemas.length > 0;

  return (
    <>
      {/* Primary Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Save Segment</Button>
        </DialogTrigger>

        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Saving Segment</DialogTitle>
          </DialogHeader>

          {/* Segment Name */}
          <div className="mt-2">
            <label className="text-sm font-medium">
              Enter the Name of the Segment
            </label>
            <Input
              placeholder="Name of the segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Schema Section */}
          <div className="mt-4">
            <p className="mb-2 text-sm">
              To save your segment, you need to add the schemas to build the
              query.
            </p>

            <div className="space-y-3 rounded-md border border-blue-200 bg-blue-50 p-3">
              {selectedSchemas.map((schema, index) => (
                <div key={schema.value} className="flex items-center gap-2">
                  <Select
                    value={schema.value}
                    onValueChange={(v) => handleSchemaChange(index, v)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
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
                                !opt.trait && "bg-gray-400",
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
                    className="text-sm text-red-500"
                    onClick={() => handleRemoveSchema(index)}
                  >
                    –
                  </Button>
                </div>
              ))}
            </div>

            {/* Add new schema dropdown */}
            <div className="mt-3 flex items-center gap-3">
              <Select value={dropdownValue} onValueChange={setDropdownValue}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Add schema to segment" />
                </SelectTrigger>
                <SelectContent>
                  {availableSchemas.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full",
                            opt.trait === "user" && "bg-green-500",
                            opt.trait === "group" && "bg-pink-500",
                            !opt.trait && "bg-gray-400",
                          )}
                        />
                        {opt.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={handleAddSchema}
                disabled={!dropdownValue}
              >
                + Add new schema
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3">
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
                {!isValid && (
                  <TooltipContent>
                    Enter a segment name and add at least one schema
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-sm rounded-2xl text-center">
          <DialogHeader>
            <DialogTitle className="text-green-600">
              ✅ Segment Saved Successfully!
            </DialogTitle>
          </DialogHeader>
          <p className="mt-2 text-sm text-gray-600">
            Your segment has been saved. This window will close automatically.
          </p>
          <Button
            variant="default"
            className="mt-4"
            onClick={() => setShowSuccessModal(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Error Modal */}
      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent className="max-w-sm rounded-2xl text-center">
          <DialogHeader>
            <DialogTitle className="text-red-600">
              ❌ Error Saving Segment
            </DialogTitle>
          </DialogHeader>
          <p className="mt-2 text-sm text-gray-600">
            Something went wrong while saving your segment. Please try again.
          </p>
          <Button
            variant="default"
            className="mt-4"
            onClick={() => setShowErrorModal(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
