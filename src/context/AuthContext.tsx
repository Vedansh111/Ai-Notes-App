"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { AuthState } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";

interface AuthContextType extends AuthState {
  signOut: () => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signOut: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const supabase = createClient();

    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      
      if (session?.user) {
        setAuthState({
          user: session.user,
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
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAuthState({
          user: session.user,
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
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const supabase = await createClient();
    try {
      await supabase.auth.signOut(); // Sign out with Supabase
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
