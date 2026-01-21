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

3. Применяется ли тег 1236 только к маркированным товарам или его использование распространяется на все товары/услуги, отпущенные безналичным способом?`);

  const [essenceText, setEssenceText] = useState(
    "об обязательности применения новых реквизитов кассового чека (теги 1125 и 1230) для онлайн-платежей и безналичных расчетов."
  );

  return (
    <div className="flex flex-col h-full">
      {/* Текст обращения */}
      <SectionBlock title="Текст обращения" maxHeight="max-h-36">
        {isEditing ? (
          <textarea
            value={appealText}
            onChange={(e) => setAppealText(e.target.value)}
            className="w-full min-h-[100px] p-3 text-sm text-muted-foreground bg-background border border-input rounded resize-none focus:outline-none focus:ring-1 focus:ring-ring leading-relaxed"
          />
        ) : (
          <div className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
            {appealText}
          </div>
        )}
      </SectionBlock>

      {/* Суть обращения */}
      <SectionBlock title="Суть обращения" maxHeight="max-h-16">
        {isEditing ? (
          <textarea
            value={essenceText}
            onChange={(e) => setEssenceText(e.target.value)}
            className="w-full min-h-[40px] p-3 text-sm text-muted-foreground bg-background border border-input rounded resize-none focus:outline-none focus:ring-1 focus:ring-ring leading-relaxed"
          />
        ) : (
          <div className="text-muted-foreground text-sm leading-relaxed">
            {essenceText}
          </div>
        )}
      </SectionBlock>

      {/* Ответ */}
      <SectionBlock title="Ответ" maxHeight="max-h-[320px]" className="flex-1">
        <AnswerSection />
      </SectionBlock>
    </div>
  );
};

export default DocumentContent;
