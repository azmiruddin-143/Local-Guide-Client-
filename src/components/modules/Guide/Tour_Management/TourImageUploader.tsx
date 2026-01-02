"use client";

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";

interface TourImageUploaderProps {
  maxFiles?: number;
  maxSizeMB?: number;
  onFilesChange?: (files: File[]) => void;
}

export default function TourImageUploader({
  maxFiles = 10,
  maxSizeMB = 5,
  onFilesChange,
}: TourImageUploaderProps) {
  const maxSize = maxSizeMB * 1024 * 1024;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif,image/webp",
    maxFiles,
    maxSize,
    multiple: true,
    onFilesChange: (uploadedFiles) => {
      onFilesChange?.(uploadedFiles.map((f) => f.file));
    },
  });

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        className="relative flex min-h-52 flex-col items-center not-data-[files]:justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          {...getInputProps()}
          aria-label="Upload image file"
          className="sr-only"
          name="images"
        />

        {files.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate font-medium text-sm">
                Uploaded Files ({files.length}/{maxFiles})
              </h3>
              <Button
                disabled={files.length >= maxFiles}
                onClick={openFileDialog}
                size="sm"
                variant="outline"
                type="button"
              >
                <UploadIcon
                  aria-hidden="true"
                  className="-ms-0.5 size-3.5 opacity-60"
                />
                Add more
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {files.map((file) => (
                <div
                  className="relative aspect-square rounded-md bg-accent overflow-hidden group"
                  key={file.id}
                >
                  <img
                    alt={file.name}
                    className="size-full rounded-[inherit] object-cover transition-transform group-hover:scale-105"
                    src={file.preview}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                  <Button
                    aria-label="Remove image"
                    className="top-1 right-1 hover:scale-110 cursor-pointer absolute size-7 z-50 rounded-full border-2 border-background shadow-lg "
                    onClick={() => removeFile(file.id)}
                    size="icon"
                    type="button"
                    variant="destructive"
                  >
                    <XIcon className="size-4" />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs truncate">{file.name}</p>
                    <p className="text-white/80 text-[10px]">
                      {(file.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              aria-hidden="true"
              className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
            >
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 font-medium text-sm">Drop your images here</p>
            <p className="text-muted-foreground text-xs">
              SVG, PNG, JPG, GIF or WEBP (max. {maxSizeMB}MB each)
            </p>
            <Button
              className="mt-4"
              onClick={openFileDialog}
              variant="outline"
              type="button"
            >
              <UploadIcon aria-hidden="true" className="-ms-1 opacity-60" />
              Select images
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-destructive text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      <p className="text-center text-muted-foreground text-xs">
        Upload up to {maxFiles} images to showcase your tour. Images will be automatically compressed before upload.
      </p>
    </div>
  );
}
