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
      <section className={`border border-border rounded-md bg-card mb-2 overflow-hidden ${className}`}>
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/40">
          <h3 className="font-bold text-base text-foreground">
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
        <ScrollArea className={`${maxHeight}`}>
          <div className="p-4">
            {children}
          </div>
        </ScrollArea>
      </section>

      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 max-h-[70vh] pr-4">
            <div className="py-4">
              {children}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SectionBlock;
