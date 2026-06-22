import { ProjectBody } from "@/features/projects/components/ProjectBody";
import { ProjectHeader } from "@/features/projects/components/ProjectHeader";

export const ProjectPage = () => {
  return (
    <div className="flex flex-col flex-1 min-w-0 h-dvh pl-2 pr-4 pt-4.5 pb-1 ">
      <ProjectHeader />

      <h1 className="text-2xl font-semibold">Design for Landing Page</h1>

      <ProjectBody />
    </div>
  );
};
