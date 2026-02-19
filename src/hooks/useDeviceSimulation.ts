import { useState, useCallback, useRef, useEffect } from "react";

export type DeviceStatus = "ACTIVE" | "ALERT" | "LOCKDOWN" | "PERMANENT LOCK";

export interface Device {
  id: string;
  name: string;
  temperature: number;
  tamperCount: number;
  trustScore: number;
  status: DeviceStatus;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  device: string;
  action: string;
  level: "info" | "warning" | "critical";
}

function getStatus(tamperCount: number): DeviceStatus {
  if (tamperCount >= 5) return "PERMANENT LOCK";
  if (tamperCount >= 3) return "LOCKDOWN";
  if (tamperCount >= 1) return "ALERT";
  return "ACTIVE";
}

function getTrustScore(tamperCount: number): number {
  return Math.max(0, 100 - tamperCount * 20);
}

const initialDevices: Device[] = [
  { id: "1", name: "NODE01", temperature: 24.5, tamperCount: 0, trustScore: 100, status: "ACTIVE" },
  { id: "2", name: "NODE02", temperature: 22.8, tamperCount: 0, trustScore: 100, status: "ACTIVE" },
  { id: "3", name: "NODE03", temperature: 25.1, tamperCount: 0, trustScore: 100, status: "ACTIVE" },
];

let logCounter = 0;

export function useDeviceSimulation() {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [autoSim, setAutoSim] = useState(false);
  const autoSimRef = useRef(false);

  const addLog = useCallback((device: string, action: string, level: LogEntry["level"]) => {
    const entry: LogEntry = {
      id: String(++logCounter),
      timestamp: new Date(),
      device,
      action,
      level,
    };
    setLogs((prev) => [...prev.slice(-99), entry]);
  }, []);

  const simulateTamper = useCallback((deviceId: string) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id !== deviceId) return d;
        if (d.status === "PERMANENT LOCK") return d;
        const newTamper = d.tamperCount + 1;
        return {
          ...d,
          tamperCount: newTamper,
          trustScore: getTrustScore(newTamper),
          status: getStatus(newTamper),
        };
      })
    );
    const device = devices.find((d) => d.id === deviceId);
    if (device && device.status !== "PERMANENT LOCK") {
      const newCount = device.tamperCount + 1;
      const level = newCount >= 5 ? "critical" : newCount >= 3 ? "warning" : "info";
      addLog(device.name, `Physical tamper detected (count: ${newCount})`, level);
    }
  }, [devices, addLog]);

  const simulateFirmwareAttack = useCallback((deviceId: string) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id !== deviceId) return d;
        if (d.status === "PERMANENT LOCK") return d;
        const newTamper = d.tamperCount + 2;
        return {
          ...d,
          tamperCount: newTamper,
          trustScore: getTrustScore(newTamper),
          status: getStatus(newTamper),
        };
      })
    );
    const device = devices.find((d) => d.id === deviceId);
    if (device && device.status !== "PERMANENT LOCK") {
      addLog(device.name, "⚠ Firmware attack intercepted! Trust reduced significantly", "critical");
    }
  }, [devices, addLog]);

  const resetDevice = useCallback((deviceId: string) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId
          ? { ...d, tamperCount: 0, trustScore: 100, status: "ACTIVE" as DeviceStatus, temperature: 22 + Math.random() * 5 }
          : d
      )
    );
    const device = devices.find((d) => d.id === deviceId);
    if (device) {
      addLog(device.name, "Device reset — trust restored to 100%", "info");
    }
  }, [devices, addLog]);

  // Auto simulation
  useEffect(() => {
    autoSimRef.current = autoSim;
  }, [autoSim]);

  useEffect(() => {
    if (!autoSim) return;

    const tempInterval = setInterval(() => {
      if (!autoSimRef.current) return;
      setDevices((prev) =>
        prev.map((d) => ({
          ...d,
          temperature: Math.round((d.temperature + (Math.random() - 0.5) * 2) * 10) / 10,
        }))
      );
    }, 3000);

    const tamperInterval = setInterval(() => {
      if (!autoSimRef.current) return;
      setDevices((prev) => {
        const activeDevices = prev.filter((d) => d.status !== "PERMANENT LOCK");
        if (activeDevices.length === 0) return prev;
        const target = activeDevices[Math.floor(Math.random() * activeDevices.length)];
        addLog(target.name, "Auto-sim: random tamper event", "warning");
        return prev.map((d) => {
          if (d.id !== target.id) return d;
          const newTamper = d.tamperCount + 1;
          return {
            ...d,
            tamperCount: newTamper,
            trustScore: getTrustScore(newTamper),
            status: getStatus(newTamper),
          };
        });
      });
    }, 5000);

    return () => {
      clearInterval(tempInterval);
      clearInterval(tamperInterval);
    };
  }, [autoSim, addLog]);

  const totalTamperAttempts = devices.reduce((sum, d) => sum + d.tamperCount, 0);
  const activeCount = devices.filter((d) => d.status === "ACTIVE" || d.status === "ALERT").length;
  const lockedCount = devices.filter((d) => d.status === "LOCKDOWN" || d.status === "PERMANENT LOCK").length;

  return {
    devices,
    logs,
    autoSim,
    setAutoSim,
    simulateTamper,
    simulateFirmwareAttack,
    resetDevice,
    totalTamperAttempts,
    activeCount,
    lockedCount,
  };
}
