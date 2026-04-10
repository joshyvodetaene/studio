
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Wand2, Terminal, Loader2, Check, Copy, RefreshCcw, Shield, Zap, Ghost, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { configureTunnel, TunnelConfigOutput } from "@/ai/flows/configure-tunnel-flow";

export function ConfigTool() {
  const [needs, setNeeds] = useState("");
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<TunnelConfigOutput | null>(null);
  const { toast } = useToast();

  const handleAIAction = async (intent: string) => {
    setLoading(true);
    setNeeds(intent);
    try {
      const result = await configureTunnel({ userIntent: intent });
      setConfig(result);
      toast({
        title: "Neural Synthesis Active",
        description: "Optimizing tunnel architecture..."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Synthesis Error",
        description: "Fallback to local safe defaults."
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to buffer" });
  };

  const predefinedPrompts = [
    { label: "Stealth", icon: <Ghost className="w-3 h-3" />, intent: "Maximum stealth and high surveillance protection." },
    { label: "Stream", icon: <Zap className="w-3 h-3" />, intent: "High-speed 4K streaming booster." },
    { label: "Gaming", icon: <Gamepad2 className="w-3 h-3" />, intent: "Ultra low-latency ping for gaming." },
    { label: "Safe", icon: <Shield className="w-3 h-3" />, intent: "General secure browsing guard." }
  ];

  return (
    <Card className="glass-panel border-none h-full flex flex-col shadow-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Terminal className="w-5 h-5 text-accent" />
          Neural Engine PRO
        </CardTitle>
        <CardDescription className="text-xs uppercase font-bold tracking-tight text-muted-foreground">
          Local AI Architecture Synthesis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        {!config ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-2">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Target Mission Profile</p>
              <div className="flex flex-wrap gap-2">
                {predefinedPrompts.map((p) => (
                  <Button 
                    key={p.label}
                    variant="outline" 
                    size="sm"
                    className="text-[10px] h-8 bg-white/5 border-white/10 hover:border-accent/50 gap-1.5 rounded-lg uppercase font-bold transition-all"
                    onClick={() => handleAIAction(p.intent)}
                    disabled={loading}
                  >
                    {p.icon}
                    {p.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Custom Intent Analysis</label>
              <Textarea 
                placeholder='Tell Torro what you need... e.g. "Safe banking while traveling"'
                className="bg-black/40 border-white/5 min-h-[100px] text-sm focus:ring-accent/50 transition-all rounded-xl placeholder:text-muted-foreground/30"
                value={needs}
                onChange={(e) => setNeeds(e.target.value)}
              />
            </div>
            
            <Button 
              className="w-full bg-accent hover:bg-accent/80 text-background font-black gap-2 h-12 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-accent/20"
              onClick={() => handleAIAction(needs)}
              disabled={loading || !needs}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
              Synthesize Configuration
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-[11px] leading-relaxed">
              <h5 className="font-black text-accent flex items-center gap-1.5 mb-2 uppercase tracking-tighter">
                <Check className="w-3 h-3" /> Synthesis Complete
              </h5>
              <p className="text-foreground/90 italic">"{config.explanation}"</p>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-black/20 p-2 rounded-lg border border-white/5 text-[9px] font-mono flex flex-col items-center">
                  <span className="text-muted-foreground">HOPS</span>
                  <span className="text-accent font-black text-xs">{config.hops}</span>
                </div>
                <div className="bg-black/20 p-2 rounded-lg border border-white/5 text-[9px] font-mono flex flex-col items-center">
                  <span className="text-muted-foreground">MTU</span>
                  <span className="text-accent font-black text-xs">{config.mtu}</span>
                </div>
                <div className="bg-black/20 p-2 rounded-lg border border-white/5 text-[9px] font-mono flex flex-col items-center">
                  <span className="text-muted-foreground">TUNNEL</span>
                  <span className="text-accent font-black text-[8px]">{config.splitTunneling ? 'SPLIT' : 'FULL'}</span>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="bg-black/60 p-5 rounded-xl font-code text-[10px] overflow-x-auto whitespace-pre border border-white/5 max-h-[150px] leading-relaxed text-cyan-100/70">
                {`[Interface]\nPrivateKey = <ENCRYPTED>\nMTU = ${config.mtu}\nDNS = ${config.dnsOverHttps ? 'DoH-Active' : '1.1.1.1'}\n\n[Peer]\nEndpoint = ${config.recommendedServerId}.torro.pro\nAllowedIPs = 0.0.0.0/0`}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 bg-black/40 hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => copyToClipboard(`Profile: ${config.recommendedServerId}`)}
              >
                <Copy className="w-3 h-3 text-accent" />
              </Button>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 text-[10px] font-bold border-white/10 hover:bg-white/5 h-10 rounded-xl uppercase tracking-widest"
                onClick={() => setConfig(null)}
              >
                <RefreshCcw className="w-3 h-3 mr-2" /> Reset Engine
              </Button>
              <Button className="flex-1 bg-accent text-background text-[10px] font-black gap-2 h-10 rounded-xl uppercase tracking-widest shadow-lg shadow-accent/20">
                <Download className="w-3 h-3" /> Apply Profile
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
