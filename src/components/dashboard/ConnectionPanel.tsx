
"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, Power, Activity, Network, Lock, Zap, ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { VpnServer } from "@/lib/mock-data";

interface ConnectionPanelProps {
  selectedServer: VpnServer | null;
}

export function ConnectionPanel({ selectedServer }: ConnectionPanelProps) {
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [torMode, setTorMode] = useState(true);
  const [killSwitch, setKillSwitch] = useState(true);
  
  const handleToggle = () => {
    if (status === "disconnected") {
      setStatus("connecting");
      setTimeout(() => setStatus("connected"), 2500);
    } else {
      setStatus("disconnected");
    }
  };

  return (
    <Card className="glass-panel border-none shadow-2xl relative overflow-hidden">
      <div className={cn(
        "absolute top-0 left-0 w-full h-1 bg-accent/20 transition-all duration-1000",
        status === "connected" ? "bg-accent opacity-100" : "opacity-0"
      )} />
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className={cn("w-5 h-5", status === "connected" ? "text-accent" : "text-muted-foreground")} />
            Shield Status
          </div>
          {status === "connected" && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] text-accent uppercase font-bold tracking-tighter">Encrypted</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-8 pt-4">
        <div className="flex flex-col items-center justify-center py-4 relative">
          <div className="relative group cursor-pointer" onClick={handleToggle}>
            <div className={cn(
              "absolute inset-0 rounded-full blur-3xl transition-all duration-1000",
              status === "connected" ? "bg-accent/30 scale-150" : status === "connecting" ? "bg-yellow-500/20 animate-pulse scale-125" : "bg-transparent"
            )} />
            
            <div className={cn(
              "relative z-10 w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500 transform active:scale-95 border-8 shadow-2xl",
              status === "connected" ? "bg-accent border-accent/20 text-background" : 
              status === "connecting" ? "bg-secondary border-yellow-500/40 text-yellow-500" : 
              "bg-secondary/40 border-white/5 text-muted-foreground hover:border-white/10"
            )}>
              <Power className={cn("w-16 h-16 transition-transform duration-500", status === "connected" && "rotate-180")} />
            </div>
            
            {status === "connecting" && (
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="80" cy="80" r="76"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-yellow-500/20"
                />
                <circle
                  cx="80" cy="80" r="76"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray="477"
                  strokeDashoffset="477"
                  className="text-yellow-500 animate-[progress_2.5s_ease-in-out_forwards]"
                />
              </svg>
            )}
          </div>
          
          <div className="text-center mt-6">
            <h2 className={cn(
              "text-2xl font-black tracking-tighter uppercase italic",
              status === "connected" ? "text-accent" : status === "connecting" ? "text-yellow-500" : "text-muted-foreground"
            )}>
              {status === "connected" ? "Protocol: Active" : status === "connecting" ? "Handshaking..." : "Offline"}
            </h2>
            <p className="text-xs text-muted-foreground font-medium mt-1">
              {status === "connected" ? `Secured via ${selectedServer?.city}` : status === "connecting" ? "Establishing Tor Tunnel" : "System ready for deployment"}
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <Label htmlFor="tor-mode" className="text-sm font-bold block">Stealth Protocol</Label>
                <p className="text-[10px] text-muted-foreground">Obfuscated multi-hop traffic</p>
              </div>
            </div>
            <Switch 
              id="tor-mode" 
              checked={torMode} 
              onCheckedChange={setTorMode}
              disabled={status !== "disconnected"}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <Label htmlFor="kill-switch" className="text-sm font-bold block">Fail-Safe Lock</Label>
                <p className="text-[10px] text-muted-foreground">Auto-block on connection loss</p>
              </div>
            </div>
            <Switch id="kill-switch" checked={killSwitch} onCheckedChange={setKillSwitch} />
          </div>
        </div>

        {status === "connected" && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
              <div className="flex items-center gap-2 mb-1">
                <ArrowDown className="w-3 h-3 text-accent" />
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Downlink</p>
              </div>
              <p className="font-code text-lg font-bold text-foreground">42.5 <span className="text-[10px] text-muted-foreground">MB/s</span></p>
            </div>
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
              <div className="flex items-center gap-2 mb-1">
                <ArrowUp className="w-3 h-3 text-accent" />
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Uplink</p>
              </div>
              <p className="font-code text-lg font-bold text-foreground">12.1 <span className="text-[10px] text-muted-foreground">MB/s</span></p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
