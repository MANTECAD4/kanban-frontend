import { ClockArrowDown } from "lucide-react";

const boards = [
  "Product Design",
  "User Authentication",
  "Docker deployment",
  // "testing",
];
export const RecentActivityCard = () => {
  return (
    <div className="w-full flex flex-col gap-4 rounded-lg bg-background ring-1 ring-foreground/10 p-4">
      <div className="flex items-center gap-2">
        <ClockArrowDown className="size-5" />
        <h2 className="text-sm font-semibold">Upcoming dates</h2>
      </div>
      <div className="flex flex-col gap-3">
        {boards.map((board) => (
          <div key={board} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-amber-900 size-2" />
              <div>
                <h3 className="text-sm">Safari Glicth</h3>
                <p className="text-xs text-muted-foreground">{board}</p>
              </div>
            </div>
            <span className="text-sm">Nov 15</span>
          </div>
        ))}
      </div>
    </div>
  );
};
