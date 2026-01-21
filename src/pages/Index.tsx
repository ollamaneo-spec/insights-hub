import { useState } from "react";
import Header from "@/components/Header";
import FileUploadBar from "@/components/FileUploadBar";
import TabPanel from "@/components/TabPanel";
import DocumentContent from "@/components/DocumentContent";
import QAContent from "@/components/QAContent";
import NPAList from "@/components/NPAList";
import CommentPanel from "@/components/CommentPanel";
import ActionButtons from "@/components/ActionButtons";
import { Button } from "@/components/ui/button";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

const sampleNPAItems = [
  {
    id: "1",
    title: "Федеральный закон № 54-ФЗ",
    link: "https://www.consultant.ru/document/cons_doc_LAW_42359/",
    paragraphs: [
      {
        id: "1-1",
        number: "П. 1 ст. 1.2 ФЗ-54",
        text: "Контрольно-кассовая техника применяется на территории Российской Федерации в обязательном порядке всеми организациями и индивидуальными предпринимателями при осуществлении ими расчетов, за исключением случаев, установленных настоящим Федеральным законом.",
      },
      {
        id: "1-2",
        number: "П. 2 ст. 1.2 ФЗ-54",
        text: "При осуществлении расчета пользователь обязан выдать кассовый чек или бланк строгой отчетности на бумажном носителе и (или) в случае предоставления покупателем (клиентом) пользователю до момента расчета абонентского номера либо адреса электронной почты направить кассовый чек или бланк строгой отчетности в электронной форме.",
      },
    ],
    tags: ["ККТ", "Расчеты"],
  },
  {
    id: "2",
    title: "Приказ ФНС России № ЕД-7-20/336@",
    link: "https://www.nalog.gov.ru/",
    paragraphs: [
      {
        id: "2-1",
        number: "П. 5 приказа № ЕД-7-20/336@",
        text: "Внести изменения в приложение № 2 к приказу ФНС России от 14.09.2020 № ЕД-7-20/662@ в части добавления обязательного реквизита тег 1125 \"Признаки расчета в Интернет\".",
      },
    ],
    tags: ["ФНС", "Реквизиты"],
  },
  {
    id: "3",
    title: "Приказ ФНС России № ЕД-7-20/662@",
    link: "https://www.nalog.gov.ru/",
    paragraphs: [
      {
        id: "3-1",
        number: "П. 1 приказа № ЕД-7-20/662@",
        text: "Утвердить дополнительные реквизиты фискальных документов и форматы фискальных документов, обязательных к использованию.",
      },
      {
        id: "3-2",
        number: "П. 2 приказа № ЕД-7-20/662@",
        text: "Признать утратившим силу приказ ФНС России от 21.03.2017 № ММВ-7-20/229@.",
      },
    ],
    tags: ["Фискальные документы"],
  },
  {
    id: "4",
    title: "Постановление Правительства РФ № 174",
    link: "https://government.ru/",
    paragraphs: [
      {
        id: "4-1",
        number: "П. 1 Постановления № 174",
        text: "Установить требования к применению контрольно-кассовой техники в отдельных сферах деятельности, включая торговлю маркированными товарами.",
      },
    ],
    tags: ["ККТ", "Требования"],
  },
];

const Index = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleFilesSelected = (files: FileList) => {
    console.log("Файлы загружены:", Array.from(files).map(f => f.name));
  };

    return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />

      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left: Document Content - 70% */}
        <div className="flex flex-col min-w-0 w-[70%]">
          {/* Document Content - scrollable area */}
          <div className="flex-1 overflow-auto min-h-0">
            <DocumentContent isEditing={isEditing} />
          </div>
          
          {/* Action Buttons - fixed at bottom */}
          <ActionButtons 
            onEditMode={() => setIsEditing(!isEditing)} 
            isEditing={isEditing}
          />
          
          {/* Comments Section at bottom */}
          <CommentPanel />
        </div>

        {/* Right: Tab Panel (НПА / Q&A) - 30% */}
        <div
          className={`
            ${isSidePanelOpen ? "w-full md:w-[30%]" : "w-0"} 
            flex-shrink-0 transition-all duration-300 overflow-hidden border-l border-border
            fixed md:relative inset-y-0 right-0 z-20 bg-card md:bg-transparent
            ${isSidePanelOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
          `}
        >
          <div className="h-full flex flex-col w-full">
            {/* File Upload Bar - matching right panel width */}
            <FileUploadBar onFilesSelected={handleFilesSelected} />
            <div className="flex-1 overflow-hidden">
              <TabPanel
                npaContent={<NPAList items={sampleNPAItems} />}
                qaContent={<QAContent />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button for Side Panel (Mobile) */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
        className="fixed bottom-4 right-4 z-30 md:hidden h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
      >
        {isSidePanelOpen ? (
          <PanelRightClose className="h-4 w-4" />
        ) : (
          <PanelRightOpen className="h-4 w-4" />
        )}
      </Button>

      {/* Mobile overlay when panel is open */}
      {isSidePanelOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-10 md:hidden"
          onClick={() => setIsSidePanelOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
