
import { useState, useRef } from "react";
import { UploadCloud, File, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileUploaderProps {
  onFilesUploaded: (files: File[]) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number; // in bytes
  maxFiles?: number;
}

export function FileUploader({
  onFilesUploaded,
  acceptedFileTypes = ".csv, .xlsx, .pdf",
  maxFileSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5
}: FileUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const newFiles = Array.from(e.target.files);
    processFiles(newFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    
    const newFiles = Array.from(e.dataTransfer.files);
    processFiles(newFiles);
  };

  const processFiles = (newFiles: File[]) => {
    // Check if adding these files would exceed the maximum
    if (uploadedFiles.length + newFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can upload a maximum of ${maxFiles} files.`,
        variant: "destructive"
      });
      return;
    }
    
    // Validate file types and sizes
    const invalidFiles: string[] = [];
    const validFiles: File[] = [];
    
    newFiles.forEach(file => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const isValidType = acceptedFileTypes.includes(fileExtension || '');
      
      if (!isValidType) {
        invalidFiles.push(`${file.name} (invalid type)`);
      } else if (file.size > maxFileSize) {
        invalidFiles.push(`${file.name} (too large)`);
      } else {
        validFiles.push(file);
      }
    });
    
    // Show error for invalid files
    if (invalidFiles.length > 0) {
      toast({
        title: "Some files couldn't be uploaded",
        description: `The following files were rejected: ${invalidFiles.join(', ')}`,
        variant: "destructive"
      });
    }
    
    // Add valid files to the state
    if (validFiles.length > 0) {
      const updatedFiles = [...uploadedFiles, ...validFiles];
      setUploadedFiles(updatedFiles);
      onFilesUploaded(updatedFiles);
      
      toast({
        title: "Files uploaded",
        description: `Successfully uploaded ${validFiles.length} file(s)`,
      });
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    onFilesUploaded(updatedFiles);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm font-medium">
          Drag and drop files here, or click to browse
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supports {acceptedFileTypes} up to {(maxFileSize / (1024 * 1024)).toFixed(0)}MB
        </p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept={acceptedFileTypes}
          onChange={handleFileChange}
        />
      </div>

      {/* File list */}
      {uploadedFiles.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm font-medium mb-2">Uploaded Files:</p>
          <ul className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between bg-white p-2 rounded border"
              >
                <div className="flex items-center space-x-2">
                  <File className="h-4 w-4 text-blue-500" />
                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
