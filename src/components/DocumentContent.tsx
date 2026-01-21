import { useState } from "react";
import AnswerSection from "./AnswerSection";
import SectionBlock from "./SectionBlock";

interface DocumentContentProps {
  isEditing?: boolean;
}

const DocumentContent = ({ isEditing = false }: DocumentContentProps) => {
  const [appealText, setAppealText] = useState(`В связи с вступлением в силу новых обязательных и дополнительных реквизитов кассового чека, утвержденных приказом ФНС от 26.03.2025 № ЕД-7-20/336@ и вступающих в силу в несколько этапов в зависимости от реализуемой продукции, просим предоставить разъяснения по следующим вопросам:

1. Тег 1125 "признаки расчетов в "Интернет"*
Какие основания/индивидуальным предпринимателем обязан указывать тег 1125 "Признаки расчета в "Интернет"* в кассовом чеке? Обязательно ли указывать исключительно предпринимателю/ организации которые имеют Интернет, или только тем, кто продает товары, подходящие под маркировку?

2. Тег 1234 "Сведения об остатках по мету безналичных"*
Планируется ли в будущем сделать тег 1234 обязательным реквизитом кассового чека? Если да, то когда?

3. Применяется ли тег 1236 только к маркированным товарам или его использование распространяется на все товары/услуги, отпущенные безналичным способом?

4. Каким образом следует заполнять поле "место расчетов" (тег 1187) при осуществлении расчетов через интернет-магазин?`);

  const [essenceText, setEssenceText] = useState(
    "Разъяснение об обязательности применения новых реквизитов кассового чека (теги 1125, 1230, 1234, 1236) для онлайн-платежей и безналичных расчетов согласно приказу ФНС от 26.03.2025 № ЕД-7-20/336@."
  );

  return (
    <div className="flex flex-col h-full p-4 gap-3">
      {/* Текст обращения - с ID обращения и изменяемой высотой */}
      <SectionBlock 
        title="Текст обращения" 
        maxHeight="max-h-36" 
        stickyLabel="ID обращения: ОБР-2025-001847"
        resizable
        defaultHeight={160}
      >
        <div className="text-foreground whitespace-pre-line text-base leading-relaxed">
          {isEditing ? (
            <textarea
              value={appealText}
              onChange={(e) => setAppealText(e.target.value)}
              className="w-full min-h-[120px] p-3 text-base text-foreground bg-background border border-input rounded resize-none focus:outline-none focus:ring-1 focus:ring-ring leading-relaxed"
            />
          ) : (
            appealText
          )}
        </div>
      </SectionBlock>

      {/* Суть обращения */}
      <SectionBlock title="Суть обращения" maxHeight="max-h-24">
        <div className="text-foreground text-base leading-relaxed">
          {isEditing ? (
            <textarea
              value={essenceText}
              onChange={(e) => setEssenceText(e.target.value)}
              className="w-full min-h-[50px] p-3 text-base text-foreground bg-background border border-input rounded resize-none focus:outline-none focus:ring-1 focus:ring-ring leading-relaxed"
            />
          ) : (
            essenceText
          )}
        </div>
      </SectionBlock>

      {/* Ответ - заполняет оставшееся пространство */}
      <SectionBlock title="Ответ" maxHeight="max-h-none" className="flex-1 min-h-0">
        <AnswerSection />
      </SectionBlock>
    </div>
  );
};

export default DocumentContent;
