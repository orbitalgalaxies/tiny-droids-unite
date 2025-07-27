# NanoSwarm Design System

## Overview
The NanoSwarm Control System uses a comprehensive design system built on Tailwind CSS with custom semantic tokens for consistent theming across all nanobot applications.

## Color Palette

### Core Colors (HSL Values)
```css
:root {
  /* Primary brand colors */
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  
  /* Nanobot-specific colors */
  --nanobot-medical: 199 89% 48%;        /* Blue - Medical procedures */
  --nanobot-environmental: 142 76% 36%;  /* Green - Environmental cleanup */
  --nanobot-manufacturing: 25 95% 53%;   /* Orange - Manufacturing processes */
  --nanobot-monitoring: 271 81% 56%;     /* Purple - Health monitoring */
  --nanobot-surgical: 346 87% 43%;       /* Red - Surgical applications */
  --nanobot-swarm: 217 91% 60%;          /* Light Blue - Swarm coordination */
  
  /* Status colors */
  --success: 142 76% 36%;    /* Green for success states */
  --warning: 48 96% 53%;     /* Yellow for warnings */
  --info: 199 89% 48%;       /* Blue for information */
}
```

### Dark Mode Colors
```css
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  
  /* Nanobot colors remain consistent but may need opacity adjustments */
}
```

## Usage Guidelines

### ✅ Correct Usage
```tsx
// Use semantic color tokens
<Button className="bg-nanobot-medical hover:bg-nanobot-medical/90">
  Deploy Medical Nanobots
</Button>

<Badge className="bg-nanobot-environmental/10 text-nanobot-environmental border-nanobot-environmental">
  Environmental Active
</Badge>

<Card className="border-nanobot-swarm/20 bg-gradient-to-br from-background to-nanobot-swarm/5">
  Swarm Status
</Card>
```

### ❌ Avoid Direct Colors
```tsx
// Don't use direct color values
<Button className="bg-blue-500 hover:bg-blue-600">Medical Nanobots</Button>
<Badge className="bg-green-100 text-green-800">Active</Badge>
```

## Component Variants

### Button Variants for Nanobots
```tsx
// Medical variant
<Button variant="outline" className="border-nanobot-medical text-nanobot-medical hover:bg-nanobot-medical hover:text-white">
  Medical Action
</Button>

// Environmental variant
<Button className="bg-nanobot-environmental hover:bg-nanobot-environmental/90">
  Environmental Control
</Button>
```

### Badge Variants
```tsx
// Status badges
<Badge className="bg-success/10 text-success border-success">Online</Badge>
<Badge className="bg-warning/10 text-warning border-warning">Warning</Badge>
<Badge className="bg-nanobot-medical/10 text-nanobot-medical border-nanobot-medical">Medical</Badge>
```

### Card Variants
```tsx
// Nanobot application cards
<Card className="border-nanobot-manufacturing/20 bg-gradient-to-br from-background to-nanobot-manufacturing/5">
  <CardHeader className="border-b border-nanobot-manufacturing/10">
    <CardTitle className="text-nanobot-manufacturing">Manufacturing Control</CardTitle>
  </CardHeader>
</Card>
```

## Gradients

### Custom Gradients
```css
/* Primary gradients */
--gradient-primary: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));

/* Nanobot gradients */
--gradient-medical: linear-gradient(135deg, hsl(var(--nanobot-medical)), hsl(var(--nanobot-swarm)));
--gradient-environmental: linear-gradient(135deg, hsl(var(--nanobot-environmental)), hsl(var(--success)));
--gradient-manufacturing: linear-gradient(135deg, hsl(var(--nanobot-manufacturing)), hsl(var(--warning)));
```

### Usage in Components
```tsx
<div className="bg-gradient-to-r from-nanobot-medical to-nanobot-swarm p-6 rounded-lg">
  Medical Dashboard
</div>
```

## Typography

### Headings
```tsx
// Main application title
<h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
  NanoSwarm Control System
</h1>

// Section headers with nanobot colors
<h2 className="text-2xl font-bold bg-gradient-to-r from-nanobot-medical to-accent bg-clip-text text-transparent">
  Medical Nanobots
</h2>
```

### Body Text
```tsx
// Primary text
<p className="text-foreground">Main content text</p>

// Secondary text
<p className="text-muted-foreground">Secondary information</p>

// Nanobot-specific text
<p className="text-nanobot-environmental">Environmental status update</p>
```

## Spacing and Layout

### Container Spacing
```tsx
// Standard page layout
<div className="space-y-6 p-6">
  <div className="container mx-auto">
    {/* Content */}
  </div>
</div>
```

### Card Spacing
```tsx
<Card className="p-6 space-y-4">
  <CardHeader className="pb-4">
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent className="space-y-3">
    {/* Content */}
  </CardContent>
</Card>
```

## Animations

### Hover Effects
```tsx
// Button hover
<Button className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
  Interactive Button
</Button>

// Card hover
<Card className="transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
  Hoverable Card
</Card>
```

### Loading States
```tsx
// Skeleton loading
<div className="animate-pulse bg-muted rounded-md h-4 w-full" />

// Spinner
<div className="animate-spin rounded-full h-6 w-6 border-2 border-nanobot-swarm border-t-transparent" />
```

## Best Practices

1. **Always use semantic tokens** instead of direct color values
2. **Maintain contrast ratios** for accessibility (4.5:1 minimum)
3. **Use consistent spacing** with Tailwind's spacing scale
4. **Apply hover states** for interactive elements
5. **Consider dark mode** when designing components
6. **Test with different nanobot types** to ensure consistency
7. **Use appropriate nanobot colors** for context (medical=blue, environmental=green, etc.)

## Custom CSS Variables

Add new design tokens to `src/index.css`:

```css
:root {
  /* Add new nanobot types */
  --nanobot-research: 280 100% 70%;
  --nanobot-defense: 0 84% 60%;
  
  /* Add new status types */
  --status-critical: 0 84% 60%;
  --status-optimal: 142 76% 36%;
}
```

Then update `tailwind.config.ts`:

```typescript
colors: {
  nanobot: {
    // ... existing colors
    research: 'hsl(var(--nanobot-research))',
    defense: 'hsl(var(--nanobot-defense))',
  },
  status: {
    critical: 'hsl(var(--status-critical))',
    optimal: 'hsl(var(--status-optimal))',
  }
}
```

## Testing Design System

Test your components with different themes:

```tsx
// Test with different nanobot types
const nanobotTypes = ['medical', 'environmental', 'manufacturing', 'monitoring', 'surgical'];

nanobotTypes.map(type => (
  <Badge key={type} className={`bg-nanobot-${type}/10 text-nanobot-${type} border-nanobot-${type}`}>
    {type}
  </Badge>
))
```
