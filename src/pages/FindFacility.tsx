import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  Home,
  Search,
  MapPin,
  Clock,
  Users,
  Utensils,
  Car,
  Wifi,
  ShoppingCart,
  Coffee,
  Banknote,
  Navigation,
  Phone
} from "lucide-react";

interface Facility {
  id: string;
  name: string;
  category: string;
  distance: string;
  floor: string;
  availability: 'open' | 'busy' | 'closed';
  icon: any;
  description: string;
}

const FindFacility = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const facilities: Facility[] = [
    {
      id: "restroom-1",
      name: "Restrooms (Main Level)",
      category: "restroom",
      distance: "50m",
      floor: "Ground Floor",
      availability: "open",
      icon: "🚻",
      description: "Wheelchair accessible, baby changing facilities"
    },
    {
      id: "restroom-2",
      name: "Restrooms (Platform Level)",
      category: "restroom",
      distance: "120m",
      floor: "Platform Level",
      availability: "busy",
      icon: "🚻",
      description: "Near platforms 1-3"
    },
    {
      id: "food-court",
      name: "Central Food Court",
      category: "food",
      distance: "80m",
      floor: "Second Floor",
      availability: "open",
      icon: "🍽️",
      description: "Multiple restaurants and cafes"
    },
    {
      id: "coffee-shop",
      name: "Station Café",
      category: "food",
      distance: "30m",
      floor: "Ground Floor",
      availability: "open",
      icon: "☕",
      description: "Quick coffee and snacks"
    },
    {
      id: "ticket-counter",
      name: "Ticket Counter",
      category: "service",
      distance: "25m",
      floor: "Ground Floor",
      availability: "busy",
      icon: "🎫",
      description: "Manual ticket booking and assistance"
    },
    {
      id: "atm-1",
      name: "ATM (Bank of Railways)",
      category: "service",
      distance: "40m",
      floor: "Ground Floor",
      availability: "open",
      icon: "💳",
      description: "24/7 cash withdrawal"
    },
    {
      id: "parking",
      name: "Parking Area",
      category: "transport",
      distance: "200m",
      floor: "Ground Level",
      availability: "open",
      icon: "🚗",
      description: "3 levels, 500+ spaces available"
    },
    {
      id: "platform-1",
      name: "Platform 1",
      category: "platform",
      distance: "100m",
      floor: "Platform Level",
      availability: "open",
      icon: "🚂",
      description: "Local and express trains"
    },
    {
      id: "platform-2",
      name: "Platform 2", 
      category: "platform",
      distance: "120m",
      floor: "Platform Level",
      availability: "open",
      icon: "🚂",
      description: "Express trains only"
    },
    {
      id: "exit-a",
      name: "Exit A (Main)",
      category: "exit",
      distance: "20m",
      floor: "Ground Floor",
      availability: "open",
      icon: "🚪",
      description: "Main entrance/exit"
    },
    {
      id: "exit-b",
      name: "Exit B (Parking)",
      category: "exit",
      distance: "180m",
      floor: "Ground Floor",
      availability: "open",
      icon: "🚪",
      description: "Direct access to parking"
    }
  ];

  const categories = [
    { id: "all", name: "All Facilities", icon: MapPin },
    { id: "restroom", name: "Restrooms", icon: Users },
    { id: "food", name: "Food & Drinks", icon: Utensils },
    { id: "service", name: "Services", icon: Banknote },
    { id: "platform", name: "Platforms", icon: Navigation },
    { id: "exit", name: "Exits", icon: Home },
    { id: "transport", name: "Transport", icon: Car },
  ];

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || facility.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'open': return 'bg-success';
      case 'busy': return 'bg-warning';
      case 'closed': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'open': return 'Available';
      case 'busy': return 'Busy';
      case 'closed': return 'Closed';
      default: return 'Unknown';
    }
  };

  const handleNavigateToFacility = (facility: Facility) => {
    // Navigate to AR Navigation with the facility as destination
    navigate(`/ar-navigation?destination=${facility.id}&name=${encodeURIComponent(facility.name)}`);
  };

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
            <h1 className="text-xl font-semibold">Find Facility</h1>
            <p className="text-sm text-muted-foreground">Locate station amenities</p>
          </div>

          <div className="w-10" /> {/* Spacer for balance */}
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for facilities..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              <category.icon className="h-4 w-4 mr-1" />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Facilities List */}
      <div className="px-4 space-y-3">
        {filteredFacilities.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No facilities found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filter</p>
            </CardContent>
          </Card>
        ) : (
          filteredFacilities.map((facility) => (
            <Card key={facility.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{facility.icon}</div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{facility.name}</h3>
                        <p className="text-muted-foreground text-sm">{facility.description}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getAvailabilityColor(facility.availability)} text-white border-none`}
                      >
                        {getAvailabilityText(facility.availability)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {facility.distance}
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation className="h-4 w-4" />
                        {facility.floor}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="hero" 
                        size="sm"
                        onClick={() => handleNavigateToFacility(facility)}
                        className="flex-1"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Navigate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Info
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Quick Access Footer */}
      <div className="p-4 mt-8 bg-muted/30">
        <h3 className="font-semibold mb-3">Quick Access</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="navigation" 
            onClick={() => setSelectedCategory("restroom")}
            className="justify-start"
          >
            🚻 Nearest Restroom
          </Button>
          <Button 
            variant="navigation"
            onClick={() => setSelectedCategory("food")}
            className="justify-start"
          >
            ☕ Food & Drinks
          </Button>
          <Button 
            variant="navigation"
            onClick={() => setSelectedCategory("exit")}
            className="justify-start"
          >
            🚪 Exits
          </Button>
          <Button 
            variant="navigation"
            onClick={() => navigate("/crowd-management")}
            className="justify-start"
          >
            🗺️ Station Map
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FindFacility;