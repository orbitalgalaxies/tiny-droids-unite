import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Pause, Play } from 'lucide-react';

interface Nanobot {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'medical' | 'environmental' | 'manufacturing' | 'monitoring' | 'surgical';
  active: boolean;
  targetX?: number;
  targetY?: number;
}

const NANOBOT_COLORS = {
  medical: '#22c55e',
  environmental: '#10b981', 
  manufacturing: '#8b5cf6',
  monitoring: '#3b82f6',
  surgical: '#ef4444'
};

export function SwarmVisualization() {
  const [nanobots, setNanobots] = useState<Nanobot[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [swarmTarget, setSwarmTarget] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Initialize nanobots
    const initialNanobots: Nanobot[] = [];
    const types: Nanobot['type'][] = ['medical', 'environmental', 'manufacturing', 'monitoring', 'surgical'];
    
    for (let i = 0; i < 100; i++) {
      initialNanobots.push({
        id: `nano-${i}`,
        x: Math.random() * 800,
        y: Math.random() * 600,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        type: types[i % types.length],
        active: Math.random() > 0.3
      });
    }
    
    setNanobots(initialNanobots);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setNanobots(prev => prev.map(nanobot => {
        if (!nanobot.active) return nanobot;

        let { x, y, vx, vy } = nanobot;

        // Move towards target if exists
        if (swarmTarget) {
          const dx = swarmTarget.x - x;
          const dy = swarmTarget.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 5) {
            vx += (dx / distance) * 0.1;
            vy += (dy / distance) * 0.1;
          }
        }

        // Apply some random movement
        vx += (Math.random() - 0.5) * 0.1;
        vy += (Math.random() - 0.5) * 0.1;

        // Limit velocity
        const speed = Math.sqrt(vx * vx + vy * vy);
        if (speed > 3) {
          vx = (vx / speed) * 3;
          vy = (vy / speed) * 3;
        }

        // Update position
        x += vx;
        y += vy;

        // Boundary collision
        if (x <= 0 || x >= 800) {
          vx = -vx * 0.8;
          x = Math.max(0, Math.min(800, x));
        }
        if (y <= 0 || y >= 600) {
          vy = -vy * 0.8;
          y = Math.max(0, Math.min(600, y));
        }

        return { ...nanobot, x, y, vx, vy };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [isActive, swarmTarget]);

  const handleCanvasClick = (e: React.MouseEvent<SVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSwarmTarget({ x, y });
  };

  const toggleSimulation = () => {
    setIsActive(!isActive);
  };

  const resetSwarm = () => {
    setSwarmTarget(null);
    setNanobots(prev => prev.map(nanobot => ({
      ...nanobot,
      x: Math.random() * 800,
      y: Math.random() * 600,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    })));
  };

  const activeCount = nanobots.filter(n => n.active).length;
  const typeCount = nanobots.reduce((acc, n) => {
    acc[n.type] = (acc[n.type] || 0) + (n.active ? 1 : 0);
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Swarm Behavior Simulation</CardTitle>
            <CardDescription>Real-time visualization of nanobot swarm dynamics</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSimulation}
              className="flex items-center gap-2"
            >
              {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetSwarm}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {Object.entries(typeCount).map(([type, count]) => (
            <Badge key={type} variant="outline" className="flex items-center gap-1">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: NANOBOT_COLORS[type as keyof typeof NANOBOT_COLORS] }}
              />
              {type}: {count}
            </Badge>
          ))}
          <Badge variant="secondary">
            Total Active: {activeCount}
          </Badge>
        </div>

        <div className="relative border rounded-lg overflow-hidden bg-card">
          <svg
            width="800"
            height="600"
            className="w-full h-auto cursor-crosshair"
            onClick={handleCanvasClick}
            style={{ aspectRatio: '4/3' }}
          >
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Target indicator */}
            {swarmTarget && (
              <g>
                <circle
                  cx={swarmTarget.x}
                  cy={swarmTarget.y}
                  r="20"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  opacity="0.6"
                />
                <circle
                  cx={swarmTarget.x}
                  cy={swarmTarget.y}
                  r="5"
                  fill="hsl(var(--primary))"
                  opacity="0.8"
                />
              </g>
            )}

            {/* Nanobots */}
            {nanobots.map(nanobot => (
              <circle
                key={nanobot.id}
                cx={nanobot.x}
                cy={nanobot.y}
                r={nanobot.active ? 3 : 1.5}
                fill={NANOBOT_COLORS[nanobot.type]}
                opacity={nanobot.active ? 0.8 : 0.3}
                className="transition-all duration-100"
              />
            ))}
          </svg>
        </div>

        <p className="text-sm text-muted-foreground">
          Click anywhere in the simulation area to set a swarm target. Nanobots will move towards the target while maintaining their individual behaviors.
        </p>
      </CardContent>
    </Card>
  );
}