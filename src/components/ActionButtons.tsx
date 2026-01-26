import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Download, CheckCircle, FileText, File } from "lucide-react";
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
import { exportToPdf, exportToDocx } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";

interface ActionButtonsProps {
  onEditMode?: () => void;
  isEditing?: boolean;
  getAnswerContent?: () => string;
}

const ActionButtons = ({ onEditMode, isEditing = false, getAnswerContent }: ActionButtonsProps) => {
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleDownload = async (format: "docx" | "pdf") => {
    if (!getAnswerContent) {
      toast({
        title: "Ошибка",
        description: "Контент для экспорта недоступен",
        variant: "destructive",
      });
      return;
    }

    const content = getAnswerContent();
    if (!content) {
      toast({
        title: "Ошибка",
        description: "Нет содержимого для экспорта",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    
    try {
      const fileName = `Ответ_${new Date().toISOString().slice(0, 10)}`;
      
      if (format === "pdf") {
        await exportToPdf(content, fileName);
      } else {
        exportToDocx(content, fileName);
      }
      
      toast({
        title: "Успешно",
        description: `Файл ${format.toUpperCase()} успешно скачан`,
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Ошибка экспорта",
        description: "Не удалось экспортировать файл",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
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
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 h-9 text-xs font-medium shadow-sm"
              disabled={isExporting}
            >
              <Download className="h-4 w-4" />
              {isExporting ? "Экспорт..." : "Скачать"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="shadow-lg">
            <DropdownMenuItem 
              onClick={() => handleDownload("docx")} 
              className="cursor-pointer gap-2"
              disabled={isExporting}
            >
              <FileText className="h-4 w-4" />
              Скачать в DOCX
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleDownload("pdf")} 
              className="cursor-pointer gap-2"
              disabled={isExporting}
            >
              <File className="h-4 w-4" />
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
