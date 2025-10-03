import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LiveChart from "./LiveChart";
import { cn } from "@/lib/utils";

export function MetricCard({
  icon,
  label,
  value,
  unit,
  series,
  accentClass,
}) {
  return (
    
      
        
          {label}
          {icon}
        
      
      
        
          {value != null ? value.toFixed(0) : "--"}
          {unit}
        
        
          
        
      
    
  );
}
