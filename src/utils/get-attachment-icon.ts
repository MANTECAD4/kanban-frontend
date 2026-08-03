import {
  compressedMimeTypes,
  docMimeTypes,
  excelMimeTypes,
  imageMimeTypes,
} from "@/dtos/attatchment.dto";
import type { IconName } from "lucide-react/dynamic";

export const getAttachmentIcon = (mimeType: string): IconName => {
  if (imageMimeTypes.includes(mimeType)) return "image";
  if (docMimeTypes.includes(mimeType)) return "file";
  if (excelMimeTypes.includes(mimeType)) return "table-cells-merge";
  if (compressedMimeTypes.includes(mimeType)) return "file-archive";
  return "file";
};
