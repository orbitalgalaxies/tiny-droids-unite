import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Recycle, 
  Droplets, 
  Trees, 
  Wind,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { toast } from 'sonner';

interface CleanupMission {
  id: string;
  location: string;
  pollutant: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  nanobotCount: number;
  progress: number;
  efficiency: number;
  status: 'standby' | 'deploying' | 'active' | 'completed';
  contaminantRemoved: number;
  estimatedCompletion: string;
}

interface EnvironmentalMetrics {
  totalContaminantsRemoved: number;
  activeZones: number;
  ecosystemHealth: number;
  carbonCaptured: number;
}

export function EnvironmentalNanobots() {
  const [missions, setMissions] = useState<CleanupMission[]>([
    {
      id: 'env-001',
      location: 'Pacific Ocean Sector 7',
      pollutant: 'Microplastics',
      severity: 'high',
      nanobotCount: 100000,
      progress: 67,
      efficiency: 91,
      status: 'active',
      contaminantRemoved: 2.4,
      estimatedCompletion: '6 hours'
    },
    {
      id: 'env-002',
      location: 'Amazon River Delta',
      pollutant: 'Heavy Metals (Mercury)',
      severity: 'critical',
      nanobotCount: 75000,
      progress: 34,
      efficiency: 88,
      status: 'active',
      contaminantRemoved: 1.8,
      estimatedCompletion: '12 hours'
    },
    {
      id: 'env-003',
      location: 'Great Barrier Reef Zone 3',
      pollutant: 'Chemical Runoff',
      severity: 'medium',
      nanobotCount: 50000,
      progress: 100,
      efficiency: 94,
      status: 'completed',
      contaminantRemoved: 3.2,
      estimatedCompletion: 'Completed'
    },
    {
      id: 'env-004',
      location: 'Los Angeles Air Basin',
      pollutant: 'PM2.5 Particles',
      severity: 'high',
      nanobotCount: 200000,
      progress: 12,
      efficiency: 85,
      status: 'deploying',
      contaminantRemoved: 0.3,
      estimatedCompletion: '18 hours'
    }
  ]);

  const [metrics, setMetrics] = useState<EnvironmentalMetrics>({
    totalContaminantsRemoved: 7.7,
    activeZones: 3,
    ecosystemHealth: 78,
    carbonCaptured: 15.6
  });

  const getSeverityColor = (severity: CleanupMission['severity']) => {
    switch (severity) {
      case 'low': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'high': return 'bg-destructive';
      case 'critical': return 'bg-red-600';
    }
  };

  const getStatusIcon = (status: CleanupMission['status']) => {
    switch (status) {
      case 'standby': return <AlertCircle className="h-4 w-4" />;
      case 'deploying': return <Wind className="h-4 w-4" />;
      case 'active': return <Recycle className="h-4 w-4" />;
      case 'completed': return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const handleMissionAction = (missionId: string, action: 'deploy' | 'pause' | 'abort') => {
    setMissions(prev => prev.map(mission => {
      if (mission.id === missionId) {
        switch (action) {
          case 'deploy':
            toast.success(`Deploying nanobots to ${mission.location}`);
            return { ...mission, status: 'deploying' as const };
          case 'pause':
            toast.info(`Pausing cleanup operation at ${mission.location}`);
            return { ...mission, status: 'standby' as const };
          case 'abort':
            toast.warning(`Aborting mission at ${mission.location}`);
            return { ...mission, status: 'standby' as const, progress: 0 };
        }
      }
      return mission;
    }));
  };

  const activeMissions = missions.filter(m => m.status === 'active');
  const completedMissions = missions.filter(m => m.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-nanobot-environmental/10">
          <Recycle className="h-6 w-6 text-nanobot-environmental" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Environmental Nanobots</h2>
          <p className="text-muted-foreground">Advanced pollution cleanup and ecosystem restoration</p>
        </div>
      </div>

      {/* Environmental Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contaminants Removed</p>
                <p className="text-2xl font-bold text-nanobot-environmental">{metrics.totalContaminantsRemoved} tons</p>
              </div>
              <TrendingDown className="h-8 w-8 text-nanobot-environmental" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Zones</p>
                <p className="text-2xl font-bold text-primary">{metrics.activeZones}</p>
              </div>
              <MapPin className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ecosystem Health</p>
                <p className="text-2xl font-bold text-success">{metrics.ecosystemHealth}%</p>
              </div>
              <Trees className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Carbon Captured</p>
                <p className="text-2xl font-bold text-info">{metrics.carbonCaptured} kg</p>
              </div>
              <Wind className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Missions ({activeMissions.length})</TabsTrigger>
          <TabsTrigger value="all">All Missions ({missions.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedMissions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeMissions.map(mission => (
            <Card key={mission.id} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nanobot-environmental to-success opacity-60" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {mission.location}
                    </CardTitle>
                    <CardDescription>Targeting: {mission.pollutant}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`${getSeverityColor(mission.severity)} text-background`}
                    >
                      {mission.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">
                      {getStatusIcon(mission.status)}
                      {mission.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Nanobots Deployed</p>
                    <p className="text-lg font-bold">{mission.nanobotCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Efficiency</p>
                    <p className="text-lg font-bold text-nanobot-environmental">{mission.efficiency}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">ETA</p>
                    <p className="text-lg font-bold">{mission.estimatedCompletion}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Cleanup Progress</span>
                    <span className="text-sm text-muted-foreground">{mission.progress}%</span>
                  </div>
                  <Progress value={mission.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between p-3 bg-nanobot-environmental/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-nanobot-environmental" />
                    <span className="text-sm font-medium">Contaminants Removed</span>
                  </div>
                  <span className="font-bold text-nanobot-environmental">{mission.contaminantRemoved} tons</span>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => handleMissionAction(mission.id, 'pause')}
                  >
                    Pause Mission
                  </Button>
                  <Button 
                    size="sm"
                    variant="destructive"
                    onClick={() => handleMissionAction(mission.id, 'abort')}
                  >
                    Abort Mission
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {missions.map(mission => (
            <Card key={mission.id} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nanobot-environmental to-success opacity-60" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {mission.location}
                    </CardTitle>
                    <CardDescription>Targeting: {mission.pollutant}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`${getSeverityColor(mission.severity)} text-background`}
                    >
                      {mission.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">
                      {getStatusIcon(mission.status)}
                      {mission.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{mission.progress}%</span>
                  </div>
                  <Progress value={mission.progress} className="h-2" />
                </div>

                {mission.status === 'standby' && (
                  <Button 
                    onClick={() => handleMissionAction(mission.id, 'deploy')}
                    className="w-full"
                  >
                    Deploy Nanobots
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedMissions.map(mission => (
            <Card key={mission.id} className="relative overflow-hidden opacity-75">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success to-nanobot-environmental opacity-60" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {mission.location}
                    </CardTitle>
                    <CardDescription>Successfully cleaned: {mission.pollutant}</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-success text-background">
                    COMPLETED
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                  <span className="text-sm font-medium">Total Contaminants Removed</span>
                  <span className="font-bold text-success">{mission.contaminantRemoved} tons</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}