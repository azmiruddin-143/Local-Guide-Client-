"use client";

import { useState, useCallback, ChangeEvent, DragEvent } from "react";

export interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface UseFileUploadOptions {
  accept?: string;
  initialFiles?: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }>;
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  onFilesChange?: (files: UploadedFile[]) => void;
}

export function useFileUpload({
  accept = "image/*",
  initialFiles = [],
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024, // 5MB
  multiple = true,
  onFilesChange,
}: UseFileUploadOptions = {}) {
  const [files, setFiles] = useState<UploadedFile[]>(() =>
    initialFiles.map((file) => ({
      id: file.id,
      file: new File([], file.name, { type: file.type }),
      preview: file.url,
      name: file.name,
      size: file.size,
      type: file.type,
      url: file.url,
    }))
  );
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validateFiles = useCallback(
    (newFiles: File[]): { valid: File[]; errors: string[] } => {
      const validFiles: File[] = [];
      const newErrors: string[] = [];

      for (const file of newFiles) {
        // Check file count
        if (files.length + validFiles.length >= maxFiles) {
          newErrors.push(`Maximum ${maxFiles} files allowed`);
          break;
        }

        // Check file size
        if (file.size > maxSize) {
          newErrors.push(
            `${file.name} is too large. Max size: ${(maxSize / 1024 / 1024).toFixed(0)}MB`
          );
          continue;
        }

        // Check file type
        if (accept && accept !== "*") {
          const acceptedTypes = accept.split(",").map((t) => t.trim());
          const fileType = file.type;
          const fileExtension = `.${file.name.split(".").pop()}`;

          const isAccepted = acceptedTypes.some((type) => {
            if (type.endsWith("/*")) {
              return fileType.startsWith(type.replace("/*", ""));
            }
            return type === fileType || type === fileExtension;
          });

          if (!isAccepted) {
            newErrors.push(`${file.name} is not an accepted file type`);
            continue;
          }
        }

        validFiles.push(file);
      }

      return { valid: validFiles, errors: newErrors };
    },
    [files.length, maxFiles, maxSize, accept]
  );

  const addFiles = useCallback(
    (newFiles: File[]) => {
      const { valid, errors: validationErrors } = validateFiles(newFiles);

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        setTimeout(() => setErrors([]), 5000);
      }

      if (valid.length === 0) return;

      const uploadedFiles: UploadedFile[] = valid.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
      }));

      setFiles((prev) => {
        const updated = [...prev, ...uploadedFiles];
        onFilesChange?.(updated);
        return updated;
      });
    },
    [validateFiles, onFilesChange]
  );

  const removeFile = useCallback(
    (id: string) => {
      setFiles((prev) => {
        const fileToRemove = prev.find((f) => f.id === id);
        if (fileToRemove && fileToRemove.preview && !fileToRemove.url) {
          URL.revokeObjectURL(fileToRemove.preview);
        }
        const updated = prev.filter((f) => f.id !== id);
        onFilesChange?.(updated);
        return updated;
      });
    },
    [onFilesChange]
  );

  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      addFiles(droppedFiles);
    },
    [addFiles]
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
      addFiles(selectedFiles);
      e.target.value = ""; // Reset input
    },
    [addFiles]
  );

  const openFileDialog = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.multiple = multiple;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input.onchange = (e) => handleFileChange(e as any);
    input.click();
  }, [accept, multiple, handleFileChange]);

  const getInputProps = useCallback(
    () => ({
      type: "file" as const,
      accept,
      multiple,
      onChange: handleFileChange,
    }),
    [accept, multiple, handleFileChange]
  );

  return [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
      addFiles,
    },
  ] as const;
}
