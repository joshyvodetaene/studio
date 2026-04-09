"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, Power, Activity, Network, Lock, Info } from "lucide-react";
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
      setTimeout(() => setStatus("connected"), 2000);
    } else {
      setStatus("disconnected");
    }
  };

  return (
    <Card className="glass border-none shadow-2xl h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" />
          Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center py-8 space-y-6">
          <div className="relative">
            <div className={cn(
              "absolute inset-0 rounded-full blur-2xl transition-all duration-1000",
              status === "connected" ? "bg-accent/40 scale-125" : status === "connecting" ? "bg-yellow-500/30 animate-pulse" : "bg-transparent"
            )} />
            <button 
              onClick={handleToggle}
              disabled={!selectedServer && status === "disconnected"}
              className={cn(
                "relative z-10 w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 transform active:scale-90 border-4",
                status === "connected" ? "bg-accent border-accent text-background" : 
                status === "connecting" ? "bg-secondary border-yellow-500 text-yellow-500" : 
                "bg-secondary/50 border-white/10 text-white hover:border-accent/50",
                !selectedServer && status === "disconnected" && "opacity-50 cursor-not-allowed"
              )}
            >
              <Power className="w-12 h-12" />
            </button>
          </div>
          
          <div className="text-center">
            <p className={cn(
              "text-lg font-bold tracking-wider uppercase",
              status === "connected" ? "text-accent" : status === "connecting" ? "text-yellow-500" : "text-muted-foreground"
            )}>
              {status === "connected" ? "Protected" : status === "connecting" ? "Establishing..." : "Not Protected"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {status === "connected" ? `Connected to ${selectedServer?.name}` : status === "connecting" ? "Securing tunnel" : "Select a server to start"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <div className="flex items-center gap-3">
              <Network className="w-4 h-4 text-accent" />
              <div>
                <Label htmlFor="tor-mode" className="text-sm cursor-pointer">Tor-Optimized Routing</Label>
                <p className="text-[10px] text-muted-foreground">Multi-hop anonymity layer</p>
              </div>
            </div>
            <Switch 
              id="tor-mode" 
              checked={torMode} 
              onCheckedChange={setTorMode}
              disabled={status !== "disconnected"}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-accent" />
              <div>
                <Label htmlFor="kill-switch" className="text-sm cursor-pointer">Network Kill Switch</Label>
                <p className="text-[10px] text-muted-foreground">Block all traffic on leak</p>
              </div>
            </div>
            <Switch id="kill-switch" checked={killSwitch} onCheckedChange={setKillSwitch} />
          </div>
        </div>

        {status === "connected" && (
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-3 rounded-lg bg-secondary/30 border border-white/5">
              <p className="text-[10px] text-muted-foreground uppercase">Downlink</p>
              <p className="font-mono text-sm font-bold text-accent">42.5 Mbps</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/30 border border-white/5">
              <p className="text-[10px] text-muted-foreground uppercase">Uplink</p>
              <p className="font-mono text-sm font-bold text-accent">12.1 Mbps</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}