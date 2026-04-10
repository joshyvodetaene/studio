
"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, Power, Activity, Lock, Zap, ArrowDown, ArrowUp, Loader2, Network, ShieldCheck, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { VpnServer } from "@/lib/server-data";

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
  
  const handleToggle = () => {
    const nextStatus = status === "disconnected" ? "connecting" : "disconnected";
    setStatus(nextStatus);
    onStatusChange?.(nextStatus);
    
    if (nextStatus === "disconnected") {
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
            onStatusChange?.("connected");
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [status, onStatusChange]);

  useEffect(() => {
    let throughputInterval: any;
    if (status === "connected") {
      throughputInterval = setInterval(() => {
        setDownlink(Math.floor(Math.random() * 80) + 120);
        setUplink(Math.floor(Math.random() * 30) + 40);
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
            Torro Backbone
          </div>
          {status === "connected" && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
              <Network className="w-3 h-3 text-accent" />
              <span className="text-[10px] text-accent uppercase font-black tracking-tighter italic">Full Device Guard</span>
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
          </div>
          
          <div className="text-center mt-6 h-16">
            <h2 className={cn(
              "text-3xl font-black tracking-tighter uppercase italic",
              status === "connected" ? "text-accent" : status === "connecting" ? "text-accent/80" : "text-muted-foreground"
            )}>
              {status === "connected" ? "Protected" : status === "connecting" ? "Shielding..." : "Ready"}
            </h2>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] mt-1">
              {status === "connected" ? `Active Node: ${selectedServer?.city}` : status === "connecting" ? "Syncing Handshake" : "Press to Encrypt Entire Device"}
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <Label htmlFor="full-tunnel" className="text-sm font-black block italic uppercase">Full Device Guard</Label>
                <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Route 100% of device traffic</p>
              </div>
            </div>
            <Switch 
              id="full-tunnel" 
              checked={fullTunnel} 
              onCheckedChange={setFullTunnel}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <Label htmlFor="kill-switch" className="text-sm font-black block uppercase italic">Quantum Lock</Label>
                <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Instant Block on Handshake loss</p>
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
                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Download</p>
              </div>
              <p className="font-code text-2xl font-black text-foreground">{downlink} <span className="text-[10px] text-muted-foreground font-normal">Mbit</span></p>
            </div>
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
              <div className="flex items-center gap-2 mb-1">
                <ArrowUp className="w-4 h-4 text-accent/50" />
                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Upload</p>
              </div>
              <p className="font-code text-2xl font-black text-foreground">{uplink} <span className="text-[10px] text-muted-foreground font-normal">Mbit</span></p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
