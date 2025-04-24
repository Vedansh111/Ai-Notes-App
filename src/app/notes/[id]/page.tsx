import { NoteDetailClient } from "@/components/notes/NoteClientDetail";
import { createClient } from "@/utils/supabase/client";

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: notes, error } = await supabase.from("notes").select("id");

  if (error || !notes) {
    console.error("Error fetching notes:", error?.message || "No data");
    return [];
  }

  return notes.map((note) => ({
    id: note.id.toString(),
  }));
}

export default async function NotePage({ params }: { params: { id: string } }) {
  return <NoteDetailClient id={params.id} />;
}
