const QAContent = () => {
  return (
    <div className="space-y-0 text-sm leading-relaxed text-foreground">
      {/* Вопрос */}
      <section className="section-block">
        <h3 className="section-title">Вопрос:</h3>
        <p className="text-muted-foreground">
          Какие основания/индивидуальным предпринимателям обязаны указывать тег 1125 "Признаки расчета в "Интернет"* в кассовом чеке?
        </p>
      </section>

      {/* Ответ */}
      <section className="section-block">
        <h3 className="section-title">Ответ:</h3>
        <div className="text-muted-foreground">
          <p className="mb-3">
            Согласно приказу ФНС России от 26.03.2025 № ЕД-7-20/336@, тег 1125 "Признаки расчета в "Интернет" является обязательным реквизитом для следующих случаев:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>При осуществлении расчетов в безналичном порядке через Интернет</li>
            <li>При использовании автоматических устройств для расчетов</li>
            <li>При дистанционной торговле маркированными товарами</li>
          </ul>
        </div>
      </section>

      {/* Связанные документы */}
      <section className="section-block">
        <h3 className="section-title">Связанные документы:</h3>
        <div className="space-y-2">
          <div className="p-3 border border-border rounded hover:bg-muted/50 cursor-pointer transition-colors">
            <p className="font-medium text-sm">Федеральный закон № 54-ФЗ</p>
            <p className="text-xs text-muted-foreground mt-1">
              О применении контрольно-кассовой техники при осуществлении расчетов
            </p>
          </div>
          <div className="p-3 border border-border rounded hover:bg-muted/50 cursor-pointer transition-colors">
            <p className="font-medium text-sm">Приказ ФНС России № ЕД-7-20/336@</p>
            <p className="text-xs text-muted-foreground mt-1">
              О внесении изменений в реквизиты фискальных документов
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QAContent;