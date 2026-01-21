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
    <div className="border-t border-border bg-card p-4">
      <h3 className="font-bold text-sm text-foreground mb-2">Комментарии:</h3>
      <div className="space-y-2">
        <Textarea
          placeholder="Введите комментарий..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[60px] resize-none bg-background border-input focus:ring-ring text-sm"
        />
        <div className="flex gap-2 justify-start">
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!comment.trim()}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentPanel;
