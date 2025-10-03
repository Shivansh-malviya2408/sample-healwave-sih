const STORAGE_KEY = "app.blynk.config";

export function loadBlynkConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.token) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveBlynkConfig(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export const METRIC_UNITS = {
  spo2: "%",
  glucose: "mg/dL",
  heartRate: "bpm",
  temperature: "°C",
};

export async function fetchBlynkValue(token, pin) {
  try {
    const res = await fetch(`/api/blynk/value?token=${encodeURIComponent(token)}&pin=${encodeURIComponent(pin)}`);
    if (!res.ok) throw new Error("Blynk proxy error");
    const data = await res.json();
    if (data == null || data.value == null) return null;
    const n = typeof data.value === "string" ? parseFloat(data.value) : data.value;
    return Number.isFinite(n) ? n : null;
  } catch (e) {
    return null;
  }
}
