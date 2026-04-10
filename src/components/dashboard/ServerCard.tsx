"use client"

import { VpnServer } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Signal, Globe, Zap, ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServerCardProps {
  server: VpnServer;
  isSelected: boolean;
  onSelect: (server: VpnServer) => void;
}

export function ServerCard({ server, isSelected, onSelect }: ServerCardProps) {
  const loadColor = server.load < 30 ? "bg-green-500" : server.load < 70 ? "bg-yellow-500" : "bg-red-500";
  
  const getFlag = (code: string) => {
    const flags: Record<string, string> = {
      'CH': '🇨🇭', 'DE': '🇩🇪', 'US': '🇺🇸', 'JP': '🇯🇵', 'SE': '🇸🇪', 'IS': '🇮🇸'
    };
    return flags[code] || '🌐';
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:border-accent group relative overflow-hidden border-none",
        isSelected ? "bg-accent/10 ring-2 ring-accent" : "bg-white/5 hover:bg-white/10"
      )}
      onClick={() => onSelect(server)}
    >
      <CardContent className="p-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-black/40 flex items-center justify-center text-2xl border border-white/10 shadow-inner">
            {getFlag(server.country)}
          </div>
          <div>
            <h3 className="font-black text-sm tracking-tight italic uppercase">{server.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{server.city}</p>
              <span className="text-[9px] text-accent font-mono bg-accent/10 px-1.5 rounded-md border border-accent/20">{server.bandwidth}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-1.5 text-[10px] text-foreground font-mono font-bold">
              <Activity className="w-3 h-3 text-accent" />
              <span>{server.latency}ms</span>
            </div>
            <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
              <div className={cn("h-full transition-all duration-500", loadColor)} style={{ width: `${server.load}%` }} />
            </div>
          </div>
          
          <div className="flex flex-col gap-1 items-center justify-center">
            {isSelected ? (
              <Zap className="w-4 h-4 text-accent fill-accent animate-pulse" />
            ) : (
              <div className={cn("w-2 h-2 rounded-full", loadColor)} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
