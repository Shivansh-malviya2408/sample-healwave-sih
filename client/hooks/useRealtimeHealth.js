import { useCallback, useEffect, useRef, useState } from "react";
import { BlynkConfig, fetchBlynkValue, loadBlynkConfig } from "@/api/blynkCloud";

  label: string;
  unit: string;
  color: string;
  values: number[];
  current: number | null;
};

  spo2: MetricSeries;
  glucose: MetricSeries;
  heartRate: MetricSeries;
  temperature: MetricSeries;
};

const MAX_POINTS = 50;
const INTERVAL_MS = 5000;

export function useRealtimeHealth() {
  const [config, setConfig] = useState(() => loadBlynkConfig());
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [paused, setPaused] = useState(false);

  const [health, setHealth] = useState(() => ({
    spo2));

  const timerRef = useRef(null);

  const isConfigured = !!config?.token && !!config?.pins?.spo2 && !!config?.pins?.glucose && !!config?.pins?.heartRate && !!config?.pins?.temperature;

  const poll = useCallback(async () => {
    if (!isConfigured || !config) return;
    setError(null);
    const { token, pins } = config;
    const [spo2, glucose, heartRate, temperature] = await Promise.all([
      fetchBlynkValue(token, pins.spo2),
      fetchBlynkValue(token, pins.glucose),
      fetchBlynkValue(token, pins.heartRate),
      fetchBlynkValue(token, pins.temperature),
    ]);

    setHealth((prev) => ({
      spo2),
      glucose: updateSeries(prev.glucose, glucose),
      heartRate: updateSeries(prev.heartRate, heartRate),
      temperature: updateSeries(prev.temperature, temperature),
    }));
    setLastUpdated(Date.now());
  }, [config, isConfigured]);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      return;
    }
    // initial read
    poll();
    // interval
    timerRef.current = window.setInterval(poll, INTERVAL_MS);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [poll, paused]);

  const refreshConfig = useCallback(() => setConfig(loadBlynkConfig()), []);
  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);
  const refresh = useCallback(() => poll(), [poll]);

  return { health, isConfigured, lastUpdated, error, refreshConfig, paused, pause, resume, refresh };
}

function updateSeries(series) {
  const nextValues = [...series.values];
  const value = nextVal ?? (nextValues.length ? nextValues[nextValues.length - 1] );
  if (value != null) nextValues.push(value);
  if (nextValues.length > MAX_POINTS) nextValues.splice(0, nextValues.length - MAX_POINTS);
  return { ...series, values: nextValues, current: nextVal };
}
