"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Wand2, Terminal, Loader2, Check, Copy, RefreshCcw, Shield, Zap, Ghost, Gamepad2, BrainCircuit } from "lucide-react";
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
        title: "Synthesis Stream Active",
        description: "Rebuilding tunnel architecture..."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Matrix Error",
        description: "Neural synthesis timed out."
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to neural buffer" });
  };

  const predefinedPrompts = [
    { label: "Stealth", icon: <Ghost className="w-3.5 h-3.5" />, intent: "Maximum military-grade stealth and high surveillance protection." },
    { label: "Stream", icon: <Zap className="w-3.5 h-3.5" />, intent: "High-speed 4K/8K streaming booster profile." },
    { label: "Gaming", icon: <Gamepad2 className="w-3.5 h-3.5" />, intent: "Ultra low-latency ping for competitive gaming clusters." },
    { label: "Safety", icon: <Shield className="w-3.5 h-3.5" />, intent: "Secure financial browsing guard with DNS encryption." }
  ];

  return (
    <Card className="glass-panel border-none h-full flex flex-col shadow-2xl neon-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-primary" />
          Neural Engine PRO
        </CardTitle>
        <CardDescription className="text-[10px] uppercase font-bold tracking-[0.1em] text-muted-foreground">
          Autonomous Config Synthesis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        {!config ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-3">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Mission Profiles</p>
              <div className="grid grid-cols-2 gap-2">
                {predefinedPrompts.map((p) => (
                  <Button 
                    key={p.label}
                    variant="outline" 
                    size="sm"
                    className="text-[10px] h-10 bg-white/5 border-white/5 hover:border-primary/50 gap-2 rounded-xl uppercase font-bold transition-all"
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
              <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Custom Neural Intent</label>
              <Textarea 
                placeholder='E.g. "Banking via untrusted airport WiFi"'
                className="bg-black/60 border-white/5 min-h-[120px] text-sm focus:border-primary/50 transition-all rounded-xl placeholder:text-muted-foreground/20 italic"
                value={needs}
                onChange={(e) => setNeeds(e.target.value)}
              />
            </div>
            
            <Button 
              className="w-full bg-primary hover:bg-primary/80 text-white font-black gap-2 h-14 rounded-xl transition-all shadow-lg shadow-primary/20 uppercase tracking-widest italic"
              onClick={() => handleAIAction(needs)}
              disabled={loading || !needs}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BrainCircuit className="w-5 h-5" />}
              Execute Synthesis
            </Button>
          </div>
        ) : (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20 text-[11px] leading-relaxed">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-black text-primary flex items-center gap-2 uppercase tracking-tighter">
                  <Check className="w-4 h-4" /> Config Synthesized
                </h5>
                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
              </div>
              <p className="text-white/90 italic leading-relaxed">"{config.explanation}"</p>
              
              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  { label: 'HOPS', val: config.hops },
                  { label: 'MTU', val: config.mtu },
                  { label: 'DNS', val: config.dnsOverHttps ? 'DoH' : 'BASE' }
                ].map((stat) => (
                  <div key={stat.label} className="bg-black/40 p-3 rounded-xl border border-white/5 text-[9px] font-mono flex flex-col items-center gap-1">
                    <span className="text-muted-foreground tracking-widest">{stat.label}</span>
                    <span className="text-primary font-black text-sm">{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="group relative">
              <div className="bg-black/80 p-6 rounded-2xl font-code text-[11px] overflow-x-auto whitespace-pre border border-white/5 max-h-[180px] leading-relaxed text-red-100/60 scrollbar-hide">
                {`[Interface]\nPrivateKey = <REDACTED>\nMTU = ${config.mtu}\nDNS = ${config.dnsOverHttps ? 'Sec-DoH-1' : '1.1.1.1'}\n\n[Peer]\nEndpoint = dark-${config.recommendedServerId}.pro\nAllowedIPs = 0.0.0.0/0`}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-3 right-3 h-10 w-10 bg-black/60 hover:bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                onClick={() => copyToClipboard(`Config: ${config.recommendedServerId}`)}
              >
                <Copy className="w-4 h-4 text-primary" />
              </Button>
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1 text-[10px] font-bold border-white/10 hover:bg-white/5 h-12 rounded-xl uppercase tracking-[0.2em]"
                onClick={() => setConfig(null)}
              >
                <RefreshCcw className="w-3.5 h-3.5 mr-2" /> Reset
              </Button>
              <Button className="flex-1 bg-primary text-white text-[10px] font-black gap-2 h-12 rounded-xl uppercase tracking-[0.2em] shadow-lg shadow-primary/30">
                <Download className="w-3.5 h-3.5" /> Deploy
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
