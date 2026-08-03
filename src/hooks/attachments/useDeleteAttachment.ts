import { deleteAttachmentAction } from "@/actions/attachments/delete-attachment.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteAttachment = () => {
  const deleteAttachmentMutation = useMutation({
    mutationFn: deleteAttachmentAction,
    onSuccess: () => {
      toast.success(`Attachment deleted succesfully`);
    },
    onError: (error) => {
      console.log({ error });
      toast.error("AttachmentDeletion failed");
    },
  });

  const handleAttachmentDeletion = (attachmentId: number) => {
    deleteAttachmentMutation.mutate(attachmentId);
  };
  return { handleAttachmentDeletion };
};
