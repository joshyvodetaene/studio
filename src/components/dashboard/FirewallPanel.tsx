
"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Lock, Zap, Flame, Trash2, BrainCircuit, Loader2, Network, Activity, Info, ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { analyzeAppPorts, AppPortAnalysis } from "@/ai/flows/configure-tunnel-flow";
import { useToast } from "@/hooks/use-toast";

interface FirewallPanelProps {
  firewallActive: boolean;
  onFirewallChange: (active: boolean) => void;
}

export interface FirewallRule {
  id: string;
  app: string;
  port: number;
  protocol: 'TCP' | 'UDP' | 'BOTH';
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  active: boolean;
}

export function FirewallPanel({ firewallActive, onFirewallChange }: FirewallPanelProps) {
  const [whitelist, setWhitelist] = useState<FirewallRule[]>([
    { id: '1', app: 'Signal Messenger', port: 443, protocol: 'TCP', risk: 'LOW', active: true },
    { id: '2', app: 'Tor Browser', port: 9001, protocol: 'TCP', risk: 'LOW', active: true },
    { id: '3', app: 'Steam Games', port: 27015, protocol: 'BOTH', risk: 'MEDIUM', active: true }
  ]);
  const [newAppName, setNewAppName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [packetLog, setPacketLog] = useState<{ id: string; ip: string; port: number; status: string; time: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!firewallActive) return;
    const interval = setInterval(() => {
      const newPacket = {
        id: Math.random().toString(36).substr(2, 9),
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.1.1`,
        port: Math.floor(Math.random() * 65535),
        status: Math.random() > 0.7 ? "DENIED" : "DROPPED",
        time: new Date().toLocaleTimeString('de-DE', { hour12: false, minute: '2-digit', second: '2-digit' })
      };
      setPacketLog(prev => [newPacket, ...prev.slice(0, 9)]);
    }, 4000);
    return () => clearInterval(interval);
  }, [firewallActive]);

  const handleAIScan = async () => {
    if (!newAppName) return;
    setAnalyzing(true);
    try {
      const result = await analyzeAppPorts(newAppName);
      const newRules: FirewallRule[] = result.recommendedPorts.map((p) => ({
        id: Math.random().toString(36).substr(2, 9),
        app: result.appName,
        port: p.port,
        protocol: p.protocol,
        risk: result.securityRisk,
        active: true
      }));

      setWhitelist(prev => [...prev, ...newRules]);
      setNewAppName("");
      
      toast({
        title: "Neural Scan Success",
        description: `${result.appName} analysiert. Ports freigeschaltet.`,
        variant: "default"
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Neural Error",
        description: "Analyse-Handshake fehlgeschlagen."
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const removeRule = (id: string) => {
    setWhitelist(prev => prev.filter(r => r.id !== id));
    toast({ title: "Regel gelöscht" });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header & Status */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-primary">Quantum Firewall <span className="text-white">Suite</span></h2>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Autonomous Inbound Defense System</p>
        </div>
        
        <div className={cn(
          "px-6 py-4 rounded-2xl border flex items-center gap-4 transition-all duration-500",
          firewallActive ? "bg-primary/5 border-primary/40 shadow-[0_0_30px_rgba(153,27,27,0.2)]" : "bg-white/5 border-white/10"
        )}>
          <div className="space-y-0.5">
            <Label className="text-sm font-black uppercase italic text-white">Master Ingress Control</Label>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{firewallActive ? "Neural Shield ACTIVE" : "Shield OFFLINE"}</p>
          </div>
          <Switch checked={firewallActive} onCheckedChange={onFirewallChange} className="scale-125" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Real-time Packet Audit */}
        <Card className="lg:col-span-4 glass-panel border-none shadow-2xl neon-border overflow-hidden flex flex-col">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
              <Activity className="w-4 h-4" /> Neural Ingress Radar
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="h-[400px] overflow-hidden flex flex-col">
              {!firewallActive ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4 opacity-40">
                  <ShieldAlert className="w-12 h-12 text-muted-foreground" />
                  <p className="text-[10px] uppercase font-black tracking-widest leading-relaxed">System Idle.<br/>Aktiviere Firewall für Live-Audit.</p>
                </div>
              ) : (
                <div className="flex-1 p-4 space-y-3">
                  {packetLog.map((packet) => (
                    <div key={packet.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 animate-in slide-in-from-right-2 duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                          <Flame className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-white">{packet.ip}</p>
                          <p className="text-[8px] text-muted-foreground font-bold">PORT: {packet.port}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-[8px] border-primary/30 text-primary font-black uppercase px-1.5">{packet.status}</Badge>
                        <p className="text-[8px] text-muted-foreground mt-1 font-mono">{packet.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <div className="p-4 border-t border-white/5 bg-black/40 text-[9px] font-black text-muted-foreground uppercase tracking-widest flex justify-between">
            <span>Audit Capacity: 100k PPS</span>
            <span className="text-primary animate-pulse">Scanning Layer 4</span>
          </div>
        </Card>

        {/* AI Rule Generator & Matrix */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="glass-panel border-none shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-black uppercase tracking-[0.15em] flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-primary" /> Neural App Port Discovery
                  </CardTitle>
                  <CardDescription className="text-[10px] font-bold text-muted-foreground uppercase mt-1">AI-gestützte Port-Analyse für persistente Whitelists.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Input 
                    placeholder="E.g. 'Telegram', 'Work Slack', 'Custom Dev App'..." 
                    className="bg-black/60 border-white/10 h-14 rounded-2xl pl-12 text-sm focus:border-primary/50 transition-all"
                    value={newAppName}
                    onChange={(e) => setNewAppName(e.target.value)}
                  />
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
                <Button 
                  className="h-14 px-8 bg-primary hover:bg-primary/80 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-primary/20 flex gap-3"
                  onClick={handleAIScan}
                  disabled={analyzing || !newAppName}
                >
                  {analyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                  Audit App
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-none shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Network className="w-32 h-32" />
            </div>
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase tracking-[0.15em] flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" /> Persistent Authorization Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="border-b border-white/5">
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Application Node</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Protocol / Port</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Risk Audit</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {whitelist.map((rule) => (
                    <TableRow key={rule.id} className="border-white/5 group hover:bg-primary/5 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            rule.active ? "bg-primary shadow-[0_0_8px_rgba(153,27,27,1)]" : "bg-muted"
                          )} />
                          <span className="text-xs font-black uppercase italic text-white">{rule.app}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-white/5 text-[9px] font-mono border-white/10 uppercase">
                          {rule.protocol} / {rule.port}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "px-2 py-0.5 rounded text-[8px] font-black uppercase",
                            rule.risk === 'LOW' ? "bg-primary/20 text-primary border border-primary/30" : 
                            rule.risk === 'MEDIUM' ? "bg-amber-500/20 text-amber-500 border border-amber-500/30" : 
                            "bg-red-500/20 text-red-500 border border-red-500/30"
                          )}>
                            {rule.risk}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                          onClick={() => removeRule(rule.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {whitelist.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">No Persistent Rules Defined</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Audit Info Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-start gap-5">
           <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
             <ShieldCheck className="w-6 h-6 text-primary" />
           </div>
           <div className="space-y-1">
             <h4 className="text-xs font-black uppercase italic">Neural Protection</h4>
             <p className="text-[10px] text-muted-foreground leading-relaxed uppercase font-bold tracking-tighter">
               Die Firewall nutzt AI-Zertifikate, um Spoofing-Angriffe auf Systemebene zu verhindern.
             </p>
           </div>
        </div>

        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-start gap-5">
           <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0">
             <AlertTriangle className="w-6 h-6 text-amber-500" />
           </div>
           <div className="space-y-1">
             <h4 className="text-xs font-black uppercase italic text-amber-500">Risk Assessment</h4>
             <p className="text-[10px] text-muted-foreground leading-relaxed uppercase font-bold tracking-tighter">
               Jede Regel wird basierend auf dem Port-Profil einer Gefahrenstufe (Low-High) zugeordnet.
             </p>
           </div>
        </div>

        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-start gap-5">
           <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
             <Info className="w-6 h-6 text-primary" />
           </div>
           <div className="space-y-1">
             <h4 className="text-xs font-black uppercase italic">Zero-Leak Policy</h4>
             <p className="text-[10px] text-muted-foreground leading-relaxed uppercase font-bold tracking-tighter">
               Eingehende Pakete ohne Whitelist-Eintrag werden stillschweigend verworfen (Dropped).
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}
