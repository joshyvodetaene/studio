
"use client"

import { VpnServer } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Signal, Globe, Zap, ShieldCheck } from "lucide-react";
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
        "cursor-pointer transition-all duration-300 hover:border-accent group relative overflow-hidden",
        isSelected ? "border-accent ring-1 ring-accent bg-accent/5" : "bg-card/50 border-white/5"
      )}
      onClick={() => onSelect(server)}
    >
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl shadow-inner border border-white/5">
            {getFlag(server.country)}
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight">{server.name}</h3>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{server.city}, {server.country}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
              <Signal className="w-3 h-3 text-accent" />
              <span>{server.latency}ms</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
              <Zap className="w-3 h-3 text-yellow-500" />
              <span>{server.load}% LOAD</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1 items-end">
            {server.supportsTcpTunnel && (
              <Badge variant="outline" className="text-[9px] py-0 px-1.5 border-accent/30 text-accent bg-accent/5 font-black uppercase tracking-tighter">
                Tor Ready
              </Badge>
            )}
            <div className={cn("w-1.5 h-1.5 rounded-full shadow-[0_0_8px] shadow-current transition-colors", loadColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
