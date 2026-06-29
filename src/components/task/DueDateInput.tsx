import { useState, type ReactNode } from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/ui/popover";
import { Button } from "@/components/shared/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/shared/ui/calendar";

interface Props {
  children: ReactNode;
}

export const DueDateInput = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="due-date"
          variant="outline"
          data-empty={!date}
          className="justify-start text-left font-normal data-[empty=true]:text-foreground/80"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
};
