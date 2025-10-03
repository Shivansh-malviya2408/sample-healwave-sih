import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function HelpSheet() {
  return (
    
      
        Help
      
      
        
          Help & Guidance
          
            Quick tips for using HEALTH360. This assistant is not a medical device.
          
        
        
          
            Blynk Setup
            
              Go to Settings and paste your Blynk device auth token.
              Confirm virtual pins for SpO₂, Glucose, Heart Rate, Temperature.
              Data refreshes every 5 seconds automatically.
            
          
          
            Typical Ranges
            
              SpO₂)
              Heart rate: 50–120 bpm (resting varies)
              Temperature: 36–37.8°C
            
          
          
            Get Support
            For deployment or data connections, use the MCP integrations (Neon, Supabase, Netlify, Vercel, etc.).
          
        
      
    
  );
}
