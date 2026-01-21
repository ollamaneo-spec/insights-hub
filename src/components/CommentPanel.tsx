import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const CommentPanel = () => {
  const [comment, setComment] = useState("");

  const handleSend = () => {
    if (comment.trim()) {
      console.log("Отправка комментария:", comment);
      setComment("");
    }
  };

  return (
    <div className="border-t border-border bg-muted/20 px-4 py-3">
      <h3 className="font-bold text-sm text-foreground mb-2.5 tracking-tight">Комментарии:</h3>
      <div className="flex gap-3 items-center">
        <Input
          placeholder="Введите комментарий..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="h-9 text-sm bg-background border-border focus:border-primary/50 focus:ring-primary/20 flex-1 rounded-lg shadow-sm"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          size="sm"
          onClick={handleSend}
          disabled={!comment.trim()}
          className="gap-2 h-9 text-xs font-medium bg-primary hover:bg-primary/90 shrink-0 shadow-sm rounded-lg"
        >
          <Send className="h-4 w-4" />
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default CommentPanel;
