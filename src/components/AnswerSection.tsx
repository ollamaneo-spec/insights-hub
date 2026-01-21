import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Save, Pencil } from "lucide-react";

// Text segment types for color coding
type SegmentType = "npa" | "ai" | "user";

interface TextSegment {
  id: string;
  type: SegmentType;
  text: string;
}

const initialSegments: TextSegment[] = [
  {
    id: "1",
    type: "npa",
    text: "В соответствии с пунктом 5 статьи 1.2 Федеральный закон от 22.05.2003 № 54-ФЗ «О применении контрольно-кассовой техники при осуществлении расчетов в Российской Федерации» (далее – Федеральный закон № 54-ФЗ) пользователи при осуществлении расчетов в безналичном порядке, исключающих возможность непосредственного взаимодействия покупателя (клиента) с пользователем или уполномоченным им лицом либо автоматическим устройством для расчетов, с применением устройств, подключенных к сети «Интернет» и обеспечивающих возможность дистанционного взаимодействия покупателя (клиента) с пользователем или уполномоченным им лицом либо автоматическим устройством для расчетов (далее – расчеты в безналичном порядке в сети «Интернет»), обязаны обеспечить передачу покупателю (клиенту) кассового чека или бланка строгой отчетности в электронной форме на абонентский номер либо адрес электронной почты, указанные покупателем (клиентом).",
  },
  {
    id: "2",
    type: "ai",
    text: "Приказом ФНС России от 26.03.2025 № ЕД-7-20/236@ «О внесении изменений в приказ Федеральной налоговой службы от 14.09.2020 № ЕД 7 20/662@» были внесены изменения в приказ ФНС России от 14.09.2020 № ЕД-7-20/662@ «Об утверждении дополнительных реквизитов фискальных документов и форматов фискальных документов, обязательных к использованию» (далее – Приказ о ФФД), которые вступили в силу с 01.09.2025.",
  },
  {
    id: "3",
    type: "npa",
    text: "В частности, в форматы фискальных документов (далее – ФФД) добавлен новый реквизит «признак расчета в «Интернет» (тег 1125). В соответствии с примечанием 19 таблицы 20 для ФФД версии 1.05, примечанием 23 таблицы 58 для ФФД версии 1.1 и примечанием 26 таблицы 96 для ФФД версии 1.2 приложения № 2 Приказа о ФФД в случае осуществления расчета в сети «Интернет»:",
  },
  {
    id: "4",
    type: "npa",
    text: "- в состав кассового чека (БСО) в электронной форме включаются реквизит «признак расчета в «Интернет» (тег 1125), имеющий значение, равное «1», а также реквизит «место расчетов» (тег 1187) и реквизит «телефон или электронный адрес покупателя» (тег 1008);",
  },
  {
    id: "5",
    type: "npa",
    text: "- реквизит «место расчетов» (тег 1187) должен содержать адрес сайта в сети «Интернет»;",
  },
  {
    id: "6",
    type: "npa",
    text: "- реквизит «телефон или электронный адрес покупателя» (тег 1008) должен содержать абонентский номер или адрес электронной почты, предоставленный покупателем м (клиентом) пользователю для получения кассового чека (БСО) в электронной форме.",
  },
  {
    id: "7",
    type: "ai",
    text: "Таким образом при осуществлении расчетов в безналичном порядке, исключающих возможность непосредственного взаимодействия покупателя (клиента) с пользователем или уполномоченным им лицом либо автоматическим устройством для расчетов, с применением устройств, подключенных к сети «Интернет» и обеспечивающих возможность дистанционного взаимодействия покупателя (клиента) с пользователем или уполномоченным им лицом либо автоматическим устройством для расчетов, реквизит «признак расчета в «Интернет» (тег 1125) должен принимать значение «1».",
  },
];

const AnswerSection = () => {
  const [segments, setSegments] = useState<TextSegment[]>(initialSegments);
  const [selectedText, setSelectedText] = useState("");
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const getSegmentClassName = (type: SegmentType): string => {
    switch (type) {
      case "npa":
        return "text-answer-npa"; // Blue - NPA norms
      case "ai":
        return "text-answer-ai"; // Red - AI generated
      case "user":
        return "text-answer-user"; // Black - User modified
      default:
        return "";
    }
  };

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const selectedStr = selection.toString().trim();
    if (selectedStr.length < 3) return;

    // Find which segment contains the selection
    const anchorNode = selection.anchorNode;
    if (!anchorNode) return;

    const segmentElement = (anchorNode.parentElement as HTMLElement)?.closest("[data-segment-id]");
    if (!segmentElement) return;

    const segmentId = segmentElement.getAttribute("data-segment-id");
    if (!segmentId) return;

    setSelectedText(selectedStr);
    setSelectedSegmentId(segmentId);
    setEditedText(selectedStr);
    setIsDialogOpen(true);
  }, []);

  const handleAIEdit = async () => {
    setIsProcessing(true);
    // Simulate AI processing - this will be connected to API later
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // For demo: just add a note that AI processed it
    setEditedText((prev) => `${prev} [отредактировано ИИ]`);
    setIsProcessing(false);
  };

  const handleSave = () => {
    if (!selectedSegmentId || !editedText) return;

    setSegments((prev) =>
      prev.map((seg) => {
        if (seg.id === selectedSegmentId) {
          // Replace the selected portion with edited text
          const newText = seg.text.replace(selectedText, editedText);
          return {
            ...seg,
            text: newText,
            type: "user" as SegmentType, // Mark as user-modified
          };
        }
        return seg;
      })
    );

    setIsDialogOpen(false);
    setSelectedText("");
    setSelectedSegmentId(null);
    setEditedText("");
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedText("");
    setSelectedSegmentId(null);
    setEditedText("");
  };

  return (
    <>
      <div
        className="text-muted-foreground space-y-3 cursor-text"
        onMouseUp={handleTextSelection}
      >
        {segments.map((segment) => (
          <p
            key={segment.id}
            data-segment-id={segment.id}
            className={getSegmentClassName(segment.type)}
          >
            {segment.text}
          </p>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              Изменить с помощью ИИ
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Выделенный текст:</p>
              <div className="p-3 bg-muted rounded text-sm border border-border">
                {selectedText}
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Редактирование:</p>
              <Textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="min-h-[120px]"
                placeholder="Отредактируйте текст..."
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={handleAIEdit}
                disabled={isProcessing}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {isProcessing ? "Обработка..." : "Редактировать с помощью ИИ"}
              </Button>
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AnswerSection;
