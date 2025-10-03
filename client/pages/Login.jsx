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
  const [error, setError] = useState(null);

  if (user) return ;

  async function handleEmailSignIn(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailPassword(email, password);
      navigate("/");
    } catch (e) {
      setError(e?.message ?? "Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailSignUp(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signUpWithEmailPassword(email, password);
      navigate("/");
    } catch (e) {
      setError(e?.message ?? "Failed to sign up");
    } finally {
      setLoading(false);
    }
  }

  return (
    
      
        
          Welcome back
          Sign in to your HEALTH360 account
          {mode === "demo" && (
            
              Demo authentication is active. For production, connect Supabase auth via MCP.
            
          )}
        
        
          
            Continue with Google
          
          
            or
            
          
          
            
              Email
               setEmail(e.target.value)} required />
            
            
              Password
               setPassword(e.target.value)} required />
            
            {error && {error}}
            
              
                Sign in
              
              
                Create account
              
            
          
        
      
    
  );
}
