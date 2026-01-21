import { useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SectionBlockProps {
  title: string;
  children: ReactNode;
  maxHeight?: string;
  className?: string;
  allowExpand?: boolean;
}

const SectionBlock = ({ 
  title, 
  children, 
  maxHeight = "max-h-40",
  className = "",
  allowExpand = true
}: SectionBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Определяем классы для высоты - если max-h-none, используем flex-1 для заполнения
  const heightClass = maxHeight === "max-h-none" ? "flex-1" : maxHeight;
  const isFlexible = maxHeight === "max-h-none";

  return (
    <>
      <section className={`border border-border rounded-md bg-card overflow-hidden flex flex-col ${className}`}>
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/40 flex-shrink-0">
          <h3 className="font-bold text-lg text-foreground">
            {title}
          </h3>
          {allowExpand && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => setIsExpanded(true)}
              title="Открыть на всю страницу"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <ScrollArea className={`${isFlexible ? "flex-1" : heightClass}`}>
          <div className="p-4">
            {children}
          </div>
        </ScrollArea>
      </section>

      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="w-[85vw] max-w-[85vw] h-[80vh] max-h-[80vh] flex flex-col">
          <DialogHeader className="pb-4 border-b border-border">
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4">
            <div className="py-6 text-base leading-relaxed">
              {children}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SectionBlock;
