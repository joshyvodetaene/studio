
"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Shield, Power, Activity, Lock, Zap, ArrowDown, ArrowUp, Loader2, Cpu, ShieldCheck, ShieldAlert, Infinity } from "lucide-react";
import { cn } from "@/lib/utils";
import { VpnServer } from "@/lib/server-data";
import { vpnBackgroundService } from "@/lib/services/vpn-background-service";

interface ConnectionPanelProps {
  selectedServer: VpnServer | null;
  onStatusChange?: (status: "disconnected" | "connecting" | "connected") => void;
}

export function ConnectionPanel({ selectedServer, onStatusChange }: ConnectionPanelProps) {
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [fullTunnel, setFullTunnel] = useState(true);
  const [killSwitch, setKillSwitch] = useState(true);
  const [progress, setProgress] = useState(0);
  const [downlink, setDownlink] = useState(0);
  const [uplink, setUplink] = useState(0);
  const [securityScore, setSecurityScore] = useState(0);
  
  // Sync status on mount
  useEffect(() => {
    if (vpnBackgroundService.isActive()) {
      setStatus("connected");
      setProgress(100);
      if (onStatusChange) onStatusChange("connected");
    }
  }, []);

  const handleToggle = async () => {
    if (status === "disconnected") {
      setStatus("connecting");
      setProgress(0);
      await vpnBackgroundService.activateTunnel();
    } else {
      setStatus("disconnected");
      setProgress(0);
      setDownlink(0);
      setUplink(0);
      setSecurityScore(0);
      if (onStatusChange) onStatusChange("disconnected");
      await vpnBackgroundService.deactivateTunnel();
    }
  };

  useEffect(() => {
    let interval: any;
    if (status === "connecting") {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 10;
          if (next >= 100) {
            clearInterval(interval);
            return 100;
          }
          return next;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status === "connecting" && progress === 100) {
      setStatus("connected");
      if (onStatusChange) onStatusChange("connected");
    }
  }, [progress, status]);

  useEffect(() => {
    let throughputInterval: any;
    if (status === "connected") {
      const score = (fullTunnel ? 40 : 10) + (killSwitch ? 45 : 5) + 15;
      setSecurityScore(score);
      
      throughputInterval = setInterval(() => {
        setDownlink(Math.floor(Math.random() * 120) + 180);
        setUplink(Math.floor(Math.random() * 50) + 60);
      }, 1000);
    }
    return () => clearInterval(throughputInterval);
  }, [status, fullTunnel, killSwitch]);

  return (
    <Card className="glass-panel border-none shadow-2xl relative overflow-hidden neon-border">
      <div className={cn(
        "absolute top-0 left-0 h-1 bg-primary transition-all duration-300",
        status === "connected" ? "w-full opacity-100 shadow-[0_0_15px_rgba(153,27,27,0.8)]" : status === "connecting" ? "opacity-100" : "w-0 opacity-0"
      )} style={{ width: `${progress}%` }} />
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className={cn("w-5 h-5 transition-colors", status === "connected" ? "text-primary" : "text-muted-foreground")} />
            <span className="uppercase tracking-tighter">Full Device Guard</span>
          </div>
          {status === "connected" && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/20 border border-primary/40">
              <Infinity className="w-3 h-3 text-primary" />
              <span className="text-[8px] text-primary uppercase font-black tracking-widest">System-Wide Active</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-4">
        <div className="flex flex-col items-center justify-center py-6 relative">
          <div className="relative group cursor-pointer" onClick={handleToggle}>
            <div className={cn(
              "absolute inset-0 rounded-full blur-[80px] transition-all duration-1000",
              status === "connected" ? "bg-primary/50 scale-150" : status === "connecting" ? "bg-primary/30 animate-pulse scale-125" : "bg-transparent"
            )} />
            
            <div className={cn(
              "relative z-10 w-48 h-48 rounded-full flex items-center justify-center transition-all duration-700 transform active:scale-95 border-[16px] shadow-2xl",
              status === "connected" ? "bg-primary border-primary/20 text-white shadow-[0_0_50px_rgba(153,27,27,0.6)]" : 
              status === "connecting" ? "bg-secondary border-primary/40 text-primary" : 
              "bg-secondary/40 border-white/5 text-muted-foreground hover:border-white/10"
            )}>
              {status === "connecting" ? (
                <Loader2 className="w-24 h-24 animate-spin text-primary" />
              ) : (
                <Power className={cn("w-24 h-24 transition-transform duration-700", status === "connected" && "rotate-180")} />
              )}
            </div>
          </div>
          
          <div className="text-center mt-10 h-24">
            <h2 className={cn(
              "text-5xl font-black tracking-tighter uppercase italic leading-none",
              status === "connected" ? "text-primary" : status === "connecting" ? "text-primary/80" : "text-muted-foreground"
            )}>
              {status === "connected" ? "SECURE" : status === "connecting" ? "SYNCING" : "OFFLINE"}
            </h2>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.5em] mt-3">
              {status === "connected" ? `BACKBONE: ${selectedServer?.city.toUpperCase()}` : status === "connecting" ? "ENCRYPTING PACKETS" : "TERMINAL UNPROTECTED"}
            </p>
          </div>
        </div>

        {status === "connected" && (
          <div className="space-y-2 px-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Encryption Integrity</span>
              <span className="text-[10px] font-black text-primary">{securityScore}%</span>
            </div>
            <Progress value={securityScore} className="h-2 bg-white/5 border border-white/5" />
          </div>
        )}

        <div className="grid gap-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <Label htmlFor="full-tunnel" className="text-xs font-black block italic uppercase tracking-wider">System Layer Routing</Label>
                <p className="text-[9px] text-muted-foreground uppercase tracking-tighter">Affects whole device traffic</p>
              </div>
            </div>
            <Switch id="full-tunnel" checked={fullTunnel} onCheckedChange={setFullTunnel} />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <Label htmlFor="kill-switch" className="text-xs font-black block uppercase italic tracking-wider">Quantum Kill Switch</Label>
                <p className="text-[9px] text-muted-foreground uppercase tracking-tighter">Zero-Leak persistence</p>
              </div>
            </div>
            <Switch id="kill-switch" checked={killSwitch} onCheckedChange={setKillSwitch} />
          </div>
        </div>

        {status === "connected" && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 group overflow-hidden relative">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/10 rounded-full blur-2xl" />
              <div className="flex items-center gap-2 mb-2">
                <ArrowDown className="w-4 h-4 text-primary animate-bounce" />
                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Downlink</p>
              </div>
              <p className="font-code text-2xl font-black text-white">{downlink} <span className="text-[10px] text-muted-foreground font-normal">Mbps</span></p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 group overflow-hidden relative">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/10 rounded-full blur-2xl" />
              <div className="flex items-center gap-2 mb-2">
                <ArrowUp className="w-4 h-4 text-primary/50" />
                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Uplink</p>
              </div>
              <p className="font-code text-2xl font-black text-white">{uplink} <span className="text-[10px] text-muted-foreground font-normal">Mbps</span></p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
