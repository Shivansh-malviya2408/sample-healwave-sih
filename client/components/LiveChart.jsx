import { ResponsiveContainer, LineChart, Line, YAxis, Tooltip } from "recharts";

export default function LiveChart({ data, color = "#0ea5e9" }) {
  const points = data.map((y, i) => ({ i, y }));
  return (
    
      
        
          
           String(val)} labelFormatter={() => ""} contentStyle={{ fontSize: 12 }} />
          
        
      
    
  );
}
