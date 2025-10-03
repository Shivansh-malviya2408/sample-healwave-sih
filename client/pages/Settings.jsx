import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BlynkConfig, BlynkPins, loadBlynkConfig, saveBlynkConfig } from "@/api/blynkCloud";

export default function Settings() {
  const [token, setToken] = useState("");
  const [pins, setPins] = useState({ spo2);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const cfg = loadBlynkConfig();
    if (cfg) {
      setToken(cfg.token);
      setPins(cfg.pins);
    }
  }, []);

  function save() {
    const cfg = { token: token.trim(), pins };
    saveBlynkConfig(cfg);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    
      Settings
      
        Enter your Blynk device auth token and the virtual pins for each metric. Data refreshes every 5 seconds.
      
      
        
          Blynk Device Auth Token
           setToken(e.target.value)} placeholder="e.g. abcd1234...." />
        
        
          
            SpO₂ Pin
             setPins({ ...pins, spo2)} />
          
          
            Glucose Pin
             setPins({ ...pins, glucose)} />
          
          
            Heart Rate Pin
             setPins({ ...pins, heartRate)} />
          
          
            Temperature Pin
             setPins({ ...pins, temperature)} />
          
        
        
          Save
          {saved && Saved}
        
      
    
  );
}
