"use client"

import { VpnServer } from "@/lib/server-data";
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
  const loadColor = server.load < 30 ? "bg-red-500" : server.load < 70 ? "bg-red-700" : "bg-red-900";
  
  const getFlag = (code: string) => {
    const flags: Record<string, string> = {
      'CH': '🇨🇭', 'DE': '🇩🇪', 'US': '🇺🇸', 'JP': '🇯🇵', 'SE': '🇸🇪', 'IS': '🇮🇸', 'NL': '🇳🇱', 'FI': '🇫🇮', 'AT': '🇦🇹'
    };
    return flags[code] || '🌐';
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:border-primary/50 group relative overflow-hidden border-white/5",
        isSelected ? "bg-primary/10 ring-1 ring-primary border-primary/40 shadow-[0_0_20px_rgba(220,20,60,0.2)]" : "bg-white/5 hover:bg-white/10"
      )}
      onClick={() => onSelect(server)}
    >
      <CardContent className="p-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-2xl bg-black/60 flex items-center justify-center text-2xl border border-white/10 shadow-inner transition-transform group-hover:scale-105",
            isSelected && "border-primary/30"
          )}>
            {getFlag(server.country)}
          </div>
          <div>
            <h3 className="font-black text-sm tracking-tight italic uppercase">{server.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">{server.city}</p>
              <span className="text-[8px] text-primary font-mono bg-primary/10 px-1.5 rounded-md border border-primary/20">{server.bandwidth}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-1.5 text-[9px] text-foreground font-mono font-bold">
              <Activity className="w-3 h-3 text-primary" />
              <span>{server.latency}ms</span>
            </div>
            <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
              <div className={cn("h-full transition-all duration-700", loadColor)} style={{ width: `${server.load}%` }} />
            </div>
          </div>
          
          <div className="flex flex-col gap-1 items-center justify-center">
            {isSelected ? (
              <Zap className="w-4 h-4 text-primary fill-primary animate-pulse" />
            ) : (
              <div className={cn("w-2 h-2 rounded-full opacity-40", loadColor)} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
