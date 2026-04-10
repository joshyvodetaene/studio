"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Smartphone, Monitor, ShieldCheck, Clock, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export function DeviceList() {
  const [currentDevice, setCurrentDevice] = useState<{
    id: string;
    name: string;
    platform: string;
    isConnected: boolean;
  } | null>(null);

  useEffect(() => {
    // Dynamische Erkennung der aktuellen Plattform
    const ua = window.navigator.userAgent.toLowerCase();
    let platform = "Web Terminal";
    let iconType = "laptop";

    if (ua.includes("android")) {
      platform = "Android Interface";
      iconType = "smartphone";
    } else if (ua.includes("iphone") || ua.includes("ipad")) {
      platform = "iOS Interface";
      iconType = "smartphone";
    } else if (ua.includes("linux")) {
      platform = "Linux Core";
      iconType = "monitor";
    }

    setCurrentDevice({
      id: 'active-session',
      name: 'Current Master Terminal',
      platform: platform,
      isConnected: true
    });
  }, []);

  const getIcon = (platform: string) => {
    if (platform.includes("Android") || platform.includes("iOS")) return <Smartphone className="w-4 h-4" />;
    if (platform.includes("Linux") || platform.includes("Windows")) return <Monitor className="w-4 h-4" />;
    return <Laptop className="w-4 h-4" />;
  };

  if (!currentDevice) return null;

  return (
    <Card className="bg-card/30 border-white/5 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12" />
      <CardHeader className="pb-2">
        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-between">
          Active Interface Nodes
          <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 animate-pulse">
            1 SESSION LIVE
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10 shadow-inner group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-black/60 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-105 transition-transform">
              {getIcon(currentDevice.platform)}
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-tight italic text-white">{currentDevice.name}</h4>
              <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">{currentDevice.platform}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-[9px] font-black text-primary uppercase tracking-tighter italic">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Session Secure</span>
            </div>
          </div>
        </div>
        
        <p className="text-[8px] text-center text-muted-foreground/40 uppercase font-black tracking-widest pt-2 italic">
          No secondary terminal links detected.
        </p>
      </CardContent>
    </Card>
  );
}
