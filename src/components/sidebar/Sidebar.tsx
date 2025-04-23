
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";
import { FileText, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const Sidebar = () => {
  const { signOut, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  
  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-border h-screen flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h1 className="text-lg font-medium flex items-center gap-2">
          <FileText size={20} className="text-primary" />
          NotesAI
        </h1>
      </div>
      
      <div className="p-4">
        <Button 
          className="w-full flex items-center gap-2"
          onClick={() => router.push("/notes/new")}
        >
          <Plus size={16} />
          New Note
        </Button>
      </div>
      
      <nav className="flex-1 p-4 overflow-auto">
        <div className="space-y-1">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
              pathname === "/dashboard"
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            }`}
          >
            <FileText size={16} />
            All Notes
          </Link>
        </div>
      </nav>
      
      <div className="p-4 border-t border-border">
        {user && (
          <div className="flex items-center justify-between mb-4">
            <div className="truncate">
              <p className="text-sm font-medium truncate">{user.email}</p>
            </div>
          </div>
        )}
        
        <Button 
          variant="outline" 
          onClick={handleSignOut} 
          className="w-full flex items-center gap-2"
        >
          <LogOut size={16} />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};
