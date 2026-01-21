import { Button } from "@/components/ui/button";
import { Pencil, Download, CheckCircle } from "lucide-react";

const ActionButtons = () => {
  return (
    <div className="flex items-center gap-2 p-4 border-t border-border bg-card">
      <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-none">
        <Pencil className="h-4 w-4" />
        Редактировать
      </Button>
      <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-none">
        <Download className="h-4 w-4" />
        Скачать
      </Button>
      <Button size="sm" className="gap-2 flex-1 sm:flex-none bg-primary hover:bg-primary/90">
        <CheckCircle className="h-4 w-4" />
        Утвердить
      </Button>
    </div>
  );
};

export default ActionButtons;
