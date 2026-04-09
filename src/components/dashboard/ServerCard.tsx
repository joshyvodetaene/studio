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
  const loadColor = server.load < 50 ? "bg-green-500" : server.load < 80 ? "bg-yellow-500" : "bg-red-500";
  
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
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl">
            {server.country === 'CH' ? '🇨🇭' : server.country === 'DE' ? '🇩🇪' : server.country === 'US' ? '🇺🇸' : '🇯🇵'}
          </div>
          <div>
            <h3 className="font-semibold text-sm">{server.name}</h3>
            <p className="text-xs text-muted-foreground">{server.city}, {server.country}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Signal className="w-3 h-3" />
              <span>{server.latency}ms</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Zap className="w-3 h-3" />
              <span>{server.load}% load</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1 items-end">
            {server.supportsTcpTunnel && (
              <Badge variant="outline" className="text-[10px] py-0 border-accent/30 text-accent bg-accent/10">
                Tor Ready
              </Badge>
            )}
            <div className={cn("w-2 h-2 rounded-full", loadColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}