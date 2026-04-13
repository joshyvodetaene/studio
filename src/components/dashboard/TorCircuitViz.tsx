"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Loader2, Info, ChevronRight, ShieldCheck, Radar } from "lucide-react";
import { PRODUCTION_SERVERS } from "@/lib/server-data";
import { useToast } from "@/hooks/use-toast";
import { analyzeTorCircuit } from "@/lib/services/network-engine";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function TorCircuitViz() {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const { toast } = useToast();

  const traceImg = PlaceHolderImages.find(img => img.id === 'trace-viz');

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
    setTimeout(() => {
      try {
        const result = analyzeTorCircuit(realCircuit);
        setExplanation(result);
        toast({
          title: "Topology Verified",
          description: "Neural trace analysis successful."
        });
      } catch (e) {
        toast({
          variant: "destructive",
          title: "Analysis Failure",
          description: "Could not retrieve topology details."
        });
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <Card className="glass-panel border-none h-full shadow-2xl relative overflow-hidden group neon-border">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors duration-700" />
      
      <CardHeader className="pb-4">
        <CardTitle className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radar className="w-4 h-4 text-primary animate-pulse" />
            Circuit Topology Radar
          </div>
          <Share2 className="w-3 h-3 cursor-pointer hover:text-primary transition-colors" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between px-2 relative py-6">
          <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent -z-10 -translate-y-1/2 animate-pulse" />
          
          <div className="flex flex-col items-center gap-2 group/node">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-black text-[10px] shadow-lg shadow-primary/30 group-hover/node:scale-110 transition-transform duration-500">GUARD</div>
            <div className="text-center">
              <p className="text-[10px] font-black text-white uppercase tracking-tighter">{realCircuit.entryNode.country.substring(0,3).toUpperCase()}</p>
              <p className="text-[8px] text-muted-foreground font-mono">{realCircuit.entryNode.city}</p>
            </div>
          </div>
          
          <ChevronRight className="w-5 h-5 text-primary/30" />

          <div className="flex flex-col items-center gap-2 group/node">
            <div className="w-12 h-12 rounded-full bg-black border-2 border-primary/40 text-primary flex items-center justify-center font-black text-[10px] group-hover/node:scale-110 transition-transform duration-500">RELAY</div>
            <div className="text-center">
              <p className="text-[10px] font-black text-white uppercase tracking-tighter">{realCircuit.middleNode.country.substring(0,3).toUpperCase()}</p>
              <p className="text-[8px] text-muted-foreground font-mono">{realCircuit.middleNode.city}</p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-primary/30" />

          <div className="flex flex-col items-center gap-2 group/node">
            <div className="w-12 h-12 rounded-full bg-black border-2 border-dashed border-primary/60 text-primary flex items-center justify-center font-black text-[10px] group-hover/node:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(153,27,27,0.2)]">EXIT</div>
            <div className="text-center">
              <p className="text-[10px] font-black text-white uppercase tracking-tighter">{realCircuit.exitNode.country.substring(0,3).toUpperCase()}</p>
              <p className="text-[8px] text-muted-foreground font-mono">{realCircuit.exitNode.city}</p>
            </div>
          </div>
        </div>

        {!explanation ? (
          <Button 
            variant="outline" 
            className="w-full text-[10px] h-11 gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 text-white font-black uppercase tracking-widest rounded-xl transition-all"
            onClick={handleExplain}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <ShieldCheck className="w-4 h-4 text-primary" />}
            Deep Trace Analysis
          </Button>
        ) : (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500 relative">
            <div className="relative h-24 w-full rounded-xl overflow-hidden border border-primary/20">
              <Image 
                src={traceImg?.imageUrl || ""} 
                alt="Trace Visualization" 
                fill 
                className="object-cover opacity-60" 
                data-ai-hint={traceImg?.imageHint} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-primary" />
                <span className="text-[8px] font-black uppercase tracking-widest text-white">Visual Verification Live</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-[11px] leading-relaxed">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                  <Info className="w-3.5 h-3.5 text-primary" />
                </div>
                <h5 className="font-black text-primary uppercase tracking-widest">Topology Verification Complete</h5>
              </div>
              <p className="text-foreground/90 leading-relaxed italic border-l-2 border-primary/30 pl-3">"{explanation}"</p>
              <Button variant="link" className="p-0 h-auto text-[10px] text-primary mt-4 font-bold uppercase tracking-tighter hover:no-underline" onClick={() => setExplanation(null)}>
                Reset Neural Trace
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}