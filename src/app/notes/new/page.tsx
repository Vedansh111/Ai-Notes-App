"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ProtectedLayout } from "@/components/layout/ProtectedLayout";
import { NoteEditor } from "@/components/notes/NoteEditor";
import { toast } from "@/components/ui/use-toast";

const NewNote = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleCreateNote = async () => {
    if (!user) return;

    try {
      toast({
        title: "Note created",
        description: "Your note has been created successfully",
      });

      router.push(`/dashboard`);
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
