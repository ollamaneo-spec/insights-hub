import { useState, ReactNode, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, GripHorizontal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SectionBlockProps {
  title: string;
  children: ReactNode;
  maxHeight?: string;
  className?: string;
  allowExpand?: boolean;
  stickyLabel?: string;
  resizable?: boolean;
  defaultHeight?: number;
}

const SectionBlock = ({ 
  title, 
  children, 
  maxHeight = "max-h-40",
  className = "",
  allowExpand = true,
  stickyLabel,
  resizable = false,
  defaultHeight = 144
}: SectionBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(defaultHeight);
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    const startY = e.clientY;
    const startHeight = height;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing.current) return;
      const deltaY = moveEvent.clientY - startY;
      const newHeight = Math.max(80, Math.min(500, startHeight + deltaY));
      setHeight(newHeight);
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [height]);

  // Определяем классы для высоты - если max-h-none, используем flex-1 для заполнения
  const isFlexible = maxHeight === "max-h-none";

  return (
    <>
      <section 
        ref={containerRef}
        className={`border border-border rounded-md bg-card overflow-hidden flex flex-col ${className}`}
        style={resizable && !isFlexible ? { height: `${height}px` } : undefined}
      >
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
        {stickyLabel && (
          <div className="px-4 py-2 border-b border-border bg-muted/20 flex-shrink-0">
            <span className="inline-block bg-muted border border-border rounded px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {stickyLabel}
            </span>
          </div>
        )}
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-4">
            {children}
          </div>
        </ScrollArea>
        {resizable && !isFlexible && (
          <div 
            className="h-2 bg-muted/60 hover:bg-primary/20 cursor-ns-resize flex items-center justify-center border-t border-border transition-colors"
            onMouseDown={handleMouseDown}
          >
            <GripHorizontal className="h-3 w-3 text-muted-foreground" />
          </div>
        )}
      </section>

      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="w-[85vw] max-w-[85vw] h-[80vh] max-h-[80vh] flex flex-col">
          <DialogHeader className="pb-4 border-b border-border">
            <DialogTitle className="text-2xl font-bold">
              {stickyLabel ? `${title} — ${stickyLabel}` : title}
            </DialogTitle>
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
