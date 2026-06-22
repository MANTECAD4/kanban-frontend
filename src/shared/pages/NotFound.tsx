import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { BadgeX, ArrowBigLeftDash } from "lucide-react";
import { Link } from "react-router";
import styles from "../styles/NotFound.module.css";
import { cn } from "@/shared/lib/utils";
import { useThemeStore } from "@/shared/providers/store/theme.store";
import { ToggleThemeButton } from "@/shared/components/custom/ToggleThemeButton";
export const NotFound = () => {
  const theme = useThemeStore((state) => state.theme);
  return (
    <div
      className={cn(
        styles.screen,
        theme === "dark" ? styles["dark-mode"] : styles["ligth-mode"],
        `min-h-dvh flex items-center`,
      )}
    >
      <ToggleThemeButton />
      <div className=" w-full flex  flex-col gap-4 items-center">
        <img
          src="/illustrations/lost.svg"
          alt="Page not found"
          className="w-3/5 lg:w-2/5 "
        />
        <Empty className="text-gray-800 dark:text-gray-300">
          <EmptyHeader>
            <EmptyMedia className="">
              <BadgeX className="w-8 h-8" />
            </EmptyMedia>
            <EmptyTitle className="text-2xl ">404 Not Found</EmptyTitle>
            <EmptyDescription className="max-w-xs text-pretty text-gray-700 dark:text-gray-100">
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
