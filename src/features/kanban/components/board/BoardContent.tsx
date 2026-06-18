import { Button } from "@/components/ui/button";
import { CircleDashed, Paintbrush, PlusCircle } from "lucide-react";

export const BoardContent = () => {
  return (
    <>
      <div className="flex gap-4 max-w-0 h-full ">
        <div className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 border w-80 p-2 shrink-0 rounded-xl  ">
          <div className="flex justify-between my-2">
            <div className="flex items-center gap-2">
              <CircleDashed className="size-4" />
              <h2 className="text-sm ">In Progress</h2>
            </div>
            <Button
              className="flex justify-center items-center size-8 rounded-full"
              variant={"ghost"}
            >
              <PlusCircle className="size-4" />
            </Button>
          </div>
          <div className="p-2 bg-card rounded-xl border-inherit border">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            unde exercitationem eos illum, molestiae nesciunt. Sapiente dicta
            quod architecto laboriosam voluptatem perspiciatis, facere, odit
            fuga non deleniti sunt doloribus nemo.
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 w-80 p-2 shrink-0 rounded-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          unde exercitationem eos illum, molestiae nesciunt. Sapiente dicta quod
          architecto laboriosam voluptatem perspiciatis, facere, odit fuga non
          deleniti sunt doloribus nemo.
        </div>
      </div>
    </>
  );
};
