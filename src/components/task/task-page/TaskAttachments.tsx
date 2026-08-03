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
import { useGetAttachmentsQuery } from "@/hooks/queries/useGetAttachmentsQuery";
import { getAttachmentIcon } from "@/utils/get-attachment-icon";
import { Download, XIcon } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import type { FC } from "react";

interface Props {
  taskId: number;
}
export const TaskAttachments: FC<Props> = ({ taskId = 0 }) => {
  const getAttachmentsQuery = useGetAttachmentsQuery(taskId);
  if (!getAttachmentsQuery.data) return;
  const {
    data: { attachments },
  } = getAttachmentsQuery;

  return (
    <>
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
    </>
  );
};
