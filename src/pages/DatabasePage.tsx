import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Appeal {
  id: string;
  summary: string;
  documentsLink: string;
  answerId: string;
  comments: string;
  status: "В работе" | "На рассмотрении" | "Утвержден";
  officialLetterLink: string;
}

const getStatusVariant = (status: Appeal["status"]) => {
  switch (status) {
    case "В работе":
      return "secondary";
    case "На рассмотрении":
      return "outline";
    case "Утвержден":
      return "default";
    default:
      return "secondary";
  }
};

const syntheticData: Appeal[] = [
  {
    id: "ОБР-2025-001847",
    summary: "Разъяснение о применении новых реквизитов кассового чека (теги 1125, 1230, 1234, 1236)",
    documentsLink: "https://www.consultant.ru/document/cons_doc_LAW_42359/",
    answerId: "ОТВ-2025-003921",
    comments: "Требуется уточнение по тегу 1125",
    status: "В работе",
    officialLetterLink: "https://www.nalog.gov.ru/rn77/taxation/reference_work/",
  },
  {
    id: "ОБР-2025-001832",
    summary: "Вопрос о порядке применения ККТ при расчетах в сети Интернет",
    documentsLink: "https://www.nalog.gov.ru/rn77/taxation/kkt/",
    answerId: "ОТВ-2025-003905",
    comments: "Ожидает согласования с юр. отделом",
    status: "На рассмотрении",
    officialLetterLink: "https://www.nalog.gov.ru/rn77/service/kb/",
  },
  {
    id: "ОБР-2025-001815",
    summary: "Запрос о маркировке товаров легкой промышленности",
    documentsLink: "https://честныйзнак.рф/",
    answerId: "ОТВ-2025-003887",
    comments: "—",
    status: "Утвержден",
    officialLetterLink: "https://www.consultant.ru/document/cons_doc_LAW_339072/",
  },
  {
    id: "ОБР-2025-001798",
    summary: "Порядок формирования чека коррекции при выявлении ошибок",
    documentsLink: "https://www.nalog.gov.ru/rn77/taxation/kkt/",
    answerId: "ОТВ-2025-003864",
    comments: "Направлено на доработку",
    status: "В работе",
    officialLetterLink: "https://normativ.kontur.ru/",
  },
  {
    id: "ОБР-2025-001776",
    summary: "Особенности применения ККТ при продаже алкогольной продукции",
    documentsLink: "https://egais.center-inform.ru/",
    answerId: "ОТВ-2025-003842",
    comments: "Согласовано с Росалкогольрегулированием",
    status: "Утвержден",
    officialLetterLink: "https://fsrar.gov.ru/",
  },
  {
    id: "ОБР-2025-001754",
    summary: "Вопрос о применении ставки НДС 0% при экспорте",
    documentsLink: "https://www.nalog.gov.ru/rn77/taxation/taxes/nds/",
    answerId: "ОТВ-2025-003819",
    comments: "Требуется подтверждение документов",
    status: "На рассмотрении",
    officialLetterLink: "https://www.consultant.ru/document/cons_doc_LAW_28165/",
  },
  {
    id: "ОБР-2025-001739",
    summary: "Разъяснение по порядку регистрации ККТ в личном кабинете налогоплательщика",
    documentsLink: "https://lkfl2.nalog.ru/",
    answerId: "ОТВ-2025-003801",
    comments: "—",
    status: "Утвержден",
    officialLetterLink: "https://www.nalog.gov.ru/rn77/service/",
  },
  {
    id: "ОБР-2025-001721",
    summary: "Запрос о применении онлайн-касс при оказании услуг ЖКХ",
    documentsLink: "https://www.consultant.ru/document/cons_doc_LAW_353587/",
    answerId: "ОТВ-2025-003785",
    comments: "На проверке у специалиста",
    status: "В работе",
    officialLetterLink: "https://www.minstroyrf.gov.ru/",
  },
  {
    id: "ОБР-2025-001708",
    summary: "Особенности формирования фискальных документов для самозанятых",
    documentsLink: "https://npd.nalog.ru/",
    answerId: "ОТВ-2025-003768",
    comments: "Завершено",
    status: "Утвержден",
    officialLetterLink: "https://www.nalog.gov.ru/rn77/taxation/taxes/samozanjatye/",
  },
  {
    id: "ОБР-2025-001694",
    summary: "Вопрос о переходе на ФФД 1.2 и новые требования к реквизитам",
    documentsLink: "https://www.nalog.gov.ru/rn77/taxation/kkt/t_ffd/",
    answerId: "ОТВ-2025-003751",
    comments: "Ожидает дополнительных материалов",
    status: "На рассмотрении",
    officialLetterLink: "https://www.consultant.ru/document/cons_doc_LAW_359086/",
  },
];

const DatabasePage = () => {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-11 border-b border-border bg-card px-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-sm font-semibold text-foreground tracking-tight">
            База данных обращений
          </h1>
        </div>
      </header>

      {/* Table Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">ID Обращения</TableHead>
                <TableHead className="min-w-[300px]">Суть обращения</TableHead>
                <TableHead className="w-[100px]">Документы</TableHead>
                <TableHead className="w-[140px]">ID Ответа</TableHead>
                <TableHead className="min-w-[200px]">Комментарии</TableHead>
                <TableHead className="w-[130px]">Статус</TableHead>
                <TableHead className="w-[100px]">Письмо</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {syntheticData.map((appeal) => (
                <TableRow key={appeal.id}>
                  <TableCell className="font-mono text-xs">{appeal.id}</TableCell>
                  <TableCell className="text-sm">{appeal.summary}</TableCell>
                  <TableCell>
                    <a
                      href={appeal.documentsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline text-xs"
                    >
                      Открыть <ExternalLink className="h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{appeal.answerId}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{appeal.comments}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(appeal.status)} className="text-xs">
                      {appeal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <a
                      href={appeal.officialLetterLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline text-xs"
                    >
                      Открыть <ExternalLink className="h-3 w-3" />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DatabasePage;
