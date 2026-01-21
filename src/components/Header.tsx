import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="h-14 border-b border-border bg-card px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-semibold text-sm">C</span>
        </div>
        <h1 className="text-lg font-semibold text-foreground hidden sm:block">
          Анализ НПА
        </h1>
      </div>
      
      <Button variant="outline" size="sm" className="gap-2">
        <Upload className="h-4 w-4" />
        <span className="hidden sm:inline">Файлы для загрузки</span>
        <span className="sm:hidden">Загрузить</span>
      </Button>
    </header>
  );
};

export default Header;
