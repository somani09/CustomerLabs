"use client";

import SchemaRow from "./schema-row";
import { SCHEMAS } from "./schema-config";

export default function SchemaList({
  schemaRows,
  handleSchemaSelect,
  handleRemoveSchema,
}: {
  schemaRows: { value: string }[];
  handleSchemaSelect: (index: number, value: string) => void;
  handleRemoveSchema: (index: number) => void;
}) {
  const selectedSchemas = schemaRows.filter((r) => r.value);
  const unselectedSchemas = schemaRows.filter((r) => !r.value);

  return (
    <div className="mt-4 flex flex-col gap-4">
      {selectedSchemas.length > 0 && (
        <div className="rounded-xl bg-blue-50/60 px-3 py-4 shadow-inner shadow-blue-100 backdrop-blur-md transition-all duration-300">
          <div className="flex flex-col gap-3">
            {selectedSchemas.map((row) => {
              const originalIndex = schemaRows.findIndex(
                (r) => r.value === row.value,
              );
              const selectedValues = schemaRows
                .map((r) => r.value)
                .filter(Boolean);
              const availableOptions = SCHEMAS.filter(
                (opt) =>
                  !selectedValues.includes(opt.value) ||
                  opt.value === row.value,
              );

              return (
                <SchemaRow
                  key={originalIndex}
                  index={originalIndex}
                  value={row.value}
                  availableOptions={availableOptions}
                  onSelect={handleSchemaSelect}
                  onRemove={handleRemoveSchema}
                  variant="selected"
                />
              );
            })}
          </div>
        </div>
      )}

      {unselectedSchemas.length > 0 && (
        <div className="flex flex-col gap-3">
          {unselectedSchemas.map((row) => {
            const originalIndex = schemaRows.findIndex((r) => r === row);
            const selectedValues = schemaRows
              .map((r) => r.value)
              .filter(Boolean);
            const availableOptions = SCHEMAS.filter(
              (opt) =>
                !selectedValues.includes(opt.value) || opt.value === row.value,
            );

            return (
              <SchemaRow
                key={originalIndex}
                index={originalIndex}
                value={row.value}
                availableOptions={availableOptions}
                onSelect={handleSchemaSelect}
                onRemove={handleRemoveSchema}
                variant="unselected"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
