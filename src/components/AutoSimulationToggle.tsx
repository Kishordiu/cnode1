import { Power } from "lucide-react";

interface AutoSimulationToggleProps {
  enabled: boolean;
  onToggle: (v: boolean) => void;
}

export function AutoSimulationToggle({ enabled, onToggle }: AutoSimulationToggleProps) {
  return (
    <button
      onClick={() => onToggle(!enabled)}
      className={`flex items-center gap-2 rounded border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
        enabled
          ? "border-neon-green/40 bg-neon-green/10 text-neon-green glow-green"
          : "border-muted-foreground/30 bg-secondary text-muted-foreground hover:border-primary/30"
      }`}
    >
      <Power className="h-3.5 w-3.5" />
      Auto-Sim: {enabled ? "ON" : "OFF"}
    </button>
  );
}
