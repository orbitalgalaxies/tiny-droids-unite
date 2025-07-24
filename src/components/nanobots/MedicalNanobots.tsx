import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Heart, 
  Target, 
  Activity, 
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface Treatment {
  id: string;
  patientId: string;
  condition: string;
  drugPayload: string;
  targetCells: string;
  nanobotCount: number;
  progress: number;
  status: 'planning' | 'deploying' | 'treating' | 'monitoring' | 'completed';
  efficiency: number;
  sideEffects: string[];
}

export function MedicalNanobots() {
  const [treatments, setTreatments] = useState<Treatment[]>([
    {
      id: 'tx-001',
      patientId: 'P-12345',
      condition: 'Glioblastoma (Brain Cancer)',
      drugPayload: 'Temozolomide + Immunotherapy',
      targetCells: 'Tumor cells in frontal lobe',
      nanobotCount: 50000,
      progress: 78,
      status: 'treating',
      efficiency: 94,
      sideEffects: ['Mild headache', 'Temporary fatigue']
    },
    {
      id: 'tx-002', 
      patientId: 'P-12346',
      condition: 'Acute Myocardial Infarction',
      drugPayload: 'Thrombolytic agents',
      targetCells: 'Coronary artery blockage',
      nanobotCount: 25000,
      progress: 45,
      status: 'deploying',
      efficiency: 89,
      sideEffects: []
    },
    {
      id: 'tx-003',
      patientId: 'P-12347', 
      condition: 'Diabetic Retinopathy',
      drugPayload: 'Anti-VEGF therapy',
      targetCells: 'Retinal blood vessels',
      nanobotCount: 15000,
      progress: 100,
      status: 'completed',
      efficiency: 96,
      sideEffects: ['Temporary blurred vision']
    }
  ]);

  const [newTreatment, setNewTreatment] = useState({
    patientId: '',
    condition: '',
    drugPayload: '',
    targetCells: '',
    nanobotCount: 10000
  });

  const handleDeployTreatment = () => {
    if (!newTreatment.patientId || !newTreatment.condition) {
      toast.error('Please fill in required fields');
      return;
    }

    const treatment: Treatment = {
      id: `tx-${Date.now()}`,
      ...newTreatment,
      progress: 0,
      status: 'planning',
      efficiency: 0,
      sideEffects: []
    };

    setTreatments(prev => [...prev, treatment]);
    setNewTreatment({
      patientId: '',
      condition: '',
      drugPayload: '',
      targetCells: '',
      nanobotCount: 10000
    });

    toast.success('New treatment protocol initiated');
  };

  const updateTreatmentStatus = (treatmentId: string, newStatus: Treatment['status']) => {
    setTreatments(prev => prev.map(tx => 
      tx.id === treatmentId 
        ? { 
            ...tx, 
            status: newStatus,
            progress: newStatus === 'deploying' ? 10 : 
                     newStatus === 'treating' ? 50 :
                     newStatus === 'monitoring' ? 90 :
                     newStatus === 'completed' ? 100 : tx.progress
          }
        : tx
    ));
    toast.info(`Treatment ${treatmentId} status updated to ${newStatus}`);
  };

  const getStatusIcon = (status: Treatment['status']) => {
    switch (status) {
      case 'planning': return <Clock className="h-4 w-4" />;
      case 'deploying': return <Zap className="h-4 w-4" />;
      case 'treating': return <Target className="h-4 w-4" />;
      case 'monitoring': return <Activity className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Treatment['status']) => {
    switch (status) {
      case 'planning': return 'bg-muted';
      case 'deploying': return 'bg-warning';
      case 'treating': return 'bg-primary';
      case 'monitoring': return 'bg-info';
      case 'completed': return 'bg-success';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-nanobot-medical/10">
          <Heart className="h-6 w-6 text-nanobot-medical" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Medical Nanobots</h2>
          <p className="text-muted-foreground">Targeted drug delivery and cancer treatment systems</p>
        </div>
      </div>

      {/* New Treatment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Deploy New Treatment</CardTitle>
          <CardDescription>Configure nanobots for targeted medical intervention</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID *</Label>
              <Input
                id="patientId"
                value={newTreatment.patientId}
                onChange={(e) => setNewTreatment(prev => ({ ...prev, patientId: e.target.value }))}
                placeholder="P-12345"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Medical Condition *</Label>
              <Input
                id="condition"
                value={newTreatment.condition}
                onChange={(e) => setNewTreatment(prev => ({ ...prev, condition: e.target.value }))}
                placeholder="e.g., Lung Cancer, Diabetes"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="drugPayload">Drug Payload</Label>
              <Input
                id="drugPayload"
                value={newTreatment.drugPayload}
                onChange={(e) => setNewTreatment(prev => ({ ...prev, drugPayload: e.target.value }))}
                placeholder="e.g., Chemotherapy agents"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetCells">Target Cells/Area</Label>
              <Input
                id="targetCells"
                value={newTreatment.targetCells}
                onChange={(e) => setNewTreatment(prev => ({ ...prev, targetCells: e.target.value }))}
                placeholder="e.g., Tumor cells, specific organ"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nanobotCount">Nanobot Count</Label>
              <Input
                id="nanobotCount"
                type="number"
                value={newTreatment.nanobotCount}
                onChange={(e) => setNewTreatment(prev => ({ ...prev, nanobotCount: parseInt(e.target.value) || 0 }))}
                min="1000"
                max="100000"
                step="1000"
              />
            </div>
          </div>
          <Button onClick={handleDeployTreatment} className="w-full">
            Deploy Treatment Nanobots
          </Button>
        </CardContent>
      </Card>

      {/* Active Treatments */}
      <div className="grid gap-4">
        {treatments.map(treatment => (
          <Card key={treatment.id} className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nanobot-medical to-primary opacity-60" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Patient {treatment.patientId}
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(treatment.status)} text-background`}
                    >
                      {getStatusIcon(treatment.status)}
                      {treatment.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{treatment.condition}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-nanobot-medical">{treatment.efficiency}%</div>
                  <div className="text-sm text-muted-foreground">Efficiency</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Target</div>
                    <div className="text-sm text-muted-foreground">{treatment.targetCells}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Payload</div>
                    <div className="text-sm text-muted-foreground">{treatment.drugPayload}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Nanobots</div>
                    <div className="text-sm text-muted-foreground">{treatment.nanobotCount.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Treatment Progress</span>
                  <span className="text-sm text-muted-foreground">{treatment.progress}%</span>
                </div>
                <Progress value={treatment.progress} className="h-2" />
              </div>

              {treatment.sideEffects.length > 0 && (
                <div className="flex items-start gap-2 p-3 bg-warning/10 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Reported Side Effects</div>
                    <div className="text-sm text-muted-foreground">
                      {treatment.sideEffects.join(', ')}
                    </div>
                  </div>
                </div>
              )}

              {treatment.status !== 'completed' && (
                <div className="flex gap-2">
                  {treatment.status === 'planning' && (
                    <Button 
                      size="sm"
                      onClick={() => updateTreatmentStatus(treatment.id, 'deploying')}
                    >
                      Begin Deployment
                    </Button>
                  )}
                  {treatment.status === 'deploying' && (
                    <Button 
                      size="sm"
                      onClick={() => updateTreatmentStatus(treatment.id, 'treating')}
                    >
                      Start Treatment
                    </Button>
                  )}
                  {treatment.status === 'treating' && (
                    <Button 
                      size="sm"
                      onClick={() => updateTreatmentStatus(treatment.id, 'monitoring')}
                    >
                      Enter Monitoring
                    </Button>
                  )}
                  {treatment.status === 'monitoring' && (
                    <Button 
                      size="sm"
                      onClick={() => updateTreatmentStatus(treatment.id, 'completed')}
                    >
                      Complete Treatment
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}