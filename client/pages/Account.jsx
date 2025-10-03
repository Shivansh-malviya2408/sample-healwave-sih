import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Account() {
  const { user } = useAuth();
  return (
    
      Account
      {!user ? (
        
          You are not signed in. Sign in
        
      ) : (
        
          
            Name
            {user.name ?? "—"}
          
          
            Email
            {user.email ?? "—"}
          
          
            Authentication
            
              For production auth (Google and email/password), connect Supabase via MCP. Click Open MCP popover and connect to Supabase.
            
            
              Go to Open MCP popover and Connect to Supabase.
              Configure your project credentials variables.
              We can then switch this demo auth to real Supabase auth.
            
          
        
      )}
    
  );
}
