
"use client"

import { useState, useEffect } from "react";
import { Shield, Power, Loader2, Lock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { vpnBackgroundService } from "@/lib/services/vpn-background-service";

export default function WidgetPage() {
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check initial status
    if (vpnBackgroundService.isActive()) {
      setStatus("connected");
    }

    // Handle potential auto-connect from manifest shortcut
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'connect' && !vpnBackgroundService.isActive()) {
      handleToggle();
    }
  }, []);

  const handleToggle = async () => {
    if (status === "disconnected") {
      setStatus("connecting");
      setProgress(0);
      await vpnBackgroundService.activateTunnel();
    } else {
      setStatus("disconnected");
      setProgress(0);
      await vpnBackgroundService.deactivateTunnel();
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
          return prev + 20;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 select-none overflow-hidden touch-none">
      <div className={cn(
        "w-full max-w-sm glass-panel p-8 rounded-[2.5rem] flex flex-col items-center gap-8 relative border-none shadow-[0_0_50px_rgba(0,0,0,1)]",
        status === "connected" ? "neon-border" : "border-white/5"
      )}>
        <Link href="/" className="absolute top-6 left-6 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        
        <div className="absolute top-6 right-6">
          <div className={cn(
            "w-2 h-2 rounded-full",
            status === "connected" ? "bg-primary animate-pulse shadow-[0_0_8px_red]" : "bg-muted"
          )} />
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-lg font-black uppercase tracking-widest text-primary italic">Torro <span className="text-white">PRO</span></h1>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Neural Widget</p>
        </div>

        <button 
          onClick={handleToggle}
          className={cn(
            "w-40 h-40 rounded-full flex items-center justify-center transition-all duration-700 active:scale-90 border-[12px] relative group",
            status === "connected" ? "bg-primary border-primary/20 shadow-[0_0_40px_rgba(153,27,27,0.5)]" : 
            status === "connecting" ? "bg-secondary border-primary/40" : 
            "bg-secondary/40 border-white/5 text-muted-foreground"
          )}
        >
          {status === "connecting" ? (
            <Loader2 className="w-16 h-16 animate-spin text-primary" />
          ) : (
            <Power className={cn("w-16 h-16 transition-transform duration-700", status === "connected" ? "text-white rotate-180" : "text-muted-foreground")} />
          )}
          
          {status === "connected" && (
            <div className="absolute -bottom-2 bg-black border border-primary/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xl">
              <Lock className="w-3 h-3 text-primary" />
              <span className="text-[8px] font-black text-white uppercase tracking-widest">Locked</span>
            </div>
          )}
        </button>

        <div className="text-center w-full">
          <p className={cn(
            "text-2xl font-black italic uppercase tracking-tighter mb-1",
            status === "connected" ? "text-primary" : status === "connecting" ? "text-primary/80" : "text-muted-foreground"
          )}>
            {status === "connected" ? "Encrypted" : status === "connecting" ? "Syncing..." : "Offline"}
          </p>
          <div className="h-1 w-24 bg-white/5 rounded-full mx-auto overflow-hidden">
             <div className={cn("h-full bg-primary transition-all duration-300", status === "connected" ? "w-full" : status === "connecting" ? "w-1/2" : "w-0")} />
          </div>
        </div>

        <p className="text-[9px] text-muted-foreground/40 uppercase font-black text-center tracking-[0.2em] max-w-[200px]">
          Always-on protection active. Tap to toggle global tunnel.
        </p>
      </div>
    </div>
  );
}
