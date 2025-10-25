export default function Legend() {
  return (
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
  );
}
