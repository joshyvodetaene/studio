
"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network, Server, Fingerprint, Database, Cpu, Activity, ShieldCheck, Wifi } from "lucide-react";
import { VpnServer } from "@/lib/server-data";
import { cn } from "@/lib/utils";

interface NetworkInterfaceDetailsProps {
  isConnected: boolean;
  selectedServer: VpnServer | null;
}

export function NetworkInterfaceDetails({ isConnected, selectedServer }: NetworkInterfaceDetailsProps) {
  const [stats, setStats] = useState({
    packetsIn: 0,
    packetsOut: 0,
    uptime: "00:00:00",
    localIp: "192.168.178.45",
  });

  useEffect(() => {
    let interval: any;
    if (isConnected) {
      const startTime = Date.now();
      interval = setInterval(() => {
        setStats(prev => ({
          ...prev,
          packetsIn: prev.packetsIn + Math.floor(Math.random() * 50),
          packetsOut: prev.packetsOut + Math.floor(Math.random() * 20),
          uptime: new Date(Date.now() - startTime).toISOString().substr(11, 8),
        }));
      }, 1000);
    } else {
      setStats(prev => ({ ...prev, packetsIn: 0, packetsOut: 0, uptime: "00:00:00" }));
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-panel border-none">
          <CardHeader className="p-4">
            <CardTitle className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2">
              <Fingerprint className="w-3 h-3 text-accent" /> Virtual Interface
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-xl font-mono font-bold text-accent">tun0</p>
            <p className="text-[9px] text-muted-foreground uppercase font-black mt-1">Status: {isConnected ? "UP / RUNNING" : "DOWN"}</p>
          </CardContent>
        </Card>
        
        <Card className="glass-panel border-none">
          <CardHeader className="p-4">
            <CardTitle className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2">
              <Activity className="w-3 h-3 text-accent" /> Uptime
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-xl font-mono font-bold text-white">{stats.uptime}</p>
            <p className="text-[9px] text-muted-foreground uppercase font-black mt-1 italic">Continuous Encryption</p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-none">
          <CardHeader className="p-4">
            <CardTitle className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2">
              <Database className="w-3 h-3 text-accent" /> Protocol MTU
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-xl font-mono font-bold text-white">1420</p>
            <p className="text-[9px] text-muted-foreground uppercase font-black mt-1">Optimized for WireGuard</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel border-none">
        <CardHeader>
          <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <Network className="w-4 h-4 text-accent" />
            Layer 3 / Layer 4 Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[9px] font-black text-muted-foreground uppercase mb-2">Local Interface IP</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">{stats.localIp}</span>
                <Badge variant="outline" className="text-[8px] uppercase border-white/20">WLAN0</Badge>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
              <p className="text-[9px] font-black text-accent uppercase mb-2">Tunnel Endpoint IP</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-accent">{isConnected ? selectedServer?.endpoint.split(':')[0] : "---.---.---.---"}</span>
                {isConnected && <ShieldCheck className="w-4 h-4 text-accent" />}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Encryption Cipher</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-accent">ChaCha20-Poly1305</span>
            </div>
            
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <Wifi className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Handshake Interval</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-white">120 Seconds</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-[9px] text-muted-foreground uppercase font-black">Packets Inbound</p>
                <p className="text-lg font-mono font-bold">{stats.packetsIn.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[9px] text-muted-foreground uppercase font-black">Packets Outbound</p>
                <p className="text-lg font-mono font-bold">{stats.packetsOut.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
