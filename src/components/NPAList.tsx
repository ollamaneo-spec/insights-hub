import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
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

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-3 border-b border-border">
        <h2 className="font-bold text-sm text-foreground">Найденные документы</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {items.length} документов
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {items.map((item) => (
            <Collapsible
              key={item.id}
              open={openItems.includes(item.id)}
              onOpenChange={() => toggleItem(item.id)}
            >
              <div className="border border-border rounded-md overflow-hidden bg-background">
                <CollapsibleTrigger asChild>
                  <button className="w-full text-left p-3 hover:bg-muted/50 transition-colors flex items-start gap-2">
                    {openItems.includes(item.id) ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-medium text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        {item.title}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.paragraphs.length} пунктов
                      </p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {item.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs px-2 py-0 bg-muted text-muted-foreground"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="border-t border-border">
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

interface ParagraphItemProps {
  paragraph: {
    id: string;
    number: string;
    text: string;
  };
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

interface ParagraphItemPropsExtended extends ParagraphItemProps {
  link?: string;
}

const ParagraphItem = ({ paragraph, copiedId, onCopy, link }: ParagraphItemPropsExtended) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border-b border-border last:border-b-0">
        <CollapsibleTrigger asChild>
          <button className="w-full text-left px-4 py-2 hover:bg-muted/30 transition-colors flex items-center gap-2">
            {isOpen ? (
              <ChevronDown className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            ) : (
              <ChevronRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            )}
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
              >
                {paragraph.number}
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            ) : (
              <span className="text-xs font-medium text-foreground">
                {paragraph.number}
              </span>
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-2">
            <div className="bg-muted/30 p-2 rounded-md border border-border relative group">
              <p className="text-xs text-muted-foreground leading-relaxed pr-8 select-text">
                {paragraph.text}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onCopy(paragraph.text, paragraph.id)}
              >
                {copiedId === paragraph.id ? (
                  <Check className="h-3 w-3 text-primary" />
                ) : (
                  <Copy className="h-3 w-3" />
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
