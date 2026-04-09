
"use client"

import { useState, useEffect } from "react";
import { MOCK_SERVERS, VpnServer } from "@/lib/mock-data";
import { ServerCard } from "@/components/dashboard/ServerCard";
import { ConnectionPanel } from "@/components/dashboard/ConnectionPanel";
import { DeviceList } from "@/components/dashboard/DeviceList";
import { TorCircuitViz } from "@/components/dashboard/TorCircuitViz";
import { ConfigTool } from "@/components/dashboard/ConfigTool";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Shield, Search, Settings, LogOut, User, LayoutDashboard, Globe, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [selectedServer, setSelectedServer] = useState<VpnServer | null>(MOCK_SERVERS[0]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<'home' | 'servers' | 'settings'>('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredServers = MOCK_SERVERS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-[#050A14] safe-top relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Sidebar - Desktop */}
      <aside className="w-20 hidden md:flex flex-col items-center py-8 border-r border-white/5 gap-8 bg-black/40 backdrop-blur-xl z-20">
        <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-background shadow-lg shadow-accent/20">
          <Shield className="w-7 h-7" />
        </div>
        
        <nav className="flex flex-col gap-5">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-accent bg-accent/10">
            <LayoutDashboard className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-muted-foreground hover:text-white transition-all">
            <Globe className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-muted-foreground hover:text-white transition-all">
            <Activity className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-muted-foreground hover:text-white transition-all">
            <Settings className="w-6 h-6" />
          </Button>
        </nav>
        
        <div className="mt-auto">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="w-6 h-6" />
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden pb-20 md:pb-0 z-10">
        
        {/* Header */}
        <header className="px-6 py-4 flex items-center justify-between bg-black/20 backdrop-blur-md border-b border-white/5">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-accent">TorVPN <span className="text-white">PRO</span></h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Network Operational</p>
            </div>
          </div>
          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <Input 
              placeholder="Search secure nodes..." 
              className="pl-9 h-10 w-48 md:w-64 text-xs bg-white/5 border-white/10 rounded-xl focus:w-80 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <User className="w-6 h-6" />
          </Button>
        </header>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-4 md:px-8 py-6">
            <div className="max-w-7xl mx-auto space-y-8 pb-10">
              
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Main Connection Panel */}
                <div className="xl:col-span-4 sticky top-0">
                  <ConnectionPanel selectedServer={selectedServer} />
                </div>

                {/* Main Dashboard Grid */}
                <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Column: Servers */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Global Nodes</h2>
                      <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">{filteredServers.length} Active</span>
                    </div>
                    <div className="space-y-3">
                      {filteredServers.map((server) => (
                        <ServerCard 
                          key={server.id} 
                          server={server} 
                          isSelected={selectedServer?.id === server.id}
                          onSelect={setSelectedServer}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Tools & Stats */}
                  <div className="space-y-6">
                    <TorCircuitViz />
                    <ConfigTool />
                    <DeviceList />
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="p-5 rounded-2xl glass-panel flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Encrypted Tunnel</p>
                    <p className="text-xs font-mono font-bold text-accent">AES-256-GCM / ChaCha20</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-lg bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-tighter">Spark License</span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-muted-foreground text-[10px] font-bold uppercase tracking-tighter">Build 2.4.0-NATIVE</span>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black/60 backdrop-blur-2xl border-t border-white/5 flex md:hidden items-center justify-around px-8 safe-bottom z-30">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setActiveTab('home')}
          className={cn("flex flex-col gap-1 h-auto py-2 transition-all", activeTab === 'home' ? "text-accent scale-110" : "text-muted-foreground")}
        >
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[8px] font-bold uppercase tracking-widest">Dash</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setActiveTab('servers')}
          className={cn("flex flex-col gap-1 h-auto py-2 transition-all", activeTab === 'servers' ? "text-accent scale-110" : "text-muted-foreground")}
        >
          <Globe className="w-6 h-6" />
          <span className="text-[8px] font-bold uppercase tracking-widest">Nodes</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setActiveTab('settings')}
          className={cn("flex flex-col gap-1 h-auto py-2 transition-all", activeTab === 'settings' ? "text-accent scale-110" : "text-muted-foreground")}
        >
          <Settings className="w-6 h-6" />
          <span className="text-[8px] font-bold uppercase tracking-widest">Config</span>
        </Button>
      </nav>
    </div>
  );
}
