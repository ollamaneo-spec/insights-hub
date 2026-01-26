import { useState, useMemo } from "react";
import { ArrowLeft, ExternalLink, FileText, Search, X, ArrowUpDown, ArrowUp, ArrowDown, RotateCcw, Download, FileSpreadsheet } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as XLSX from "xlsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Appeal {
  id: string;
  summary: string;
  documentsLink: string;
  answerId: string;
  comments: string;
  status: "В работе" | "На рассмотрении" | "Утвержден";
  officialLetterLink: string;
  hasWorkspaceLink?: boolean;
}

interface DocumentItem {
  name: string;
  link: string;
}

const getStatusStyle = (status: Appeal["status"]) => {
  switch (status) {
    case "В работе":
      return "bg-sky-500 text-white";
    case "На рассмотрении":
      return "bg-rose-800 text-white";
    case "Утвержден":
      return "bg-green-600 text-white";
    default:
      return "bg-muted text-foreground";
  }
};

const documentsList: DocumentItem[] = [
  { name: "Письмо", link: "https://www.consultant.ru/document/cons_doc_LAW_42359/" },
  { name: "Приложение №1", link: "https://www.consultant.ru/document/cons_doc_LAW_42359/" },
  { name: "Приложение №2", link: "https://www.nalog.gov.ru/rn77/taxation/kkt/" },
  { name: "Приложение №3", link: "https://www.nalog.gov.ru/rn77/service/" },
];

const syntheticData: Appeal[] = [
  {
    id: "ОБР-2025-001847",
    summary: "Разъяснение о применении новых реквизитов кассового чека (теги 1125, 1230, 1234, 1236)",
    documentsLink: "https://www.consultant.ru/document/cons_doc_LAW_42359/",
    answerId: "ОТВ-2025-003921",
    comments: "Необходимо добавить ссылку на ГК пункт 123",
    status: "В работе",
    officialLetterLink: "https://www.nalog.gov.ru/rn77/taxation/reference_work/",
    hasWorkspaceLink: true,
  },
  {
    id: "ОБР-2025-001832",
    summary: "Вопрос о порядке применения ККТ при расчетах в сети Интернет",
    documentsLink: "https://www.nalog.gov.ru/rn77/taxation/kkt/",
    answerId: "ОТВ-2025-003905",
    comments: "Некорректно указана ссылка на абзац №3, п. 5 ФЗ ...",
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
    comments: "Ответ не по теме обращения",
    status: "В работе",
    officialLetterLink: "https://normativ.kontur.ru/",
  },
  {
    id: "ОБР-2025-001776",
    summary: "Особенности применения ККТ при продаже алкогольной продукции",
    documentsLink: "https://egais.center-inform.ru/",
    answerId: "ОТВ-2025-003842",
    comments: "Необходимо добавить пункт 12345",
    status: "Утвержден",
    officialLetterLink: "https://fsrar.gov.ru/",
  },
  {
    id: "ОБР-2025-001754",
    summary: "Вопрос о применении ставки НДС 0% при экспорте",
    documentsLink: "https://www.nalog.gov.ru/rn77/taxation/taxes/nds/",
    answerId: "ОТВ-2025-003819",
    comments: "Необходимо добавить ссылку на ГК пункт 123",
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
    comments: "Некорректно указана ссылка на абзац №3, п. 5 ФЗ ...",
    status: "В работе",
    officialLetterLink: "https://www.minstroyrf.gov.ru/",
  },
  {
    id: "ОБР-2025-001708",
    summary: "Особенности формирования фискальных документов для самозанятых",
    documentsLink: "https://npd.nalog.ru/",
    answerId: "ОТВ-2025-003768",
    comments: "Ответ не по теме обращения",
    status: "Утвержден",
    officialLetterLink: "https://www.nalog.gov.ru/rn77/taxation/taxes/samozanjatye/",
  },
  {
    id: "ОБР-2025-001694",
    summary: "Вопрос о переходе на ФФД 1.2 и новые требования к реквизитам",
    documentsLink: "https://www.nalog.gov.ru/rn77/taxation/kkt/t_ffd/",
    answerId: "ОТВ-2025-003751",
    comments: "Необходимо добавить пункт 12345",
    status: "На рассмотрении",
    officialLetterLink: "https://www.consultant.ru/document/cons_doc_LAW_359086/",
  },
];

type SortField = "id" | "summary" | "answerId" | "comments" | "status" | null;
type SortDirection = "asc" | "desc";

const DatabasePage = () => {
  const [documentsDialogOpen, setDocumentsDialogOpen] = useState(false);
  const [selectedAppealId, setSelectedAppealId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleOpenDocuments = (appealId: string) => {
    setSelectedAppealId(appealId);
    setDocumentsDialogOpen(true);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortField(null);
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setSortField(null);
    setSortDirection("asc");
  };

  const hasActiveFilters = searchQuery || statusFilter !== "all" || sortField !== null;

  const filteredAndSortedData = useMemo(() => {
    let result = [...syntheticData];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        item.summary.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((item) => item.status === statusFilter);
    }

    // Sort
    if (sortField) {
      result.sort((a, b) => {
        let aValue: string;
        let bValue: string;

        switch (sortField) {
          case "id":
            aValue = a.id;
            bValue = b.id;
            break;
          case "summary":
            aValue = a.summary;
            bValue = b.summary;
            break;
          case "answerId":
            aValue = a.answerId;
            bValue = b.answerId;
            break;
          case "comments":
            aValue = a.comments;
            bValue = b.comments;
            break;
          case "status":
            aValue = a.status;
            bValue = b.status;
            break;
          default:
            return 0;
        }

        const comparison = aValue.localeCompare(bValue, "ru");
        return sortDirection === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [searchQuery, statusFilter, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-3 w-3 ml-1 opacity-50" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-3 w-3 ml-1" />
    ) : (
      <ArrowDown className="h-3 w-3 ml-1" />
    );
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center hover:text-foreground transition-colors"
    >
      {children}
      <SortIcon field={field} />
    </button>
  );

  const exportToExcel = () => {
    const exportData = filteredAndSortedData.map((item) => ({
      "ID Обращения": item.id,
      "Суть обращения": item.summary,
      "ID Ответа": item.answerId,
      "Комментарии": item.comments,
      "Статус": item.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Обращения");
    
    // Auto-width columns
    const colWidths = [
      { wch: 18 }, // ID Обращения
      { wch: 60 }, // Суть обращения
      { wch: 18 }, // ID Ответа
      { wch: 40 }, // Комментарии
      { wch: 15 }, // Статус
    ];
    worksheet["!cols"] = colWidths;

    XLSX.writeFile(workbook, `Обращения_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  const exportToDocx = () => {
    const tableRows = filteredAndSortedData
      .map(
        (item) => `
        <tr>
          <td style="border: 1px solid #000; padding: 8px;">${item.id}</td>
          <td style="border: 1px solid #000; padding: 8px;">${item.summary}</td>
          <td style="border: 1px solid #000; padding: 8px;">${item.answerId}</td>
          <td style="border: 1px solid #000; padding: 8px;">${item.comments}</td>
          <td style="border: 1px solid #000; padding: 8px;">${item.status}</td>
        </tr>`
      )
      .join("");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Список обращений</title>
        </head>
        <body>
          <h1 style="font-family: Arial, sans-serif;">Список обращений</h1>
          <p style="font-family: Arial, sans-serif; color: #666;">Дата выгрузки: ${new Date().toLocaleDateString("ru-RU")}</p>
          <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 12px;">
            <thead>
              <tr style="background-color: #f0f0f0;">
                <th style="border: 1px solid #000; padding: 8px; text-align: left;">ID Обращения</th>
                <th style="border: 1px solid #000; padding: 8px; text-align: left;">Суть обращения</th>
                <th style="border: 1px solid #000; padding: 8px; text-align: left;">ID Ответа</th>
                <th style="border: 1px solid #000; padding: 8px; text-align: left;">Комментарии</th>
                <th style="border: 1px solid #000; padding: 8px; text-align: left;">Статус</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob(
      ["\ufeff", htmlContent],
      { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
    );

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Обращения_${new Date().toISOString().split("T")[0]}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

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

      {/* Filters */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[250px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по сути обращения..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-9"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchQuery("")}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Фильтр по статусу" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="В работе">В работе</SelectItem>
            <SelectItem value="На рассмотрении">На рассмотрении</SelectItem>
            <SelectItem value="Утвержден">Утвержден</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" onClick={resetFilters} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Сбросить фильтры
          </Button>
        )}

        <div className="ml-auto flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Выгрузить
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportToDocx} className="gap-2 cursor-pointer">
                <FileText className="h-4 w-4" />
                Скачать DOCX
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToExcel} className="gap-2 cursor-pointer">
                <FileSpreadsheet className="h-4 w-4" />
                Скачать Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="text-sm text-muted-foreground">
            Найдено: {filteredAndSortedData.length}
          </span>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto p-4 pt-2">
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">
                  <SortableHeader field="id">ID Обращения</SortableHeader>
                </TableHead>
                <TableHead className="min-w-[300px]">
                  <SortableHeader field="summary">Суть обращения</SortableHeader>
                </TableHead>
                <TableHead className="w-[100px]">Документы</TableHead>
                <TableHead className="w-[140px]">
                  <SortableHeader field="answerId">ID Ответа</SortableHeader>
                </TableHead>
                <TableHead className="min-w-[200px]">
                  <SortableHeader field="comments">Комментарии</SortableHeader>
                </TableHead>
                <TableHead className="w-[130px]">
                  <SortableHeader field="status">Статус</SortableHeader>
                </TableHead>
                <TableHead className="w-[100px]">Письмо</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Ничего не найдено
                  </TableCell>
                </TableRow>
              ) : (
              filteredAndSortedData.map((appeal) => (
                <TableRow key={appeal.id}>
                  <TableCell className="font-mono text-xs">{appeal.id}</TableCell>
                  <TableCell className="text-sm">
                    {appeal.hasWorkspaceLink ? (
                      <Link 
                        to="/" 
                        className="text-primary hover:underline cursor-pointer"
                      >
                        {appeal.summary}
                      </Link>
                    ) : (
                      appeal.summary
                    )}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleOpenDocuments(appeal.id)}
                      className="inline-flex items-center gap-1 text-primary hover:underline text-xs cursor-pointer"
                    >
                      Открыть <ExternalLink className="h-3 w-3" />
                    </button>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{appeal.answerId}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{appeal.comments}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded whitespace-nowrap ${getStatusStyle(appeal.status)}`}>
                      {appeal.status}
                    </span>
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
              ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Documents Dialog */}
      <Dialog open={documentsDialogOpen} onOpenChange={setDocumentsDialogOpen}>
        <DialogContent className="w-[80vw] max-w-[80vw] h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Документы по обращению {selectedAppealId}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto mt-4">
            <div className="space-y-3">
              {documentsList.map((doc, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <a
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    {doc.name}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatabasePage;
