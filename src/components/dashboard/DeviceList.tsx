
"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Smartphone, Monitor, ShieldCheck, Wifi, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export function DeviceList() {
  const [currentDevice, setCurrentDevice] = useState<{
    id: string;
    name: string;
    platform: string;
    isConnected: boolean;
  } | null>(null);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    let platform = "Web Terminal";
    let deviceName = "Unknown Node";

    if (ua.includes("android")) {
      platform = "Android OS";
      deviceName = "Mobile Master Terminal";
    } else if (ua.includes("iphone") || ua.includes("ipad")) {
      platform = "iOS Device";
      deviceName = "Apple Security Node";
    } else if (ua.includes("linux")) {
      platform = "Linux Kernel";
      deviceName = "Workstation Terminal";
    } else if (ua.includes("windows")) {
      platform = "Windows Host";
      deviceName = "Desktop Gateway";
    }

    setCurrentDevice({
      id: 'active-session',
      name: deviceName,
      platform: platform,
      isConnected: true
    });
  }, []);

  const getIcon = (platform: string) => {
    if (platform.includes("Android") || platform.includes("iOS")) return <Smartphone className="w-5 h-5" />;
    if (platform.includes("Linux") || platform.includes("Windows")) return <Monitor className="w-5 h-5" />;
    return <Laptop className="w-5 h-5" />;
  };

  if (!currentDevice) return null;

  return (
    <Card className="bg-card/30 border-white/5 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
      <CardHeader className="pb-3">
        <CardTitle className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground flex items-center justify-between">
          Authorized Terminal Session
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] font-black text-primary">LIVE LINK</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20 shadow-inner group transition-all hover:bg-primary/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-black/60 flex items-center justify-center text-primary border border-primary/30 group-hover:scale-105 transition-transform">
              {getIcon(currentDevice.platform)}
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-tight italic text-white flex items-center gap-2">
                {currentDevice.name}
                <ExternalLink className="w-2.5 h-2.5 opacity-40" />
              </h4>
              <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">{currentDevice.platform}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-tighter italic">
              <ShieldCheck className="w-4 h-4" />
              <span>Tunnel Master</span>
            </div>
          </div>
        </div>
        
        <div className="pt-2 px-2">
          <div className="flex justify-between items-center text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">
            <span>Tunnel Persistence</span>
            <span>100% Secure</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-full" />
          </div>
        </div>

        <p className="text-[8px] text-center text-muted-foreground/30 uppercase font-black tracking-widest pt-1 italic">
          Multi-Device Sync: No other nodes linked.
        </p>
      </CardContent>
    </Card>
  );
}
