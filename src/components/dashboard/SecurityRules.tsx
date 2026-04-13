
"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Layers, Network, Info, ShieldCheck, Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function SecurityRules() {
  const [hops, setHops] = useState([2]);

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-primary">Onion <span className="text-white">Backbone</span></h2>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Multi-Hop Routing & Persistence Layer</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <CardContent className="space-y-10">
            <div className="flex justify-between items-end mb-2">
              <div className="space-y-1">
                <p className="text-4xl font-black italic text-primary">{hops[0]} {hops[0] === 1 ? 'Hop' : 'Hops'}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {hops[0] === 1 ? 'Focus: High Speed' : hops[0] === 2 ? 'Focus: Balanced Anonymity' : 'Focus: Maximum Stealth'}
                </p>
              </div>
              <div className="flex gap-1.5 pb-2">
                {[1, 2, 3].map((h) => (
                  <div key={h} className={cn("w-3 h-8 rounded-sm transition-all", h <= hops[0] ? "bg-primary shadow-[0_0_15px_rgba(153,27,27,0.6)]" : "bg-white/5")} />
                ))}
              </div>
            </div>
            <Slider value={hops} min={1} max={3} step={1} onValueChange={setHops} className="py-4" />
          </CardContent>
        </Card>

        {/* Global Persistence */}
        <Card className="glass-panel border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              Persistence Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-xs font-black uppercase italic">Neural Persistence Active</span>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold leading-relaxed">
                Der Tunnel bleibt im Hintergrund aktiv, auch wenn das System in den Standby geht oder andere Apps Ressourcen anfordern.
              </p>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 opacity-50">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-black uppercase tracking-widest">Auto-Reconnect Node</span>
              </div>
              <Badge variant="outline" className="text-[8px] uppercase border-white/20">Enabled</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel border-none p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
             <Info className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-black uppercase italic tracking-tighter">Wichtiger Hinweis zum Onion-Routing</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Höhere Hop-Anzahlen erhöhen die Latenz signifikant, bieten jedoch exponentiellen Schutz gegen Traffic-Analyse. 
              Für 4K-Streaming empfehlen wir <span className="text-primary font-bold">1 Hop</span>, für hochsensible Kommunikation <span className="text-primary font-bold">3 Hops</span>.
            </p>
            <div className="flex gap-4 pt-2">
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white">ChaCha20-Poly1305</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white">X25519 DH Handshake</span>
               </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
