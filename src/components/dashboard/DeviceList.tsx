"use client"

import { DeviceStatus, MOCK_DEVICES } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Smartphone, Monitor, ShieldCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function DeviceList() {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'ios':
      case 'android':
        return <Smartphone className="w-4 h-4" />;
      case 'linux':
      case 'windows':
        return <Monitor className="w-4 h-4" />;
      default:
        return <Laptop className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-card/30 border-white/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center justify-between">
          Connected Devices
          <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full">
            {MOCK_DEVICES.filter(d => d.isConnected).length} Active
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {MOCK_DEVICES.map((device) => (
          <div key={device.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-white/5">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                device.isConnected ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
              )}>
                {getIcon(device.platform)}
              </div>
              <div>
                <h4 className="text-xs font-medium">{device.name}</h4>
                <p className="text-[10px] text-muted-foreground capitalize">{device.platform}</p>
              </div>
            </div>
            <div className="text-right">
              {device.isConnected ? (
                <div className="flex items-center gap-1 text-[10px] text-accent">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Encrypted</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>1h ago</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}