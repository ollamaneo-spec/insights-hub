import AnswerSection from "./AnswerSection";

const DocumentContent = () => {
  return (
    <div className="space-y-0 text-sm leading-relaxed text-foreground">
      {/* Текст обращения */}
      <section className="section-block">
        <h3 className="section-title">Текст обращения:</h3>
        <p className="text-muted-foreground mb-3">
          В связи с вступлением в силу новых обязательных и дополнительных реквизитов кассового чека, утвержденных приказом ФНС от 26.03.2025 №{" "}
          <span className="highlight-yellow px-1 rounded">ЕД-7-20/336@</span>{" "}
          и вступающих в силу в несколько этапов в зависимости от реализуемой продукции, просим предоставить разъяснения по следующим вопросам:
        </p>
        
        <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
          <li>
            Тег 1125 "признаки расчетов в "Интернет"*
            <p className="mt-2">
              Какие основания/индивидуальным предпринимателем обязан указывать тег 1125 "Признаки расчета в "Интернет"* в кассовом чеке? Обязательно ли указывать исключительно предпринимателю/ организации которые имеют Интернет, или только тем, кто продает товары, подходящие под маркировку?
            </p>
          </li>
          <li>
            Тег 1234 "Сведения об остатках по мету безналичных"*
            <p className="mt-2">
              Планируется ли в будущем сделать тег 1234 обязательным реквизитом кассового чека? Если да, то когда?
            </p>
          </li>
          <li>
            Применяется ли тег 1236 только к маркированным товарам или его использование распространяется на все товары/услуги, отпущенные безналичным способом?
          </li>
        </ol>
      </section>

      {/* Суть обращения */}
      <section className="section-block">
        <h3 className="section-title">Суть обращения:</h3>
        <div className="text-muted-foreground">
          <p>
            об обязательности применения новых реквизитов кассового чека (теги 1125 и 1230) для онлайн-платежей и безналичных расчетов.
          </p>
        </div>
      </section>

      {/* Ответ */}
      <section className="section-block">
        <h3 className="section-title">Ответ:</h3>
        <p className="text-xs text-muted-foreground mb-3 italic">
          Выделите текст для редактирования с помощью ИИ
        </p>
        <AnswerSection />
      </section>
    </div>
  );
};

export default DocumentContent;