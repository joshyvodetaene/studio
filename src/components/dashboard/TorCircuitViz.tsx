"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Map, ShieldAlert, Loader2, Info, ChevronRight, ShieldCheck } from "lucide-react";
import { explainTorCircuit } from "@/ai/flows/explain-tor-circuit";
import { PRODUCTION_SERVERS } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

export function TorCircuitViz() {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const { toast } = useToast();

  const realCircuit = {
    entryNode: { 
      ip: PRODUCTION_SERVERS.find(s => s.id === 'node-at-vienna')?.endpoint.split(':')[0] || "193.171.202.150", 
      country: "Austria", 
      city: "Vienna" 
    },
    middleNode: { 
      ip: PRODUCTION_SERVERS.find(s => s.id === 'node-se-piraten')?.endpoint.split(':')[0] || "109.163.234.11", 
      country: "Sweden", 
      city: "Stockholm" 
    },
    exitNode: { 
      ip: PRODUCTION_SERVERS.find(s => s.id === 'node-de-torservers')?.endpoint.split(':')[0] || "185.220.101.44", 
      country: "Germany", 
      city: "Berlin" 
    }
  };

  const handleExplain = async () => {
    setLoading(true);
    try {
      const result = await explainTorCircuit(realCircuit);
      setExplanation(result.explanation);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Matrix-Timeout",
        description: "KI-Analyse verzögert. Fallback-Daten werden geladen."
      });
      // Da der Flow bereits einen Fallback liefert, ist dieser Catch nur für totale Netzwerkfehler
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-panel border-none h-full shadow-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Active Multi-Hop Topology
          </div>
          <Share2 className="w-3 h-3 cursor-pointer hover:text-accent transition-colors" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between px-2 relative py-4">
          <div className="absolute top-1/2 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent -z-10 -translate-y-1/2" />
          
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-accent text-background flex items-center justify-center font-black text-[10px] shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">GUARD</div>
            <div className="text-center">
              <p className="text-[9px] font-black text-white uppercase tracking-tighter">{realCircuit.entryNode.country.substring(0,2).toUpperCase()}</p>
              <p className="text-[7px] text-muted-foreground font-mono">{realCircuit.entryNode.ip.split('.').slice(0,3).join('.')}</p>
            </div>
          </div>
          
          <ChevronRight className="w-4 h-4 text-accent/20" />

          <div className="flex flex-col items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-black/40 border border-accent/30 text-accent flex items-center justify-center font-black text-[10px] group-hover:scale-110 transition-transform">RELAY</div>
            <div className="text-center">
              <p className="text-[9px] font-black text-white uppercase tracking-tighter">{realCircuit.middleNode.country.substring(0,2).toUpperCase()}</p>
              <p className="text-[7px] text-muted-foreground font-mono">{realCircuit.middleNode.ip.split('.').slice(0,3).join('.')}</p>
            </div>
          </div>

          <ChevronRight className="w-4 h-4 text-accent/20" />

          <div className="flex flex-col items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-black/40 border-dashed border-accent/40 text-accent flex items-center justify-center font-black text-[10px] group-hover:scale-110 transition-transform">EXIT</div>
            <div className="text-center">
              <p className="text-[9px] font-black text-white uppercase tracking-tighter">{realCircuit.exitNode.country.substring(0,2).toUpperCase()}</p>
              <p className="text-[7px] text-muted-foreground font-mono">{realCircuit.exitNode.ip.split('.').slice(0,3).join('.')}</p>
            </div>
          </div>
        </div>

        {!explanation ? (
          <Button 
            variant="outline" 
            className="w-full text-[10px] h-10 gap-2 border-white/10 hover:bg-white/5 font-black uppercase tracking-widest rounded-xl transition-all hover:border-accent/40"
            onClick={handleExplain}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : <ShieldCheck className="w-4 h-4 text-accent" />}
            Analyze Anonymity Layer
          </Button>
        ) : (
          <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 text-[11px] leading-relaxed animate-in fade-in zoom-in-95 duration-500 relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded bg-accent/20 flex items-center justify-center">
                <Info className="w-3 h-3 text-accent" />
              </div>
              <h5 className="font-black text-accent uppercase tracking-widest">Circuit Analysis Complete</h5>
            </div>
            <p className="text-foreground/80 leading-relaxed italic">"{explanation}"</p>
            <Button variant="link" className="p-0 h-auto text-[10px] text-accent mt-3 font-bold uppercase tracking-tighter hover:no-underline" onClick={() => setExplanation(null)}>
              Clear Buffer
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
