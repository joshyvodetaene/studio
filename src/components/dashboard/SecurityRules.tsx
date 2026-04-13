
"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Split, Layers, Lock, Globe, Zap, Check, Flame, Ban, ShieldCheck, Plus, Trash2, BrainCircuit, Loader2, Network } from "lucide-react";
import { cn } from "@/lib/utils";
import { analyzeAppPorts, AppPortAnalysis } from "@/ai/flows/configure-tunnel-flow";
import { useToast } from "@/hooks/use-toast";

interface SecurityRulesProps {
  firewallActive?: boolean;
  onFirewallChange?: (active: boolean) => void;
}

export interface FirewallRule {
  id: string;
  app: string;
  port: number;
  protocol: 'TCP' | 'UDP' | 'BOTH';
  active: boolean;
}

export function SecurityRules({ firewallActive = true, onFirewallChange }: SecurityRulesProps) {
  const [splitTunnel, setSplitTunnel] = useState(true);
  const [hops, setHops] = useState([2]);
  const [dnsProtection, setDnsProtection] = useState(true);
  const [whitelist, setWhitelist] = useState<FirewallRule[]>([
    { id: '1', app: 'Signal Messenger', port: 443, protocol: 'TCP', active: true },
    { id: '2', app: 'Tor Browser Node', port: 9001, protocol: 'TCP', active: true }
  ]);
  const [newAppName, setNewAppName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAIScan = async () => {
    if (!newAppName) return;
    setAnalyzing(true);
    try {
      const result = await analyzeAppPorts(newAppName);
      
      const newRules: FirewallRule[] = result.recommendedPorts.map((p, idx) => ({
        id: Math.random().toString(36).substr(2, 9),
        app: result.appName,
        port: p.port,
        protocol: p.protocol,
        active: true
      }));

      setWhitelist(prev => [...prev, ...newRules]);
      setNewAppName("");
      
      toast({
        title: "Neural Scan Success",
        description: `${result.appName} analysiert. ${newRules.length} Regeln hinzugefügt.`
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
    toast({ title: "Regel gelöscht", description: "Zertifikat aus Whitelist entfernt." });
  };

  return (
    <div className="space-y-6">
      {/* Onion Hops */}
      <Card className="glass-panel border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            Onion Multi-Hop Depth
          </CardTitle>
          <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground">
            Konfiguration der Verschlüsselungslagen für den Tunnel.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-end mb-2">
            <div className="space-y-1">
              <p className="text-2xl font-black italic text-primary">{hops[0]} {hops[0] === 1 ? 'Hop' : 'Hops'}</p>
              <p className="text-[8px] font-black uppercase tracking-tighter text-muted-foreground">
                {hops[0] === 1 ? 'Focus: Speed' : hops[0] === 2 ? 'Focus: Balanced' : 'Focus: Anonymity'}
              </p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map((h) => (
                <div key={h} className={cn("w-2 h-4 rounded-sm transition-all", h <= hops[0] ? "bg-primary shadow-[0_0_8px_rgba(153,27,27,0.5)]" : "bg-white/5")} />
              ))}
            </div>
          </div>
          <Slider value={hops} min={1} max={3} step={1} onValueChange={setHops} />
        </CardContent>
      </Card>

      {/* Quantum Firewall & AI Port Manager */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-panel border-none">
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Flame className="w-4 h-4 text-primary" />
              Quantum Firewall
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs font-black uppercase italic">Inbound Blocking</Label>
                <p className="text-[9px] text-muted-foreground uppercase">Active Packet Filtering</p>
              </div>
              <Switch checked={firewallActive} onCheckedChange={onFirewallChange} />
            </div>

            <div className="pt-4 space-y-3">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Neural App Scan</p>
              <div className="flex gap-2">
                <Input 
                  placeholder="App-Name (z.B. Gaming Hub)" 
                  className="bg-black/40 border-white/10 text-xs h-10 rounded-xl focus:border-primary/50"
                  value={newAppName}
                  onChange={(e) => setNewAppName(e.target.value)}
                />
                <Button 
                  size="icon" 
                  className="shrink-0 bg-primary hover:bg-primary/80 rounded-xl h-10 w-10"
                  onClick={handleAIScan}
                  disabled={analyzing || !newAppName}
                >
                  {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-none">
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              Persistent Whitelist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[180px] overflow-y-auto pr-2 scrollbar-hide">
              {whitelist.length === 0 ? (
                <div className="py-8 text-center text-[10px] text-muted-foreground italic uppercase">Keine Regeln aktiv</div>
              ) : (
                whitelist.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group transition-all hover:border-primary/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold">
                        {rule.protocol[0]}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white uppercase tracking-tighter">{rule.app}</p>
                        <p className="text-[9px] font-mono text-muted-foreground">Port: {rule.port}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="opacity-0 group-hover:opacity-100 h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeRule(rule.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Neural Split Tunneling */}
        <Card className="glass-panel border-none md:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Split className="w-4 h-4 text-primary" />
              Neural Split Tunneling
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs font-black uppercase italic">Enable Split Routing</Label>
                <p className="text-[9px] text-muted-foreground uppercase">Bypass VPN for high-trust apps</p>
              </div>
              <Switch checked={splitTunnel} onCheckedChange={setSplitTunnel} />
            </div>
            {splitTunnel && (
              <div className="flex flex-wrap gap-2 pt-2 animate-in fade-in duration-300">
                {whitelist.map(rule => (
                  <Badge key={rule.id} variant="secondary" className="bg-primary/5 border-primary/20 text-[8px] uppercase py-1">
                    <Network className="w-2.5 h-2.5 mr-1 text-primary" /> {rule.app} ({rule.port})
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
