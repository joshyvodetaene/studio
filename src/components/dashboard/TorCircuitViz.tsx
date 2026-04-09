"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Map, ShieldAlert, Loader2, Info } from "lucide-react";
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
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card/30 border-white/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center justify-between">
          Active Tor Circuit
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-accent">
            <Share2 className="w-3 h-3" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between px-4 relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-accent/20 -z-10" />
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent text-background flex items-center justify-center font-bold text-xs">E</div>
            <p className="text-[10px] text-muted-foreground">Entry</p>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/50 text-accent flex items-center justify-center font-bold text-xs">M</div>
            <p className="text-[10px] text-muted-foreground">Middle</p>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-xs">X</div>
            <p className="text-[10px] text-muted-foreground">Exit</p>
          </div>
        </div>

        {!explanation ? (
          <Button 
            variant="secondary" 
            className="w-full text-xs h-8 gap-2 border border-white/5"
            onClick={handleExplain}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Map className="w-3 h-3" />}
            Analyze Circuit Privacy
          </Button>
        ) : (
          <div className="p-3 rounded-lg bg-secondary/30 border border-white/5 text-[11px] leading-relaxed animate-in fade-in duration-700">
            <p className="text-muted-foreground italic mb-2 flex items-center gap-1">
              <Info className="w-3 h-3" /> AI Analysis:
            </p>
            {explanation}
            <Button variant="link" className="p-0 h-auto text-[10px] text-accent mt-2" onClick={() => setExplanation(null)}>
              Reset Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}