import { createClient } from "@/utils/supabase/client";  // Ensure Supabase client is imported
import { Note } from "@/types"; // Assuming you have a Note type
import { getUser } from "@/lib/auth-actions";

// Create a Supabase client
const supabase = createClient();

const user = await getUser();

// Get all notes for a user
export const getNotes = async (userId: string): Promise<Note[]> => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user?.id)

  if (error) {
    throw new Error("Error fetching notes: " + error.message);
  }

  return data as Note[];
};

// Get a single note by ID
export const getNote = async (id: string): Promise<Note | null> => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single();  // Expect only one result

  if (error) {
    throw new Error("Error fetching note: " + error.message);
  }

  return data as Note;
};

// Create a new note
export const createNote = async (note: Omit<Note, 'id' | 'created_at' | 'updated_at'>): Promise<Note> => {
    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          user_id: note.user_id,
          title: note.title,
          content: note.content,
          summary: note.summary || '',
        },
      ])
      .single(); // Ensure only one note is returned
  
    if (error) {
      throw new Error("Error creating note: " + error.message);
    }
  
    return {
      ...data as Note, // Return the note with fields populated by Supabase
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Note;
  };

// Update an existing note
export const updateNote = async (id: string, updates: Partial<Note>): Promise<Note> => {
  const { data, error } = await supabase
    .from('notes')
    .update({
      ...updates,
      updated_at: new Date().toISOString(), // Automatically update the timestamp
    })
    .eq('id', id)
    .single(); // Update the specific note

  if (error) {
    throw new Error("Error updating note: " + error.message);
  }

  return data as Note; // Return the updated note
};

// Delete a note by ID
export const deleteNote = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);  // Delete note by ID

  if (error) {
    throw new Error("Error deleting note: " + error.message);
  }
};

// Generate a summary using AI (mock for now)
export const generateSummary = async (content: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay for AI summary
  // Mock AI summarization
  if (!content) return "No content to summarize";

  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length <= 2) return content;

  // Simple summarization by taking the first sentence
  const firstSentence = sentences[0].trim() + '.';
  return firstSentence + " " + (sentences.length > 3 ? sentences[1].trim() + '.' : '');
};
