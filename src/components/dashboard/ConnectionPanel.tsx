"use client"

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, Power, Activity, Network, Lock, Zap, ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { VpnServer } from "@/lib/mock-data";

interface ConnectionPanelProps {
  selectedServer: VpnServer | null;
}

export function ConnectionPanel({ selectedServer }: ConnectionPanelProps) {
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [torMode, setTorMode] = useState(true);
  const [killSwitch, setKillSwitch] = useState(true);
  const [progress, setProgress] = useState(0);
  const [downlink, setDownlink] = useState(0);
  const [uplink, setUplink] = useState(0);
  
  const handleToggle = () => {
    if (status === "disconnected") {
      setStatus("connecting");
      setProgress(0);
    } else {
      setStatus("disconnected");
      setProgress(0);
      setDownlink(0);
      setUplink(0);
    }
  };

  useEffect(() => {
    let interval: any;
    if (status === "connecting") {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setStatus("connected");
            clearInterval(interval);
            return 100;
          }
          return prev + 10; // Schnellere Verbindung für High-Perf Gefühl
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [status]);

  // Simulierte Durchsatz-Daten
  useEffect(() => {
    let throughputInterval: any;
    if (status === "connected") {
      throughputInterval = setInterval(() => {
        setDownlink(Math.floor(Math.random() * 80) + 120); // Hoher Durchsatz 120-200 Mbps
        setUplink(Math.floor(Math.random() * 30) + 40); // 40-70 Mbps
      }, 1000);
    }
    return () => clearInterval(throughputInterval);
  }, [status]);

  return (
    <Card className="glass-panel border-none shadow-2xl relative overflow-hidden">
      <div className={cn(
        "absolute top-0 left-0 h-1 bg-accent transition-all duration-300",
        status === "connected" ? "w-full opacity-100" : status === "connecting" ? "opacity-100" : "w-0 opacity-0"
      )} style={{ width: `${progress}%` }} />
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className={cn("w-5 h-5 transition-colors", status === "connected" ? "text-accent" : "text-muted-foreground")} />
            Pro-Performance Tunnel
          </div>
          {status === "connected" && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
              <Zap className="w-3 h-3 text-accent fill-accent" />
              <span className="text-[10px] text-accent uppercase font-black tracking-tighter italic">Turbo Active</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-4">
        <div className="flex flex-col items-center justify-center py-4 relative">
          <div className="relative group cursor-pointer" onClick={handleToggle}>
            <div className={cn(
              "absolute inset-0 rounded-full blur-[80px] transition-all duration-1000",
              status === "connected" ? "bg-accent/40 scale-150" : status === "connecting" ? "bg-accent/20 animate-pulse scale-125" : "bg-transparent"
            )} />
            
            <div className={cn(
              "relative z-10 w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500 transform active:scale-95 border-[12px] shadow-2xl",
              status === "connected" ? "bg-accent border-accent/20 text-background" : 
              status === "connecting" ? "bg-secondary border-accent/40 text-accent" : 
              "bg-secondary/40 border-white/5 text-muted-foreground hover:border-white/10"
            )}>
              {status === "connecting" ? (
                <Loader2 className="w-20 h-20 animate-spin" />
              ) : (
                <Power className={cn("w-20 h-20 transition-transform duration-500", status === "connected" && "rotate-180")} />
              )}
            </div>
            
            {status === "connecting" && (
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="80" cy="80" r="74"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-accent/10"
                />
                <circle
                  cx="80" cy="80" r="74"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeDasharray="465"
                  strokeDashoffset={465 - (465 * progress) / 100}
                  className="text-accent transition-all duration-100"
                />
              </svg>
            )}
          </div>
          
          <div className="text-center mt-6 h-16">
            <h2 className={cn(
              "text-3xl font-black tracking-tighter uppercase italic",
              status === "connected" ? "text-accent" : status === "connecting" ? "text-accent/80" : "text-muted-foreground"
            )}>
              {status === "connected" ? "Connected" : status === "connecting" ? "Optimizing..." : "Standby"}
            </h2>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] mt-1">
              {status === "connected" ? `Backbone: ${selectedServer?.city}` : status === "connecting" ? "Bypassing Congestion" : "Select Node for 10Gbps Uplink"}
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <Zap className="w-4 h-4 fill-accent" />
              </div>
              <div>
                <Label htmlFor="tor-mode" className="text-sm font-black block italic">Turbine Mode</Label>
                <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Maximum Bandwidth Aggregation</p>
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
                <Label htmlFor="kill-switch" className="text-sm font-black block">Quantum Lock</Label>
                <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Zero-Leak Buffer Architecture</p>
              </div>
            </div>
            <Switch id="kill-switch" checked={killSwitch} onCheckedChange={setKillSwitch} />
          </div>
        </div>

        {status === "connected" && (
          <div className="grid grid-cols-2 gap-3 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 group">
              <div className="flex items-center gap-2 mb-1">
                <ArrowDown className="w-4 h-4 text-accent animate-bounce" />
                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Downlink</p>
              </div>
              <p className="font-code text-2xl font-black text-foreground">{downlink} <span className="text-[10px] text-muted-foreground font-normal">Mbps</span></p>
              <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-accent animate-pulse" style={{ width: '85%' }} />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
              <div className="flex items-center gap-2 mb-1">
                <ArrowUp className="w-4 h-4 text-accent/50" />
                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Uplink</p>
              </div>
              <p className="font-code text-2xl font-black text-foreground">{uplink} <span className="text-[10px] text-muted-foreground font-normal">Mbps</span></p>
              <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-accent/40" style={{ width: '45%' }} />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
