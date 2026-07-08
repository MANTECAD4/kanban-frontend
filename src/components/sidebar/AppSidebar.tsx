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
import { Header } from "@/components/sidebar/Header";
import { NavUser } from "@/components/sidebar/NavUser";
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
import { SidebarSubmenu } from "@/components/sidebar/SidebarSubmenu";

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
            {data.projects.map((project) => (
              <Collapsible
                key={project.id}
                asChild
                // defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <div className="flex justify-between  text-xs font-semibold px-2 py-1">
                    <div className="flex gap-2 items-center">
                      <DynamicIcon name={project.icon} className="size-5" />
                      <Link
                        to={`projects/${project.slug}`}
                        className="hover:underline cursor-pointer"
                      >
                        {project.name}
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
                    <SidebarSubmenu
                      projectId={project.id}
                      projectSlug={project.slug}
                    />
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
