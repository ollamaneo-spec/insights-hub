import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NPAItem {
  id: string;
  title: string;
  link: string;
  paragraphs: {
    id: string;
    number: string;
    text: string;
  }[];
  tags?: string[];
}

interface NPAListProps {
  items: NPAItem[];
}

const NPAList = ({ items }: NPAListProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const allItemIds = items.map(item => item.id);
  const allExpanded = allItemIds.every(id => openItems.includes(id));

  const toggleAll = () => {
    if (allExpanded) {
      setOpenItems([]);
    } else {
      setOpenItems(allItemIds);
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="px-4 py-3 border-b border-border bg-muted/20 mx-3 mt-3 rounded-t-lg border-x shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-sm text-foreground tracking-tight">Используемые документы</h2>
            <p className="text-xs text-muted-foreground mt-1">
              {items.length} документов
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleAll}
            className="text-xs h-7 px-2"
          >
            {allExpanded ? "Свернуть все" : "Развернуть все"}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 mx-3 mb-3 border-x border-b border-border rounded-b-lg bg-background shadow-sm">
        <div className="p-3 space-y-2">
          {items.map((item) => (
            <Collapsible
              key={item.id}
              open={openItems.includes(item.id)}
              onOpenChange={() => toggleItem(item.id)}
            >
              <div className="border border-border rounded-lg overflow-hidden bg-card hover:border-primary/20 transition-colors">
                <CollapsibleTrigger asChild>
                  <button className="w-full text-left p-3 hover:bg-muted/40 transition-colors flex items-start gap-2.5">
                    {openItems.includes(item.id) ? (
                      <ChevronDown className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-medium text-sm text-primary hover:underline flex items-center gap-1.5"
                      >
                        {item.title}
                        <ExternalLink className="h-3 w-3 opacity-70" />
                      </a>
                      <p className="text-xs text-muted-foreground mt-1.5">
                        {item.paragraphs.length} пунктов
                      </p>
                    </div>
                  </button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="border-t border-border/60">
                    {item.paragraphs.map((paragraph) => (
                      <ParagraphItem
                        key={paragraph.id}
                        paragraph={paragraph}
                        copiedId={copiedId}
                        onCopy={copyToClipboard}
                        link={item.link}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

interface ParagraphItemPropsExtended {
  paragraph: {
    id: string;
    number: string;
    text: string;
  };
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
  link?: string;
}

const ParagraphItem = ({ paragraph, copiedId, onCopy, link }: ParagraphItemPropsExtended) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border-b border-border/40 last:border-b-0">
        <CollapsibleTrigger asChild>
          <button className="w-full text-left px-4 py-2.5 hover:bg-muted/30 transition-colors flex items-center gap-2.5">
            {isOpen ? (
              <ChevronDown className="h-3.5 w-3.5 text-primary flex-shrink-0" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
            )}
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-medium text-primary hover:underline flex items-center gap-1.5"
              >
                {paragraph.number}
                <ExternalLink className="h-2.5 w-2.5 opacity-70" />
              </a>
            ) : (
              <span className="text-xs font-medium text-foreground">
                {paragraph.number}
              </span>
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-3">
            <div className="bg-muted/20 p-3 rounded-lg border border-border/60 relative group">
              <p className="text-xs text-foreground leading-relaxed pr-8 select-text">
                {paragraph.text}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent/80"
                onClick={() => onCopy(paragraph.text, paragraph.id)}
              >
                {copiedId === paragraph.id ? (
                  <Check className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default NPAList;
