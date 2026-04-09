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
import { Shield, Search, Settings, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [selectedServer, setSelectedServer] = useState<VpnServer | null>(MOCK_SERVERS[0]);
  const [search, setSearch] = useState("");

  const filteredServers = MOCK_SERVERS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A1429]">
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

      {/* Main Dashboard Area */}
      <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
        
        {/* Left Column: Servers & Tools */}
        <section className="flex-1 flex flex-col overflow-hidden">
          <header className="p-6 flex items-center justify-between bg-black/10">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">TorVPN Portal</h1>
              <p className="text-xs text-muted-foreground">Secure your network with AI-driven routing</p>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search location..." 
                className="pl-10 bg-secondary/30 border-white/5"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </header>

          <div className="flex-1 flex flex-col md:flex-row gap-6 p-6 overflow-hidden">
            {/* Server List */}
            <div className="flex-1 flex flex-col min-w-[300px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Available Servers</h2>
                <span className="text-[10px] text-accent">{filteredServers.length} regions online</span>
              </div>
              <ScrollArea className="flex-1 -mr-4 pr-4">
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
              </ScrollArea>
            </div>

            {/* AI Tools Area */}
            <div className="w-full md:w-[320px] flex flex-col gap-6">
              <TorCircuitViz />
              <ConfigTool />
            </div>
          </div>
        </section>

        {/* Right Column: Connection Control & Status */}
        <section className="w-full md:w-[380px] p-6 bg-black/40 border-l border-white/5 flex flex-col gap-6 overflow-y-auto">
          <ConnectionPanel selectedServer={selectedServer} />
          <DeviceList />
          
          <div className="mt-auto p-4 rounded-xl glass border border-white/10 text-center">
            <p className="text-xs text-muted-foreground mb-1">Authenticated as</p>
            <p className="text-sm font-bold">anonymous_user_4821</p>
            <div className="mt-3 flex gap-2 justify-center">
              <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[10px]">Spark Plan</span>
              <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px]">v2.1.0-alpha</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}