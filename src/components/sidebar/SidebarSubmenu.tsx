import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/shared/ui/sidebar";
import { useGetBoardsQuery } from "@/queries/boards/useGetBoardsQuery";
import { Loader } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import type { FC } from "react";
import { Link, useNavigate } from "react-router";

interface Props {
  projectId: number;
}

export const SidebarSubmenu: FC<Props> = ({ projectId }) => {
  const navigate = useNavigate();
  const { data, isFetching } = useGetBoardsQuery(projectId);
  if (!data) return;
  if (isFetching) return;
  <SidebarMenuSubItem>
    <SidebarMenuSubButton asChild>
      <Loader />
    </SidebarMenuSubButton>
  </SidebarMenuSubItem>;
  return (
    <SidebarMenuSub>
      {data.boards.map((board) => (
        <SidebarMenuSubItem
          key={board.id}
          onClick={() => navigate(`/boards/${board.slug}`)}
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
