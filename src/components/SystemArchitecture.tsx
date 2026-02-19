import { ArrowRight } from "lucide-react";

const blocks = [
  { label: "ESP32", sub: "Microcontroller" },
  { label: "Sensors", sub: "Temp / Tamper" },
  { label: "Security Engine", sub: "Zero Trust" },
  { label: "AES-256 Channel", sub: "Encrypted" },
  { label: "Dashboard", sub: "Real-time UI" },
];

export function SystemArchitecture() {
  return (
    <div className="rounded-lg border border-glow-cyan bg-card p-5">
      <h2 className="font-display text-sm font-bold tracking-wider text-primary mb-4 text-glow-cyan">
        SYSTEM ARCHITECTURE
      </h2>
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {blocks.map((block, i) => (
          <div key={block.label} className="flex items-center gap-2 shrink-0">
            <div className="rounded border border-primary/30 bg-primary/5 px-4 py-3 text-center min-w-[100px]">
              <div className="text-xs font-display font-bold text-primary tracking-wide">
                {block.label}
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{block.sub}</div>
            </div>
            {i < blocks.length - 1 && (
              <ArrowRight className="h-4 w-4 text-primary/50 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
