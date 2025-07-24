import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Droplets,
  Brain,
  Wind,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { toast } from 'sonner';

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  normalRange: { min: number; max: number };
  status: 'normal' | 'warning' | 'critical';
  trend: 'stable' | 'increasing' | 'decreasing';
  icon: React.ComponentType<any>;
  nanobotCount: number;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  monitoringSince: string;
  metrics: HealthMetric[];
  alertsCount: number;
}

export function HealthMonitoring() {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'p-001',
      name: 'John Smith',
      age: 45,
      condition: 'Post-cardiac surgery monitoring',
      monitoringSince: '2024-01-15',
      alertsCount: 2,
      metrics: [
        {
          id: 'hr',
          name: 'Heart Rate',
          value: 78,
          unit: 'bpm',
          normalRange: { min: 60, max: 100 },
          status: 'normal',
          trend: 'stable',
          icon: Heart,
          nanobotCount: 5000
        },
        {
          id: 'bp-sys',
          name: 'Blood Pressure (Systolic)',
          value: 142,
          unit: 'mmHg',
          normalRange: { min: 90, max: 140 },
          status: 'warning',
          trend: 'increasing',
          icon: Activity,
          nanobotCount: 3000
        },
        {
          id: 'temp',
          name: 'Body Temperature',
          value: 37.2,
          unit: '°C',
          normalRange: { min: 36.1, max: 37.2 },
          status: 'normal',
          trend: 'stable',
          icon: Thermometer,
          nanobotCount: 2000
        },
        {
          id: 'glucose',
          name: 'Blood Glucose',
          value: 95,
          unit: 'mg/dL',
          normalRange: { min: 70, max: 100 },
          status: 'normal',
          trend: 'decreasing',
          icon: Droplets,
          nanobotCount: 4000
        }
      ]
    },
    {
      id: 'p-002',
      name: 'Sarah Johnson',
      age: 32,
      condition: 'Diabetes management',
      monitoringSince: '2024-01-20',
      alertsCount: 0,
      metrics: [
        {
          id: 'glucose-2',
          name: 'Blood Glucose',
          value: 126,
          unit: 'mg/dL',
          normalRange: { min: 70, max: 100 },
          status: 'warning',
          trend: 'increasing',
          icon: Droplets,
          nanobotCount: 6000
        },
        {
          id: 'hr-2',
          name: 'Heart Rate',
          value: 68,
          unit: 'bpm',
          normalRange: { min: 60, max: 100 },
          status: 'normal',
          trend: 'stable',
          icon: Heart,
          nanobotCount: 3000
        },
        {
          id: 'o2',
          name: 'Oxygen Saturation',
          value: 98,
          unit: '%',
          normalRange: { min: 95, max: 100 },
          status: 'normal',
          trend: 'stable',
          icon: Wind,
          nanobotCount: 2500
        }
      ]
    },
    {
      id: 'p-003',
      name: 'Robert Chen',
      age: 67,
      condition: 'Neurological monitoring',
      monitoringSince: '2024-01-10',
      alertsCount: 1,
      metrics: [
        {
          id: 'neuro',
          name: 'Neural Activity',
          value: 85,
          unit: 'Hz',
          normalRange: { min: 80, max: 120 },
          status: 'normal',
          trend: 'stable',
          icon: Brain,
          nanobotCount: 8000
        },
        {
          id: 'intracranial',
          name: 'Intracranial Pressure',
          value: 18,
          unit: 'mmHg',
          normalRange: { min: 5, max: 15 },
          status: 'critical',
          trend: 'increasing',
          icon: AlertTriangle,
          nanobotCount: 10000
        }
      ]
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState<string>('p-001');
  const [realTimeUpdates, setRealTimeUpdates] = useState<boolean>(true);

  useEffect(() => {
    if (!realTimeUpdates) return;

    const interval = setInterval(() => {
      setPatients(prev => prev.map(patient => ({
        ...patient,
        metrics: patient.metrics.map(metric => {
          // Simulate real-time data updates
          const variance = (Math.random() - 0.5) * 0.1;
          const newValue = Math.max(0, metric.value + (metric.value * variance));
          
          // Determine status based on normal range
          let status: 'normal' | 'warning' | 'critical' = 'normal';
          if (newValue < metric.normalRange.min * 0.9 || newValue > metric.normalRange.max * 1.1) {
            status = 'critical';
          } else if (newValue < metric.normalRange.min || newValue > metric.normalRange.max) {
            status = 'warning';
          }

          // Determine trend
          const diff = newValue - metric.value;
          let trend: 'stable' | 'increasing' | 'decreasing' = 'stable';
          if (Math.abs(diff) > metric.value * 0.02) {
            trend = diff > 0 ? 'increasing' : 'decreasing';
          }

          return {
            ...metric,
            value: Math.round(newValue * 100) / 100,
            status,
            trend
          };
        })
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  const getStatusColor = (status: 'normal' | 'warning' | 'critical') => {
    switch (status) {
      case 'normal': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'critical': return 'bg-destructive';
    }
  };

  const getTrendIcon = (trend: 'stable' | 'increasing' | 'decreasing') => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-3 w-3" />;
      case 'decreasing': return <TrendingDown className="h-3 w-3" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

  const currentPatient = patients.find(p => p.id === selectedPatient);
  const totalNanobots = patients.reduce((acc, p) => 
    acc + p.metrics.reduce((metricAcc, m) => metricAcc + m.nanobotCount, 0), 0
  );

  const criticalAlerts = patients.reduce((acc, p) => 
    acc + p.metrics.filter(m => m.status === 'critical').length, 0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-nanobot-monitoring/10">
          <Activity className="h-6 w-6 text-nanobot-monitoring" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Health Monitoring Nanobots</h2>
          <p className="text-muted-foreground">Real-time biological parameter tracking and analysis</p>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Patients</p>
                <p className="text-2xl font-bold text-nanobot-monitoring">{patients.length}</p>
              </div>
              <Heart className="h-8 w-8 text-nanobot-monitoring" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Nanobots</p>
                <p className="text-2xl font-bold text-primary">{totalNanobots.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-bold text-destructive">{criticalAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Status</p>
                <p className="text-2xl font-bold text-success">Online</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Updates Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Patient Monitoring</h3>
        <Button
          variant={realTimeUpdates ? "default" : "outline"}
          onClick={() => setRealTimeUpdates(!realTimeUpdates)}
          className="flex items-center gap-2"
        >
          <Activity className="h-4 w-4" />
          Real-time Updates: {realTimeUpdates ? 'ON' : 'OFF'}
        </Button>
      </div>

      {/* Patient Selection */}
      <div className="flex gap-2 overflow-x-auto">
        {patients.map(patient => (
          <Button
            key={patient.id}
            variant={selectedPatient === patient.id ? "default" : "outline"}
            onClick={() => setSelectedPatient(patient.id)}
            className="flex-shrink-0"
          >
            {patient.name}
            {patient.alertsCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {patient.alertsCount}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Patient Details */}
      {currentPatient && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{currentPatient.name}</CardTitle>
                <CardDescription>
                  Age: {currentPatient.age} | Condition: {currentPatient.condition}
                  <br />
                  Monitoring since: {currentPatient.monitoringSince}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Total Nanobots</div>
                <div className="text-xl font-bold text-nanobot-monitoring">
                  {currentPatient.metrics.reduce((acc, m) => acc + m.nanobotCount, 0).toLocaleString()}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPatient.metrics.map(metric => {
                const Icon = metric.icon;
                const isInRange = metric.value >= metric.normalRange.min && metric.value <= metric.normalRange.max;
                
                return (
                  <Card key={metric.id} className="relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-1 ${getStatusColor(metric.status)} opacity-60`} />
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-nanobot-monitoring" />
                          <span className="font-medium">{metric.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(metric.trend)}
                          <Badge 
                            variant="outline" 
                            className={`${getStatusColor(metric.status)} text-background text-xs`}
                          >
                            {metric.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">{metric.value}</span>
                          <span className="text-sm text-muted-foreground">{metric.unit}</span>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          Normal: {metric.normalRange.min} - {metric.normalRange.max} {metric.unit}
                        </div>
                        
                        <Progress 
                          value={isInRange ? 100 : 50} 
                          className={`h-1 ${isInRange ? 'bg-success' : 'bg-warning'}`} 
                        />
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Nanobots: {metric.nanobotCount.toLocaleString()}</span>
                          <span>Trend: {metric.trend}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Critical health parameter notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {patients.flatMap(patient => 
              patient.metrics
                .filter(metric => metric.status === 'critical' || metric.status === 'warning')
                .map(metric => (
                  <div 
                    key={`${patient.id}-${metric.id}`}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      metric.status === 'critical' ? 'bg-destructive/10' : 'bg-warning/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`h-4 w-4 ${
                        metric.status === 'critical' ? 'text-destructive' : 'text-warning'
                      }`} />
                      <div>
                        <div className="font-medium">
                          {patient.name} - {metric.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Current: {metric.value} {metric.unit} (Normal: {metric.normalRange.min}-{metric.normalRange.max})
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(metric.status)} text-background`}
                    >
                      {metric.status.toUpperCase()}
                    </Badge>
                  </div>
                ))
            )}
            {patients.every(p => p.metrics.every(m => m.status === 'normal')) && (
              <div className="text-center py-4 text-muted-foreground">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                All patients have normal vitals
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}