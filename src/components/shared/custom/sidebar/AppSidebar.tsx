"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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
import { NavUser } from "@/components/shared/custom/sidebar/NavUser";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shared/ui/collapsible";
import { Link } from "react-router";
import { DynamicIcon } from "lucide-react/dynamic";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { useGetUserProjectsQuery } from "@/queries/project/useGetUserProjectsQuery";

// This is sample data.
// const data = {
//   navMain: [
//     {
//       title: "Playground",
//       url: "/projects/playground",
//       icon: <HugeiconsIcon icon={ComputerTerminalIcon} strokeWidth={2} />,
//       isActive: true,
//       items: [
//         {
//           title: "History",
//           url: "/boards/history",
//         },
//         {
//           title: "Starred",
//           url: "/boards/starred",
//         },
//         {
//           title: "Settings",
//           url: "/boards/settings",
//         },
//       ],
//     },
//     {
//       title: "Models",
//       url: "/projects/models",
//       icon: <HugeiconsIcon icon={RoboticIcon} strokeWidth={2} />,
//       items: [
//         {
//           title: "Genesis",
//           url: "/boards/genesis",
//         },
//         {
//           title: "Explorer",
//           url: "/boards/explorer",
//         },
//         {
//           title: "Quantum",
//           url: "/boards/quantum",
//         },
//       ],
//     },
//   ],
// };

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isError } = useGetUserProjectsQuery();
  if (isError || data === undefined) return;
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="tracking-wide">
            Projects
          </SidebarGroupLabel>
          <SidebarMenu>
            {data!.projects.map((item) => (
              <Collapsible
                key={item.id}
                asChild
                // defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <div className="flex justify-between  text-xs font-semibold px-2 py-1">
                    <div className="flex gap-2 items-center">
                      <DynamicIcon name="ad" className="size-5" />
                      <Link
                        to={`projects/${item.slug}`}
                        className="hover:underline cursor-pointer"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className="aspect-square size-6 rounded-full"
                      >
                        <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link to={"boards/lol"}>
                            <span>lol</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
