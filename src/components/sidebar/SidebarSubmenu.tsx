import { getBoardsAction } from "@/actions/boards/get-boards.action";
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/shared/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import type { FC } from "react";
import { useNavigate } from "react-router";

interface Props {
  projectId: number;
  projectSlug: string;
}

export const SidebarSubmenu: FC<Props> = ({ projectId, projectSlug }) => {
  const navigate = useNavigate();
  const { data, isFetching } = useQuery({
    queryFn: () => getBoardsAction(projectId),
    queryKey: ["in-project", projectId, "boards"],
  });
  if (!data) return;
  if (isFetching) return;
  <SidebarMenuSubItem>
    <SidebarMenuSubButton asChild></SidebarMenuSubButton>
  </SidebarMenuSubItem>;
  return (
    <SidebarMenuSub>
      {data.boards.map((board) => (
        <SidebarMenuSubItem
          key={board.id}
          onClick={() =>
            navigate(`/projects/${projectSlug}/boards/${board.slug}`)
          }
          className="cursor-pointer"
        >
          <SidebarMenuSubButton asChild>
            <div className="flex gap-2">
              <DynamicIcon name={board.icon} />
              <span>{board.name}</span>
            </div>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
};
