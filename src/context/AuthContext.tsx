
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { AuthState } from "../types";
import { toast } from "../components/ui/use-toast";

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Mock authentication for now (we'll integrate Supabase later)
  const checkSession = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setAuthState({
          user: JSON.parse(storedUser),
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Mock authentication (replace with Supabase later)
      if (email && password) {
        const user = { id: "1", email };
        localStorage.setItem("user", JSON.stringify(user));
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        });
        toast({
          title: "Success",
          description: "You have successfully signed in",
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        title: "Error",
        description: "Failed to sign in. Please check your credentials.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      // Mock signup (replace with Supabase later)
      if (email && password) {
        const user = { id: "1", email };
        localStorage.setItem("user", JSON.stringify(user));
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        });
        toast({
          title: "Success",
          description: "Your account has been created",
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem("user");
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      toast({
        title: "Success",
        description: "You have been signed out",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
