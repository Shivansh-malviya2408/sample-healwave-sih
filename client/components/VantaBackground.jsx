import { useEffect, useRef, useState } from "react";

export default function VantaBackground() {
  const ref = useRef(null);
  const [vanta, setVanta] = useState(null);

  useEffect(() => {
    function init() {
      if (vanta || !ref.current) return;
      const VANTA = (window).VANTA;
      if (!VANTA?.NET) return;
      const effect = VANTA.NET({
        el);
      setVanta(effect);
    }

    // Try init immediately and also after scripts load
    init();
    const id = window.setInterval(init, 300);
    return () => {
      window.clearInterval(id);
      if (vanta?.destroy) vanta.destroy();
    };
  }, [vanta]);

  return ;
}
