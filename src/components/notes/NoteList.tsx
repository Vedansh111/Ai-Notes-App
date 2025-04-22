
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../services/noteService";
import { NoteCard } from "./NoteCard";
import { Loader2, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { useState } from "react";

interface NoteListProps {
  userId: string;
}

export const NoteList = ({ userId }: NoteListProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: notes, isLoading, error } = useQuery({
    queryKey: ["notes", userId],
    queryFn: () => getNotes(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading notes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-destructive">Error loading notes</p>
        <p className="text-sm text-muted-foreground mt-1">
          Please try again later
        </p>
      </div>
    );
  }

  const filteredNotes = notes?.filter(note => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      (note.summary && note.summary.toLowerCase().includes(query))
    );
  });

  if (filteredNotes?.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <div className="text-center py-12">
          <SearchX className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          {searchQuery ? (
            <p className="text-muted-foreground">No notes found matching "{searchQuery}"</p>
          ) : (
            <p className="text-muted-foreground">No notes found. Create your first note!</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes?.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onClick={() => navigate(`/notes/${note.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
