import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Download, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionButtonsProps {
  onEditMode?: () => void;
  isEditing?: boolean;
}

const ActionButtons = ({ onEditMode, isEditing = false }: ActionButtonsProps) => {
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);

  const handleDownload = (format: "docx" | "pdf") => {
    console.log(`Скачивание в формате ${format}`);
    // TODO: Implement actual download logic
  };

  const handleApprove = () => {
    console.log("Ответ утвержден и передан на согласование");
    setIsApproveDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2 px-3 py-2 border-t border-border bg-muted/30">
        <Button 
          variant={isEditing ? "default" : "outline"} 
          size="sm" 
          className="gap-1.5 h-8 text-xs"
          onClick={onEditMode}
        >
          <Pencil className="h-3.5 w-3.5" />
          {isEditing ? "Режим редактирования" : "Редактировать"}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
              <Download className="h-3.5 w-3.5" />
              Скачать
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => handleDownload("docx")}>
              Скачать в DOCX
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownload("pdf")}>
              Скачать в PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          size="sm" 
          className="gap-1.5 h-8 text-xs bg-primary hover:bg-primary/90"
          onClick={() => setIsApproveDialogOpen(true)}
        >
          <CheckCircle className="h-3.5 w-3.5" />
          Утвердить
        </Button>
      </div>

      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Утверждение ответа</DialogTitle>
            <DialogDescription>
              Ответ передан на согласование
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Отменить
            </Button>
            <Button onClick={handleApprove}>
              Ок
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionButtons;
