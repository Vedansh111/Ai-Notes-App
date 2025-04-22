
import { Note } from "../../types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { formatDistanceToNow } from "date-fns";

interface NoteCardProps {
  note: Note;
  onClick: () => void;
}

export const NoteCard = ({ note, onClick }: NoteCardProps) => {
  const createdAt = new Date(note.created_at);
  const formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });
  
  // Truncate content for preview
  const truncatedContent = 
    note.content.length > 120 
      ? `${note.content.substring(0, 120)}...` 
      : note.content;

  return (
    <Card 
      className="cursor-pointer h-full flex flex-col note-card"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{note.title || "Untitled"}</CardTitle>
        <CardDescription className="text-xs">
          {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-4">
          {truncatedContent}
        </p>
      </CardContent>
      {note.summary && (
        <CardFooter className="pt-2 pb-4 border-t text-xs text-muted-foreground">
          <div>
            <span className="font-medium">Summary:</span> {note.summary.length > 60 
              ? `${note.summary.substring(0, 60)}...` 
              : note.summary}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
