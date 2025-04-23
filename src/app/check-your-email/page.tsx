'use client';

export default function CheckYourEmailPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-3xl font-semibold mb-4">📬 Check your email</h1>
      <p className="text-muted-foreground max-w-md">
        We’ve sent you a confirmation link. Please check your inbox and click the link to activate your account.
      </p>
    </div>
  );
}