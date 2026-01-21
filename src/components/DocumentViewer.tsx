import { ScrollArea } from "@/components/ui/scroll-area";

interface DocumentViewerProps {
  content: React.ReactNode;
}

const DocumentViewer = ({ content }: DocumentViewerProps) => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="p-4 md:p-6 document-content">
        {content}
      </div>
    </ScrollArea>
  );
};

export default DocumentViewer;
