
import { Button } from "../components/ui/button";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { FileText, PenLine, Sparkles } from "lucide-react";
import { redirect } from 'next/navigation'

const Index = () => {
  const { isAuthenticated } = useAuth();

  if(isAuthenticated) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-xl">
            <FileText className="text-primary h-6 w-6" />
            <span>NotesAI</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center">
        <div className="container grid md:grid-cols-2 gap-8 py-12">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
              Take smarter notes with AI assistance
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              NotesAI helps you organize your thoughts and automatically generates
              summaries of your notes using artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
                  Get Started
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="bg-note-light rounded-xl p-6 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 border">
              <h2 className="text-xl font-semibold mb-4">Meeting Notes</h2>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Discussed project timeline with the team. Key points:</p>
                <ul className="list-disc pl-6">
                  <li>Phase 1 to be completed by end of month</li>
                  <li>Need to hire another developer</li>
                  <li>Budget review scheduled for next week</li>
                </ul>
                <p>Action items will be sent via email.</p>
              </div>
              <div className="mt-4 bg-secondary p-3 rounded-md">
                <div className="flex items-center gap-2 mb-1 text-xs font-medium text-muted-foreground">
                  <Sparkles size={12} className="text-primary" />
                  AI Summary
                </div>
                <p className="text-xs text-muted-foreground">
                  Team meeting covered project timeline with Phase 1 completion set for month-end. 
                  Hiring needs and upcoming budget review discussed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <PenLine className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Simple Note Taking</h3>
              <p className="text-muted-foreground">
                Create, edit, and organize your notes with our clean and intuitive interface.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">AI Summaries</h3>
              <p className="text-muted-foreground">
                Get instant summaries of your notes to capture the key information quickly.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Secure Storage</h3>
              <p className="text-muted-foreground">
                Your notes are safely stored and accessible from anywhere with secure authentication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="text-primary h-5 w-5" />
              <span className="font-medium">NotesAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NotesAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
