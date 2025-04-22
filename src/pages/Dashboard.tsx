
import { ProtectedLayout } from "../components/layout/ProtectedLayout";
import { NoteList } from "../components/notes/NoteList";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <ProtectedLayout>
      <div className="container py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">All Notes</h1>
          <p className="text-muted-foreground">
            View and manage all your notes
          </p>
        </header>
        
        <NoteList userId={user?.id || ""} />
      </div>
    </ProtectedLayout>
  );
};

export default Dashboard;
