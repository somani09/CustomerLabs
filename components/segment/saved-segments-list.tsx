"use client";

import { useEffect, useMemo, useState } from "react";
import { SCHEMAS, type SchemaOption } from "./schema-config";
import { cn, shadowDepthSoft } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SavedSegment = {
  id: string;
  name: string;
  schemas: string[];
  timestamp?: string;
};

export default function SavedSegmentsList() {
  const [segments, setSegments] = useState<SavedSegment[]>([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);

  const schemaLookup = useMemo(() => {
    return SCHEMAS.reduce<Record<string, SchemaOption>>((acc, s) => {
      acc[s.value] = s;
      return acc;
    }, {});
  }, []);

  const loadSegments = () => {
    try {
      const raw = localStorage.getItem("savedSegments");
      const parsed: SavedSegment[] = raw ? JSON.parse(raw) : [];
      setSegments(Array.isArray(parsed) ? parsed : []);
    } catch {
      setSegments([]);
    }
  };

  const deleteSegment = (id: string) => {
    const updated = segments.filter((s) => s.id !== id);
    setSegments(updated);
    localStorage.setItem("savedSegments", JSON.stringify(updated));
  };

  const deleteAllSegments = () => {
    setSegments([]);
    localStorage.removeItem("savedSegments");
    setConfirmDeleteAll(false);
  };

  useEffect(() => {
    loadSegments();

    const handler = () => loadSegments();
    window.addEventListener("segments-updated", handler as EventListener);
    return () => {
      window.removeEventListener("segments-updated", handler as EventListener);
    };
  }, []);

  const sorted = [...segments].sort(
    (a, b) =>
      new Date(b.timestamp || 0).getTime() -
      new Date(a.timestamp || 0).getTime(),
  );

  if (!segments.length) {
    return (
      <div className="text-accent-secondary text-center text-sm italic">
        No saved segments yet.
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl">
      <h3 className="mb-5 text-center text-lg font-semibold text-gray-800">
        Saved Segments
      </h3>

      <ul className="flex flex-col gap-4">
        {sorted.map((seg) => (
          <li
            key={seg.id}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-gray-200 bg-white/60 p-5 backdrop-blur-md transition-all duration-300 hover:shadow-lg",
              shadowDepthSoft,
            )}
          >
            {/* Header Row */}
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {seg.name}
                </h4>
                {seg.timestamp && (
                  <p className="text-xs text-gray-500">
                    {new Date(seg.timestamp).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Delete button + confirm state */}
              {confirmDeleteId === seg.id ? (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      deleteSegment(seg.id);
                      setConfirmDeleteId(null);
                    }}
                    className="h-7 px-2 text-xs"
                  >
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setConfirmDeleteId(null)}
                    className="h-7 px-2 text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmDeleteId(seg.id)}
                  className="h-7 px-2 text-xs text-red-500 hover:text-red-600"
                >
                  Delete
                </Button>
              )}
            </div>

            {/* Schema Pills */}
            {seg.schemas?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {seg.schemas.map((val) => {
                  const meta = schemaLookup[val];
                  return (
                    <span
                      key={val}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium shadow-sm",
                        meta?.trait === "user"
                          ? "border-green-200 bg-green-50/70 text-green-700"
                          : meta?.trait === "group"
                            ? "border-pink-200 bg-pink-50/70 text-pink-700"
                            : "border-gray-200 bg-gray-50/60 text-gray-700",
                      )}
                      title={meta ? `${meta.label} (${meta.trait})` : val}
                    >
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          meta?.trait === "user" && "bg-green-500",
                          meta?.trait === "group" && "bg-pink-500",
                        )}
                      />
                      {meta?.label ?? val}
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-500">No schemas selected.</p>
            )}
          </li>
        ))}
      </ul>

      {/* Footer actions */}
      <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
        {/* Info text */}
        <p className="text-muted text-xs italic">
          For demonstration purposes, your segments are temporarily stored in
          your browser’s local storage.
        </p>

        {/* Delete All button (only if more than 1) */}
        {segments.length > 1 &&
          (confirmDeleteAll ? (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="destructive"
                onClick={deleteAllSegments}
                className="h-7 px-2 text-xs"
              >
                Confirm Delete All
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setConfirmDeleteAll(false)}
                className="h-7 px-2 text-xs"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setConfirmDeleteAll(true)}
              className="h-7 px-2 text-xs text-red-500 hover:text-red-600"
            >
              Delete All Segments
            </Button>
          ))}
      </div>
    </div>
  );
}
