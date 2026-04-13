
"use client"

import { useState, useEffect } from "react";
import { PRODUCTION_SERVERS, VpnServer } from "@/lib/server-data";
import { ServerCard } from "@/components/dashboard/ServerCard";
import { ConnectionPanel } from "@/components/dashboard/ConnectionPanel";
import { DeviceList } from "@/components/dashboard/DeviceList";
import { TorCircuitViz } from "@/components/dashboard/TorCircuitViz";
import { ConfigTool } from "@/components/dashboard/ConfigTool";
import { NetworkInterfaceDetails } from "@/components/dashboard/NetworkInterfaceDetails";
import { TerminalLog } from "@/components/dashboard/TerminalLog";
import { SecurityRules } from "@/components/dashboard/SecurityRules";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Shield, Search, Settings, LogOut, User, LayoutDashboard, Globe, Activity, Network, ShieldCheck, ShieldAlert, Terminal, Lock, Flame, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Dashboard() {
  const [servers, setServers] = useState<VpnServer[]>(PRODUCTION_SERVERS);
  const [selectedServer, setSelectedServer] = useState<VpnServer | null>(PRODUCTION_SERVERS[0]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<'home' | 'servers' | 'config' | 'network' | 'terminal' | 'rules'>('home');
  const [connectionStatus, setConnectionStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [firewallActive, setFirewallActive] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  const appIcon = PlaceHolderImages.find(img => img.id === 'app-icon');

  useEffect(() => {
    setMounted(true);
    
    const interval = setInterval(() => {
      setServers(prev => {
        const updated = prev.map(s => ({
          ...s,
          latency: Math.max(5, Math.floor(s.latency + (Math.random() * 6 - 3)))
        }));
        return [...updated].sort((a, b) => a.latency - b.latency);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Firewall Simulation: Incoming Requests with AI Authorization Loop
  useEffect(() => {
    if (connectionStatus !== 'connected' || !firewallActive) return;

    const firewallInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        const randomIp = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
        const port = Math.floor(Math.random() * 65535);
        const appGuess = port === 443 ? "Web Service" : port === 10000 ? "Signal-VoIP" : "Unknown Binary";
        
        toast({
          title: "Quantum Firewall: Intercepted",
          description: `Eingehende Verbindung von ${randomIp} auf Port ${port} (${appGuess}).`,
          variant: "destructive",
          action: (
            <div className="flex gap-1">
              <ToastAction altText="Audit" onClick={() => {
                toast({ 
                  title: "Neural Audit gestartet", 
                  description: `AI prüft Paket-Integrität für Port ${port}...`,
                  action: <BrainCircuit className="w-4 h-4 animate-pulse text-primary" />
                });
                setTimeout(() => {
                  toast({ 
                    title: "Audit abgeschlossen", 
                    description: `Port ${port} als sicher eingestuft. Whitelist aktualisiert.`,
                    variant: "default" 
                  });
                }, 2000);
              }}>
                Audit
              </ToastAction>
              <ToastAction altText="Block" onClick={() => toast({ title: "Dauerhaft blockiert" })}>
                Block
              </ToastAction>
            </div>
          ),
        });
      }
    }, 20000);

    return () => clearInterval(firewallInterval);
  }, [connectionStatus, firewallActive, toast]);

  if (!mounted) return null;

  const filteredServers = servers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.city.toLowerCase().includes(search.toLowerCase()) ||
    s.provider.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-black safe-top relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside className="w-20 hidden md:flex flex-col items-center py-8 border-r border-white/5 gap-8 bg-black/60 backdrop-blur-xl z-20">
        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 animate-pulse relative overflow-hidden">
          {appIcon?.imageUrl && (
            <Image 
              src={appIcon.imageUrl} 
              alt="Torro PRO" 
              fill 
              className="object-cover opacity-80"
              data-ai-hint={appIcon.imageHint}
            />
          )}
          <Shield className="w-7 h-7 relative z-10" />
        </div>
        
        <nav className="flex flex-col gap-5">
          {[
            { id: 'home', icon: LayoutDashboard },
            { id: 'servers', icon: Globe },
            { id: 'rules', icon: Lock },
            { id: 'network', icon: Network },
            { id: 'terminal', icon: Terminal },
            { id: 'config', icon: Settings },
          ].map((item) => (
            <Button 
              key={item.id}
              variant="ghost" 
              size="icon" 
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "h-12 w-12 rounded-xl transition-all duration-300", 
                activeTab === item.id ? "text-primary bg-primary/10 border border-primary/20" : "text-muted-foreground hover:text-primary"
              )}
            >
              <item.icon className="w-6 h-6" />
            </Button>
          ))}
        </nav>
        
        <div className="mt-auto">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="w-6 h-6" />
          </Button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden pb-20 md:pb-0 z-10">
        <header className="px-6 py-4 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary md:hidden flex items-center justify-center relative overflow-hidden">
               {appIcon?.imageUrl && (
                <Image 
                  src={appIcon.imageUrl} 
                  alt="Torro PRO" 
                  fill 
                  className="object-cover opacity-60"
                  data-ai-hint={appIcon.imageHint}
                />
              )}
              <Shield className="w-6 h-6 text-white relative z-10" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-primary">Torro <span className="text-white">PRO</span></h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", connectionStatus === 'connected' ? "bg-primary shadow-[0_0_8px_rgba(153,27,27,0.8)]" : "bg-muted")} />
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {connectionStatus === 'connected' ? "Neural Protection Active" : "Encryption Hub Ready"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Find secure nodes..." 
                className="pl-9 h-10 w-48 md:w-64 text-xs bg-white/5 border-white/10 rounded-xl focus:w-80 transition-all focus:border-primary/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-500 group relative",
              connectionStatus === 'connected' 
                ? "bg-primary/10 border-primary/40 text-primary shadow-[0_0_25px_rgba(153,27,27,0.3)]" 
                : "bg-white/5 border-white/10 text-muted-foreground"
            )}>
              <div className={cn(
                "absolute inset-0 rounded-xl bg-primary/10 blur-md transition-opacity duration-1000",
                connectionStatus === 'connected' ? "opacity-100" : "opacity-0"
              )} />
              {connectionStatus === 'connected' ? (
                <ShieldCheck className="w-5 h-5 animate-pulse relative z-10" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-muted-foreground relative z-10" />
              )}
              <span className="hidden sm:inline text-[10px] font-black uppercase tracking-tighter italic relative z-10">
                {connectionStatus === 'connected' ? "ENCRYPTED" : "UNPROTECTED"}
              </span>
            </div>

            <Button variant="ghost" size="icon" className="md:hidden">
              <User className="w-6 h-6" />
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-4 md:px-8 py-6">
            <div className="max-w-7xl mx-auto space-y-8 pb-10">
              {activeTab === 'home' && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="xl:col-span-4 lg:sticky lg:top-0">
                    <ConnectionPanel 
                      selectedServer={selectedServer} 
                      onStatusChange={setConnectionStatus}
                      firewallActive={firewallActive}
                      onFirewallChange={setFirewallActive}
                    />
                  </div>
                  <div className="xl:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <TorCircuitViz />
                      <DeviceList />
                    </div>
                    <div className="h-[200px]">
                      <TerminalLog isActive={connectionStatus === 'connected'} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'servers' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Dark-Web Node Topology</h2>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">{filteredServers.length} Active Points</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredServers.map((server) => (
                      <ServerCard 
                        key={server.id} 
                        server={server} 
                        isSelected={selectedServer?.id === server.id}
                        onSelect={(s) => {
                          setSelectedServer(s);
                          setActiveTab('home');
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'rules' && (
                <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <SecurityRules firewallActive={firewallActive} onFirewallChange={setFirewallActive} />
                </div>
              )}

              {activeTab === 'network' && (
                <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <NetworkInterfaceDetails isConnected={connectionStatus === 'connected'} selectedServer={selectedServer} />
                </div>
              )}

              {activeTab === 'terminal' && (
                <div className="h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <TerminalLog isActive={connectionStatus === 'connected'} />
                </div>
              )}

              {activeTab === 'config' && (
                <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <ConfigTool />
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-2xl border-t border-white/5 flex md:hidden items-center justify-around px-4 safe-bottom z-30">
        {[
          { id: 'home', icon: LayoutDashboard, label: 'Dash' },
          { id: 'servers', icon: Globe, label: 'Nodes' },
          { id: 'rules', icon: Lock, label: 'Rules' },
          { id: 'network', icon: Network, label: 'Net' },
          { id: 'terminal', icon: Terminal, label: 'Log' },
        ].map((item) => (
          <Button 
            key={item.id}
            variant="ghost" 
            size="icon" 
            onClick={() => setActiveTab(item.id as any)}
            className={cn("flex flex-col gap-1 h-auto py-2 transition-all", activeTab === item.id ? "text-primary scale-110" : "text-muted-foreground")}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[7px] font-bold uppercase tracking-widest">{item.label}</span>
          </Button>
        ))}
      </nav>
    </div>
  );
}
