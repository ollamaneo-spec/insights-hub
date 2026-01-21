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
      <div className="flex items-center gap-3 px-4 py-3 border-t border-border bg-muted/20">
        <Button 
          variant={isEditing ? "default" : "outline"} 
          size="sm" 
          className="gap-2 h-9 text-xs font-medium shadow-sm"
          onClick={onEditMode}
        >
          <Pencil className="h-4 w-4" />
          {isEditing ? "Режим редактирования" : "Редактировать"}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 h-9 text-xs font-medium shadow-sm">
              <Download className="h-4 w-4" />
              Скачать
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="shadow-lg">
            <DropdownMenuItem onClick={() => handleDownload("docx")} className="cursor-pointer">
              Скачать в DOCX
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownload("pdf")} className="cursor-pointer">
              Скачать в PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          size="sm" 
          className="gap-2 h-9 text-xs font-medium bg-primary hover:bg-primary/90 shadow-sm"
          onClick={() => setIsApproveDialogOpen(true)}
        >
          <CheckCircle className="h-4 w-4" />
          Утвердить
        </Button>
      </div>

      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Утверждение ответа</DialogTitle>
            <DialogDescription className="text-muted-foreground">
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
