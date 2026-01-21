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
    <div className="border-t border-border bg-muted/30 px-4 py-2">
      <h3 className="font-bold text-sm text-foreground mb-2">Комментарии:</h3>
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Введите комментарий..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="h-8 text-sm bg-background border-input focus:ring-ring flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          size="sm"
          onClick={handleSend}
          disabled={!comment.trim()}
          className="gap-1.5 h-8 text-xs bg-primary hover:bg-primary/90 shrink-0"
        >
          <Send className="h-3.5 w-3.5" />
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default CommentPanel;
