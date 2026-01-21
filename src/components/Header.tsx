const Header = () => {
  return (
    <header className="h-14 border-b border-border bg-card px-4 flex items-center">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-semibold text-sm">C</span>
        </div>
        <h1 className="text-lg font-semibold text-foreground hidden sm:block">
          Система обработки вопросов и ответов с ИИ
        </h1>
        <h1 className="text-sm font-semibold text-foreground sm:hidden">
          Система обработки Q&A с ИИ
        </h1>
      </div>
    </header>
  );
};

export default Header;
