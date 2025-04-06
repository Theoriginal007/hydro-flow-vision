
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Database, BarChart, TrendingUp, Users, School, Building, AreaChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { TreatmentSimulator as TreatmentSimulatorComponent } from "@/components/simulator/TreatmentSimulator";
import { WaterTreatmentForm } from "@/components/treatment/WaterTreatmentForm";

const TreatmentSimulator = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<"form" | "simulator" | "analytics">("form");
  const [activeSimTab, setActiveSimTab] = useState<"filtration" | "chemical" | "biological">("filtration");

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        {!isMobile && <Sidebar />}
        <main className="flex-1 p-4 md:p-6">
          <Breadcrumb className="mb-4 md:mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/treatment-simulator">Treatment Simulator</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-water-dark">
              Treatment Simulator
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              AI-driven simulation and HydraScore analytics for treatment effectiveness
            </p>
          </header>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "form" | "simulator" | "analytics")} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="form">Treatment Form</TabsTrigger>
              <TabsTrigger value="simulator">Simulator</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="form" className="mt-4">
              <WaterTreatmentForm />
            </TabsContent>
            
            <TabsContent value="simulator" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-indigo-500" />
                      HydraScore Analytics
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      AI-generated water quality scores to prioritize clients
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <School className="h-4 w-4 text-amber-500" />
                            <span className="font-medium">Central Public School</span>
                          </div>
                          <div className="text-xl font-bold text-red-500">30</div>
                        </div>
                        <Progress value={30} className="h-2 bg-gray-200" />
                        <div className="mt-2 text-xs text-right text-red-500">Critical: Lead levels exceed safety standards</div>
                      </div>
                      
                      <div className="p-3 rounded bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">Westside Hospital</span>
                          </div>
                          <div className="text-xl font-bold text-emerald-500">68</div>
                        </div>
                        <Progress value={68} className="h-2 bg-gray-200" />
                        <div className="mt-2 text-xs text-right text-amber-500">Moderate: Consider filtration upgrade</div>
                      </div>
                      
                      <div className="p-3 rounded bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-purple-500" />
                            <span className="font-medium">Riverfront Community</span>
                          </div>
                          <div className="text-xl font-bold text-emerald-500">85</div>
                        </div>
                        <Progress value={85} className="h-2 bg-gray-200" />
                        <div className="mt-2 text-xs text-right text-emerald-500">Good: Regular maintenance required</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-sm italic text-gray-500">
                      "Your sales team will chase the right clients like bloodhounds"
                    </p>
                    
                    <Button>View All Clients</Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AreaChart className="h-5 w-5 text-emerald-500" />
                      Treatment Effectiveness
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Simulate different water treatment methods and analyze results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeSimTab} onValueChange={(value) => setActiveSimTab(value as "filtration" | "chemical" | "biological")}>
                      <TabsList className="w-full grid grid-cols-3">
                        <TabsTrigger value="filtration">Filtration</TabsTrigger>
                        <TabsTrigger value="chemical">Chemical</TabsTrigger>
                        <TabsTrigger value="biological">Biological</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="filtration" className="mt-4">
                        <TreatmentSimulatorComponent treatmentType="filtration" />
                      </TabsContent>
                      
                      <TabsContent value="chemical" className="mt-4">
                        <TreatmentSimulatorComponent treatmentType="chemical" />
                      </TabsContent>
                      
                      <TabsContent value="biological" className="mt-4">
                        <TreatmentSimulatorComponent treatmentType="biological" />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => setActiveTab("simulator")}>
                      Run New Simulation
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-white lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      Long-Term Impact Analysis
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      See water quality improvement over 1, 5, and 10 years
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <Tabs defaultValue="1year">
                        <TabsList className="w-full grid grid-cols-3 mb-4">
                          <TabsTrigger value="1year">1 Year</TabsTrigger>
                          <TabsTrigger value="5years">5 Years</TabsTrigger>
                          <TabsTrigger value="10years">10 Years</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="1year" className="h-64 bg-gray-200 rounded-md flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-amber-500/30 to-green-500/30"></div>
                          <div className="relative z-10 bg-white/80 p-4 rounded">
                            <h3 className="font-semibold text-lg mb-2">Year 1 Impact</h3>
                            <ul className="text-sm space-y-1">
                              <li>• 35% reduction in contaminant levels</li>
                              <li>• 28% improvement in aquatic biodiversity</li>
                              <li>• 15% decrease in treatment costs</li>
                            </ul>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="5years" className="h-64 bg-gray-200 rounded-md flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-emerald-500/30 to-emerald-500/50"></div>
                          <div className="relative z-10 bg-white/80 p-4 rounded">
                            <h3 className="font-semibold text-lg mb-2">5 Year Impact</h3>
                            <ul className="text-sm space-y-1">
                              <li>• 62% reduction in contaminant levels</li>
                              <li>• 55% improvement in aquatic biodiversity</li>
                              <li>• 40% decrease in treatment costs</li>
                            </ul>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="10years" className="h-64 bg-gray-200 rounded-md flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-emerald-500/50 to-emerald-600/70"></div>
                          <div className="relative z-10 bg-white/80 p-4 rounded">
                            <h3 className="font-semibold text-lg mb-2">10 Year Impact</h3>
                            <ul className="text-sm space-y-1">
                              <li>• 85% reduction in contaminant levels</li>
                              <li>• 78% improvement in aquatic biodiversity</li>
                              <li>• 65% decrease in treatment costs</li>
                            </ul>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 rounded-lg bg-blue-50">
                        <div className="text-3xl font-bold text-blue-700">78%</div>
                        <div className="text-sm text-gray-600">Average Contaminant Reduction</div>
                      </div>
                      <div className="p-3 rounded-lg bg-green-50">
                        <div className="text-3xl font-bold text-green-700">4.2x</div>
                        <div className="text-sm text-gray-600">ROI on Treatment Investment</div>
                      </div>
                      <div className="p-3 rounded-lg bg-purple-50">
                        <div className="text-3xl font-bold text-purple-700">65%</div>
                        <div className="text-sm text-gray-600">Compliance Improvement</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Treatment Comparison</CardTitle>
                    <CardDescription>
                      Relative effectiveness across methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Filtration</span>
                        <span className="text-sm font-medium">92% effective</span>
                      </div>
                      <Progress value={92} className="h-2 bg-gray-200" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Best for: Physical contaminants</span>
                        <span>High cost</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Chemical</span>
                        <span className="text-sm font-medium">84% effective</span>
                      </div>
                      <Progress value={84} className="h-2 bg-gray-200" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Best for: Dissolved pollutants</span>
                        <span>Medium cost</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Biological</span>
                        <span className="text-sm font-medium">88% effective</span>
                      </div>
                      <Progress value={88} className="h-2 bg-gray-200" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Best for: Organic contaminants</span>
                        <span>Low cost</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Recommended Approach</h4>
                      <div className="p-3 bg-blue-50 rounded-md text-sm">
                        <p className="font-medium text-blue-800 mb-1">Multi-stage Treatment</p>
                        <p className="text-blue-700">
                          A combination of all three methods provides optimal results for complex water sources with multiple contaminant types.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      {isMobile && <Sidebar />}
    </div>
  );
};

export default TreatmentSimulator;
