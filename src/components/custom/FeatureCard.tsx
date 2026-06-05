import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import type { FC, ReactNode } from "react";

import styles from "../../styles/FeatureCard.module.css";
import { useThemeStore } from "@/providers/store/theme.store";

interface Props {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export const FeatureCard: FC<Props> = ({
  title,
  description,
  icon,
  className: elevation,
}) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Card className={cn(elevation, "rounded-md w-full max-w-50 pt-0")}>
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
