

export function getSpO2Status(v) {
  if (v == null) return "normal";
  if (v  250) return "critical";
  if (v  180) return "warning";
  return "normal";
}

export function getHeartRateStatus(v) {
  if (v == null) return "normal";
  if (v  140) return "critical";
  if (v  120) return "warning";
  return "normal";
}

export function getTemperatureStatus(v) {
  if (v == null) return "normal";
  if (v  39.5) return "critical";
  if (v  37.8) return "warning";
  return "normal";
}

export function statusClasses(sev) { ring: string; accent: string } {
  switch (sev) {
    case "critical":
      return { ring: "ring-2 ring-red-200", accent: "bg-red-100 text-red-700" };
    case "warning":
      return { ring: "ring-2 ring-amber-200", accent: "bg-amber-100 text-amber-800" };
    default:
      return { ring: "ring-1 ring-border", accent: "bg-emerald-100 text-emerald-800" };
  }
}
