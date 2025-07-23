import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Navigation,
  MapPin,
  Clock,
  Volume2,
  RotateCcw,
  Home,
  Camera,
  Target
} from "lucide-react";

const ARNavigation = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(5);
  const [distanceRemaining, setDistanceRemaining] = useState(120);
  const [estimatedTime, setEstimatedTime] = useState(3);

  const destinations = [
    { id: "restroom", name: "Restroom", icon: "🚻" },
    { id: "platform-3", name: "Platform 3", icon: "🚂" },
    { id: "exit-a", name: "Exit A", icon: "🚪" },
    { id: "food-court", name: "Food Court", icon: "🍽️" },
    { id: "ticket-counter", name: "Ticket Counter", icon: "🎫" },
    { id: "waiting-area", name: "Waiting Area", icon: "💺" },
  ];

  const navigationSteps = [
    { direction: "straight", instruction: "Walk straight for 50 meters", arrow: ArrowUp },
    { direction: "right", instruction: "Turn right at the information desk", arrow: ArrowRight },
    { direction: "straight", instruction: "Continue straight past the shops", arrow: ArrowUp },
    { direction: "left", instruction: "Turn left towards the restroom area", arrow: ArrowLeft },
    { direction: "destination", instruction: "Destination reached!", arrow: Target },
  ];

  useEffect(() => {
    if (isNavigating) {
      const interval = setInterval(() => {
        setDistanceRemaining(prev => Math.max(0, prev - 10));
        setEstimatedTime(prev => Math.max(0, prev - 0.2));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isNavigating]);

  const startNavigation = () => {
    if (destination) {
      setIsNavigating(true);
      setCurrentStep(1);
      setDistanceRemaining(120);
      setEstimatedTime(3);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Navigation complete
      setIsNavigating(false);
      setCurrentStep(1);
    }
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    setCurrentStep(1);
    setDistanceRemaining(120);
    setEstimatedTime(3);
  };

  const currentStepData = navigationSteps[currentStep - 1];
  const ArrowIcon = currentStepData?.arrow || ArrowUp;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Simulated Camera Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      
      {/* AR Grid Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 flex items-center justify-between bg-black/20 backdrop-blur-sm border-b border-white/10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="text-white hover:bg-white/10"
        >
          <Home className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          <span className="font-medium">AR Navigation</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={stopNavigation}
          className="text-white hover:bg-white/10"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>

      {/* AR Content Area */}
      <div className="relative z-10 flex-1 p-6 space-y-6">
        {!isNavigating ? (
          /* Destination Selection */
          <div className="max-w-md mx-auto mt-20">
            <Card className="bg-black/40 backdrop-blur-md border-white/20">
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Where would you like to go?</h2>
                  <p className="text-white/70">Select your destination to start AR navigation</p>
                </div>

                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Choose destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((dest) => (
                      <SelectItem key={dest.id} value={dest.id}>
                        <span className="flex items-center gap-2">
                          <span>{dest.icon}</span>
                          {dest.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={startNavigation}
                  disabled={!destination}
                >
                  <Navigation className="h-5 w-5 mr-2" />
                  Start AR Navigation
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Active Navigation */
          <>
            {/* AR Direction Overlay */}
            <div className="text-center mt-20">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-primary/20 backdrop-blur-md rounded-full border-4 border-primary shadow-lg shadow-primary/50 mb-6 animate-pulse">
                <ArrowIcon className="h-16 w-16 text-primary" />
              </div>
              
              <Card className="bg-black/40 backdrop-blur-md border-white/20 max-w-md mx-auto">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Step {currentStep} of {totalSteps}</h3>
                  <p className="text-lg text-white/90 mb-4">{currentStepData?.instruction}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Distance
                      </span>
                      <span className="font-medium">{distanceRemaining}m</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        ETA
                      </span>
                      <span className="font-medium">{estimatedTime.toFixed(1)} min</span>
                    </div>
                    
                    <Progress 
                      value={(currentStep / totalSteps) * 100} 
                      className="bg-white/20"
                    />
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <Button 
                      variant="success" 
                      size="lg" 
                      className="flex-1"
                      onClick={nextStep}
                    >
                      {currentStep === totalSteps ? "Finish" : "Next Step"}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-white hover:bg-white/10"
                    >
                      <Volume2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Navigation Stats */}
            <div className="fixed bottom-6 left-6 right-6">
              <div className="flex gap-3">
                <Badge variant="secondary" className="bg-black/40 backdrop-blur-md text-white border-white/20">
                  {destinations.find(d => d.id === destination)?.icon} {destinations.find(d => d.id === destination)?.name}
                </Badge>
                <Badge variant="secondary" className="bg-black/40 backdrop-blur-md text-white border-white/20">
                  AR Mode Active
                </Badge>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ARNavigation;