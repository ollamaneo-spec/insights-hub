import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const FileUploadBar = () => {
  return (
    <div className="h-12 border-b border-border bg-card px-4 flex items-center justify-end">
      <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
        <Upload className="h-4 w-4" />
        <span>Файлы для загрузки</span>
      </Button>
    </div>
  );
};

export default FileUploadBar;
