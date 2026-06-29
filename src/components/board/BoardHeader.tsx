import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shared/ui/breadcrumb";
import { Separator } from "@/components/shared/ui/separator";
import { SidebarTrigger } from "@/components/shared/ui/sidebar";
import { Link } from "react-router";

export const BoardHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <SidebarTrigger className="" />

      <Separator orientation="vertical" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/project" className="text-gray-400">
              Intex Company
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Design for Landing Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
