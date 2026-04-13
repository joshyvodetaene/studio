
"use client"

import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, Shield, Cpu, Zap, Activity, Bug, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'firewall';
  message: string;
  module: string;
}

export function TerminalLog({ isActive }: { isActive: boolean }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const modules = ["CIPHER", "TUNNEL", "ROUTING", "HANDSHAKE", "KERNEL", "FIREWALL"];
  const messages = [
    "Handshake rotation sequence successful",
    "ChaCha20-Poly1305 stream established",
    "Onion-Route hop selection randomized",
    "X25519 elliptic curve key-exchange complete",
    "Bypassing provider deep packet analysis",
    "Neural synthesis profile synchronized",
    "Entropy re-seeded (Quantum-Safe source)",
    "Heartbeat ACK received from peer",
    "TUN0 interface buffer optimization active",
    "FIREWALL: Blocked incoming packet from unauthorized IP",
    "FIREWALL: Intercepted TCP SYN flood attempt",
  ];

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const typeChance = Math.random();
      const type: LogEntry['type'] = typeChance > 0.8 ? 'firewall' : (typeChance > 0.1 ? 'success' : 'warning');
      const module = type === 'firewall' ? 'FIREWALL' : modules[Math.floor(Math.random() * (modules.length - 1))];
      
      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString('de-DE', { hour12: false, minute: '2-digit', second: '2-digit' }),
        type,
        module,
        message: messages[Math.floor(Math.random() * messages.length)],
      };
      
      setLogs(prev => [...prev.slice(-30), newLog]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="flex flex-col h-full bg-black/80 rounded-2xl border border-white/5 overflow-hidden glass-panel neon-border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/40">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Neural Execution Log</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-primary animate-pulse shadow-[0_0_5px_rgba(153,27,27,0.8)]" : "bg-muted")} />
          <span className="text-[8px] font-bold text-muted-foreground uppercase">{isActive ? "Processing" : "Idle"}</span>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-5 font-code text-[10px] leading-relaxed">
        <div className="space-y-1.5">
          {logs.length === 0 && (
            <div className="flex flex-col items-center justify-center h-20 opacity-30 text-muted-foreground italic gap-2">
              <Bug className="w-5 h-5" />
              <span>Awaiting tunnel initialization...</span>
            </div>
          )}
          {logs.map((log) => (
            <div key={log.id} className="flex gap-4 animate-in fade-in slide-in-from-left-2 duration-400 group">
              <span className="text-muted-foreground/60 shrink-0 font-mono">[{log.timestamp}]</span>
              <span className={cn(
                "font-black shrink-0 w-14 tracking-tighter uppercase flex items-center gap-1",
                log.type === 'firewall' ? "text-primary" : (log.type === 'success' ? "text-primary/90" : "text-primary/50")
              )}>
                {log.type === 'firewall' && <Flame className="w-2.5 h-2.5" />}
                {log.module}
              </span>
              <span className={cn(
                "group-hover:text-white transition-colors",
                log.type === 'firewall' ? "text-primary italic font-bold" : "text-white/80"
              )}>{log.message}</span>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      
      <div className="px-5 py-2.5 bg-black/60 border-t border-white/5 grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-primary/40" />
          <span className="text-[8px] text-muted-foreground font-black uppercase">V8-SHA256</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-primary/40" />
          <span className="text-[8px] text-muted-foreground font-black uppercase">AES-GCM</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-primary/40" />
          <span className="text-[8px] text-muted-foreground font-black uppercase">0-RTT-v2</span>
        </div>
      </div>
    </div>
  );
}
