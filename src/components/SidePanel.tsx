import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

interface SidePanelItem {
  id: string;
  title: string;
  excerpt: string;
  tags?: string[];
}

interface SidePanelProps {
  items: SidePanelItem[];
  onItemClick?: (id: string) => void;
}

const SidePanel = ({ items, onItemClick }: SidePanelProps) => {
  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Найденные документы</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {items.length} документов
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent/50 hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                {item.excerpt}
              </p>
              {item.tags && item.tags.length > 0 && (
                <div className="flex gap-1 mt-2 flex-wrap">
                  {item.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="text-xs px-2 py-0"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SidePanel;
