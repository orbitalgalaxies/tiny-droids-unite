import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Cpu, 
  Settings, 
  Layers, 
  Zap,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

interface ManufacturingJob {
  id: string;
  productName: string;
  material: string;
  quantity: number;
  precision: string;
  nanobotCount: number;
  progress: number;
  status: 'queued' | 'assembling' | 'quality-check' | 'completed' | 'error';
  estimatedTime: string;
  actualTime?: string;
  defectRate: number;
  complexity: 'simple' | 'moderate' | 'complex' | 'ultra-complex';
}

interface ProductionMetrics {
  totalProductsManufactured: number;
  averageDefectRate: number;
  productionEfficiency: number;
  activeJobs: number;
}

export function ManufacturingNanobots() {
  const [jobs, setJobs] = useState<ManufacturingJob[]>([
    {
      id: 'mfg-001',
      productName: 'Microprocessor Circuits',
      material: 'Silicon/Gold nanocomposite',
      quantity: 1000,
      precision: '5 nanometers',
      nanobotCount: 50000,
      progress: 78,
      status: 'assembling',
      estimatedTime: '2.5 hours',
      defectRate: 0.02,
      complexity: 'ultra-complex'
    },
    {
      id: 'mfg-002',
      productName: 'Carbon Nanotubes',
      material: 'Pure carbon',
      quantity: 5000,
      precision: '1 nanometer',
      nanobotCount: 30000,
      progress: 100,
      status: 'completed',
      estimatedTime: '1.8 hours',
      actualTime: '1.7 hours',
      defectRate: 0.001,
      complexity: 'complex'
    },
    {
      id: 'mfg-003',
      productName: 'Quantum Dots',
      material: 'Semiconductor crystals',
      quantity: 10000,
      precision: '2 nanometers', 
      nanobotCount: 75000,
      progress: 45,
      status: 'assembling',
      estimatedTime: '4.2 hours',
      defectRate: 0.05,
      complexity: 'ultra-complex'
    },
    {
      id: 'mfg-004',
      productName: 'Medical Implant Components',
      material: 'Biocompatible titanium',
      quantity: 100,
      precision: '10 nanometers',
      nanobotCount: 20000,
      progress: 0,
      status: 'queued',
      estimatedTime: '3.0 hours',
      defectRate: 0,
      complexity: 'moderate'
    }
  ]);

  const [metrics, setMetrics] = useState<ProductionMetrics>({
    totalProductsManufactured: 16100,
    averageDefectRate: 0.023,
    productionEfficiency: 94.2,
    activeJobs: 2
  });

  const [newJob, setNewJob] = useState({
    productName: '',
    material: '',
    quantity: 100,
    precision: '',
    complexity: 'simple' as ManufacturingJob['complexity']
  });

  const getComplexityColor = (complexity: ManufacturingJob['complexity']) => {
    switch (complexity) {
      case 'simple': return 'bg-success';
      case 'moderate': return 'bg-info';
      case 'complex': return 'bg-warning';
      case 'ultra-complex': return 'bg-destructive';
    }
  };

  const getStatusIcon = (status: ManufacturingJob['status']) => {
    switch (status) {
      case 'queued': return <Clock className="h-4 w-4" />;
      case 'assembling': return <Settings className="h-4 w-4 animate-spin" />;
      case 'quality-check': return <AlertTriangle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const calculateNanobotCount = (quantity: number, complexity: string) => {
    const baseCount = quantity * 10;
    const multiplier = {
      'simple': 1,
      'moderate': 2,
      'complex': 5,
      'ultra-complex': 10
    }[complexity] || 1;
    return baseCount * multiplier;
  };

  const handleCreateJob = () => {
    if (!newJob.productName || !newJob.material) {
      toast.error('Please fill in required fields');
      return;
    }

    const nanobotCount = calculateNanobotCount(newJob.quantity, newJob.complexity);
    const estimatedHours = (nanobotCount / 25000) * (newJob.complexity === 'ultra-complex' ? 2 : 1);

    const job: ManufacturingJob = {
      id: `mfg-${Date.now()}`,
      ...newJob,
      nanobotCount,
      progress: 0,
      status: 'queued',
      estimatedTime: `${estimatedHours.toFixed(1)} hours`,
      defectRate: 0
    };

    setJobs(prev => [...prev, job]);
    setNewJob({
      productName: '',
      material: '',
      quantity: 100,
      precision: '',
      complexity: 'simple'
    });

    toast.success('Manufacturing job queued successfully');
  };

  const handleJobAction = (jobId: string, action: 'start' | 'pause' | 'abort') => {
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        switch (action) {
          case 'start':
            toast.success(`Starting production of ${job.productName}`);
            return { ...job, status: 'assembling' as const };
          case 'pause':
            toast.info(`Pausing production of ${job.productName}`);
            return { ...job, status: 'queued' as const };
          case 'abort':
            toast.warning(`Aborting production of ${job.productName}`);
            return { ...job, status: 'error' as const };
        }
      }
      return job;
    }));
  };

  const activeJobs = jobs.filter(j => j.status === 'assembling');
  const completedJobs = jobs.filter(j => j.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-nanobot-manufacturing/10">
          <Cpu className="h-6 w-6 text-nanobot-manufacturing" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Precision Manufacturing</h2>
          <p className="text-muted-foreground">Molecular-level assembly and fabrication systems</p>
        </div>
      </div>

      {/* Production Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Manufactured</p>
                <p className="text-2xl font-bold text-nanobot-manufacturing">{metrics.totalProductsManufactured.toLocaleString()}</p>
              </div>
              <Package className="h-8 w-8 text-nanobot-manufacturing" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Defect Rate</p>
                <p className="text-2xl font-bold text-success">{(metrics.averageDefectRate * 100).toFixed(3)}%</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Efficiency</p>
                <p className="text-2xl font-bold text-primary">{metrics.productionEfficiency}%</p>
              </div>
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                <p className="text-2xl font-bold text-info">{metrics.activeJobs}</p>
              </div>
              <Settings className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Job Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create Manufacturing Job</CardTitle>
          <CardDescription>Configure nanobots for precision molecular assembly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                value={newJob.productName}
                onChange={(e) => setNewJob(prev => ({ ...prev, productName: e.target.value }))}
                placeholder="e.g., Microchips, Carbon fibers"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="material">Material *</Label>
              <Input
                id="material"
                value={newJob.material}
                onChange={(e) => setNewJob(prev => ({ ...prev, material: e.target.value }))}
                placeholder="e.g., Silicon, Carbon, Titanium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={newJob.quantity}
                onChange={(e) => setNewJob(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                min="1"
                max="100000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="precision">Precision Requirement</Label>
              <Input
                id="precision"
                value={newJob.precision}
                onChange={(e) => setNewJob(prev => ({ ...prev, precision: e.target.value }))}
                placeholder="e.g., 5 nanometers, 0.1 angstrom"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complexity">Complexity Level</Label>
              <select
                id="complexity"
                value={newJob.complexity}
                onChange={(e) => setNewJob(prev => ({ ...prev, complexity: e.target.value as ManufacturingJob['complexity'] }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="simple">Simple</option>
                <option value="moderate">Moderate</option>
                <option value="complex">Complex</option>
                <option value="ultra-complex">Ultra Complex</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Estimated Nanobots Required</Label>
              <div className="text-2xl font-bold text-nanobot-manufacturing">
                {calculateNanobotCount(newJob.quantity, newJob.complexity).toLocaleString()}
              </div>
            </div>
          </div>
          <Button onClick={handleCreateJob} className="w-full">
            Queue Manufacturing Job
          </Button>
        </CardContent>
      </Card>

      {/* Active Jobs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Production Queue</h3>
        {jobs.map(job => (
          <Card key={job.id} className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nanobot-manufacturing to-primary opacity-60" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    {job.productName}
                  </CardTitle>
                  <CardDescription>Material: {job.material} | Quantity: {job.quantity.toLocaleString()}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`${getComplexityColor(job.complexity)} text-background`}
                  >
                    {job.complexity.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">
                    {getStatusIcon(job.status)}
                    {job.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium">Precision</p>
                  <p className="text-sm text-muted-foreground">{job.precision}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Nanobots</p>
                  <p className="text-sm text-muted-foreground">{job.nanobotCount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Estimated Time</p>
                  <p className="text-sm text-muted-foreground">{job.estimatedTime}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Defect Rate</p>
                  <p className="text-sm text-muted-foreground">{(job.defectRate * 100).toFixed(3)}%</p>
                </div>
              </div>

              {job.status === 'assembling' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Assembly Progress</span>
                    <span className="text-sm text-muted-foreground">{job.progress}%</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                </div>
              )}

              {job.status === 'completed' && (
                <div className="p-3 bg-success/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-success">Production Completed</span>
                    <span className="text-sm font-medium">Actual Time: {job.actualTime}</span>
                  </div>
                </div>
              )}

              {job.status === 'queued' && (
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    onClick={() => handleJobAction(job.id, 'start')}
                  >
                    Start Production
                  </Button>
                  <Button 
                    size="sm"
                    variant="destructive"
                    onClick={() => handleJobAction(job.id, 'abort')}
                  >
                    Cancel Job
                  </Button>
                </div>
              )}

              {job.status === 'assembling' && (
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => handleJobAction(job.id, 'pause')}
                  >
                    Pause Production
                  </Button>
                  <Button 
                    size="sm"
                    variant="destructive"
                    onClick={() => handleJobAction(job.id, 'abort')}
                  >
                    Abort Job
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}