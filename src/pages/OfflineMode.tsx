import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { WifiOff, Home, Download, Map, Navigation } from "lucide-react";

const OfflineMode = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b bg-card">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <Home className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-semibold">Offline Mode</h1>
            <Badge variant="secondary" className="bg-warning/10 text-warning">
              <WifiOff className="w-3 h-3 mr-1" />
              No Internet Connection
            </Badge>
          </div>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Alert className="border-warning/20 bg-warning/5">
          <Download className="h-4 w-4 text-warning" />
          <AlertDescription>
            <strong>Offline Mode Activated</strong> - Using saved station maps and cached data. Some features may be limited.
          </AlertDescription>
        </Alert>

        <Card>
          <CardContent className="p-6 text-center">
            <Map className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Station Map Available</h2>
            <p className="text-muted-foreground mb-4">Basic navigation and facility locations are still accessible</p>
            <Button variant="hero" onClick={() => navigate("/crowd-management")}>
              <Navigation className="h-4 w-4 mr-2" />
              View Offline Map
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OfflineMode;