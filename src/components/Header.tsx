const Header = () => {
  return (
    <header className="h-11 border-b border-border bg-card px-3 flex items-center shrink-0">
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
    </header>
  );
};

export default Header;
