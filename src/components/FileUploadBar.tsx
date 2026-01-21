import { useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadBarProps {
  onFilesSelected?: (files: FileList) => void;
}

const FileUploadBar = ({ onFilesSelected }: FileUploadBarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected?.(e.target.files);
      console.log("Выбранные файлы:", Array.from(e.target.files).map(f => f.name));
    }
  };

  return (
    <div className="h-10 border-b border-border bg-muted/30 px-3 flex items-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
      />
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleClick}
        className="gap-1.5 h-7 text-xs text-muted-foreground hover:text-foreground hover:bg-accent px-2"
      >
        <Upload className="h-3.5 w-3.5" />
        <span>Файлы для загрузки</span>
      </Button>
    </div>
  );
};

export default FileUploadBar;
