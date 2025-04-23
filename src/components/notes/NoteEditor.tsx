"use client"

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Loader2, RefreshCcw, Save, Trash } from "lucide-react";
import { Note } from "../../types";
import { Badge } from "../ui/badge";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "../ui/alert-dialog";
import { toast } from "../ui/use-toast";
import { generateSummary } from "../../services/noteService";

interface NoteEditorProps {
  note?: Note;
  onSave: (note: Partial<Note>) => Promise<void>;
  onDelete?: () => Promise<void>;
  isLoading: boolean;
}

export const NoteEditor = ({
  note,
  onSave,
  onDelete,
  isLoading,
}: NoteEditorProps) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [summary, setSummary] = useState(note?.summary || "");
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setSummary(note.summary || "");
    }
  }, [note]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSave = async (
    saveTitle = title, 
    saveContent = content,
    saveSummary = summary
  ) => {
    try {
      await onSave({
        title: saveTitle || "Untitled",
        content: saveContent,
        summary: saveSummary,
      });
      toast({
        description: "Note saved",
      });
    } catch (error) {
      toast({
        title: "Error saving note",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleGenerateSummary = async () => {
    if (!content.trim()) {
      toast({
        title: "Cannot summarize",
        description: "Please add some content to your note first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSummarizing(true);
      const generatedSummary = await generateSummary(content);
      setSummary(generatedSummary);
      await onSave({
        title,
        content,
        summary: generatedSummary,
      });
      toast({
        title: "Summary generated",
        description: "AI summary has been created for your note",
      });
    } catch (error) {
      toast({
        title: "Error generating summary",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled"
          className="text-2xl font-bold bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-auto"
        />
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateSummary}
            disabled={isSummarizing || isLoading || !content.trim()}
          >
            {isSummarizing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Summarizing...
              </>
            ) : (
              <>
                <RefreshCcw className="h-4 w-4 mr-2" />
                Generate Summary
              </>
            )}
          </Button>
          
          <Button
            onClick={() => handleSave()}
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </Button>
          
          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Note</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this note? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={onDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
      
      {summary && (
        <div className="bg-secondary p-3 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="bg-primary/10">Summary</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{summary}</p>
        </div>
      )}
      
      <Textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Start writing..."
        className="min-h-[400px] resize-none focus-visible:ring-0 border-none p-0 text-base"
      />
    </div>
  );
};
