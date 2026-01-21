import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Save, Pencil } from "lucide-react";
import RichTextEditor from "./RichTextEditor";

// Text segment types for color coding
type SegmentType = "npa" | "ai" | "user";

interface TextSegment {
  id: string;
  type: SegmentType;
  text: string;
}

// Color constants for segment types (HSL from design tokens)
const SEGMENT_COLORS = {
  npa: "hsl(210, 80%, 45%)", // Blue - NPA norms
  ai: "hsl(0, 75%, 50%)",    // Red - AI generated
  user: "hsl(0, 0%, 15%)",   // Black - User modified
};

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
    text: "- реквизит «телефон или электронный адрес покупателя» (тег 1008) должен содержать абонентский номер или адрес электронной почты, предоставленный покупателем (клиентом) пользователю для получения кассового чека (БСО) в электронной форме.",
  },
  {
    id: "7",
    type: "ai",
    text: "Таким образом при осуществлении расчетов в безналичном порядке, исключающих возможность непосредственного взаимодействия покупателя (клиента) с пользователем или уполномоченным им лицом либо автоматическим устройством для расчетов, с применением устройств, подключенных к сети «Интернет» и обеспечивающих возможность дистанционного взаимодействия покупателя (клиента) с пользователем или уполномоченным им лицом либо автоматическим устройством для расчетов, реквизит «признак расчета в «Интернет» (тег 1125) должен принимать значение «1».",
  },
  {
    id: "8",
    type: "npa",
    text: "В соответствии с таблицей 3 Приказа атрибут «Обязательность» устанавливает обязательность наличия реквизитов в составе фискальных документов (далее – ФД) и может принимать значения от 1 до 3, которые устанавливают следующие условия использования реквизита в ФД соответственно:",
  },
  {
    id: "9",
    type: "npa",
    text: "1. реквизит должен быть в составе ФД;\n2. реквизит должен быть в составе ФД в случаях, указанных в примечании к указанному реквизиту, и может не включаться в состав ФД в иных случаях;\n3. реквизит может не включаться в состав ФД.",
  },
  {
    id: "10",
    type: "npa",
    text: "Внутри реквизита «сведения обо всех оплатах по чеку безналичными» (тег 1234) размещается структурный реквизит «сведения об оплате безналичными» (тег 1235), который, в свою очередь, содержит теги «сумма оплаты безналичными» (тег 1082), «признак способа оплаты безналичными» (тег 1236), «идентификаторы безналичной оплаты» (тег 1237) и «дополнительные сведения о безналичной оплате» (тег 1238).",
  },
  {
    id: "11",
    type: "npa",
    text: "Согласно таблице 20 для ФФД версии 1.05, таблице 58 для ФФД версии 1.1 и таблице 96 для ФФД версии 1.2 если значение реквизита «сумма по чеку (БСО) безналичными» (тег 1081) отлично от нуля, в кассовый чек (БСО) может включаться реквизит «сведения обо всех оплатах по чеку безналичными» (тег 1234) в порядке, установленном ФНС России в соответствии с абзацем четвертым пункта 5 статьи 4.1 Федерального закона № 54-ФЗ.",
  },
  {
    id: "12",
    type: "ai",
    text: "Относительно тега 1236 «признак способа оплаты безналичными» необходимо отметить, что данный реквизит применяется ко всем видам безналичных расчетов вне зависимости от категории товара. Маркировка товара не влияет на обязательность использования данного тега.",
  },
  {
    id: "13",
    type: "npa",
    text: "Согласно пункту 3 статьи 4.7 Федерального закона № 54-ФЗ кассовый чек и бланк строгой отчетности должны содержать реквизиты, указанные в пунктах 1 и 2 данной статьи, с учетом особенностей, установленных для отдельных случаев применения контрольно-кассовой техники.",
  },
  {
    id: "14",
    type: "ai",
    text: "В заключение следует отметить, что обязанность применения тегов 1125, 1234, 1236 и связанных с ними реквизитов возникает у всех организаций и индивидуальных предпринимателей, осуществляющих расчеты через сеть Интернет, независимо от вида реализуемой продукции или оказываемых услуг.",
  },
];

// Parse HTML content back to segments
const parseHtmlToSegments = (html: string): TextSegment[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const body = doc.body;
  
  const segments: TextSegment[] = [];
  let segmentIndex = 0;
  
  // Process all paragraph elements
  const paragraphs = body.querySelectorAll("p");
  
  paragraphs.forEach((p) => {
    // Get inner HTML to preserve <br> tags and convert them to \n
    let text = "";
    p.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent || "";
      } else if (node.nodeName === "BR") {
        text += "\n";
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        text += (node as HTMLElement).textContent || "";
      }
    });
    
    if (!text.trim()) return;
    
    // Get color from style attribute
    const style = p.getAttribute("style") || "";
    let type: SegmentType = "user"; // Default to user (black)
    
    // Check for blue (NPA)
    if (style.includes("210, 80%") || style.includes("hsl(210")) {
      type = "npa";
    }
    // Check for red (AI)
    else if (style.includes("0, 75%") || style.includes("hsl(0,") || style.includes("hsl(0 ")) {
      type = "ai";
    }
    
    segments.push({
      id: `seg-${segmentIndex++}`,
      type,
      text,
    });
  });
  
  return segments;
};

interface AnswerSectionProps {
  isEditing?: boolean;
  onEditingChange?: (isEditing: boolean) => void;
}

const AnswerSection = ({ isEditing = false, onEditingChange }: AnswerSectionProps) => {
  const [segments, setSegments] = useState<TextSegment[]>(initialSegments);
  const [selectedText, setSelectedText] = useState("");
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [instruction, setInstruction] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [aiEditedText, setAiEditedText] = useState(false); // Track if AI edited
  const prevIsEditingRef = useRef(isEditing);

  // Convert segments to HTML for editor with proper colors
  const segmentsToHtml = useMemo(() => {
    return segments
      .map((seg) => {
        const color = SEGMENT_COLORS[seg.type];
        // Preserve line breaks as <br> tags
        const textWithBreaks = seg.text.replace(/\n/g, "<br>");
        return `<p style="color: ${color};">${textWithBreaks}</p>`;
      })
      .join("");
  }, [segments]);

  // Initialize editor content when entering edit mode
  useEffect(() => {
    if (isEditing && !prevIsEditingRef.current) {
      // Entering edit mode - set initial content
      setEditorContent(segmentsToHtml);
    }
    
    if (!isEditing && prevIsEditingRef.current && editorContent) {
      // Exiting edit mode - save changes back to segments
      const newSegments = parseHtmlToSegments(editorContent);
      if (newSegments.length > 0) {
        setSegments(newSegments);
      }
    }
    
    prevIsEditingRef.current = isEditing;
  }, [isEditing, segmentsToHtml, editorContent]);

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
    if (isEditing) return; // Disable selection in edit mode

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
  }, [isEditing]);

  const handleAIEdit = async () => {
    setIsProcessing(true);
    // Simulate AI processing - this will be connected to API later
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mark as AI edited - text will be colored red when saved
    setAiEditedText(true);
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
            // Mark as AI-modified (red) if AI edited, otherwise user-modified (black)
            type: aiEditedText ? "ai" as SegmentType : "user" as SegmentType,
          };
        }
        return seg;
      })
    );

    setIsDialogOpen(false);
    setSelectedText("");
    setSelectedSegmentId(null);
    setEditedText("");
    setAiEditedText(false);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedText("");
    setSelectedSegmentId(null);
    setEditedText("");
    setInstruction("");
    setAiEditedText(false);
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  // Show rich text editor in edit mode
  if (isEditing) {
    return (
      <RichTextEditor
        content={segmentsToHtml}
        onChange={handleEditorChange}
      />
    );
  }

  return (
    <>
      <div
        className="space-y-4 cursor-text select-text"
        onMouseUp={handleTextSelection}
      >
        {segments.map((segment) => (
          <p
            key={segment.id}
            data-segment-id={segment.id}
            className={`${getSegmentClassName(segment.type)} text-base leading-relaxed whitespace-pre-line`}
          >
            {segment.text}
          </p>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleClose}>
        <DialogContent className="w-[80vw] max-w-[80vw] h-[80vh] max-h-[80vh] flex flex-col">
          <DialogHeader className="pb-4 border-b border-border flex-shrink-0">
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <Pencil className="h-5 w-5" />
              Изменить с помощью ИИ
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 flex flex-col gap-4 py-4 overflow-auto">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Выделенный текст:</p>
              <div className="p-3 bg-muted text-sm border border-border max-h-[150px] overflow-auto">
                {selectedText}
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Инструкция:</p>
              <Textarea
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                className="min-h-[80px]"
                placeholder="Введите промпт - инструкцию для ИИ"
              />
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              <p className="text-sm text-muted-foreground mb-2">Редактирование:</p>
              <Textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="flex-1 min-h-[150px]"
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
