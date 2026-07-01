"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/shared/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LayoutBottomIcon,
  AudioWave01Icon,
  CommandIcon,
  ComputerTerminalIcon,
  RoboticIcon,
  BookOpen02Icon,
  Settings05Icon,
  CropIcon,
  PieChartIcon,
  MapsIcon,
} from "@hugeicons/core-free-icons";
import { Header } from "@/components/shared/custom/sidebar/Header";
import { NavProjects } from "@/components/shared/custom/sidebar/NavProjects";
import { NavUser } from "@/components/shared/custom/sidebar/NavUser";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Playground",
      url: "/projects/playground",
      icon: <HugeiconsIcon icon={ComputerTerminalIcon} strokeWidth={2} />,
      isActive: true,
      items: [
        {
          title: "History",
          url: "/boards/history",
        },
        {
          title: "Starred",
          url: "/boards/starred",
        },
        {
          title: "Settings",
          url: "/boards/settings",
        },
      ],
    },
    {
      title: "Models",
      url: "/projects/models",
      icon: <HugeiconsIcon icon={RoboticIcon} strokeWidth={2} />,
      items: [
        {
          title: "Genesis",
          url: "/boards/genesis",
        },
        {
          title: "Explorer",
          url: "/boards/explorer",
        },
        {
          title: "Quantum",
          url: "/boards/quantum",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
