import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X } from "lucide-react";
import { useRealtimeHealth } from "@/hooks/useRealtimeHealth";

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role);
  const { health } = useRealtimeHealth();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  function reply(message) {
    const m = message.toLowerCase();
    const h = health;
    let out = "";

    if (/spo2|oxygen/.test(m) && typeof h.spo2.current === "number") {
      const v = h.spo2.current;
      out += `SpO₂ is ${v}%. ` + (v =95%).");
    } else if (/glucose|sugar|mg\/dl/.test(m) && typeof h.glucose.current === "number") {
      const v = h.glucose.current;
      out += `Glucose is ${v} mg/dL. ` + (v  140 ? "Critical range — rest and contact your doctor." );
    } else if (/temp|temperature|fever|c/.test(m) && typeof h.temperature.current === "number") {
      const v = h.temperature.current;
      out += `Temperature is ${v.toFixed(1)}°C. ` + (v  39.5 ? "Critical — seek immediate medical attention." );
    } else if (/help|range|normal/.test(m)) {
      out = "Typical adult ranges: SpO₂ ≥95%, Glucose 70–180 mg/dL (context dependent), Heart rate 50–120 bpm (resting varies), Temperature 36–37.8°C.";
    } else {
      out = "I’m a demo assistant. Ask about SpO₂, glucose, heart rate, or temperature. For medical emergencies, CONSULT YOUR DOCTOR.";
    }

    setMessages((prev) => [...prev, { role: "assistant", content: out }]);
  }

  function onSend(e?) {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setTimeout(() => reply(text), 150);
  }

  return (
    
      {!open && (
         setOpen(true)} aria-label="Open assistant">
          
        
      )}
      {open && (
         
          
            HEALTH360 Assistant
             setOpen(false)} aria-label="Close">
              
            
          
          
            
              {messages.map((m, i) => (
                
                  
          
          
             setInput(e.target.value)} placeholder="Ask about your readings..." />
            
              
            
          
        
      )}
    
  );
}
