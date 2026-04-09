
"use client"

import { useState } from "react";
import { MOCK_SERVERS, VpnServer } from "@/lib/mock-data";
import { ServerCard } from "@/components/dashboard/ServerCard";
import { ConnectionPanel } from "@/components/dashboard/ConnectionPanel";
import { DeviceList } from "@/components/dashboard/DeviceList";
import { TorCircuitViz } from "@/components/dashboard/TorCircuitViz";
import { ConfigTool } from "@/components/dashboard/ConfigTool";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Shield, Search, Settings, LogOut, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [selectedServer, setSelectedServer] = useState<VpnServer | null>(MOCK_SERVERS[0]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<'home' | 'servers' | 'settings'>('home');

  const filteredServers = MOCK_SERVERS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-[#0A1429] safe-top">
      {/* Sidebar - Desktop Only */}
      <aside className="w-20 hidden md:flex flex-col items-center py-8 border-r border-white/5 gap-8 bg-black/20">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-background">
          <Shield className="w-6 h-6" />
        </div>
        
        <nav className="flex flex-col gap-4">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-accent bg-accent/10">
            <Shield className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-muted-foreground hover:text-white">
            <Search className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-muted-foreground hover:text-white">
            <User className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-muted-foreground hover:text-white">
            <Settings className="w-6 h-6" />
          </Button>
        </nav>
        
        <div className="mt-auto">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-muted-foreground hover:text-destructive">
            <LogOut className="w-6 h-6" />
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden pb-16 md:pb-0">
        
        {/* Header */}
        <header className="p-4 md:p-6 flex items-center justify-between bg-black/10">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">TorVPN Pro</h1>
            <p className="text-[10px] md:text-xs text-muted-foreground">Secure Android Portal</p>
          </div>
          <div className="relative w-40 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-8 h-8 text-xs bg-secondary/30 border-white/5"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>

        <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 overflow-hidden">
          {/* Scrollable Container for Mobile to see everything */}
          <ScrollArea className="flex-1 -mr-4 pr-4">
            <div className="flex flex-col gap-6 pb-4">
              
              {/* Main Controls - Connection Panel */}
              <div className="w-full md:max-w-[400px] mx-auto md:mx-0">
                <ConnectionPanel selectedServer={selectedServer} />
              </div>

              {/* Grid for other tools */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Available Servers</h2>
                    <span className="text-[10px] text-accent">{filteredServers.length} regions</span>
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

                <div className="space-y-6">
                  <TorCircuitViz />
                  <ConfigTool />
                  <DeviceList />
                </div>
              </div>

              {/* Footer Info */}
              <div className="p-4 rounded-xl glass border border-white/10 text-center">
                <p className="text-xs text-muted-foreground mb-1">Status: Operational</p>
                <div className="flex gap-2 justify-center">
                  <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[10px]">Spark Plan</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px]">v2.1.0-native</span>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-lg border-t border-white/10 flex md:hidden items-center justify-around px-6 safe-bottom">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setActiveTab('home')}
          className={activeTab === 'home' ? "text-accent" : "text-muted-foreground"}
        >
          <Shield className="w-6 h-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setActiveTab('servers')}
          className={activeTab === 'servers' ? "text-accent" : "text-muted-foreground"}
        >
          <Search className="w-6 h-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground"
        >
          <User className="w-6 h-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setActiveTab('settings')}
          className={activeTab === 'settings' ? "text-accent" : "text-muted-foreground"}
        >
          <Settings className="w-6 h-6" />
        </Button>
      </nav>
    </div>
  );
}
