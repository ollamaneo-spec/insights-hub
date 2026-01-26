import { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, ExternalLink, Copy, Check, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [openParagraphs, setOpenParagraphs] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleParagraph = (id: string) => {
    setOpenParagraphs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    
    const query = searchQuery.toLowerCase();
    
    return items
      .map((item) => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const matchingParagraphs = item.paragraphs.filter(
          (p) =>
            p.number.toLowerCase().includes(query) ||
            p.text.toLowerCase().includes(query)
        );

        // If title matches, show all paragraphs; otherwise show only matching paragraphs
        if (titleMatch) {
          return item;
        } else if (matchingParagraphs.length > 0) {
          return { ...item, paragraphs: matchingParagraphs };
        }
        return null;
      })
      .filter((item): item is NPAItem => item !== null);
  }, [items, searchQuery]);

  const allItemIds = filteredItems.map(item => item.id);
  const allParagraphIds = filteredItems.flatMap(item => item.paragraphs.map(p => p.id));
  const allExpanded = allItemIds.length > 0 && 
                      allItemIds.every(id => openItems.includes(id)) && 
                      allParagraphIds.every(id => openParagraphs.includes(id));

  const toggleAll = () => {
    if (allExpanded) {
      setOpenItems([]);
      setOpenParagraphs([]);
    } else {
      setOpenItems(allItemIds);
      setOpenParagraphs(allParagraphIds);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="px-4 py-3 border-b border-border bg-muted/20 mx-3 mt-3 rounded-t-lg border-x shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-sm text-foreground tracking-tight">Используемые документы</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleAll}
            className="text-xs h-7 px-2"
          >
            {allExpanded ? "Свернуть все" : "Развернуть все"}
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Поиск по документам и пунктам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pl-8 pr-8 text-xs"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 hover:bg-accent/80"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 mx-3 mb-3 border-x border-b border-border rounded-b-lg bg-background shadow-sm">
        <div className="p-3 space-y-2">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Ничего не найдено
            </div>
          ) : (
            filteredItems.map((item) => (
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
                        isOpen={openParagraphs.includes(paragraph.id)}
                        onToggle={() => toggleParagraph(paragraph.id)}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))
          )}
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
  isOpen: boolean;
  onToggle: () => void;
}

const ParagraphItem = ({ paragraph, copiedId, onCopy, link, isOpen, onToggle }: ParagraphItemPropsExtended) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
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
