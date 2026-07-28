import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shared/ui/breadcrumb";
import { Separator } from "@/components/shared/ui/separator";
import { SidebarTrigger } from "@/components/shared/ui/sidebar";
import type { FC } from "react";
import React from "react";
import { Link as BreadcrumbLink } from "react-router";

export type BreadcrumbLink = { label: string; route: string };

interface Props {
  links: BreadcrumbLink[];
  currentPage: string;
}

export const PageBreadcrumbs: FC<Props> = ({ links, currentPage }) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <SidebarTrigger variant={"outline"} className="size-6 " />

      <Separator orientation="vertical" />
      <Breadcrumb>
        <BreadcrumbList>
          {links.map(({ label, route }) => (
            <React.Fragment key={label}>
              <BreadcrumbItem>
                <BreadcrumbLink to={route} className="text-gray-400">
                  {label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
