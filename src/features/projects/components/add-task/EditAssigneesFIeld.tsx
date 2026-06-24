import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Check, Pencil } from "lucide-react";

export const EditAssigneesFIeld = () => {
  return (
    <div className="flex justify-between items-center">
      <AvatarGroup className="grayscale ">
        <Avatar size="sm" className="">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage
            src="https://github.com/maxleiter.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage
            src="https://github.com/maxleiter.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarGroupCount className="text-foreground/80">+3</AvatarGroupCount>
      </AvatarGroup>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full aspect-square size-7"
          >
            <Pencil />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center" side="bottom">
          <Command className=" min-w-70 rounded-lg border">
            <CommandInput placeholder="Type someone's name..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup
                heading="Add or remove users for this task"
                className="max-h-55 overflow-y-scroll custom-scrollbar"
              >
                <CommandItem value="val-1" className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <Avatar size="sm" className="">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span>Johnny</span>
                      <span className="text-xs text-foreground/60">
                        lolencio@gmail.com
                      </span>
                    </div>
                  </div>
                  <Check />
                </CommandItem>
                <CommandItem value="val-1">
                  <Avatar size="sm" className="">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>Johnny</span>
                    <span className="text-xs text-foreground/60">
                      lolencio@gmail.com
                    </span>
                  </div>
                </CommandItem>
                <CommandItem value="val-2">
                  <Avatar size="sm" className="">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>Johnny</span>
                    <span className="text-xs text-foreground/60">
                      lolencio@gmail.com
                    </span>
                  </div>
                </CommandItem>
                <CommandItem value="val-3">
                  <Avatar size="sm" className="">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>Johnny</span>
                    <span className="text-xs text-foreground/60">
                      lolencio@gmail.com
                    </span>
                  </div>
                </CommandItem>
                <CommandItem value="val-4">
                  <Avatar size="sm" className="">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>Johnny</span>
                    <span className="text-xs text-foreground/60">
                      lolencio@gmail.com
                    </span>
                  </div>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
