"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Wand2, Terminal, Loader2, Check, Copy, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { recommendOptimalNode } from "@/lib/services/network-engine";

export function ConfigTool() {
  const [needs, setNeeds] = useState("");
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<any>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!needs) return;
    setLoading(true);
    
    // Künstlicher Delay für das High-Performance-Gefühl der "Neural Engine"
    setTimeout(() => {
      try {
        const result = recommendOptimalNode(needs);
        setConfig(result);
        toast({
          title: "Neural Engine Sync Complete",
          description: `Recommended node: ${result.recommendedServerId}`
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Synthesis Failed",
          description: "Anonymity layer handshake timed out."
        });
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to terminal buffer" });
  };

  return (
    <Card className="glass-panel border-none h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Terminal className="w-5 h-5 text-accent" />
          Neural Config Engine
        </CardTitle>
        <CardDescription className="text-xs">
          AI-driven node selection & WireGuard generation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        {!config ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Input Mission Parameters</label>
              <Textarea 
                placeholder='e.g., "Fastest connection for secure high-definition streaming in Switzerland."'
                className="bg-black/40 border-white/5 min-h-[120px] text-sm focus:ring-accent/50 transition-all rounded-xl"
                value={needs}
                onChange={(e) => setNeeds(e.target.value)}
              />
            </div>
            <Button 
              className="w-full bg-accent hover:bg-accent/80 text-background font-black gap-2 h-12 rounded-xl transition-all hover:scale-[1.02]"
              onClick={handleGenerate}
              disabled={loading || !needs}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
              Generate Optimal Tunnel
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-[11px] leading-relaxed relative">
              <h5 className="font-black text-accent flex items-center gap-1.5 mb-2 uppercase tracking-tighter">
                <Check className="w-3 h-3" /> System Recommendation
              </h5>
              <p className="text-foreground/90">{config.explanation}</p>
              <div className="absolute top-4 right-4 text-[8px] font-mono text-accent/50 uppercase">Analysis Match: 98%</div>
            </div>
            
            <div className="group relative">
              <div className="bg-black/60 p-5 rounded-xl font-code text-[10px] overflow-x-auto whitespace-pre border border-white/5 max-h-[180px] leading-relaxed">
                {`[Interface]\nPrivateKey = <LOCAL_VAULT_KEY>\nAddress = ${config.wireguardConfigDetails.clientAddress}\nDNS = ${config.wireguardConfigDetails.dns.join(', ')}\n\n[Peer]\nPublicKey = ${config.wireguardConfigDetails.serverPublicKey}\nEndpoint = ${config.wireguardConfigDetails.serverEndpoint}\nAllowedIPs = 0.0.0.0/0`}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 bg-black/40 hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => copyToClipboard(`Address = ${config.wireguardConfigDetails.clientAddress}\nEndpoint = ${config.wireguardConfigDetails.serverEndpoint}`)}
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
                <RefreshCcw className="w-3 h-3 mr-2" /> New Setup
              </Button>
              <Button className="flex-1 bg-accent text-background text-[10px] font-black gap-2 h-10 rounded-xl uppercase tracking-widest shadow-lg shadow-accent/20">
                <Download className="w-3 h-3" /> Export .conf
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
