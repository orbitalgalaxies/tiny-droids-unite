# NanoSwarm Control System 🤖

Advanced nanobots control and monitoring platform for medical, environmental, manufacturing, and research applications.

**URL**: https://lovable.dev/projects/73ebde16-8bb6-4cf0-8e71-8f30f75d4dde

## 🚀 Features

- **Medical Nanobots**: Deploy targeted treatments, drug delivery, and patient monitoring
- **Environmental Cleanup**: Pollution remediation, air quality improvement, and ecosystem restoration
- **Manufacturing**: Precision assembly, quality control, and automated production
- **Health Monitoring**: Real-time biosensor data and patient vitals tracking
- **Microsurgery**: Precision surgical assistance and minimally invasive procedures

## 🎨 Design System

This project uses a comprehensive design system with custom nanobot-themed color tokens:

### Color Palette
```css
/* Nanobot-specific colors */
--nanobot-medical: 199 89% 48%        /* Medical procedures */
--nanobot-environmental: 142 76% 36%  /* Environmental cleanup */
--nanobot-manufacturing: 25 95% 53%   /* Manufacturing processes */
--nanobot-monitoring: 271 81% 56%     /* Health monitoring */
--nanobot-surgical: 346 87% 43%       /* Surgical applications */
--nanobot-swarm: 217 91% 60%          /* Swarm coordination */

/* Status indicators */
--success: 142 76% 36%                /* Success states */
--warning: 48 96% 53%                 /* Warning states */
--info: 199 89% 48%                   /* Information states */
```

### Usage Examples
```tsx
// ✅ Correct - Use semantic tokens
<Button className="bg-nanobot-medical text-white">Deploy Medical Nanobots</Button>
<Badge className="bg-success/10 text-success border-success">System Online</Badge>

// ❌ Avoid - Direct color values
<Button className="bg-blue-500 text-white">Deploy Nanobots</Button>
```

### Custom Gradients
```css
--gradient-primary: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))
--gradient-nanobot: linear-gradient(135deg, hsl(var(--nanobot-swarm)), hsl(var(--nanobot-medical)))
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or bun package manager

### Quick Start
```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration

#### Development (.env.local)
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://ayaorlmpktziwkdngvdx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Development Settings
VITE_NODE_ENV=development
VITE_DEBUG_MODE=true
```

#### Production (.env.production)
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://ayaorlmpktziwkdngvdx.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key

# Production Settings
VITE_NODE_ENV=production
VITE_DEBUG_MODE=false
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── nanobots/           # Nanobot-specific components
│   │   ├── MedicalNanobots.tsx
│   │   ├── EnvironmentalNanobots.tsx
│   │   ├── ManufacturingNanobots.tsx
│   │   ├── HealthMonitoring.tsx
│   │   ├── MicrosurgeryNanobots.tsx
│   │   └── NanobotsControl.tsx
│   └── ui/                 # Reusable UI components (shadcn/ui)
├── hooks/                  # Custom React hooks
├── integrations/
│   └── supabase/          # Supabase client and types
├── lib/                   # Utility functions
└── pages/                 # Route components
```

## 🎯 Component Guidelines

### Creating New Nanobot Components
```tsx
// Template for new nanobot applications
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface YourNanobotData {
  id: string;
  status: 'active' | 'inactive' | 'maintenance';
  // Add your specific properties
}

export function YourNanobots() {
  const [nanobots, setNanobots] = useState<YourNanobotData[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-nanobot-[type] to-accent bg-clip-text text-transparent">
          Your Nanobot Application
        </h2>
        <Badge className="bg-success/10 text-success border-success">
          {nanobots.filter(n => n.status === 'active').length} Active
        </Badge>
      </div>
      
      {/* Your component content */}
    </div>
  );
}
```

## 🧪 Testing Nanobot Applications

### Unit Testing
```sh
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

### Integration Testing
```sh
# Test nanobot communication
npm run test:integration

# Test Supabase connections
npm run test:supabase
```

## 📚 Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui with custom nanobot variants
- **Backend**: Supabase (Database, Auth, Real-time, Edge Functions)
- **State Management**: React hooks and Context API
- **Routing**: React Router DOM
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## 🚀 Deployment

### Lovable Platform (Recommended)
1. Open [Lovable Project](https://lovable.dev/projects/73ebde16-8bb6-4cf0-8e71-8f30f75d4dde)
2. Click **Share** → **Publish**
3. Configure custom domain in **Project Settings** → **Domains**

### Manual Deployment
```sh
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔗 Useful Links

- [Lovable Documentation](https://docs.lovable.dev/)
- [Supabase Dashboard](https://supabase.com/dashboard/project/ayaorlmpktziwkdngvdx)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

## 🤝 Contributing

1. Follow the design system guidelines
2. Use semantic color tokens, not direct colors
3. Create focused, reusable components
4. Write TypeScript with strict mode enabled
5. Test nanobot integrations thoroughly

## 📄 License

This project is licensed under the MIT License.