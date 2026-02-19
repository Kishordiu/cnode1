import { useEffect, useRef } from "react";
import { LogEntry } from "@/hooks/useDeviceSimulation";

interface LiveLogsProps {
  logs: LogEntry[];
}

const levelColors = {
  info: "text-primary",
  warning: "text-warning",
  critical: "text-destructive",
};

export function LiveLogs({ logs }: LiveLogsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="rounded-lg border border-glow-cyan bg-card p-5">
      <h2 className="font-display text-sm font-bold tracking-wider text-primary mb-3 text-glow-cyan">
        LIVE LOGS
      </h2>
      <div
        ref={scrollRef}
        className="h-48 overflow-y-auto space-y-1 text-xs font-mono scrollbar-thin"
      >
        {logs.length === 0 && (
          <p className="text-muted-foreground italic">Awaiting events...</p>
        )}
        {logs.map((log) => (
          <div key={log.id} className="flex gap-2 leading-relaxed">
            <span className="text-muted-foreground shrink-0">
              [{log.timestamp.toLocaleTimeString()}]
            </span>
            <span className="text-secondary-foreground shrink-0">{log.device}</span>
            <span className={levelColors[log.level]}>{log.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
