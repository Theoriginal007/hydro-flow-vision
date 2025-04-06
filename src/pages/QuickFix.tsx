
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Zap, Check, Activity, AlertTriangle, XCircle, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const issues = [
  {
    id: 1,
    name: "High Turbidity at River Alpha",
    type: "water-quality",
    severity: "high",
    description: "Turbidity levels exceed safety standards. Automatic filter backwash can resolve this issue.",
    status: "pending",
    solution: "Initiate backwash cycle for primary filter system",
    estimatedTime: 5
  },
  {
    id: 2,
    name: "pH Imbalance at Municipal Plant B",
    type: "water-quality",
    severity: "medium",
    description: "pH levels at 8.2 exceed optimal range. Adjustment of chemical dosing required.",
    status: "pending",
    solution: "Reduce alkaline chemical dosage by 15%",
    estimatedTime: 3
  },
  {
    id: 3,
    name: "Chlorine Level Warning at Treatment Unit 5",
    type: "water-quality",
    severity: "medium",
    description: "Chlorine residual below minimum threshold. Increase dosing required.",
    status: "pending",
    solution: "Increase chlorine dosage by 0.3 ppm",
    estimatedTime: 2
  },
  {
    id: 4,
    name: "Database Storage Capacity at 95%",
    type: "system",
    severity: "high",
    description: "Database approaching maximum capacity. Data archiving required to prevent disruption.",
    status: "pending",
    solution: "Archive data older than 90 days and compress historical records",
    estimatedTime: 8
  },
  {
    id: 5,
    name: "Remote Monitoring Station Offline",
    type: "system",
    severity: "high",
    description: "Remote station #7 has lost connectivity. System restart required.",
    status: "pending",
    solution: "Remotely reboot monitoring station and verify network connectivity",
    estimatedTime: 4
  },
  {
    id: 6,
    name: "Pump Efficiency at Well 17 Below 70%",
    type: "equipment",
    severity: "medium",
    description: "Main pump operating below efficiency threshold. Performance adjustment needed.",
    status: "pending",
    solution: "Adjust impeller clearance and recalibrate flow rate",
    estimatedTime: 6
  },
  {
    id: 7,
    name: "Flow Meter Calibration Error at Junction 12",
    type: "equipment",
    severity: "low",
    description: "Flow meter readings show 12% deviation from expected values. Recalibration needed.",
    status: "pending",
    solution: "Reset meter and initiate calibration sequence",
    estimatedTime: 5
  }
];

const QuickFix = () => {
  const [activeTab, setActiveTab] = useState("water-quality");
  const [fixingIssue, setFixingIssue] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [updatedIssues, setUpdatedIssues] = useState(issues);
  
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleFixIssue = (issueId: number) => {
    const issue = updatedIssues.find(i => i.id === issueId);
    if (!issue) return;
    
    setFixingIssue(issueId);
    setProgress(0);
    
    // Simulate fixing process
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (issue.estimatedTime * 4));
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Update issue status
          setUpdatedIssues(prev => prev.map(i => 
            i.id === issueId ? { ...i, status: "resolved" } : i
          ));
          
          setFixingIssue(null);
          
          toast({
            title: "Issue Resolved",
            description: `Successfully fixed: ${issue.name}`,
          });
        }
        return Math.min(newProgress, 100);
      });
    }, 250);
  };

  // Fix all issues function
  const handleFixAll = () => {
    const issuesForTab = updatedIssues.filter(i => i.type === activeTab && i.status !== "resolved");
    if (issuesForTab.length === 0) return;
    
    toast({
      title: "Auto-Fix Initiated",
      description: `Attempting to fix ${issuesForTab.length} issues automatically`,
    });
    
    // Process each issue sequentially
    let currentIssueIndex = 0;
    
    const processNextIssue = () => {
      if (currentIssueIndex >= issuesForTab.length) return;
      
      const issue = issuesForTab[currentIssueIndex];
      setFixingIssue(issue.id);
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (issue.estimatedTime * 4));
          if (newProgress >= 100) {
            clearInterval(interval);
            
            // Update issue status
            setUpdatedIssues(prev => prev.map(i => 
              i.id === issue.id ? { ...i, status: "resolved" } : i
            ));
            
            currentIssueIndex++;
            
            if (currentIssueIndex < issuesForTab.length) {
              // Process next issue
              processNextIssue();
            } else {
              // All issues processed
              setFixingIssue(null);
              toast({
                title: "All Issues Resolved",
                description: `Successfully fixed ${issuesForTab.length} issues`,
              });
            }
          }
          return Math.min(newProgress, 100);
        });
      }, 250);
    };
    
    processNextIssue();
  };

  useEffect(() => {
    // Simulate resolving one issue automatically on load
    const randomIssue = issues[Math.floor(Math.random() * issues.length)];
    setUpdatedIssues(prev => prev.map(i => 
      i.id === randomIssue.id ? { ...i, status: "auto-resolved" } : i
    ));
    
    toast({
      title: "Auto-Fix System Active",
      description: `Issue automatically resolved: ${randomIssue.name}`,
    });
  }, []);

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
                <BreadcrumbLink href="/quick-fix">Quick Fix</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-water-dark flex items-center">
              <Zap className="h-7 w-7 mr-2 text-purple-600" />
              Quick Fix Center
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              AI-powered system to automatically resolve issues with minimal human intervention
            </p>
          </header>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current performance metrics and auto-remediation statistics</CardDescription>
                </div>
                <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  <Activity className="h-4 w-4 mr-1" />
                  <span>System Online</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium text-gray-700">Detected Issues</h3>
                    <span className="text-2xl font-bold text-green-700">{updatedIssues.length}</span>
                  </div>
                  <p className="text-xs text-gray-500">Last 24 hours</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium text-gray-700">Auto-Resolved</h3>
                    <span className="text-2xl font-bold text-blue-700">
                      {updatedIssues.filter(i => i.status === "auto-resolved").length}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Without human intervention</p>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium text-gray-700">Pending</h3>
                    <span className="text-2xl font-bold text-amber-700">
                      {updatedIssues.filter(i => i.status === "pending").length}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Awaiting action</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium text-gray-700">Avg. Resolution</h3>
                    <span className="text-2xl font-bold text-purple-700">
                      {Math.round(updatedIssues.reduce((sum, i) => sum + i.estimatedTime, 0) / updatedIssues.length)} min
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Per issue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="water-quality">Water Quality</TabsTrigger>
                <TabsTrigger value="system">System Issues</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
              </TabsList>
              <Button variant="default" onClick={handleFixAll}>
                <Zap className="h-4 w-4 mr-2" />
                Fix All {activeTab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Issues
              </Button>
            </div>
            
            <TabsContent value="water-quality" className="space-y-4">
              {updatedIssues.filter(issue => issue.type === "water-quality").map(issue => (
                <Card key={issue.id} className={issue.status === "resolved" || issue.status === "auto-resolved" ? "border-green-200 bg-green-50" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center">
                        {issue.name}
                        {issue.severity === "high" && <AlertTriangle className="h-4 w-4 ml-2 text-red-500" />}
                      </CardTitle>
                      {issue.status === "resolved" && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {issue.status === "auto-resolved" && <div className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Auto-Resolved</div>}
                    </div>
                    <CardDescription>{issue.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="flex items-center text-sm">
                      <span className="font-medium mr-2">Recommended Fix:</span>
                      <span>{issue.solution}</span>
                    </div>
                    <div className="flex items-center text-sm mt-1">
                      <span className="font-medium mr-2">Estimated Time:</span>
                      <span>{issue.estimatedTime} minutes</span>
                    </div>
                    
                    {fixingIssue === issue.id && (
                      <div className="mt-4">
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-center mt-1 text-gray-500">
                          Applying fix ({Math.round(progress)}% complete)
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    {issue.status === "pending" ? (
                      <Button 
                        className="w-full" 
                        disabled={fixingIssue !== null} 
                        onClick={() => handleFixIssue(issue.id)}
                      >
                        {fixingIssue === issue.id ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Fixing Issue...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Apply Quick Fix
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        <Check className="h-4 w-4 mr-2" />
                        Issue Resolved
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="system" className="space-y-4">
              {updatedIssues.filter(issue => issue.type === "system").map(issue => (
                <Card key={issue.id} className={issue.status === "resolved" || issue.status === "auto-resolved" ? "border-green-200 bg-green-50" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center">
                        {issue.name}
                        {issue.severity === "high" && <AlertTriangle className="h-4 w-4 ml-2 text-red-500" />}
                      </CardTitle>
                      {issue.status === "resolved" && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {issue.status === "auto-resolved" && <div className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Auto-Resolved</div>}
                    </div>
                    <CardDescription>{issue.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="flex items-center text-sm">
                      <span className="font-medium mr-2">Recommended Fix:</span>
                      <span>{issue.solution}</span>
                    </div>
                    <div className="flex items-center text-sm mt-1">
                      <span className="font-medium mr-2">Estimated Time:</span>
                      <span>{issue.estimatedTime} minutes</span>
                    </div>
                    
                    {fixingIssue === issue.id && (
                      <div className="mt-4">
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-center mt-1 text-gray-500">
                          Applying fix ({Math.round(progress)}% complete)
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    {issue.status === "pending" ? (
                      <Button 
                        className="w-full" 
                        disabled={fixingIssue !== null} 
                        onClick={() => handleFixIssue(issue.id)}
                      >
                        {fixingIssue === issue.id ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Fixing Issue...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Apply Quick Fix
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        <Check className="h-4 w-4 mr-2" />
                        Issue Resolved
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="equipment" className="space-y-4">
              {updatedIssues.filter(issue => issue.type === "equipment").map(issue => (
                <Card key={issue.id} className={issue.status === "resolved" || issue.status === "auto-resolved" ? "border-green-200 bg-green-50" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center">
                        {issue.name}
                        {issue.severity === "high" && <AlertTriangle className="h-4 w-4 ml-2 text-red-500" />}
                      </CardTitle>
                      {issue.status === "resolved" && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {issue.status === "auto-resolved" && <div className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Auto-Resolved</div>}
                    </div>
                    <CardDescription>{issue.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="flex items-center text-sm">
                      <span className="font-medium mr-2">Recommended Fix:</span>
                      <span>{issue.solution}</span>
                    </div>
                    <div className="flex items-center text-sm mt-1">
                      <span className="font-medium mr-2">Estimated Time:</span>
                      <span>{issue.estimatedTime} minutes</span>
                    </div>
                    
                    {fixingIssue === issue.id && (
                      <div className="mt-4">
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-center mt-1 text-gray-500">
                          Applying fix ({Math.round(progress)}% complete)
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    {issue.status === "pending" ? (
                      <Button 
                        className="w-full" 
                        disabled={fixingIssue !== null} 
                        onClick={() => handleFixIssue(issue.id)}
                      >
                        {fixingIssue === issue.id ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Fixing Issue...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Apply Quick Fix
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        <Check className="h-4 w-4 mr-2" />
                        Issue Resolved
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
      {isMobile && <Sidebar />}
    </div>
  );
};

export default QuickFix;
