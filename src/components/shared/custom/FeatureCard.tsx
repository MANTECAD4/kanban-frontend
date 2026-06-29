import type { FC, ReactNode } from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { cn } from "@/lib/utils";

import styles from "@/styles/FeatureCard.module.css";
import { useThemeStore } from "@/providers/store/theme.store";
import { useSortable } from "@dnd-kit/react/sortable";

interface Props {
  title: string;
  description: string;
  icon: ReactNode;
  index: number;
  className?: string;
}

export const FeatureCard: FC<Props> = ({
  title,
  description,
  icon,
  index,
  className: elevation,
}) => {
  const theme = useThemeStore((state) => state.theme);

  //   const { ref: cardRef } = useDraggable({
  //     id: title,
  //   });
  const { ref: cardRef } = useSortable({ id: title, index });

  return (
    <Card
      ref={cardRef}
      className={cn(
        elevation,
        "rounded-md w-full max-w-50 pt-0 hover:cursor-grab hover:scale-105 hover:shadow-primary shadow-2xl transition-all duration-200",
      )}
    >
      <div
        className={cn(
          styles["card-media"],
          theme === "light"
            ? styles["card-media--light"]
            : styles["card-media--dark"],
          "inset-0 z-30 aspect-video bg-black/35 flex justify-center items-center",
        )}
      >
        <div className={cn("bg-background/40 rounded-full ")}>{icon}</div>
      </div>

      <CardHeader>
        <CardAction>
          {/* <Badge variant="secondary">Featured</Badge> */}
        </CardAction>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center text-foreground/60 text-xs">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
