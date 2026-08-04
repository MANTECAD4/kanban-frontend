import { AddAttatchmentsDialog } from "@/components/attachment/AddAttatchmentsDialog";
import { DeleteAttachmentDialog } from "@/components/attachment/DeleteAttachmentDialog";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/shared/ui/attachment";
import { Button } from "@/components/shared/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/shared/ui/empty";
import type { TaskEntity } from "@/dtos/task.dto";
import { useGetAttachmentsQuery } from "@/hooks/queries/useGetAttachmentsQuery";
import { getAttachmentIcon } from "@/utils/get-attachment-icon";
import { Download, FileUp, StickyNoteX, XIcon } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import type { FC } from "react";

interface Props {
  task: TaskEntity;
}
export const TaskAttachments: FC<Props> = ({ task }) => {
  const getAttachmentsQuery = useGetAttachmentsQuery(task.id);
  if (!getAttachmentsQuery.data) return;
  const {
    data: { attachments },
  } = getAttachmentsQuery;

  return (
    <>
      {attachments.length === 0 ? (
        <Empty className=" border-muted-foreground py-10">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <StickyNoteX />
            </EmptyMedia>
            <EmptyTitle>No Attachmemts</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t added any attachments yet. Get started by
              uploading some of them.
            </EmptyDescription>
            <EmptyContent>
              <AddAttatchmentsDialog task={task}>
                <Button variant="outline" className="mt-2">
                  <FileUp />
                  Upload files
                </Button>
              </AddAttatchmentsDialog>
            </EmptyContent>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {attachments.map((attachment) => (
            <Attachment
              key={attachment.id}
              state="idle"
              className="w-full border-muted group/attachment:"
            >
              <AttachmentMedia>
                <DynamicIcon name={getAttachmentIcon(attachment.mimeType)} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>
                  {attachment.mimeType.match(/image|plain\/text|pdf/) ? (
                    <a
                      className="group-hover/attachment:underline"
                      href={attachment.sourceUrl}
                      target="_blank"
                    >
                      {attachment.originalName}
                    </a>
                  ) : (
                    attachment.originalName
                  )}
                </AttachmentTitle>
                <AttachmentDescription>
                  {(attachment.size / (1024 * 1024)).toFixed(4)} MB
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction>
                  <a
                    href={`${attachment.sourceUrl}?download=${attachment.originalName}`}
                    target="_blank"
                    aria-label={`Inspect ${attachment.originalName} attachment`}
                  >
                    <Download />
                  </a>
                </AttachmentAction>
                <DeleteAttachmentDialog attachment={attachment}>
                  <AttachmentAction
                    aria-label={`Remove ${attachment.originalName} attachment`}
                  >
                    <XIcon />
                  </AttachmentAction>
                </DeleteAttachmentDialog>
              </AttachmentActions>
            </Attachment>
          ))}
        </div>
      )}
    </>
  );
};
