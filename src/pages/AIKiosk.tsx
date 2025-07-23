import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { 
  Home,
  MessageCircle,
  Search,
  Phone,
  Info,
  Volume2,
  HelpCircle,
  Clock,
  MapPin,
  Train,
  Utensils,
  Wifi,
  Globe
} from "lucide-react";

const AIKiosk = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", message: "Hello! How can I help you today?" }
  ]);
  const [userInput, setUserInput] = useState("");

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "ta", name: "தமிழ்" },
    { code: "bn", name: "বাংলা" },
  ];

  const faqItems = [
    {
      category: "Navigation",
      icon: MapPin,
      questions: [
        { q: "How do I get to Platform 3?", a: "Take the main corridor and follow signs. It's approximately 200 meters from the main entrance." },
        { q: "Where are the restrooms?", a: "Restrooms are located near the food court and on each platform level." },
        { q: "How do I reach the parking area?", a: "Exit through Gate B and follow the parking signs. Parking is available on levels P1-P3." }
      ]
    },
    {
      category: "Services",
      icon: Info,
      questions: [
        { q: "What are the train timings?", a: "Trains run every 10-15 minutes during peak hours (6-10 AM, 5-9 PM) and every 20 minutes during off-peak hours." },
        { q: "Where can I buy tickets?", a: "Tickets are available at the main counter, automated machines, and through the mobile app." },
        { q: "Is WiFi available?", a: "Free WiFi is available throughout the station. Network name: 'Station_Free_WiFi'" }
      ]
    },
    {
      category: "Facilities",
      icon: Utensils,
      questions: [
        { q: "Where is the food court?", a: "The food court is on the second level, accessible by stairs or elevator near the main entrance." },
        { q: "Are there charging stations?", a: "Charging stations are available in the waiting areas and near each platform." },
        { q: "Is the station wheelchair accessible?", a: "Yes, the station is fully wheelchair accessible with elevators and ramps available." }
      ]
    }
  ];

  const emergencyContacts = [
    { name: "Station Security", number: "100", icon: "🚨" },
    { name: "Medical Emergency", number: "108", icon: "🏥" },
    { name: "Station Master", number: "Railway-001", icon: "👨‍💼" },
    { name: "Lost & Found", number: "Railway-002", icon: "📦" },
  ];

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessages = [
      ...chatMessages,
      { type: "user", message: userInput }
    ];

    // Simulate AI response
    setTimeout(() => {
      let botResponse = "I understand you're asking about " + userInput + ". Let me help you with that.";
      
      if (userInput.toLowerCase().includes("platform")) {
        botResponse = "To reach the platforms, follow the signs from the main hall. Platform 1-3 are to your right, Platform 4-6 are to your left.";
      } else if (userInput.toLowerCase().includes("ticket")) {
        botResponse = "You can purchase tickets at the main counter (Level 1), automated machines (all levels), or through our mobile app.";
      } else if (userInput.toLowerCase().includes("restroom") || userInput.toLowerCase().includes("bathroom")) {
        botResponse = "Restrooms are located near the food court on Level 2, and on each platform level. All facilities are wheelchair accessible.";
      } else if (userInput.toLowerCase().includes("food")) {
        botResponse = "The food court is on Level 2 with various dining options. There are also small cafes on each platform level.";
      }

      setChatMessages([...newMessages, { type: "bot", message: botResponse }]);
    }, 1000);

    setChatMessages(newMessages);
    setUserInput("");
  };

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    
    // Add search result as a chat message
    const searchResult = `Searching for "${searchQuery}"... Found relevant information in our database.`;
    setChatMessages(prev => [...prev, 
      { type: "user", message: `Search: ${searchQuery}` },
      { type: "bot", message: searchResult }
    ]);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
      {/* Kiosk Header */}
      <div className="p-6 bg-black/40 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/10"
          >
            <Home className="h-5 w-5" />
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold">AI Information Kiosk</h1>
            <p className="text-white/70">Your digital assistant</p>
          </div>

          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
              <Globe className="h-4 w-4 mr-2" />
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

      <div className="p-6">
        <Tabs defaultValue="chat" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md">
            <TabsTrigger value="chat" className="data-[state=active]:bg-primary">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="faq" className="data-[state=active]:bg-primary">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-primary">
              <Search className="h-4 w-4 mr-2" />
              Search
            </TabsTrigger>
            <TabsTrigger value="emergency" className="data-[state=active]:bg-primary">
              <Phone className="h-4 w-4 mr-2" />
              Emergency
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-6">
            <Card className="bg-black/40 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageCircle className="h-5 w-5" />
                  AI Assistant Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Chat Messages */}
                <div className="h-64 overflow-y-auto space-y-3 p-4 bg-white/5 rounded-lg">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          msg.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-white/10 text-white'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex gap-2">
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your question here..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} variant="hero">
                    Send
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <div className="grid gap-4">
              {faqItems.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="bg-black/40 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <category.icon className="h-5 w-5" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {category.questions.map((item, qIndex) => (
                      <div key={qIndex} className="p-3 bg-white/5 rounded-lg">
                        <h4 className="font-medium text-white mb-2">{item.q}</h4>
                        <p className="text-white/70 text-sm">{item.a}</p>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="mt-2 text-white hover:bg-white/10"
                        >
                          <Volume2 className="h-3 w-3 mr-1" />
                          Listen
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="search" className="mt-6">
            <Card className="bg-black/40 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Search className="h-5 w-5" />
                  Information Search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for station information..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                  />
                  <Button onClick={handleSearchSubmit} variant="hero">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {["Train Schedules", "Platform Info", "Facilities", "Parking", "Tickets", "Lost & Found"].map((topic) => (
                    <Button
                      key={topic}
                      variant="navigation"
                      className="justify-start text-white border-white/20 hover:bg-white/10"
                      onClick={() => setSearchQuery(topic)}
                    >
                      <Info className="h-4 w-4 mr-2" />
                      {topic}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emergency" className="mt-6">
            <Card className="bg-black/40 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Phone className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-between p-4 h-auto border-white/20 text-white hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{contact.icon}</span>
                      <span className="font-medium">{contact.name}</span>
                    </div>
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      {contact.number}
                    </Badge>
                  </Button>
                ))}

                <div className="mt-6 p-4 bg-destructive/20 border border-destructive/30 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">In Case of Emergency:</h3>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Remain calm and follow staff instructions</li>
                    <li>• Use emergency phones located on each platform</li>
                    <li>• Follow illuminated emergency exit signs</li>
                    <li>• Report to the nearest station staff member</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIKiosk;