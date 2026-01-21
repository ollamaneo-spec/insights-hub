import { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface RelatedDocument {
  id: string;
  title: string;
  link: string;
  description: string;
  paragraphs: {
    id: string;
    number: string;
    text: string;
    link: string;
  }[];
  tags?: string[];
}

const relatedDocuments: RelatedDocument[] = [
  {
    id: "1",
    title: "Федеральный закон № 54-ФЗ",
    link: "https://www.consultant.ru/document/cons_doc_LAW_42359/",
    description: "О применении контрольно-кассовой техники при осуществлении расчетов",
    paragraphs: [
      {
        id: "doc1-p1",
        number: "П. 1 ст. 1.2 ФЗ-54",
        text: "Контрольно-кассовая техника применяется на территории Российской Федерации в обязательном порядке всеми организациями и индивидуальными предпринимателями при осуществлении ими расчетов.",
        link: "https://www.consultant.ru/document/cons_doc_LAW_42359/",
      },
    ],
    tags: ["ККТ"],
  },
  {
    id: "2",
    title: "Приказ ФНС России № ЕД-7-20/336@",
    link: "https://www.nalog.gov.ru/",
    description: "О внесении изменений в реквизиты фискальных документов",
    paragraphs: [
      {
        id: "doc2-p1",
        number: "П. 5 приказа № ЕД-7-20/336@",
        text: "Внести изменения в приложение № 2 к приказу ФНС России от 14.09.2020 № ЕД-7-20/662@ в части добавления обязательного реквизита тег 1125.",
        link: "https://www.nalog.gov.ru/",
      },
    ],
    tags: ["ФНС", "Реквизиты"],
  },
];

const QAContent = () => {
  const [openDocs, setOpenDocs] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleDoc = (id: string) => {
    setOpenDocs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-0 text-sm leading-relaxed text-foreground">
      {/* Вопрос */}
      <section className="border-b border-border bg-card p-4">
        <h3 className="font-bold text-sm text-foreground mb-2">Вопрос:</h3>
        <p className="text-muted-foreground text-xs">
          Какие основания/индивидуальным предпринимателям обязаны указывать тег 1125 "Признаки расчета в "Интернет"* в кассовом чеке?
        </p>
      </section>

      {/* Ответ */}
      <section className="border-b border-border bg-card p-4">
        <h3 className="font-bold text-sm text-foreground mb-2">Ответ:</h3>
        <div className="text-muted-foreground text-xs">
          <p className="mb-2">
            Согласно приказу ФНС России от 26.03.2025 № ЕД-7-20/336@, тег 1125 "Признаки расчета в "Интернет" является обязательным реквизитом для следующих случаев:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>При осуществлении расчетов в безналичном порядке через Интернет</li>
            <li>При использовании автоматических устройств для расчетов</li>
            <li>При дистанционной торговле маркированными товарами</li>
          </ul>
        </div>
      </section>

      {/* Связанные документы */}
      <section className="bg-card p-4">
        <h3 className="font-bold text-sm text-foreground mb-2">Связанные документы:</h3>
        <div className="space-y-2">
          {relatedDocuments.map((doc) => (
            <Collapsible
              key={doc.id}
              open={openDocs.includes(doc.id)}
              onOpenChange={() => toggleDoc(doc.id)}
            >
              <div className="border border-border rounded-md overflow-hidden bg-background">
                <CollapsibleTrigger asChild>
                  <button className="w-full text-left p-2.5 hover:bg-muted/50 transition-colors flex items-start gap-2">
                    {openDocs.includes(doc.id) ? (
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <a
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-medium text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        {doc.title}
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {doc.paragraphs.length} пунктов
                      </p>
                      {doc.tags && doc.tags.length > 0 && (
                        <div className="flex gap-1 mt-1.5 flex-wrap">
                          {doc.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 bg-muted text-muted-foreground"
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
                    {doc.paragraphs.map((paragraph) => (
                      <ParagraphItem
                        key={paragraph.id}
                        paragraph={paragraph}
                        copiedId={copiedId}
                        onCopy={copyToClipboard}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </section>
    </div>
  );
};

interface ParagraphItemProps {
  paragraph: {
    id: string;
    number: string;
    text: string;
    link: string;
  };
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

const ParagraphItem = ({ paragraph, copiedId, onCopy }: ParagraphItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border-b border-border last:border-b-0">
        <CollapsibleTrigger asChild>
          <button className="w-full text-left px-3 py-2 hover:bg-muted/30 transition-colors flex items-center gap-2">
            {isOpen ? (
              <ChevronDown className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            ) : (
              <ChevronRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            )}
            <a
              href={paragraph.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
            >
              {paragraph.number}
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-3 pb-2">
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

export default QAContent;