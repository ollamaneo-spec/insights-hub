import { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink, Copy, Check, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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

  const questionContent = (
    <p className="text-foreground text-sm leading-relaxed">
      Какие основания/индивидуальным предпринимателям обязаны указывать тег 1125 "Признаки расчета в "Интернет"* в кассовом чеке? Обязательно ли указывать исключительно предпринимателю/ организации которые имеют Интернет, или только тем, кто продает товары, подходящие под маркировку?
    </p>
  );

  const answerContent = (
    <div className="text-foreground text-sm">
      <p className="mb-3 leading-relaxed">
        Согласно приказу ФНС России от 26.03.2025 № ЕД-7-20/336@, тег 1125 "Признаки расчета в "Интернет" является обязательным реквизитом для следующих случаев:
      </p>
      <ul className="list-disc pl-5 space-y-2 leading-relaxed">
        <li>При осуществлении расчетов в безналичном порядке через Интернет</li>
        <li>При использовании автоматических устройств для расчетов</li>
        <li>При дистанционной торговле маркированными товарами</li>
        <li>При расчетах через торговые маркетплейсы и агрегаторы</li>
      </ul>
      <p className="mt-3 leading-relaxed">
        При использовании онлайн-платежей в реквизит "место расчетов" (тег 1187) должен содержать адрес сайта в сети Интернет.
      </p>
    </div>
  );

  const documentsContent = (
    <div className="space-y-2">
      {relatedDocuments.map((doc) => (
        <Collapsible
          key={doc.id}
          open={openDocs.includes(doc.id)}
          onOpenChange={() => toggleDoc(doc.id)}
        >
          <div className="border border-border rounded overflow-hidden bg-background">
            <CollapsibleTrigger asChild>
              <button className="w-full text-left p-3 hover:bg-muted/50 transition-colors flex items-start gap-2">
                {openDocs.includes(doc.id) ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <a
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-medium text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    {doc.title}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">
                    {doc.paragraphs.length} пунктов
                  </p>
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
  );

  return (
    <div className="h-full flex flex-col pt-2">
      <ScrollArea className="flex-1">
        {/* Вопрос из БД */}
        <Section 
          title="Вопрос из БД" 
          onExpand={() => setExpandedSection("question")}
        >
          {questionContent}
        </Section>

        {/* Ответ из БД */}
        <Section 
          title="Ответ из БД" 
          onExpand={() => setExpandedSection("answer")}
        >
          {answerContent}
        </Section>

        {/* Связанные документы */}
        <Section 
          title="Связанные документы" 
          onExpand={() => setExpandedSection("documents")}
        >
          {documentsContent}
        </Section>
      </ScrollArea>

      {/* Expand Dialogs - 80% of screen with larger text */}
      <Dialog open={expandedSection === "question"} onOpenChange={() => setExpandedSection(null)}>
        <DialogContent className="w-[85vw] max-w-[85vw] h-[80vh] max-h-[80vh] flex flex-col">
          <DialogHeader className="pb-4 border-b border-border">
            <DialogTitle className="text-2xl font-bold">Вопрос из БД</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4">
            <div className="py-6 text-lg leading-relaxed">{questionContent}</div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={expandedSection === "answer"} onOpenChange={() => setExpandedSection(null)}>
        <DialogContent className="w-[85vw] max-w-[85vw] h-[80vh] max-h-[80vh] flex flex-col">
          <DialogHeader className="pb-4 border-b border-border">
            <DialogTitle className="text-2xl font-bold">Ответ из БД</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4">
            <div className="py-6 text-lg leading-relaxed">{answerContent}</div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={expandedSection === "documents"} onOpenChange={() => setExpandedSection(null)}>
        <DialogContent className="w-[85vw] max-w-[85vw] h-[80vh] max-h-[80vh] flex flex-col">
          <DialogHeader className="pb-4 border-b border-border">
            <DialogTitle className="text-2xl font-bold">Связанные документы</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4">
            <div className="py-6 text-base">{documentsContent}</div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Section component for consistent styling
interface SectionProps {
  title: string;
  children: React.ReactNode;
  onExpand?: () => void;
}

const Section = ({ title, children, onExpand }: SectionProps) => (
  <section className="border border-border rounded-md bg-card mb-2 mx-2 overflow-hidden">
    <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/40">
      <h3 className="font-bold text-sm text-foreground">{title}</h3>
      {onExpand && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={onExpand}
          title="Открыть на всю страницу"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
    <ScrollArea className="max-h-32">
      <div className="p-3">{children}</div>
    </ScrollArea>
  </section>
);

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
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              {paragraph.number}
              <ExternalLink className="h-3 w-3" />
            </a>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-3 pb-3">
            <div className="bg-muted/30 p-3 rounded border border-border relative group">
              <p className="text-sm text-foreground leading-relaxed pr-8 select-text">
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
