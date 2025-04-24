'use client';

import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNote, updateNote, deleteNote } from "@/services/noteService";
import { NoteEditor } from "@/components/notes/NoteEditor";
import { ProtectedLayout } from "@/components/layout/ProtectedLayout";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import type { Note } from "@/types";

export function NoteDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNote(id),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<Note>) => updateNote(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note", id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/dashboard");
      toast({ description: "Note deleted successfully" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
    },
  });

  const handleSave = async (data: Partial<Note>) => {
    await updateMutation.mutateAsync(data);
  };

  const handleDelete = async () => {
    await deleteMutation.mutateAsync();
  };

  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className="container py-8 flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading note...</p>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  if (error || !note) {
    return (
      <ProtectedLayout>
        <div className="container py-8 text-center">
          <p className="text-destructive">Error: Note not found</p>
          <button
            className="text-primary mt-4 underline"
            onClick={() => router.push("/dashboard")}
          >
            Return to Dashboard
          </button>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="container py-8 max-w-4xl mx-auto">
        <NoteEditor
          note={note}
          onSave={handleSave}
          onDelete={handleDelete}
          isLoading={updateMutation.isPending}
        />
      </div>
    </ProtectedLayout>
  );
}
