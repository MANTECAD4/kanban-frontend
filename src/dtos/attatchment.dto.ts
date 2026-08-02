import z from "zod";

const FileSchema = z
  .file()
  .max(1024 * 1024 * 5, "Max file size is 5MB")
  .mime(
    [
      // IMAGES
      "image/jpeg",
      "image/png",
      "image/webp",
      // DOCS
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      // EXCEL
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      // PRESENTATIONS
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      // COMPRESSED FILES
      "application/zip",
      "application/x-7z-compressed",
      "application/x-rar-compressed",
    ],
    "File type not supported",
  );

export const SubmitAttatchmentsSchema = z.object({
  attachments: z
    .array(FileSchema)
    .min(1, "Please select at least one file")
    .max(3, `Please select up to ${3} files`),
});

export type SubmitAttachmentsState = z.infer<typeof SubmitAttatchmentsSchema>;

export const AttachmentSchema = z.object({
  id: z.int().min(1),
  taskId: z.int().min(1),
  originalName: z.string(),
  storedPath: z.string(),
  extension: z.string(),
  mimeType: z.string(),
  size: z.int(),
  sourceUrl: z.string(),
  createdAt: z.date(),
});

export type AttachmentEntity = z.infer<typeof AttachmentSchema>;

export interface LoadAttachmentsResponse {
  ok: boolean;
  message: string;
  attachments: AttachmentEntity[];
  meta: Meta;
}

export interface Meta {
  total: number;
}
