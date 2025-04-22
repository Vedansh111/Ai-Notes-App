
import { Note } from "../types";
import { v4 as uuidv4 } from "uuid";

// Mock data for now (will replace with Supabase)
let notes: Note[] = [
  {
    id: "1",
    title: "Welcome to NotesAI",
    content: "This is a simple note-taking app with AI summarization capabilities. Try adding your own notes!",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "1",
    is_archived: false,
    summary: "A welcome note explaining the app's features."
  },
  {
    id: "2",
    title: "How to use the AI summary feature",
    content: "Write your note with detailed information, then click the 'Generate Summary' button to create an AI-powered summary of your content.",
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    user_id: "1",
    is_archived: false,
    summary: "Instructions for using the AI summary feature."
  }
];

// Get all notes for a user
export const getNotes = async (userId: string): Promise<Note[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return notes.filter(note => note.user_id === userId && !note.is_archived);
};

// Get a single note
export const getNote = async (id: string): Promise<Note | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return notes.find(note => note.id === id);
};

// Create a new note
export const createNote = async (note: Omit<Note, 'id' | 'created_at' | 'updated_at'>): Promise<Note> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newNote: Note = {
    ...note,
    id: uuidv4(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  notes = [...notes, newNote];
  return newNote;
};

// Update an existing note
export const updateNote = async (id: string, updates: Partial<Note>): Promise<Note> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const noteIndex = notes.findIndex(note => note.id === id);
  
  if (noteIndex === -1) {
    throw new Error("Note not found");
  }
  
  const updatedNote = {
    ...notes[noteIndex],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  notes = [...notes.slice(0, noteIndex), updatedNote, ...notes.slice(noteIndex + 1)];
  return updatedNote;
};

// Delete a note
export const deleteNote = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  notes = notes.filter(note => note.id !== id);
};

// Generate a summary using AI (mock for now)
export const generateSummary = async (content: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Mock AI summarization
  if (!content) return "No content to summarize";
  
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length <= 2) return content;
  
  // Simple summarization by taking the first sentence
  const firstSentence = sentences[0].trim() + '.';
  return firstSentence + " " + (sentences.length > 3 ? sentences[1].trim() + '.' : '');
};
