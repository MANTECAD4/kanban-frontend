import { type FC, type ReactNode } from "react";
import { Save, Upload, X, XCircle } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shared/ui/dialog";
import { Separator } from "@/components/shared/ui/separator";
import type { TaskEntity } from "@/dtos/task.dto";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/shared/ui/file-upload";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SubmitAttatchmentsSchema,
  type SubmitAttachmentsState,
} from "@/dtos/attatchment.dto";

import { Field, FieldDescription } from "@/components/shared/ui/field";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { uploadAttachmentsAction } from "@/actions/attachments/upload-attachments.action";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
  task: TaskEntity;
}

export const AddAttatchmentsDialog: FC<Props> = ({ children, task }) => {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setError,
  } = useForm<SubmitAttachmentsState>({
    resolver: zodResolver(SubmitAttatchmentsSchema),
    defaultValues: { attachments: [] },
  });

  const uploadAttachmentsMutation = useMutation({
    mutationFn: uploadAttachmentsAction,

    onSuccess: () => {
      toast.success(`Files uploaded successfully`);
      reset();
    },

    onError: (error) => {
      console.log({ error });
      toast.error(`File upload failed`);
    },
  });

  const handleSubmitForm = handleSubmit((data) => {
    uploadAttachmentsMutation.mutate({ taskId: task.id, submitData: data });
  });

  return (
    <Dialog onOpenChange={() => reset()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={true}
        className="w-full sm:max-w-md"
      >
        <form onSubmit={handleSubmitForm} className="">
          <DialogHeader className="my-3">
            <DialogTitle className="">Update files</DialogTitle>
            <DialogDescription className="">
              Add several relevant documents here
            </DialogDescription>
          </DialogHeader>
          <Field>
            <Controller
              control={control}
              name="attachments"
              render={({ field: { ref, value, onBlur, onChange } }) => (
                <FileUpload
                  // maxFiles={3}
                  // maxSize={25 * 1024 * 1024}
                  className="w-full"
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                  onValueChange={onChange}
                  onFileReject={(_, message) => {
                    setError("attachments", { message });
                  }}
                  multiple
                  accept={`image/jpeg,image/png,image/webp,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/zip,application/x-7z-compressed,application/x-rar-compressed`}
                >
                  <FileUploadDropzone
                    aria-invalid={Boolean(errors.attachments)}
                    className={cn(
                      Boolean(errors.attachments) && "text-destructive",
                      "border-muted h-55",
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="flex items-center justify-center rounded-full border p-2.5">
                        <Upload className="size-6 text-muted-foreground" />
                      </div>
                      <p className="font-medium text-sm">
                        Drag & drop files here
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Or click to browse (max 2 files, up to 5MB each)
                      </p>
                    </div>
                    <FileUploadTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 w-fit"
                      >
                        Browse files
                      </Button>
                    </FileUploadTrigger>
                  </FileUploadDropzone>
                  {errors.attachments && (
                    <FieldDescription className="text-xs font-semibold text-destructive">
                      {errors.attachments.message}
                    </FieldDescription>
                  )}
                  <FileUploadList className="max-h-40 overflow-y-scroll custom-scrollbar">
                    {value?.map((file, index) => (
                      <FileUploadItem
                        key={index}
                        value={file}
                        className="border-muted"
                      >
                        <FileUploadItemPreview className="border-0" />
                        <FileUploadItemMetadata className="" />
                        <FileUploadItemDelete asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                          >
                            <X />
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    ))}
                  </FileUploadList>
                </FileUpload>
              )}
            />
          </Field>
          <Separator className="my-3" />
          <DialogFooter>
            <DialogClose>
              <Button size="lg" variant={"outline"}>
                <XCircle />
                Cancel
              </Button>
            </DialogClose>
            <Button size="lg" type="submit">
              <Save />
              Save files
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
