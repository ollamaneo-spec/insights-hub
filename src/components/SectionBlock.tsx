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

  return (
    <>
      <section className={`border-b border-border bg-card ${className}`}>
        <div className="flex items-center justify-between px-3 py-2 border-b border-border/50 bg-muted/30">
          <h3 className="font-semibold text-sm text-foreground tracking-tight">
            {title}
          </h3>
          {allowExpand && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={() => setIsExpanded(true)}
              title="Открыть на всю страницу"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        <ScrollArea className={`${maxHeight} scrollbar-thin`}>
          <div className="p-3">
            {children}
          </div>
        </ScrollArea>
      </section>

      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 max-h-[70vh] pr-4">
            <div className="py-2">
              {children}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SectionBlock;
