
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ProtectedLayout } from "../components/layout/ProtectedLayout";
import { NoteEditor } from "../components/notes/NoteEditor";
import { createNote } from "../services/noteService";
import { toast } from "../components/ui/use-toast";
import { Note } from "../types";

const NewNote = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateNote = async (noteData: Partial<Note>) => {
    if (!user) return;

    try {
      const newNote = await createNote({
        user_id: user.id,
        is_archived: false,
        title: noteData.title || "Untitled",
        content: noteData.content || "",
        summary: noteData.summary
      });

      toast({
        title: "Note created",
        description: "Your note has been created successfully",
      });

      navigate(`/notes/${newNote.id}`);
    } catch (error) {
      toast({
        title: "Error creating note",
        description: "There was a problem creating your note",
        variant: "destructive",
      });
    }
  };

  return (
    <ProtectedLayout>
      <div className="container py-8">
        <NoteEditor
          onSave={handleCreateNote}
          isLoading={false}
        />
      </div>
    </ProtectedLayout>
  );
};

export default NewNote;
