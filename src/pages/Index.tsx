import { useState } from "react";
import Header from "@/components/Header";
import TabPanel from "@/components/TabPanel";
import DocumentViewer from "@/components/DocumentViewer";
import DocumentContent from "@/components/DocumentContent";
import QAContent from "@/components/QAContent";
import SidePanel from "@/components/SidePanel";
import CommentPanel from "@/components/CommentPanel";
import ActionButtons from "@/components/ActionButtons";
import { Button } from "@/components/ui/button";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

const sampleDocuments = [
  {
    id: "1",
    title: "Федеральный закон № 54-ФЗ",
    excerpt: "О применении контрольно-кассовой техники при осуществлении расчетов в Российской Федерации",
    tags: ["ККТ", "Расчеты"],
  },
  {
    id: "2",
    title: "Приказ ФНС России № ЕД-7-20/336@",
    excerpt: "О внесении изменений в реквизиты фискальных документов и форматов",
    tags: ["ФНС", "Реквизиты"],
  },
  {
    id: "3",
    title: "Приказ ФНС России № ЕД-7-20/662@",
    excerpt: "Об утверждении дополнительных реквизитов фискальных документов",
    tags: ["Фискальные документы"],
  },
  {
    id: "4",
    title: "Постановление Правительства РФ № 174",
    excerpt: "Об установлении требований к применению ККТ в отдельных сферах деятельности",
    tags: ["ККТ", "Требования"],
  },
];

const Index = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Main Document Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex overflow-hidden">
            {/* Left: Document Content */}
            <div className="flex-1 flex flex-col min-w-0 border-r border-border">
              <DocumentViewer content={<DocumentContent />} />
              <ActionButtons />
            </div>
            
            {/* Right: Tab Panel (НПА / Q&A) */}
            <div 
              className={`
                ${isSidePanelOpen ? 'w-full md:w-[420px]' : 'w-0'} 
                flex-shrink-0 transition-all duration-300 overflow-hidden
                ${isSidePanelOpen ? 'border-r border-border' : ''}
                fixed md:relative inset-y-0 right-0 z-20 bg-card md:bg-transparent
                ${isSidePanelOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
              `}
            >
              <div className="h-full flex flex-col w-full md:w-[420px]">
                <div className="flex-1 overflow-hidden">
                  <TabPanel
                    npaContent={<SidePanel items={sampleDocuments} />}
                    qaContent={<DocumentViewer content={<QAContent />} />}
                  />
                </div>
                <CommentPanel />
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Button for Side Panel */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
          className="fixed bottom-4 right-4 z-30 md:hidden h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
        >
          {isSidePanelOpen ? (
            <PanelRightClose className="h-5 w-5" />
          ) : (
            <PanelRightOpen className="h-5 w-5" />
          )}
        </Button>
      </div>

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
