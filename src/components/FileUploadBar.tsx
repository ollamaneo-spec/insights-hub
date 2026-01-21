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
    <div className="border-b border-border bg-muted/20 px-3 py-1 shrink-0">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
      />
      <div className="bg-muted/80 h-9 p-1 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleClick}
          className="gap-2 h-7 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/80 px-3 transition-colors"
        >
          <Upload className="h-3.5 w-3.5" />
          <span className="font-medium">Файлы для загрузки</span>
        </Button>
      </div>
    </div>
  );
};

export default FileUploadBar;
