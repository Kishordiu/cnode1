import { Activity, Lock, AlertTriangle, Wifi, ShieldCheck, Cpu } from "lucide-react";

interface EnterpriseStatusBarProps {
  activeCount: number;
  lockedCount: number;
  totalTamperAttempts: number;
}

export function EnterpriseStatusBar({ activeCount, lockedCount, totalTamperAttempts }: EnterpriseStatusBarProps) {
  const items = [
    { icon: Activity, label: "Active", value: activeCount, color: "text-neon-green" },
    { icon: Lock, label: "Locked", value: lockedCount, color: "text-destructive" },
    { icon: AlertTriangle, label: "Tamper Events", value: totalTamperAttempts, color: "text-warning" },
    { icon: Wifi, label: "API", value: "Connected", color: "text-neon-green" },
    { icon: ShieldCheck, label: "Encryption", value: "AES-256", color: "text-primary" },
    { icon: Cpu, label: "Firmware", value: "v1.2.4", color: "text-primary" },
  ];

  return (
    <div className="rounded-lg border border-border bg-card/50 px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-2">
      <div className="flex items-center gap-2 mr-2">
        <span className="h-2 w-2 rounded-full bg-neon-green animate-pulse-glow" />
        <span className="font-display text-[10px] tracking-widest text-muted-foreground uppercase">
          System Online
        </span>
      </div>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5 text-xs">
          <item.icon className={`h-3 w-3 ${item.color}`} />
          <span className="text-muted-foreground">{item.label}:</span>
          <span className={`font-semibold ${item.color}`}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}
