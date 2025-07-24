import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Radio, 
  Lightbulb, 
  Wifi, 
  Zap, 
  Signal,
  Antenna,
  Waves,
  Battery,
  Sun,
  Thermometer,
  Activity,
  Atom,
  Eye,
  Network,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface CommunicationChannel {
  id: string;
  type: 'chemical' | 'optical' | 'iot' | 'terahertz';
  name: string;
  enabled: boolean;
  signalStrength: number;
  bandwidth: number;
  energyConsumption: number;
  range: number;
  status: 'connected' | 'disconnected' | 'transmitting' | 'receiving';
}

interface EnergySource {
  id: string;
  type: 'solar' | 'thermal' | 'piezoelectric' | 'chemical';
  name: string;
  active: boolean;
  output: number;
  efficiency: number;
}

const COMMUNICATION_TYPES = {
  chemical: {
    icon: Atom,
    color: 'text-nanobot-medical',
    description: 'Bio-inspired molecular signaling'
  },
  optical: {
    icon: Lightbulb,
    color: 'text-nanobot-monitoring',
    description: 'Quantum dots and photonic signals'
  },
  iot: {
    icon: Wifi,
    color: 'text-nanobot-manufacturing',
    description: '5G/6G network integration'
  },
  terahertz: {
    icon: Antenna,
    color: 'text-nanobot-surgical',
    description: 'High-frequency THz waves'
  }
};

const ENERGY_SOURCES = {
  solar: { icon: Sun, color: 'text-yellow-500' },
  thermal: { icon: Thermometer, color: 'text-red-500' },
  piezoelectric: { icon: Activity, color: 'text-blue-500' },
  chemical: { icon: Battery, color: 'text-green-500' }
};

export function CommunicationHub() {
  const [channels, setChannels] = useState<CommunicationChannel[]>([
    {
      id: 'chem-001',
      type: 'chemical',
      name: 'Chemical Signaling',
      enabled: true,
      signalStrength: 85,
      bandwidth: 12,
      energyConsumption: 5,
      range: 100,
      status: 'connected'
    },
    {
      id: 'opt-001',
      type: 'optical',
      name: 'Optical Network',
      enabled: true,
      signalStrength: 92,
      bandwidth: 150,
      energyConsumption: 15,
      range: 500,
      status: 'transmitting'
    },
    {
      id: 'iot-001',
      type: 'iot',
      name: '6G Integration',
      enabled: false,
      signalStrength: 78,
      bandwidth: 200,
      energyConsumption: 25,
      range: 10000,
      status: 'disconnected'
    },
    {
      id: 'thz-001',
      type: 'terahertz',
      name: 'THz Communication',
      enabled: true,
      signalStrength: 68,
      bandwidth: 300,
      energyConsumption: 35,
      range: 250,
      status: 'receiving'
    }
  ]);

  const [energySources, setEnergySources] = useState<EnergySource[]>([
    {
      id: 'solar-001',
      type: 'solar',
      name: 'Photovoltaic Cells',
      active: true,
      output: 45,
      efficiency: 78
    },
    {
      id: 'thermal-001',
      type: 'thermal',
      name: 'Thermal Gradients',
      active: true,
      output: 28,
      efficiency: 65
    },
    {
      id: 'piezo-001',
      type: 'piezoelectric',
      name: 'Motion Harvesting',
      active: false,
      output: 12,
      efficiency: 45
    },
    {
      id: 'chem-battery',
      type: 'chemical',
      name: 'Chemical Battery',
      active: true,
      output: 82,
      efficiency: 89
    }
  ]);

  const [transmissionPower, setTransmissionPower] = useState([75]);
  const [frequencyBand, setFrequencyBand] = useState([2.4]);

  const totalEnergyOutput = energySources
    .filter(source => source.active)
    .reduce((sum, source) => sum + source.output, 0);

  const totalEnergyConsumption = channels
    .filter(channel => channel.enabled)
    .reduce((sum, channel) => sum + channel.energyConsumption, 0);

  const energyBalance = totalEnergyOutput - totalEnergyConsumption;

  const toggleChannel = (channelId: string) => {
    setChannels(prev => prev.map(channel => {
      if (channel.id === channelId) {
        const newEnabled = !channel.enabled;
        toast.info(`${channel.name} ${newEnabled ? 'enabled' : 'disabled'}`);
        return {
          ...channel,
          enabled: newEnabled,
          status: newEnabled ? 'connected' : 'disconnected'
        };
      }
      return channel;
    }));
  };

  const toggleEnergySource = (sourceId: string) => {
    setEnergySources(prev => prev.map(source => {
      if (source.id === sourceId) {
        const newActive = !source.active;
        toast.info(`${source.name} ${newActive ? 'activated' : 'deactivated'}`);
        return { ...source, active: newActive };
      }
      return source;
    }));
  };

  const optimizeNetwork = () => {
    toast.success('Network optimization complete');
    setChannels(prev => prev.map(channel => ({
      ...channel,
      signalStrength: Math.min(100, channel.signalStrength + Math.random() * 10),
      energyConsumption: Math.max(1, channel.energyConsumption - Math.random() * 5)
    })));
  };

  const getStatusColor = (status: CommunicationChannel['status']) => {
    switch (status) {
      case 'connected': return 'bg-success';
      case 'transmitting': return 'bg-warning';
      case 'receiving': return 'bg-info';
      default: return 'bg-muted';
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setChannels(prev => prev.map(channel => ({
        ...channel,
        signalStrength: Math.max(0, Math.min(100, 
          channel.signalStrength + (Math.random() - 0.5) * 5
        ))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Nanobot Communication Hub
          </h1>
          <p className="text-muted-foreground">Multi-protocol communication and energy management</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Battery className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              Energy: {energyBalance > 0 ? '+' : ''}{energyBalance.toFixed(1)}µW
            </span>
          </div>
          <Button onClick={optimizeNetwork} className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Optimize Network
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Energy Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-nanobot-monitoring" />
              Energy Harvesting
            </CardTitle>
            <CardDescription>Power sources and consumption</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {energySources.map(source => {
                const config = ENERGY_SOURCES[source.type];
                const Icon = config.icon;
                return (
                  <div key={source.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${config.color}`} />
                      <div>
                        <div className="font-medium text-sm">{source.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {source.output}µW • {source.efficiency}% eff.
                        </div>
                      </div>
                    </div>
                    <Switch 
                      checked={source.active}
                      onCheckedChange={() => toggleEnergySource(source.id)}
                    />
                  </div>
                );
              })}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Energy Balance</span>
                <span className={energyBalance > 0 ? 'text-success' : 'text-destructive'}>
                  {energyBalance.toFixed(1)}µW
                </span>
              </div>
              <Progress 
                value={Math.max(0, Math.min(100, (energyBalance / totalEnergyOutput) * 100))} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Communication Channels */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-nanobot-manufacturing" />
              Communication Channels
            </CardTitle>
            <CardDescription>Multi-protocol communication systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {channels.map(channel => {
                const config = COMMUNICATION_TYPES[channel.type];
                const Icon = config.icon;
                return (
                  <Card key={channel.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${config.color}`} />
                          <span className="font-medium text-sm">{channel.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`${getStatusColor(channel.status)} text-background text-xs`}
                          >
                            {channel.status}
                          </Badge>
                          <Switch 
                            checked={channel.enabled}
                            onCheckedChange={() => toggleChannel(channel.id)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Signal Strength</span>
                          <span>{channel.signalStrength}%</span>
                        </div>
                        <Progress value={channel.signalStrength} className="h-1" />
                        
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div>BW: {channel.bandwidth} Mbps</div>
                          <div>Range: {channel.range}nm</div>
                          <div>Power: {channel.energyConsumption}µW</div>
                          <div className="flex items-center gap-1">
                            <Signal className="h-3 w-3" />
                            {channel.signalStrength > 80 ? 'Strong' : 
                             channel.signalStrength > 50 ? 'Good' : 'Weak'}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Communication Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Waves className="h-5 w-5 text-nanobot-surgical" />
            Transmission Parameters
          </CardTitle>
          <CardDescription>Optimize signal parameters for efficiency</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Transmission Power: {transmissionPower[0]}%
              </label>
              <Slider
                value={transmissionPower}
                onValueChange={setTransmissionPower}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Higher power increases range but consumes more energy
              </p>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Frequency Band: {frequencyBand[0]} THz
              </label>
              <Slider
                value={frequencyBand}
                onValueChange={setFrequencyBand}
                min={0.1}
                max={10}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Higher frequencies provide more bandwidth but shorter range
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Network className="h-6 w-6 mx-auto mb-2 text-nanobot-medical" />
                <div className="text-sm font-medium">Active Nodes</div>
                <div className="text-lg font-bold">
                  {channels.filter(c => c.enabled).length * 1247}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Eye className="h-6 w-6 mx-auto mb-2 text-nanobot-monitoring" />
                <div className="text-sm font-medium">Data Rate</div>
                <div className="text-lg font-bold">
                  {channels
                    .filter(c => c.enabled)
                    .reduce((sum, c) => sum + c.bandwidth, 0)} Mbps
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Signal className="h-6 w-6 mx-auto mb-2 text-nanobot-manufacturing" />
                <div className="text-sm font-medium">Avg. Signal</div>
                <div className="text-lg font-bold">
                  {Math.round(channels
                    .filter(c => c.enabled)
                    .reduce((sum, c) => sum + c.signalStrength, 0) / 
                    Math.max(1, channels.filter(c => c.enabled).length))}%
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Battery className="h-6 w-6 mx-auto mb-2 text-nanobot-surgical" />
                <div className="text-sm font-medium">Efficiency</div>
                <div className="text-lg font-bold">
                  {energyBalance > 0 ? Math.round((1 - totalEnergyConsumption / totalEnergyOutput) * 100) : 0}%
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}