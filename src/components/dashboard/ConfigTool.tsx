"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, Wand2, Terminal, Loader2, Check } from "lucide-react";
import { recommendServerConfig } from "@/ai/flows/recommend-server-config";
import { useToast } from "@/hooks/use-toast";

export function ConfigTool() {
  const [needs, setNeeds] = useState("");
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<any>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!needs) return;
    setLoading(true);
    try {
      // Simulation of generating public key and token
      const result = await recommendServerConfig({
        vpnNeeds: needs,
        clientPublicKey: "dummy-client-pubkey-base64",
        idToken: "dummy-firebase-id-token"
      });
      setConfig(result);
      toast({
        title: "Recommendation ready",
        description: `Selected ${result.recommendedServerId} based on your needs.`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Configuration failed",
        description: "Could not generate config. Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card/30 border-white/5 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Terminal className="w-5 h-5 text-accent" />
          WG Config Tool
        </CardTitle>
        <CardDescription>
          AI-driven server selection & WireGuard generation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        {!config ? (
          <>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Describe your requirements</label>
              <Textarea 
                placeholder='e.g., "I need a low-latency connection from Germany for streaming Netflix with maximum privacy."'
                className="bg-secondary/30 border-white/5 min-h-[100px] text-sm"
                value={needs}
                onChange={(e) => setNeeds(e.target.value)}
              />
            </div>
            <Button 
              className="w-full bg-accent hover:bg-accent/80 text-background font-bold gap-2"
              onClick={handleGenerate}
              disabled={loading || !needs}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              Generate Optimal Config
            </Button>
          </>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-xs text-accent">
              <h5 className="font-bold flex items-center gap-1 mb-1">
                <Check className="w-3 h-3" /> Recommendation
              </h5>
              {config.explanation}
            </div>
            
            <div className="bg-black/50 p-4 rounded-md font-code text-[10px] overflow-x-auto whitespace-pre border border-white/10">
              {`[Interface]\nPrivateKey = <LOCAL_KEY>\nAddress = ${config.wireguardConfigDetails.clientAddress}\nDNS = ${config.wireguardConfigDetails.dns.join(', ')}\n\n[Peer]\nPublicKey = ${config.wireguardConfigDetails.serverPublicKey}\nEndpoint = ${config.wireguardConfigDetails.serverEndpoint}\nAllowedIPs = 0.0.0.0/0`}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 text-xs" onClick={() => setConfig(null)}>
                Start Over
              </Button>
              <Button className="flex-1 bg-accent text-background text-xs font-bold gap-2">
                <Download className="w-3 h-3" /> Download .conf
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}