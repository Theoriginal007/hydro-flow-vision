import { useState, useRef, useEffect } from "react";
import { Mic, SendHorizontal, Brain, FileText, AlertTriangle, Rabbit, Book, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { ComplianceTools } from "./ComplianceTools";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface WaterChatbotProps {
  isEmergencyMode?: boolean;
}

const quickReferenceData = [
  {
    id: 'regulations',
    title: 'Water Regulations',
    description: 'Key regulations for water quality compliance',
    content: [
      { title: 'Safe Drinking Water Act (SDWA)', description: 'The main federal law that ensures the quality of drinking water in the United States.' },
      { title: 'Clean Water Act (CWA)', description: 'Regulates discharges of pollutants into waters and quality standards for surface waters.' },
      { title: 'EPA National Primary Drinking Water Regulations', description: 'Legal limits for contaminants in drinking water.' },
      { title: 'Lead and Copper Rule', description: 'Protects public health by minimizing lead and copper levels in drinking water.' },
      { title: 'Groundwater Rule', description: 'Provides increased protection against microbial pathogens in public water systems.' }
    ]
  },
  {
    id: 'treatments',
    title: 'Treatment Methods',
    description: 'Common water treatment approaches',
    content: [
      { title: 'Coagulation and Flocculation', description: 'Process where chemicals with a positive charge are added to neutralize the negative charge of dissolved particles in the water.' },
      { title: 'Sedimentation', description: 'The heavy particles (floc) settle to the bottom due to their weight, forming a sludge.' },
      { title: 'Filtration', description: 'Water passes through various filtration materials to remove dissolved particles, parasites, bacteria, viruses, and fungi.' },
      { title: 'Disinfection', description: 'Addition of disinfectant (like chlorine, chloramine, or UV light) to kill any remaining parasites, bacteria, and viruses.' },
      { title: 'Ozonation', description: 'Uses ozone to kill microorganisms and break down organic compounds.' },
      { title: 'UV Treatment', description: 'Uses ultraviolet light to kill bacteria, viruses, and other pathogens without chemicals.' }
    ]
  },
  {
    id: 'contaminants',
    title: 'Contaminants Guide',
    description: 'Information about common water contaminants',
    content: [
      { title: 'Lead', description: 'A toxic metal that can cause serious health effects, especially in children. Enters water through corrosion of plumbing materials.' },
      { title: 'Arsenic', description: 'A naturally occurring element that can enter water from natural deposits or industrial/agricultural practices.' },
      { title: 'E. coli', description: 'Bacteria indicating possible sewage contamination and the presence of other harmful organisms.' },
      { title: 'Nitrates', description: 'Compounds that can enter water through agricultural runoff, wastewater discharge, or from natural mineral deposits.' },
      { title: 'PFAS', description: 'Per- and polyfluoroalkyl substances are man-made chemicals used in many industrial applications and consumer products.' },
      { title: 'Cryptosporidium', description: 'A parasite that can cause gastrointestinal illness, particularly dangerous for immune-compromised individuals.' }
    ]
  }
];

export function WaterChatbot({ isEmergencyMode = false }: WaterChatbotProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm HydraLex, your AI water quality assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [selectedQuickRef, setSelectedQuickRef] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
  if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    
    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Voice Recognition Error",
        description: "Could not process voice input. Please try again or type your question.",
        variant: "destructive"
      });
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
  }
  
  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Voice Recognition Unavailable",
        description: "Your browser doesn't support voice recognition. Please type your question instead.",
        variant: "destructive"
      });
      return;
    }
    
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setIsListening(true);
    }
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput("");
    
    setTimeout(() => {
      let responseText = "";
      const lowercaseInput = input.toLowerCase();
      
      if (lowercaseInput.includes("regulations") || lowercaseInput.includes("compliance")) {
        responseText = "Water quality regulations include the Safe Drinking Water Act (SDWA) and Clean Water Act (CWA). Each state may have additional regulations. Would you like me to generate a compliance report?";
      } else if (lowercaseInput.includes("treatment") || lowercaseInput.includes("purify")) {
        responseText = "Common water treatment methods include coagulation, filtration, disinfection, and membrane filtration. The best approach depends on your specific contaminants and requirements.";
      } else if (lowercaseInput.includes("contaminant") || lowercaseInput.includes("pollution")) {
        responseText = "Common water contaminants include microorganisms (bacteria, viruses), chemicals (lead, pesticides), and physical pollutants (sediment). I can help identify potential contaminants based on your water quality data.";
      } else if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi")) {
        responseText = "Hello! I'm HydraLex, your water quality AI assistant. How can I help you today?";
      } else if (lowercaseInput.includes("help")) {
        responseText = "I can assist with water quality regulations, treatment methods, contaminant identification, risk assessment, and generating compliance reports. Just let me know what you need help with!";
      } else {
        responseText = "I understand you're asking about water quality management. Could you provide more specific details about your question? I can help with regulations, treatment methods, contaminant analysis, and more.";
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  const generateComplianceReport = () => {
    toast({
      title: "Compliance Report Generated",
      description: "The compliance report has been generated and is available for download.",
    });
    
    const botMessage: Message = {
      id: Date.now().toString(),
      text: "I've generated a compliance report based on your water quality data. The report includes an analysis of your compliance status with relevant regulations and recommendations for addressing any issues.",
      sender: "bot",
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, botMessage]);
  };
  
  const generateRiskAssessment = () => {
    toast({
      title: "Risk Assessment Completed",
      description: "The water quality risk assessment has been generated.",
    });
    
    const botMessage: Message = {
      id: Date.now().toString(),
      text: "I've completed a comprehensive risk assessment of your water system. The assessment identifies potential vulnerabilities and provides a prioritized list of recommended actions to mitigate risks.",
      sender: "bot",
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, botMessage]);
  };
  
  const performRegulatoryCheck = () => {
    toast({
      title: "Regulatory Cross-Check Complete",
      description: "Your water quality data has been checked against all applicable regulations.",
    });
    
    const botMessage: Message = {
      id: Date.now().toString(),
      text: "I've cross-checked your water quality data against all applicable federal, state, and local regulations. You are currently compliant with 87% of requirements. I've identified 3 areas that need attention to achieve full compliance.",
      sender: "bot",
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, botMessage]);
  };
  
  const renderQuickReferenceContent = () => {
    if (!selectedQuickRef) return null;
    
    const selectedData = quickReferenceData.find(item => item.id === selectedQuickRef);
    if (!selectedData) return null;
    
    return (
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-4">{selectedData.title}</h3>
        <p className="text-gray-600 mb-6">{selectedData.description}</p>
        
        <div className="space-y-4">
          {selectedData.content.map((item, index) => (
            <Card key={index}>
              <CardHeader className="py-3">
                <CardTitle className="text-md">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const handleViewHistoricalReports = () => {
    navigate('/reports');
  };

  const handleRequestConsultation = () => {
    toast({
      title: "Consultation Request Sent",
      description: "An expert will contact you within 24 hours to schedule a consultation.",
    });
  };
  
  return (
    <div className={cn("container mx-auto p-4 h-full", isEmergencyMode ? "text-white" : "")}>
      <Tabs defaultValue="chat" className="h-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>AI Assistant</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Compliance Tools</span>
          </TabsTrigger>
          <TabsTrigger value="quickref" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span>Quick Reference</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="h-[80vh] flex flex-col">
          <Card className={cn("flex-1 flex flex-col", isEmergencyMode ? "bg-gray-900 border-water-danger/30" : "")}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/assets/hydra-ai.png" />
                  <AvatarFallback className="bg-water-dark text-white">HA</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>HydraLex AI Assistant</CardTitle>
                  <CardDescription className={isEmergencyMode ? "text-gray-400" : ""}>Natural language water quality regulations assistant</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-4",
                        message.sender === "user"
                          ? "bg-water-dark text-white"
                          : isEmergencyMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"
                      )}
                    >
                      <p>{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex w-full items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    isListening ? "bg-water-danger text-white animate-pulse" : "",
                    isEmergencyMode ? "border-gray-700 text-gray-300" : ""
                  )}
                  onClick={toggleListening}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Ask about water regulations, treatment methods, or contaminants..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={cn("flex-1", isEmergencyMode ? "bg-gray-800 border-gray-700 text-white" : "")}
                />
                <Button onClick={handleSendMessage} className={isEmergencyMode ? "bg-water-dark hover:bg-water-dark/90" : ""}>
                  <SendHorizontal className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance" className="h-[80vh]">
          <Card className={cn("h-full flex flex-col", isEmergencyMode ? "bg-gray-900 border-water-danger/30 text-white" : "")}>
            <CardHeader>
              <CardTitle>Compliance Tools</CardTitle>
              <CardDescription className={isEmergencyMode ? "text-gray-400" : ""}>Generate reports and assessments for water quality compliance</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <ComplianceTools />
              
              <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Additional Resources</h3>
                <p className="text-gray-600 mb-4">
                  These tools leverage the Hydra AI system to analyze your water quality data and provide actionable insights. For more detailed analysis, our team of water quality experts is available for consultation.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" onClick={handleViewHistoricalReports}>
                    <FileText className="h-4 w-4 mr-2" />
                    View Historical Reports
                  </Button>
                  <Button variant="outline" onClick={handleRequestConsultation}>
                    <Mail className="h-4 w-4 mr-2" />
                    Request Expert Consultation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quickref" className="h-[80vh]">
          <Card className={cn("h-full flex flex-col", isEmergencyMode ? "bg-gray-900 border-water-danger/30 text-white" : "")}>
            <CardHeader>
              <CardTitle>Quick Reference</CardTitle>
              <CardDescription className={isEmergencyMode ? "text-gray-400" : ""}>Essential information for water quality management</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="flex h-full">
                <div className="w-1/3 border-r pr-4">
                  <nav className="space-y-2">
                    {quickReferenceData.map(item => (
                      <Button 
                        key={item.id}
                        variant={selectedQuickRef === item.id ? "default" : "outline"}
                        className={cn("w-full justify-start", 
                          isEmergencyMode && selectedQuickRef !== item.id ? "border-gray-700 text-gray-300" : ""
                        )}
                        onClick={() => setSelectedQuickRef(item.id)}
                      >
                        {item.title}
                      </Button>
                    ))}
                  </nav>
                </div>
                <div className="w-2/3 pl-4 overflow-y-auto">
                  {renderQuickReferenceContent()}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
