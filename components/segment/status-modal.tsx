"use client";

import GlassLayout from "@/components/layouts/glass-layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn, shadowDepthPrimary } from "@/lib/utils";

export default function StatusModal({
  type,
  message,
  open,
  onClose,
  webhookResponse,
  onDiscard,
}: {
  type: "success" | "error" | "confirm";
  message: string;
  open: boolean;
  onClose: () => void;
  webhookResponse?: string | null;
  onDiscard?: () => void;
}) {
  const color =
    type === "success"
      ? "text-green-600"
      : type === "error"
        ? "text-red-600"
        : "text-heading";

  const title =
    type === "success"
      ? "✅ Segment Saved Successfully!"
      : type === "error"
        ? "❌ Error Saving Segment"
        : "Discard changes?";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl border-none bg-transparent p-0">
        <GlassLayout
          className={cn(
            "rounded-2xl bg-white/70 text-center backdrop-blur-lg",
            shadowDepthPrimary,
          )}
          contentClassName="p-6 sm:p-8"
        >
          <DialogHeader>
            <DialogTitle className={cn("text-xl font-semibold", color)}>
              {title}
            </DialogTitle>
          </DialogHeader>

          <p className="text-subheading mt-2 text-sm">{message}</p>

          {webhookResponse && (
            <div className="mt-3 rounded-md bg-gray-100 p-3 text-left text-xs text-gray-700">
              <strong>Webhook Response:</strong>
              <pre className="mt-1 break-words whitespace-pre-wrap">
                {webhookResponse}
              </pre>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            {type === "confirm" ? (
              <>
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={onDiscard}>
                  Discard
                </Button>
              </>
            ) : (
              <Button variant="default" className="mt-4" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </GlassLayout>
      </DialogContent>
    </Dialog>
  );
}
