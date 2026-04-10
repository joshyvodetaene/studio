
"use client"

import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, Shield, Cpu, Zap, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  module: string;
}

export function TerminalLog({ isActive }: { isActive: boolean }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const modules = ["HANDSHAKE", "TUNNEL", "ROUTING", "CIPHER", "ONION"];
  const messages = [
    "ChaCha20-Poly1305 key rotation successful",
    "Multi-Hop circuit established via node-de-torservers",
    "Packet encapsulated in TLS 1.3 buffer",
    "Noise Protocol handshake completed in 12ms",
    "Bypassing ISP deep packet inspection",
    "Neural Engine optimized routing path",
    "Entropy pool re-seeded with quantum-safe data",
    "Heartbeat signal received from exit node",
    "Encrypted packet burst sent (1420 bytes)",
  ];

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString('de-DE', { hour12: false }),
        type: Math.random() > 0.1 ? 'success' : 'warning',
        module: modules[Math.floor(Math.random() * modules.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
      };
      
      setLogs(prev => [...prev.slice(-49), newLog]);
    }, 1500);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="flex flex-col h-full bg-black/60 rounded-2xl border border-white/5 overflow-hidden glass-panel">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-accent" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Neural Encryption Stream</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-accent animate-pulse" : "bg-muted")} />
          <span className="text-[8px] font-bold text-muted-foreground uppercase">{isActive ? "Streaming" : "Buffer Standby"}</span>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4 font-code text-[10px]">
        <div className="space-y-1.5">
          {logs.length === 0 && (
            <p className="text-muted-foreground italic opacity-50">Waiting for tunnel handshake...</p>
          )}
          {logs.map((log) => (
            <div key={log.id} className="flex gap-3 animate-in fade-in slide-in-from-left-1 duration-300">
              <span className="text-muted-foreground shrink-0">[{log.timestamp}]</span>
              <span className={cn(
                "font-bold shrink-0 w-12",
                log.type === 'success' ? "text-accent" : "text-yellow-500"
              )}>{log.module}</span>
              <span className="text-foreground/80">{log.message}</span>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      
      <div className="px-4 py-2 bg-black/40 border-t border-white/5 grid grid-cols-3 gap-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-3 h-3 text-accent/50" />
          <span className="text-[8px] text-muted-foreground font-bold">ARMv8 SHA-2</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-3 h-3 text-accent/50" />
          <span className="text-[8px] text-muted-foreground font-bold">X25519</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-3 h-3 text-accent/50" />
          <span className="text-[8px] text-muted-foreground font-bold">0-RTT</span>
        </div>
      </div>
    </div>
  );
}
