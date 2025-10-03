import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";

export default function Login() {
  const { user, signInWithGoogle, signInWithEmailPassword, signUpWithEmailPassword, mode } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (user) return <Navigate to="/" replace />;

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailPassword(email, password);
      navigate("/");
    } catch (e: any) {
      setError(e?.message ?? "Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signUpWithEmailPassword(email, password);
      navigate("/");
    } catch (e: any) {
      setError(e?.message ?? "Failed to sign up");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] grid place-items-center bg-gradient-to-br from-primary/5 via-emerald-200/10 to-background">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-semibold">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your HEALTH360 account</p>
          {mode === "demo" && (
            <p className="mt-2 text-xs text-amber-600">
              Demo authentication is active. For production, connect Supabase auth via MCP.
            </p>
          )}
        </div>
        <div className="space-y-3">
          <Button className="w-full" variant="secondary" onClick={signInWithGoogle}>
            Continue with Google
          </Button>
          <div className="relative text-center">
            <span className="px-2 text-xs text-muted-foreground bg-card relative z-10">or</span>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t" />
          </div>
          <form className="space-y-3" onSubmit={handleEmailSignIn}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={loading}>
                Sign in
              </Button>
              <Button type="button" variant="outline" className="flex-1" disabled={loading} onClick={handleEmailSignUp}>
                Create account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
