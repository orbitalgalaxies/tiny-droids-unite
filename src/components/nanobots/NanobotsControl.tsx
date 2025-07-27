import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Shield, Recycle, Cpu, Activity, Scissors, Play, Pause, Square, Users, Zap, Target } from 'lucide-react';
import { toast } from 'sonner';
interface NanobotSwarm {
  id: string;
  type: 'medical' | 'environmental' | 'manufacturing' | 'monitoring' | 'surgical';
  count: number;
  active: number;
  efficiency: number;
  target: string;
  status: 'idle' | 'active' | 'deploying' | 'returning';
}
const NANOBOT_TYPES = {
  medical: {
    icon: Heart,
    color: 'nanobot-medical',
    name: 'Medical Delivery',
    description: 'Targeted drug delivery and cancer treatment'
  },
  environmental: {
    icon: Recycle,
    color: 'nanobot-environmental',
    name: 'Environmental Cleanup',
    description: 'Pollution removal and ecosystem restoration'
  },
  manufacturing: {
    icon: Cpu,
    color: 'nanobot-manufacturing',
    name: 'Precision Manufacturing',
    description: 'Molecular assembly and fabrication'
  },
  monitoring: {
    icon: Activity,
    color: 'nanobot-monitoring',
    name: 'Health Monitoring',
    description: 'Real-time biological parameter tracking'
  },
  surgical: {
    icon: Scissors,
    color: 'nanobot-surgical',
    name: 'Microsurgery',
    description: 'Cellular-level surgical procedures'
  }
};
export function NanobotsControl() {
  const [swarms, setSwarms] = useState<NanobotSwarm[]>([{
    id: 'med-001',
    type: 'medical',
    count: 10000,
    active: 8500,
    efficiency: 92,
    target: 'Tumor Site Alpha',
    status: 'active'
  }, {
    id: 'env-001',
    type: 'environmental',
    count: 50000,
    active: 47000,
    efficiency: 88,
    target: 'Ocean Sector 7',
    status: 'active'
  }, {
    id: 'man-001',
    type: 'manufacturing',
    count: 25000,
    active: 0,
    efficiency: 0,
    target: 'Substrate Layer',
    status: 'idle'
  }, {
    id: 'mon-001',
    type: 'monitoring',
    count: 5000,
    active: 5000,
    efficiency: 99,
    target: 'Cardiovascular System',
    status: 'active'
  }, {
    id: 'surg-001',
    type: 'surgical',
    count: 1000,
    active: 0,
    efficiency: 0,
    target: 'Neural Junction',
    status: 'idle'
  }]);
  const [selectedSwarm, setSelectedSwarm] = useState<string>('med-001');
  const handleSwarmAction = (swarmId: string, action: 'deploy' | 'pause' | 'recall') => {
    setSwarms(prev => prev.map(swarm => {
      if (swarm.id === swarmId) {
        switch (action) {
          case 'deploy':
            toast.success(`Deploying ${NANOBOT_TYPES[swarm.type].name} swarm`);
            return {
              ...swarm,
              status: 'deploying' as const,
              active: Math.floor(swarm.count * 0.85)
            };
          case 'pause':
            toast.info(`Pausing ${NANOBOT_TYPES[swarm.type].name} operations`);
            return {
              ...swarm,
              status: 'idle' as const
            };
          case 'recall':
            toast.warning(`Recalling ${NANOBOT_TYPES[swarm.type].name} swarm`);
            return {
              ...swarm,
              status: 'returning' as const,
              active: Math.floor(swarm.active * 0.5)
            };
        }
      }
      return swarm;
    }));
  };
  const getStatusColor = (status: NanobotSwarm['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success';
      case 'deploying':
        return 'bg-warning';
      case 'returning':
        return 'bg-info';
      default:
        return 'bg-muted';
    }
  };
  const activeSwarm = swarms.find(s => s.id === selectedSwarm);
  return <div className="space-y-6 bg-gray-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Nanobots Command Center
          </h1>
          <p className="text-muted-foreground">Control and monitor nanobot swarms for various applications</p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-nanobot-swarm" />
          <span className="text-sm font-medium">
            {swarms.reduce((acc, s) => acc + s.active, 0).toLocaleString()} Active Nanobots
          </span>
        </div>
      </div>

      <Tabs value={selectedSwarm} onValueChange={setSelectedSwarm} className="bg-gray-50">
        <TabsList className="grid w-full grid-cols-5">
          {swarms.map(swarm => {
          const config = NANOBOT_TYPES[swarm.type];
          const Icon = config.icon;
          return <TabsTrigger key={swarm.id} value={swarm.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {config.name.split(' ')[0]}
              </TabsTrigger>;
        })}
        </TabsList>

        {swarms.map(swarm => {
        const config = NANOBOT_TYPES[swarm.type];
        const Icon = config.icon;
        return <TabsContent key={swarm.id} value={swarm.id} className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full bg-${config.color}/10`}>
                        <Icon className={`h-6 w-6 text-${config.color}`} />
                      </div>
                      <div>
                        <CardTitle>{config.name} Swarm</CardTitle>
                        <CardDescription>{config.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className={`${getStatusColor(swarm.status)} text-background`}>
                      {swarm.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Total Count</span>
                          <Target className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">{swarm.count.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Active</span>
                          <Zap className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold text-success">{swarm.active.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Efficiency</span>
                          <Activity className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">{swarm.efficiency}%</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Deployment Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(swarm.active / swarm.count * 100)}%
                      </span>
                    </div>
                    <Progress value={swarm.active / swarm.count * 100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <span className="text-sm font-medium">Current Target:</span>
                      <div className="text-lg font-semibold">{swarm.target}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => handleSwarmAction(swarm.id, 'deploy')} disabled={swarm.status === 'active'} className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Deploy
                    </Button>
                    <Button variant="outline" onClick={() => handleSwarmAction(swarm.id, 'pause')} disabled={swarm.status === 'idle'} className="flex items-center gap-2">
                      <Pause className="h-4 w-4" />
                      Pause
                    </Button>
                    <Button variant="destructive" onClick={() => handleSwarmAction(swarm.id, 'recall')} disabled={swarm.status === 'idle'} className="flex items-center gap-2">
                      <Square className="h-4 w-4" />
                      Recall
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>;
      })}
      </Tabs>
    </div>;
}