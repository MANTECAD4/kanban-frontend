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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/shared/ui/sidebar";
import { Header } from "@/components/sidebar/Header";
import { NavUser } from "@/components/sidebar/NavUser";
import { useNavigate } from "react-router";
import { DynamicIcon } from "lucide-react/dynamic";
import { useGetBoardsQuery } from "@/hooks/queries/useGetBoardsQuery";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isError } = useGetBoardsQuery();
  const navigate = useNavigate();
  if (isError || !data?.boards) return;
  console.log({ boards: data.boards });
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
          <SidebarMenu>
            {data.boards.map((board) => (
              <SidebarMenuButton
                onClick={() => navigate(`/boards/${board.slug}`)}
              >
                <SidebarMenuItem>
                  <div className="flex justify-between  text-xs font-semibold px-2 py-1">
                    <div className="flex gap-2 items-center">
                      <DynamicIcon name={board.icon} className="size-5" />
                      {/* <Link
                        to={`projects/${project.slug}`}
                        className="hover:underline cursor-pointer"
                      > */}
                      {board.name}
                      {/* </Link> */}
                    </div>
                  </div>
                </SidebarMenuItem>
              </SidebarMenuButton>
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
