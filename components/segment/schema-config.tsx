export type SchemaOption = {
  label: string;
  value: string;
  trait: "user" | "group";
};

export const SCHEMAS: SchemaOption[] = [
  { label: "First Name", value: "first_name", trait: "user" },
  { label: "Last Name", value: "last_name", trait: "user" },
  { label: "Gender", value: "gender", trait: "user" },
  { label: "Age", value: "age", trait: "user" },
  { label: "Account Name", value: "account_name", trait: "group" },
  { label: "City", value: "city", trait: "group" },
  { label: "State", value: "state", trait: "group" },
];
