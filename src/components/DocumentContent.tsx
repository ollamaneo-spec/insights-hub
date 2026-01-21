import { useState } from "react";
import AnswerSection from "./AnswerSection";

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
    <div className="space-y-0 text-sm leading-relaxed text-foreground">
      {/* Текст обращения */}
      <section className="border-b border-border bg-card p-5">
        <h3 className="font-bold text-sm text-foreground mb-3">Текст обращения:</h3>
        {isEditing ? (
          <textarea
            value={appealText}
            onChange={(e) => setAppealText(e.target.value)}
            className="w-full min-h-[200px] p-3 text-sm text-muted-foreground bg-background border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        ) : (
          <div className="text-muted-foreground whitespace-pre-line">
            {appealText}
          </div>
        )}
      </section>

      {/* Суть обращения */}
      <section className="border-b border-border bg-card p-5">
        <h3 className="font-bold text-sm text-foreground mb-3">Суть обращения:</h3>
        {isEditing ? (
          <textarea
            value={essenceText}
            onChange={(e) => setEssenceText(e.target.value)}
            className="w-full min-h-[60px] p-3 text-sm text-muted-foreground bg-background border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        ) : (
          <div className="text-muted-foreground">
            {essenceText}
          </div>
        )}
      </section>

      {/* Ответ */}
      <section className="border-b border-border bg-card p-5">
        <h3 className="font-bold text-sm text-foreground mb-3">Ответ:</h3>
        <p className="text-xs text-muted-foreground mb-3 italic">
          Выделите текст для редактирования с помощью ИИ
        </p>
        <AnswerSection />
      </section>
    </div>
  );
};

export default DocumentContent;
