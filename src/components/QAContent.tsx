import { Badge } from "@/components/ui/badge";

const QAContent = () => {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-foreground">
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-primary text-primary-foreground">Вопрос</Badge>
        </div>
        <div className="bg-accent/50 p-4 rounded-lg">
          <p className="text-muted-foreground">
            Какие основания/индивидуальным предпринимателям обязаны указывать тег 1125 "Признаки расчета в "Интернет"* в кассовом чеке?
          </p>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="border-primary text-primary">Ответ</Badge>
        </div>
        <div className="bg-highlight-green/20 p-4 rounded-lg border-l-4 border-primary">
          <p className="text-muted-foreground mb-4">
            Согласно приказу ФНС России от 26.03.2025 № ЕД-7-20/336@, тег 1125 "Признаки расчета в "Интернет" является обязательным реквизитом для следующих случаев:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>При осуществлении расчетов в безналичном порядке через Интернет</li>
            <li>При использовании автоматических устройств для расчетов</li>
            <li>При дистанционной торговле маркированными товарами</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-3">Связанные документы:</h3>
        <div className="space-y-2">
          <div className="p-3 border border-border rounded-lg hover:bg-accent/30 cursor-pointer transition-colors">
            <p className="font-medium text-sm">Федеральный закон № 54-ФЗ</p>
            <p className="text-xs text-muted-foreground mt-1">
              О применении контрольно-кассовой техники при осуществлении расчетов
            </p>
          </div>
          <div className="p-3 border border-border rounded-lg hover:bg-accent/30 cursor-pointer transition-colors">
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
