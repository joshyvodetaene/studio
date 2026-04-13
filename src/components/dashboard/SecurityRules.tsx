
"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Shield, Split, Layers, Lock, Globe, Zap, Check, Flame, Ban, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface SecurityRulesProps {
  firewallActive?: boolean;
  onFirewallChange?: (active: boolean) => void;
}

export function SecurityRules({ firewallActive = true, onFirewallChange }: SecurityRulesProps) {
  const [splitTunnel, setSplitTunnel] = useState(true);
  const [hops, setHops] = useState([2]);
  const [dnsProtection, setDnsProtection] = useState(true);

  const optimizedApps = ["Banking App", "Local Media", "Gaming Hub"];

  return (
    <div className="space-y-6">
      <Card className="glass-panel border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            Onion Multi-Hop Depth
          </CardTitle>
          <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground">
            Set the number of encrypted hops for your traffic.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-end mb-2">
            <div className="space-y-1">
              <p className="text-2xl font-black italic text-primary">{hops[0]} {hops[0] === 1 ? 'Hop' : 'Hops'}</p>
              <p className="text-[8px] font-black uppercase tracking-tighter text-muted-foreground">
                {hops[0] === 1 ? 'Focus: High Speed' : hops[0] === 2 ? 'Focus: Balanced' : 'Focus: Maximum Anonymity'}
              </p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map((h) => (
                <div 
                  key={h} 
                  className={cn(
                    "w-2 h-4 rounded-sm transition-all",
                    h <= hops[0] ? "bg-primary shadow-[0_0_8px_rgba(153,27,27,0.5)]" : "bg-white/5"
                  )} 
                />
              ))}
            </div>
          </div>
          <Slider 
            value={hops} 
            min={1} 
            max={3} 
            step={1} 
            onValueChange={setHops}
          />
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3">
            <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] leading-relaxed text-muted-foreground uppercase font-bold">
              Current encryption level: <span className="text-primary">{hops[0] * 256}-bit AES/ChaCha20 Layers</span>. Each hop adds an additional encryption layer for untraceable routing.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-panel border-none">
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Flame className="w-4 h-4 text-primary" />
              Quantum Firewall PRO
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs font-black uppercase italic">Inbound Blocking</Label>
                <p className="text-[9px] text-muted-foreground uppercase">Intercept unknown requests</p>
              </div>
              <Switch checked={firewallActive} onCheckedChange={onFirewallChange} />
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-muted-foreground uppercase">Active Filter</span>
                <Badge variant="outline" className="text-[7px] border-primary/30 text-primary">DENY-ALL</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Ban className="w-3 h-3 text-primary" />
                <span className="text-[9px] text-white font-bold">Block Anonymous Handshakes</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-primary" />
                <span className="text-[9px] text-white font-bold">User Intent Validation</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-none">
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
              <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Optimized Bypass List</p>
                <div className="flex flex-wrap gap-2">
                  {optimizedApps.map(app => (
                    <Badge key={app} variant="secondary" className="bg-white/5 border-white/10 text-[8px] uppercase py-1">
                      <Check className="w-2 h-2 mr-1 text-primary" /> {app}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-panel border-none md:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Privacy Backbone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs font-black uppercase italic">DNS-over-HTTPS</Label>
                <p className="text-[9px] text-muted-foreground uppercase">Encrypted DNS Resolution</p>
              </div>
              <Switch checked={dnsProtection} onCheckedChange={setDnsProtection} />
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-muted-foreground uppercase">Primary Resolver</span>
                <span className="text-[9px] font-mono text-primary">1.1.1.1 (Cloudflare)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
