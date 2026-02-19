import { useDeviceSimulation } from "@/hooks/useDeviceSimulation";
import { DeviceCard } from "@/components/DeviceCard";
import { AttackPanel } from "@/components/AttackPanel";
import { LiveLogs } from "@/components/LiveLogs";
import { EnterpriseStatusBar } from "@/components/EnterpriseStatusBar";
import { SystemArchitecture } from "@/components/SystemArchitecture";
import { AutoSimulationToggle } from "@/components/AutoSimulationToggle";
import { Shield } from "lucide-react";

const Index = () => {
  const {
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
  } = useDeviceSimulation();

  return (
    <div className="min-h-screen bg-background relative">
      <div className="scan-line" />

      {/* Header */}
      <header className="border-b border-border px-4 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Shield className="h-7 w-7 text-primary text-glow-cyan" />
            <div>
              <h1 className="font-display text-lg font-bold tracking-wider text-foreground">
                SENTINEL<span className="text-primary">NODE</span>
              </h1>
              <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                Zero Trust IoT Security Emulator
              </p>
            </div>
          </div>
          <AutoSimulationToggle enabled={autoSim} onToggle={setAutoSim} />
        </div>
      </header>

      {/* Enterprise Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4">
        <EnterpriseStatusBar
          activeCount={activeCount}
          lockedCount={lockedCount}
          totalTamperAttempts={totalTamperAttempts}
        />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Device Cards */}
        <section>
          <h2 className="font-display text-xs font-bold tracking-widest text-muted-foreground mb-3 uppercase">
            Live Device Dashboard
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {devices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        </section>

        {/* Attack + Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AttackPanel
            devices={devices}
            onTamper={simulateTamper}
            onFirmwareAttack={simulateFirmwareAttack}
            onReset={resetDevice}
          />
          <LiveLogs logs={logs} />
        </div>

        {/* Architecture */}
        <SystemArchitecture />
      </main>
    </div>
  );
};

export default Index;
