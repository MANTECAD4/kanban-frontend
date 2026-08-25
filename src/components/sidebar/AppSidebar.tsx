"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/shared/ui/sidebar";
import { Header } from "@/components/sidebar/Header";
import { NavUser } from "@/components/sidebar/NavUser";
import { BoardsMenu } from "@/components/sidebar/nav-user/BoardsMenu";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="tracking-wide">
            Boards
          </SidebarGroupLabel>
          <BoardsMenu />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
