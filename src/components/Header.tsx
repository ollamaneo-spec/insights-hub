import { Database, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
  return (
    <header className="h-11 border-b border-border bg-card px-3 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-semibold text-xs">C</span>
        </div>
        <h1 className="text-sm font-semibold text-foreground hidden sm:block tracking-tight">
          Система обработки вопросов и ответов с ИИ
        </h1>
        <h1 className="text-xs font-semibold text-foreground sm:hidden tracking-tight">
          Система Q&A с ИИ
        </h1>
      </div>
      
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/database">
              <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs">
                <Database className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">БД</span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>База данных</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs">
              <User className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Аккаунт</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Личный кабинет</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
