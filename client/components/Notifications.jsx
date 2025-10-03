import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HealthData } from "@/hooks/useRealtimeHealth";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export default function Notifications({ health }) {
  const alerts = buildAlerts(health);
  const hasCritical = alerts.some((a) => a.severity === "critical");

  return (
    
      
        
          Notifications
          {hasCritical ? (
            
              
              CONSULT YOUR DOCTOR
            
          ) : null}
        
      
      
        {alerts.length === 0 ? (
          
            
            All metrics are within normal ranges.
          
        ) : (
          alerts.map((a, i) => (
            
              {a.message}
            
          ))
        )}
      
    
  );
}

function buildAlerts(health) { message: string; severity: "info" | "warning" | "critical" }[] {
  const alerts = [];

  // SpO2
  const spo2 = health.spo2.current;
  if (typeof spo2 === "number") {
    if (spo2  250) alerts.push({ severity);
    else if (glu > 180) alerts.push({ severity);
  }

  // Heart rate (bpm)
  const hr = health.heartRate.current;
  if (typeof hr === "number") {
    if (hr  140) alerts.push({ severity);
    else if (hr  120) alerts.push({ severity);
  }

  // Temperature (°C)
  const t = health.temperature.current;
  if (typeof t === "number") {
    if (t  39.5) alerts.push({ severity)}°C. Critical range. Seek immediate medical attention and CONSULT YOUR DOCTOR.` });
    else if (t  37.8) alerts.push({ severity)}°C. Abnormal. Rest, hydrate, and monitor.` });
  }

  return alerts;
}
