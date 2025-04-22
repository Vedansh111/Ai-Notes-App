
export type Note = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  is_archived: boolean;
  summary?: string;
};

export type User = {
  id: string;
  email: string;
  name?: string;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};
