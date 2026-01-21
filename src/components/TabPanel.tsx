import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, MessageSquare } from "lucide-react";

interface TabPanelProps {
  npaContent: React.ReactNode;
  qaContent: React.ReactNode;
}

const TabPanel = ({ npaContent, qaContent }: TabPanelProps) => {
  return (
    <Tabs defaultValue="npa" className="h-full flex flex-col">
      <div className="border-b border-border bg-muted/30 px-2 py-1.5">
        <TabsList className="grid w-full grid-cols-2 bg-muted h-8">
          <TabsTrigger 
            value="npa" 
            className="gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <FileText className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Используемые НПА</span>
            <span className="sm:hidden">НПА</span>
          </TabsTrigger>
          <TabsTrigger 
            value="qa"
            className="gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Вопрос/ответ из БД</span>
            <span className="sm:hidden">Q/A БД</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="npa" className="flex-1 m-0 overflow-hidden">
        {npaContent}
      </TabsContent>
      
      <TabsContent value="qa" className="flex-1 m-0 overflow-hidden">
        {qaContent}
      </TabsContent>
    </Tabs>
  );
};

export default TabPanel;
