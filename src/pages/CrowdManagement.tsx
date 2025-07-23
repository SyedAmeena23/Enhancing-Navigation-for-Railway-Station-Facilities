import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { 
  Home,
  Users,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Navigation,
  RefreshCw,
  Route,
  MapPin
} from "lucide-react";

interface CrowdArea {
  id: string;
  name: string;
  level: 'low' | 'medium' | 'high';
  count: number;
  position: { x: number; y: number };
}

const CrowdManagement = () => {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [showReroute, setShowReroute] = useState(false);
  const [crowdData, setCrowdData] = useState<CrowdArea[]>([
    { id: "entrance", name: "Main Entrance", level: "medium", count: 45, position: { x: 20, y: 80 } },
    { id: "platform1", name: "Platform 1", level: "high", count: 120, position: { x: 80, y: 40 } },
    { id: "platform2", name: "Platform 2", level: "low", count: 15, position: { x: 80, y: 60 } },
    { id: "foodcourt", name: "Food Court", level: "medium", count: 35, position: { x: 50, y: 20 } },
    { id: "restroom", name: "Restrooms", level: "low", count: 8, position: { x: 30, y: 40 } },
    { id: "ticketing", name: "Ticket Counter", level: "high", count: 85, position: { x: 40, y: 70 } },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCrowdData(prev => 
        prev.map(area => ({
          ...area,
          count: Math.max(0, area.count + Math.floor(Math.random() * 10 - 5)),
          level: area.count > 70 ? 'high' : area.count > 30 ? 'medium' : 'low'
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'high': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'outline';
    }
  };

  const handlePathSelection = (pathName: string) => {
    setSelectedPath(pathName);
    // Simulate checking for congestion
    setTimeout(() => {
      if (pathName.includes("Platform 1") || pathName.includes("Ticket Counter")) {
        setShowReroute(true);
      }
    }, 1000);
  };

  const totalCrowd = crowdData.reduce((sum, area) => sum + area.count, 0);
  const highCongestionAreas = crowdData.filter(area => area.level === 'high').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <Home className="h-5 w-5" />
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl font-semibold">Station Map</h1>
            <p className="text-sm text-muted-foreground">Real-time crowd monitoring</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="p-4 bg-muted/30">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{totalCrowd}</div>
            <div className="text-sm text-muted-foreground">Total Visitors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-destructive">{highCongestionAreas}</div>
            <div className="text-sm text-muted-foreground">High Traffic Areas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success">
              {crowdData.filter(area => area.level === 'low').length}
            </div>
            <div className="text-sm text-muted-foreground">Clear Paths</div>
          </div>
        </div>
      </div>

      {/* Reroute Alert */}
      {showReroute && (
        <div className="p-4">
          <Alert className="border-warning/20 bg-warning/5">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="flex items-center justify-between">
              <span>High congestion detected on your route. Alternative path suggested.</span>
              <div className="flex gap-2">
                <Button size="sm" variant="warning" onClick={() => setSelectedPath("Alternative Route")}>
                  Accept
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowReroute(false)}>
                  Dismiss
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Interactive Station Map */}
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Interactive Station Layout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-96 bg-gradient-to-br from-muted via-background to-muted/50 border rounded-lg overflow-hidden">
              {/* Station Layout Background */}
              <div className="absolute inset-0 p-4">
                {/* Platforms */}
                <div className="absolute top-8 right-8 w-16 h-32 bg-primary/20 border-2 border-primary rounded flex items-center justify-center text-xs font-medium">
                  Platform 1
                </div>
                <div className="absolute top-24 right-8 w-16 h-16 bg-primary/10 border border-primary/50 rounded flex items-center justify-center text-xs">
                  Platform 2
                </div>
                
                {/* Main Areas */}
                <div className="absolute bottom-8 left-8 w-20 h-12 bg-accent/20 border border-accent rounded flex items-center justify-center text-xs">
                  Entrance
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-warning/20 border border-warning rounded flex items-center justify-center text-xs">
                  Food Court
                </div>
                <div className="absolute center left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-success/20 border border-success rounded flex items-center justify-center text-xs">
                  Restrooms
                </div>
                <div className="absolute bottom-16 left-1/3 w-20 h-12 bg-destructive/20 border border-destructive rounded flex items-center justify-center text-xs">
                  Tickets
                </div>
              </div>

              {/* Crowd Indicators */}
              {crowdData.map((area) => (
                <div
                  key={area.id}
                  className={`absolute w-6 h-6 ${getLevelColor(area.level)} rounded-full opacity-75 animate-pulse`}
                  style={{
                    left: `${area.position.x}%`,
                    top: `${area.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="w-full h-full rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                    {area.count > 99 ? '99+' : area.count}
                  </div>
                </div>
              ))}

              {/* Path Selection Overlay */}
              {selectedPath && !showReroute && (
                <div className="absolute inset-0 bg-primary/10">
                  <svg className="w-full h-full">
                    <path
                      d="M 50 300 Q 200 200 300 100"
                      stroke="hsl(var(--primary))"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="10,5"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Navigation Buttons */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg">Popular Routes</h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            { name: "Entrance → Platform 1", congestion: "high", time: "5 min" },
            { name: "Entrance → Platform 2", congestion: "low", time: "3 min" },
            { name: "Entrance → Food Court", congestion: "medium", time: "2 min" },
            { name: "Platform 1 → Exit A", congestion: "high", time: "4 min" },
          ].map((route) => (
            <Button
              key={route.name}
              variant="navigation"
              className="justify-between h-auto p-4"
              onClick={() => handlePathSelection(route.name)}
            >
              <div className="flex items-center gap-3">
                <Route className="h-4 w-4" />
                <span>{route.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getLevelBadgeVariant(route.congestion)}>
                  {route.congestion}
                </Badge>
                <span className="text-sm text-muted-foreground">{route.time}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Crowd Level Legend */}
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Crowd Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-success rounded-full"></div>
                <span className="text-sm">Low (0-30)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-warning rounded-full"></div>
                <span className="text-sm">Medium (30-70)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-destructive rounded-full"></div>
                <span className="text-sm">High (70+)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrowdManagement;