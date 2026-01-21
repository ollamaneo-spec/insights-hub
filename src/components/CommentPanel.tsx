import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Send } from "lucide-react";

const CommentPanel = () => {
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSend = () => {
    if (comment.trim()) {
      console.log("Отправка комментария:", comment);
      setComment("");
      setIsEditing(false);
    }
  };

  return (
    <div className="section-block">
      <h3 className="section-title">Комментарии:</h3>
      <div className="space-y-3">
        <Textarea
          placeholder="Введите комментарий..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={!isEditing && comment === ""}
          className="min-h-[80px] resize-none bg-background border-input focus:ring-primary"
        />
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            className="gap-2"
          >
            <Pencil className="h-4 w-4" />
            Редактировать
          </Button>
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