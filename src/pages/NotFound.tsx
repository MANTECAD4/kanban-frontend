import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { BadgeX, ArrowBigLeftDash } from "lucide-react";
import { Link } from "react-router";

export const NotFound = () => {
  return (
    <div className="min-h-dvh flex items-center">
      <div className=" w-full flex  flex-col gap-4 items-center">
        <img
          src="/images/sorting-thoghts.svg"
          alt="Page not found"
          className="w-3/5 lg:w-2/5 "
        />
        <Empty className="text-gray-600">
          <EmptyHeader>
            <EmptyMedia className="">
              <BadgeX className="w-8 h-8" />
            </EmptyMedia>
            <EmptyTitle className="text-2xl ">404 Not Found</EmptyTitle>
            <EmptyDescription className="max-w-xs text-pretty">
              No results found. Try searching something else.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline">
              <Link
                to="/auth/"
                replace
                className="w-full flex items-center gap-1"
              >
                <ArrowBigLeftDash />
                Go Back
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </div>
  );
};
