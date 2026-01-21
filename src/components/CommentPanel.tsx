import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
    <div className="border-t border-border bg-muted/30 px-3 py-2">
      <h3 className="font-semibold text-sm text-foreground mb-1.5 tracking-tight">Комментарии:</h3>
      <div className="flex gap-2 items-end">
        <Button
          size="sm"
          onClick={handleSend}
          disabled={!comment.trim()}
          className="gap-1.5 h-8 text-xs bg-primary hover:bg-primary/90 shrink-0"
        >
          <Send className="h-3.5 w-3.5" />
          Отправить
        </Button>
        <Textarea
          placeholder="Введите комментарий..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[40px] max-h-[60px] resize-none bg-background border-input focus:ring-ring text-xs flex-1"
        />
      </div>
    </div>
  );
};

export default CommentPanel;
