import { Device } from "@/hooks/useDeviceSimulation";
import { Shield, Thermometer, AlertTriangle, Lock } from "lucide-react";

interface DeviceCardProps {
  device: Device;
}

const statusConfig = {
  ACTIVE: { border: "border-glow-green", icon: Shield, label: "text-neon-green" },
  ALERT: { border: "border-glow-orange", icon: AlertTriangle, label: "text-warning" },
  LOCKDOWN: { border: "border-glow-red", icon: Lock, label: "text-destructive" },
  "PERMANENT LOCK": { border: "border-glow-red", icon: Lock, label: "text-destructive" },
};

export function DeviceCard({ device }: DeviceCardProps) {
  const config = statusConfig[device.status];
  const Icon = config.icon;

  return (
    <div className={`rounded-lg border bg-card p-5 transition-all duration-500 ${config.border}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-sm font-bold tracking-wider text-foreground">
          {device.name}
        </h3>
        <span className={`flex items-center gap-1.5 text-xs font-semibold ${config.label}`}>
          <Icon className="h-3.5 w-3.5" />
          {device.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <Thermometer className="h-3 w-3" /> Temperature
          </span>
          <span className="text-foreground font-semibold">{device.temperature.toFixed(1)}°C</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Tamper Count</span>
          <span className={`font-semibold ${device.tamperCount > 0 ? "text-warning" : "text-foreground"}`}>
            {device.tamperCount}
          </span>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Trust Score</span>
            <span className={`font-bold ${device.trustScore > 60 ? "text-neon-green" : device.trustScore > 20 ? "text-warning" : "text-destructive"}`}>
              {device.trustScore}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                device.trustScore > 60
                  ? "bg-neon-green"
                  : device.trustScore > 20
                  ? "bg-warning"
                  : "bg-destructive"
              }`}
              style={{ width: `${device.trustScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
