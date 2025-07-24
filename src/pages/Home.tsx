import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Navigation, 
  Users, 
  Settings, 
  Camera, 
  Accessibility,
  Globe,
  Train,
  Volume2
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "ta", name: "தமிழ்" },
    { code: "bn", name: "বাংলা" },
  ];

  const quickActions = [
    {
      title: "Find Facility",
      description: "Locate restrooms, exits, platforms",
      icon: MapPin,
      route: "/find-facility",
      variant: "navigation" as const,
    },
    {
      title: "AR Navigation",
      description: "Real-time wayfinding",
      icon: Camera,
      route: "/ar-navigation",
      variant: "hero" as const,
    },
    {
      title: "Station Map",
      description: "Interactive station layout",
      icon: Navigation,
      route: "/crowd-management",
      variant: "navigation" as const,
    },
    {
      title: "AI Kiosk",
      description: "Get help and information",
      icon: Users,
      route: "/ai-kiosk",
      variant: "navigation" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary rounded-full shadow-lg">
              <Train className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Central Station</h1>
              <p className="text-muted-foreground">Smart Navigation Hub</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="hover:bg-primary/10"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Language and Accessibility Controls */}
        <div className="flex items-center justify-between mb-8 p-4 bg-card rounded-lg border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Accessibility className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Enhanced View</span>
            <Switch 
              checked={accessibilityMode} 
              onCheckedChange={setAccessibilityMode}
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center gap-2 mb-8">
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
            Online Mode Active
          </Badge>
          <Badge variant="outline" className="border-warning/20 text-warning">
            <Volume2 className="w-3 h-3 mr-1" />
            Audio Enabled
          </Badge>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {quickActions.map((action) => (
            <Card 
              key={action.title} 
              className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border/50"
              onClick={() => navigate(action.route)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                    <p className="text-muted-foreground text-sm">{action.description}</p>
                  </div>
                  <Button variant={action.variant} size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Go
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Welcome Message */}
        <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Welcome to Smart Navigation</h2>
            <p className="text-muted-foreground mb-4">
              Find your way around the station with our advanced AR navigation, 
              real-time crowd management, and multilingual support.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" size="lg" onClick={() => navigate("/ar-navigation")}>
                Start Navigation Experience
              </Button>
              <Button 
                variant="navigation" 
                size="lg" 
                onClick={() => window.open('/ar.html', '_blank')}
              >
                AR Navigation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;