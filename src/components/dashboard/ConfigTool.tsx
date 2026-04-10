
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Wand2, Terminal, Loader2, Check, Copy, RefreshCcw, Shield, Zap, Ghost } from "lucide-react";
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
        title: "Neural Engine Synced",
        description: `Profile optimized: ${intent}`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "AI Handshake Error",
        description: "Neural core timeout. Using local fallback."
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
    { label: "Stealth Mode", icon: <Ghost className="w-3 h-3" />, intent: "Maximum stealth in a high-surveillance country, prioritize anonymity over speed." },
    { label: "Stream Booster", icon: <Zap className="w-3 h-3" />, intent: "High-speed 4K streaming and low buffering, balanced security." },
    { label: "Balanced Guard", icon: <Shield className="w-3 h-3" />, intent: "General secure browsing with multi-hop protection and DNS shielding." }
  ];

  return (
    <Card className="glass-panel border-none h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Terminal className="w-5 h-5 text-accent" />
          Neural Config Engine
        </CardTitle>
        <CardDescription className="text-xs uppercase font-bold tracking-tight">
          AI-driven tunnel orchestration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        {!config ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-2">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Select AI Mission Profile</p>
              <div className="flex flex-wrap gap-2">
                {predefinedPrompts.map((p) => (
                  <Button 
                    key={p.label}
                    variant="outline" 
                    size="sm"
                    className="text-[10px] h-8 bg-white/5 border-white/10 hover:border-accent/50 gap-1.5 rounded-lg uppercase font-bold"
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
              <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Custom Parameters</label>
              <Textarea 
                placeholder='e.g., "I need to access my banking apps safely while travelling in Asia."'
                className="bg-black/40 border-white/5 min-h-[100px] text-sm focus:ring-accent/50 transition-all rounded-xl"
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
              Analyze & Orchestrate
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-[11px] leading-relaxed">
              <h5 className="font-black text-accent flex items-center gap-1.5 mb-2 uppercase tracking-tighter">
                <Check className="w-3 h-3" /> Synthesis Complete
              </h5>
              <p className="text-foreground/90">{config.explanation}</p>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-black/20 p-2 rounded-lg border border-white/5 text-[9px] font-mono">
                  <span className="text-muted-foreground">HOPS:</span> <span className="text-accent">{config.hops}</span>
                </div>
                <div className="bg-black/20 p-2 rounded-lg border border-white/5 text-[9px] font-mono">
                  <span className="text-muted-foreground">MTU:</span> <span className="text-accent">{config.mtu}</span>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="bg-black/60 p-5 rounded-xl font-code text-[10px] overflow-x-auto whitespace-pre border border-white/5 max-h-[180px] leading-relaxed">
                {`[Interface]\nPrivateKey = <ENCRYPTED_VAULT_KEY>\nMTU = ${config.mtu}\nDNS = ${config.dnsOverHttps ? '1.1.1.1 (DoH)' : '8.8.8.8'}\n\n[Peer]\nEndpoint = ${config.recommendedServerId}.torro.pro\nAllowedIPs = 0.0.0.0/0\nSplitTunneling = ${config.splitTunneling ? 'Active' : 'Disabled'}`}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 bg-black/40 hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => copyToClipboard(`Config: ${config.recommendedServerId}`)}
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
                <Download className="w-3 h-3" /> Save .conf
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
