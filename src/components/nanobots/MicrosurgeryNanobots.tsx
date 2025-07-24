import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Scissors, 
  Target, 
  Eye, 
  Brain,
  Heart,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';

interface SurgicalProcedure {
  id: string;
  patientId: string;
  procedureType: string;
  targetArea: string;
  surgeonName: string;
  nanobotCount: number;
  precision: string;
  progress: number;
  status: 'planned' | 'preparing' | 'active' | 'paused' | 'completed' | 'emergency';
  estimatedDuration: string;
  actualDuration?: string;
  complications: string[];
  successRate: number;
}

interface SurgicalMetrics {
  totalProcedures: number;
  successRate: number;
  averagePrecision: number;
  activeProcedures: number;
}

export function MicrosurgeryNanobots() {
  const [procedures, setProcedures] = useState<SurgicalProcedure[]>([
    {
      id: 'surg-001',
      patientId: 'P-54321',
      procedureType: 'Retinal Blood Vessel Repair',
      targetArea: 'Left eye retina, sector 3',
      surgeonName: 'Dr. Sarah Chen',
      nanobotCount: 15000,
      precision: '0.5 micrometers',
      progress: 67,
      status: 'active',
      estimatedDuration: '45 minutes',
      complications: [],
      successRate: 94
    },
    {
      id: 'surg-002',
      patientId: 'P-54322',
      procedureType: 'Neural Pathway Reconnection',
      targetArea: 'Spinal cord L3-L4',
      surgeonName: 'Dr. Michael Rodriguez',
      nanobotCount: 25000,
      precision: '0.1 micrometers',
      progress: 100,
      status: 'completed',
      estimatedDuration: '2.5 hours',
      actualDuration: '2.3 hours',
      complications: [],
      successRate: 98
    },
    {
      id: 'surg-003',
      patientId: 'P-54323',
      procedureType: 'Cardiac Valve Reconstruction',
      targetArea: 'Mitral valve leaflet',
      surgeonName: 'Dr. Emily Foster',
      nanobotCount: 20000,
      precision: '1 micrometer',
      progress: 0,
      status: 'planned',
      estimatedDuration: '1.8 hours',
      complications: [],
      successRate: 96
    },
    {
      id: 'surg-004',
      patientId: 'P-54324',
      procedureType: 'Tumor Removal (Cellular Level)',
      targetArea: 'Brain stem, anterior region',
      surgeonName: 'Dr. James Liu',
      nanobotCount: 35000,
      precision: '0.2 micrometers',
      progress: 23,
      status: 'active',
      estimatedDuration: '4 hours',
      complications: ['Minor bleeding detected'],
      successRate: 89
    }
  ]);

  const [metrics, setMetrics] = useState<SurgicalMetrics>({
    totalProcedures: 147,
    successRate: 96.2,
    averagePrecision: 0.4,
    activeProcedures: 2
  });

  const [newProcedure, setNewProcedure] = useState({
    patientId: '',
    procedureType: '',
    targetArea: '',
    surgeonName: '',
    precision: '1 micrometer',
    estimatedDuration: '1 hour'
  });

  const getStatusColor = (status: SurgicalProcedure['status']) => {
    switch (status) {
      case 'planned': return 'bg-muted';
      case 'preparing': return 'bg-info';
      case 'active': return 'bg-success';
      case 'paused': return 'bg-warning';
      case 'completed': return 'bg-primary';
      case 'emergency': return 'bg-destructive';
    }
  };

  const getStatusIcon = (status: SurgicalProcedure['status']) => {
    switch (status) {
      case 'planned': return <Clock className="h-4 w-4" />;
      case 'preparing': return <Target className="h-4 w-4" />;
      case 'active': return <Scissors className="h-4 w-4" />;
      case 'paused': return <AlertTriangle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'emergency': return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getProcedureIcon = (procedureType: string) => {
    if (procedureType.toLowerCase().includes('retinal') || procedureType.toLowerCase().includes('eye')) {
      return Eye;
    } else if (procedureType.toLowerCase().includes('neural') || procedureType.toLowerCase().includes('brain')) {
      return Brain;
    } else if (procedureType.toLowerCase().includes('cardiac') || procedureType.toLowerCase().includes('heart')) {
      return Heart;
    }
    return Scissors;
  };

  const calculateNanobotCount = (procedureType: string, precision: string) => {
    const basePrecision = parseFloat(precision);
    let baseCount = 10000;
    
    if (procedureType.toLowerCase().includes('neural') || procedureType.toLowerCase().includes('brain')) {
      baseCount = 30000;
    } else if (procedureType.toLowerCase().includes('cardiac')) {
      baseCount = 20000;
    } else if (procedureType.toLowerCase().includes('retinal')) {
      baseCount = 15000;
    }
    
    // More precision requires more nanobots
    if (basePrecision < 0.5) baseCount *= 2;
    if (basePrecision < 0.1) baseCount *= 2;
    
    return baseCount;
  };

  const handleScheduleProcedure = () => {
    if (!newProcedure.patientId || !newProcedure.procedureType || !newProcedure.surgeonName) {
      toast.error('Please fill in all required fields');
      return;
    }

    const nanobotCount = calculateNanobotCount(newProcedure.procedureType, newProcedure.precision);

    const procedure: SurgicalProcedure = {
      id: `surg-${Date.now()}`,
      ...newProcedure,
      nanobotCount,
      progress: 0,
      status: 'planned',
      complications: [],
      successRate: 95
    };

    setProcedures(prev => [...prev, procedure]);
    setNewProcedure({
      patientId: '',
      procedureType: '',
      targetArea: '',
      surgeonName: '',
      precision: '1 micrometer',
      estimatedDuration: '1 hour'
    });

    toast.success('Microsurgery procedure scheduled successfully');
  };

  const handleProcedureAction = (procedureId: string, action: 'start' | 'pause' | 'resume' | 'emergency') => {
    setProcedures(prev => prev.map(proc => {
      if (proc.id === procedureId) {
        switch (action) {
          case 'start':
            toast.success(`Starting microsurgery: ${proc.procedureType}`);
            return { ...proc, status: 'active' as const };
          case 'pause':
            toast.info(`Pausing procedure: ${proc.procedureType}`);
            return { ...proc, status: 'paused' as const };
          case 'resume':
            toast.success(`Resuming procedure: ${proc.procedureType}`);
            return { ...proc, status: 'active' as const };
          case 'emergency':
            toast.error(`Emergency stop activated for: ${proc.procedureType}`);
            return { ...proc, status: 'emergency' as const };
        }
      }
      return proc;
    }));
  };

  const activeProcedures = procedures.filter(p => p.status === 'active');
  const completedProcedures = procedures.filter(p => p.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-nanobot-surgical/10">
          <Scissors className="h-6 w-6 text-nanobot-surgical" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Microsurgery Nanobots</h2>
          <p className="text-muted-foreground">Cellular-level surgical procedures with nanometer precision</p>
        </div>
      </div>

      {/* Surgical Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Procedures</p>
                <p className="text-2xl font-bold text-nanobot-surgical">{metrics.totalProcedures}</p>
              </div>
              <Scissors className="h-8 w-8 text-nanobot-surgical" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-success">{metrics.successRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Precision</p>
                <p className="text-2xl font-bold text-primary">{metrics.averagePrecision} μm</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Now</p>
                <p className="text-2xl font-bold text-info">{metrics.activeProcedures}</p>
              </div>
              <Activity className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule New Procedure */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule Microsurgery Procedure</CardTitle>
          <CardDescription>Configure nanobots for precision cellular-level surgery</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID *</Label>
              <Input
                id="patientId"
                value={newProcedure.patientId}
                onChange={(e) => setNewProcedure(prev => ({ ...prev, patientId: e.target.value }))}
                placeholder="P-12345"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="procedureType">Procedure Type *</Label>
              <Input
                id="procedureType"
                value={newProcedure.procedureType}
                onChange={(e) => setNewProcedure(prev => ({ ...prev, procedureType: e.target.value }))}
                placeholder="e.g., Retinal repair, Neural reconnection"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetArea">Target Area</Label>
              <Input
                id="targetArea"
                value={newProcedure.targetArea}
                onChange={(e) => setNewProcedure(prev => ({ ...prev, targetArea: e.target.value }))}
                placeholder="e.g., Left retina sector 3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="surgeonName">Surgeon Name *</Label>
              <Input
                id="surgeonName"
                value={newProcedure.surgeonName}
                onChange={(e) => setNewProcedure(prev => ({ ...prev, surgeonName: e.target.value }))}
                placeholder="Dr. Smith"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="precision">Required Precision</Label>
              <select
                id="precision"
                value={newProcedure.precision}
                onChange={(e) => setNewProcedure(prev => ({ ...prev, precision: e.target.value }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="5 micrometers">5 micrometers (Standard)</option>
                <option value="1 micrometer">1 micrometer (High)</option>
                <option value="0.5 micrometers">0.5 micrometers (Ultra-high)</option>
                <option value="0.1 micrometers">0.1 micrometer (Maximum)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedDuration">Estimated Duration</Label>
              <Input
                id="estimatedDuration"
                value={newProcedure.estimatedDuration}
                onChange={(e) => setNewProcedure(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                placeholder="e.g., 2 hours"
              />
            </div>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estimated Nanobots Required:</span>
              <span className="text-lg font-bold text-nanobot-surgical">
                {calculateNanobotCount(newProcedure.procedureType, newProcedure.precision).toLocaleString()}
              </span>
            </div>
          </div>
          <Button onClick={handleScheduleProcedure} className="w-full">
            Schedule Microsurgery Procedure
          </Button>
        </CardContent>
      </Card>

      {/* Active Procedures */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Surgical Procedures</h3>
        {procedures.map(procedure => {
          const ProcedureIcon = getProcedureIcon(procedure.procedureType);
          
          return (
            <Card key={procedure.id} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nanobot-surgical to-primary opacity-60" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ProcedureIcon className="h-4 w-4" />
                      {procedure.procedureType}
                    </CardTitle>
                    <CardDescription>
                      Patient: {procedure.patientId} | Surgeon: {procedure.surgeonName}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(procedure.status)} text-background`}
                    >
                      {getStatusIcon(procedure.status)}
                      {procedure.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium">Target Area</p>
                    <p className="text-sm text-muted-foreground">{procedure.targetArea}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Precision</p>
                    <p className="text-sm text-muted-foreground">{procedure.precision}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Nanobots</p>
                    <p className="text-sm text-muted-foreground">{procedure.nanobotCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Success Rate</p>
                    <p className="text-sm text-muted-foreground">{procedure.successRate}%</p>
                  </div>
                </div>

                {(procedure.status === 'active' || procedure.status === 'paused') && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Surgical Progress</span>
                      <span className="text-sm text-muted-foreground">{procedure.progress}%</span>
                    </div>
                    <Progress value={procedure.progress} className="h-2" />
                  </div>
                )}

                {procedure.complications.length > 0 && (
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Complications Detected</div>
                        <div className="text-sm text-muted-foreground">
                          {procedure.complications.join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {procedure.status === 'completed' && (
                  <div className="p-3 bg-success/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-success">Surgery Completed Successfully</span>
                      <span className="text-sm font-medium">Duration: {procedure.actualDuration}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {procedure.status === 'planned' && (
                    <Button 
                      size="sm"
                      onClick={() => handleProcedureAction(procedure.id, 'start')}
                    >
                      Begin Surgery
                    </Button>
                  )}
                  
                  {procedure.status === 'active' && (
                    <>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleProcedureAction(procedure.id, 'pause')}
                      >
                        Pause
                      </Button>
                      <Button 
                        size="sm"
                        variant="destructive"
                        onClick={() => handleProcedureAction(procedure.id, 'emergency')}
                      >
                        Emergency Stop
                      </Button>
                    </>
                  )}
                  
                  {procedure.status === 'paused' && (
                    <Button 
                      size="sm"
                      onClick={() => handleProcedureAction(procedure.id, 'resume')}
                    >
                      Resume Surgery
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}