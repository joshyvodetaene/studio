
"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Map, ShieldAlert, Loader2, Info, ChevronRight } from "lucide-react";
import { explainTorCircuit } from "@/ai/flows/explain-tor-circuit";

export function TorCircuitViz() {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const mockCircuit = {
    entryNode: { ip: "185.220.101.44", country: "Germany", city: "Berlin" },
    middleNode: { ip: "109.163.234.11", country: "Sweden", city: "Stockholm" },
    exitNode: { ip: "82.165.177.100", country: "Switzerland", city: "Zurich" }
  };

  const handleExplain = async () => {
    setLoading(true);
    try {
      const result = await explainTorCircuit(mockCircuit);
      setExplanation(result.explanation);
    } catch (e) {
      // In a real app we would use a toast or error emitter
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-panel border-none h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-between">
          <span>Tor Circuit Topology</span>
          <Share2 className="w-3 h-3 cursor-pointer hover:text-accent transition-colors" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between px-2 relative">
          <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-accent/40 via-accent/10 to-accent/40 -z-10 -translate-y-1/2" />
          
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-accent text-background flex items-center justify-center font-black text-xs shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">E</div>
            <div className="text-center">
              <p className="text-[8px] font-black text-white uppercase tracking-tighter">Berlin</p>
              <p className="text-[7px] text-muted-foreground">Entry</p>
            </div>
          </div>
          
          <ChevronRight className="w-4 h-4 text-accent/30" />

          <div className="flex flex-col items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-black/40 border border-accent/30 text-accent flex items-center justify-center font-black text-xs shadow-xl group-hover:scale-110 transition-transform">M</div>
            <div className="text-center">
              <p className="text-[8px] font-black text-white uppercase tracking-tighter">Stockholm</p>
              <p className="text-[7px] text-muted-foreground">Relay</p>
            </div>
          </div>

          <ChevronRight className="w-4 h-4 text-accent/30" />

          <div className="flex flex-col items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-black/40 border-dashed border-accent/20 text-accent/50 flex items-center justify-center font-black text-xs group-hover:scale-110 transition-transform">X</div>
            <div className="text-center">
              <p className="text-[8px] font-black text-white uppercase tracking-tighter">Zurich</p>
              <p className="text-[7px] text-muted-foreground">Exit</p>
            </div>
          </div>
        </div>

        {!explanation ? (
          <Button 
            variant="outline" 
            className="w-full text-[10px] h-10 gap-2 border-white/10 hover:bg-white/5 font-black uppercase tracking-widest rounded-xl"
            onClick={handleExplain}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Map className="w-4 h-4" />}
            Analyze Node Integrity
          </Button>
        ) : (
          <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 text-[11px] leading-relaxed animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded bg-accent/20 flex items-center justify-center">
                <Info className="w-3 h-3 text-accent" />
              </div>
              <h5 className="font-black text-accent uppercase tracking-tighter">AI Security Briefing</h5>
            </div>
            <p className="text-muted-foreground leading-relaxed">{explanation}</p>
            <Button variant="link" className="p-0 h-auto text-[10px] text-accent mt-3 font-bold uppercase tracking-tighter" onClick={() => setExplanation(null)}>
              Dismiss Briefing
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
