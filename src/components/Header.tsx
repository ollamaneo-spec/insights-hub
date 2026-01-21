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
    <header className="h-12 border-b border-border bg-card px-4 flex items-center justify-between shrink-0 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
          <span className="text-primary-foreground font-bold text-sm">C</span>
        </div>
        <h1 className="text-sm font-semibold text-foreground hidden sm:block tracking-tight">
          Система обработки вопросов и ответов с ИИ
        </h1>
        <h1 className="text-xs font-semibold text-foreground sm:hidden tracking-tight">
          Система Q&A с ИИ
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/database">
              <Button variant="outline" size="sm" className="h-8 gap-2 text-xs font-medium border-border hover:bg-accent hover:border-primary/30 transition-colors">
                <Database className="h-4 w-4" />
                <span className="hidden sm:inline">БД</span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>База данных</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-2 text-xs font-medium border-border hover:bg-accent hover:border-primary/30 transition-colors">
              <User className="h-4 w-4" />
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
