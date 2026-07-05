import { getProjectBySlugAction } from "@/actions/project/get-project.by-slug.action";
import { useQuery } from "@tanstack/react-query";

export const useGetProjectBySlugQuery = (slug: string) => {
  return useQuery({
    queryFn: () => getProjectBySlugAction(slug),
    queryKey: ["projects", slug],
    enabled: slug !== "",
  });
};
