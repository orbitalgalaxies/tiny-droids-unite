import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Heart, 
  Recycle, 
  Cpu, 
  Activity, 
  Scissors,
  Eye,
  Zap,
  Users,
  Settings,
  Radio
} from 'lucide-react';

import { NanobotsControl } from '@/components/nanobots/NanobotsControl';
import { SwarmVisualization } from '@/components/nanobots/SwarmVisualization';
import { MedicalNanobots } from '@/components/nanobots/MedicalNanobots';
import { EnvironmentalNanobots } from '@/components/nanobots/EnvironmentalNanobots';
import { ManufacturingNanobots } from '@/components/nanobots/ManufacturingNanobots';
import { HealthMonitoring } from '@/components/nanobots/HealthMonitoring';
import { MicrosurgeryNanobots } from '@/components/nanobots/MicrosurgeryNanobots';
import { CommunicationHub } from '@/components/nanobots/CommunicationHub';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg border-blue-200/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  NanoSwarm Control System
                </h1>
                <p className="text-blue-700/70">
                  Advanced nanobots for medical, environmental, and manufacturing applications
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300">
                <Activity className="h-3 w-3 mr-1" />
                System Online
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                <Users className="h-3 w-3 mr-1" />
                127,500 Active Nanobots
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <Radio className="h-4 w-4" />
              Communication
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Medical
            </TabsTrigger>
            <TabsTrigger value="environmental" className="flex items-center gap-2">
              <Recycle className="h-4 w-4" />
              Environmental
            </TabsTrigger>
            <TabsTrigger value="manufacturing" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Manufacturing
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="surgery" className="flex items-center gap-2">
              <Scissors className="h-4 w-4" />
              Surgery
            </TabsTrigger>
            <TabsTrigger value="simulation" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Simulation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <NanobotsControl />
          </TabsContent>

          <TabsContent value="communication">
            <CommunicationHub />
          </TabsContent>

          <TabsContent value="medical">
            <MedicalNanobots />
          </TabsContent>

          <TabsContent value="environmental">
            <EnvironmentalNanobots />
          </TabsContent>

          <TabsContent value="manufacturing">
            <ManufacturingNanobots />
          </TabsContent>

          <TabsContent value="monitoring">
            <HealthMonitoring />
          </TabsContent>

          <TabsContent value="surgery">
            <MicrosurgeryNanobots />
          </TabsContent>

          <TabsContent value="simulation">
            <SwarmVisualization />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
