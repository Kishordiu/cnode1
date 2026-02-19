import { Device } from "@/hooks/useDeviceSimulation";
import { Zap, Bug, RotateCcw } from "lucide-react";

interface AttackPanelProps {
  devices: Device[];
  onTamper: (id: string) => void;
  onFirmwareAttack: (id: string) => void;
  onReset: (id: string) => void;
}

export function AttackPanel({ devices, onTamper, onFirmwareAttack, onReset }: AttackPanelProps) {
  return (
    <div className="rounded-lg border border-glow-cyan bg-card p-5">
      <h2 className="font-display text-sm font-bold tracking-wider text-primary mb-4 text-glow-cyan">
        ATTACK SIMULATION
      </h2>
      <div className="space-y-3">
        {devices.map((device) => (
          <div key={device.id} className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground w-16 shrink-0">{device.name}</span>
            <button
              onClick={() => onTamper(device.id)}
              disabled={device.status === "PERMANENT LOCK"}
              className="flex items-center gap-1 rounded border border-warning/30 bg-warning/10 px-2.5 py-1.5 text-xs text-warning hover:bg-warning/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Zap className="h-3 w-3" /> Tamper
            </button>
            <button
              onClick={() => onFirmwareAttack(device.id)}
              disabled={device.status === "PERMANENT LOCK"}
              className="flex items-center gap-1 rounded border border-destructive/30 bg-destructive/10 px-2.5 py-1.5 text-xs text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Bug className="h-3 w-3" /> Firmware
            </button>
            <button
              onClick={() => onReset(device.id)}
              className="flex items-center gap-1 rounded border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-xs text-primary hover:bg-primary/20 transition-colors"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
