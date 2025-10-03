import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import HelpSheet from "@/components/HelpSheet";

export default function NavBar() {
  const { user, signOut } = useAuth();
  const { pathname } = useLocation();
  const linkClass = ({ isActive }) =>
    cn(
      "px-3 py-2 text-sm leading-5 font-medium rounded-[10px]",
      isActive ? "bg-secondary text-secondary-foreground" );

  return (
    
      
        
          
            HEALTH360
          
          
            
              Dashboard
            
            
              Account
            
            
              Settings
            
          
        
        
          
            
          
          {!user ? (
            
              Sign in
            
          ) : (
            
              {user.email ?? user.name}
              
                Sign out
              
            
          )}
        
      
      
        
          
            Dashboard
          
          
            Account
          
          
            Settings
          
        
      
    
  );
}
