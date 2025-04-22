
import { useNavigate } from "react-router-dom";
import { ProtectedLayout } from "../components/layout/ProtectedLayout";
import { NoteEditor } from "../components/notes/NoteEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../services/noteService";
import { useAuth } from "../context/AuthContext";
import { Note } from "../types";
import { toast } from "../components/ui/use-toast";

const NewNote = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: Partial<Note>) =>
      createNote({
        ...data,
        user_id: user?.id || "",
        is_archived: false,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      navigate(`/notes/${data.id}`);
      toast({
        description: "Note created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create note",
        variant: "destructive",
      });
    }
  });

  const handleSave = async (data: Partial<Note>) => {
    await createMutation.mutateAsync(data);
  };

  return (
    <ProtectedLayout>
      <div className="container py-8 max-w-4xl mx-auto">
        <NoteEditor 
          onSave={handleSave} 
          isLoading={createMutation.isPending} 
        />
      </div>
    </ProtectedLayout>
  );
};

export default NewNote;
