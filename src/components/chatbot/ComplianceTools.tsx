
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, Shield, VolumeX, Calculator, X, FileText, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ComplianceTools() {
  const { toast } = useToast();
  const [penaltyDialogOpen, setPenaltyDialogOpen] = useState(false);
  const [scannerDialogOpen, setScannerDialogOpen] = useState(false);
  const [resolverDialogOpen, setResolverDialogOpen] = useState(false);
  
  // Penalty Calculator states
  const [violationType, setViolationType] = useState("quality");
  const [daysOfViolation, setDaysOfViolation] = useState<string>("30");
  const [severityLevel, setSeverityLevel] = useState<number[]>([50]);
  const [companySize, setCompanySize] = useState("medium");
  const [priorViolations, setPriorViolations] = useState("0");
  const [calculatedPenalty, setCalculatedPenalty] = useState<number | null>(null);
  
  // Scanner states
  const [scanStep, setScanStep] = useState(1);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<any>(null);
  const [scanningComplete, setScanningComplete] = useState(false);
  
  // Resolver states
  const [violationStatus, setViolationStatus] = useState("identify");
  const [resolutionProgress, setResolutionProgress] = useState(0);
  
  const handleCalculatePenalty = () => {
    // Base penalty calculations
    const basePenalties = {
      quality: 1500,
      reporting: 500,
      permit: 2000,
      monitoring: 750
    };
    
    // Get base penalty for violation type
    const base = basePenalties[violationType as keyof typeof basePenalties] || 1000;
    
    // Calculate multipliers
    const daysFactor = Math.min(parseFloat(daysOfViolation) / 30, 10);
    const severityFactor = severityLevel[0] / 50;
    
    // Company size multiplier
    const sizeFactor = companySize === "small" ? 0.8 : 
                      companySize === "medium" ? 1.2 : 
                      companySize === "large" ? 2.0 : 1.0;
    
    // Prior violations multiplier
    const priorFactor = 1 + (parseFloat(priorViolations) * 0.25);
    
    // Calculate final penalty
    const penalty = base * daysFactor * severityFactor * sizeFactor * priorFactor;
    setCalculatedPenalty(Math.round(penalty));
    
    toast({
      title: "Penalty Calculated",
      description: `Estimated penalty: $${Math.round(penalty).toLocaleString()}`,
    });
  };
  
  const handleStartScan = () => {
    setScanProgress(0);
    setScanningComplete(false);
    setScanResults(null);
    
    // Simulate scanning process
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setScanningComplete(true);
          
          // Generate random scan results
          const results = {
            violations: Math.floor(Math.random() * 5) + 1,
            risks: Math.floor(Math.random() * 8) + 2,
            complianceScore: Math.floor(Math.random() * 30) + 70,
            criticalIssues: Math.floor(Math.random() * 3),
            recommendations: [
              "Update water quality monitoring protocols",
              "Implement automated compliance reporting",
              "Enhance chemical storage safety measures",
              "Establish more frequent testing schedule"
            ].slice(0, Math.floor(Math.random() * 3) + 2)
          };
          
          setScanResults(results);
          
          toast({
            title: "Scan Complete",
            description: `Found ${results.violations} violations and ${results.risks} compliance risks.`,
          });
        }
        
        return newProgress;
      });
    }, 300);
  };
  
  const handleResolveViolation = () => {
    setResolutionProgress(0);
    
    // Simulate resolution process
    const interval = setInterval(() => {
      setResolutionProgress(prev => {
        const newProgress = prev + 5;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setViolationStatus(prev => {
            let nextStatus = "identify";
            
            switch(prev) {
              case "identify":
                nextStatus = "plan";
                break;
              case "plan":
                nextStatus = "implement";
                break;
              case "implement":
                nextStatus = "verify";
                break;
              case "verify":
                nextStatus = "complete";
                break;
              default:
                nextStatus = "identify";
            }
            
            if (nextStatus === "complete") {
              toast({
                title: "Violation Resolution Complete",
                description: "All steps have been completed successfully. Violation resolved!",
              });
            } else {
              toast({
                title: "Step Complete",
                description: `Moving to next step: ${nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1)}`,
              });
            }
            
            return nextStatus;
          });
        }
        
        return newProgress;
      });
    }, 200);
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Compliance Tools</CardTitle>
        <CardDescription>AI-powered regulatory compliance assistants</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 rounded bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded text-blue-700">
                <Scale className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium">Penalty Calculator</h4>
                <p className="text-sm text-gray-600">
                  Calculate potential penalties for non-compliance
                </p>
                <Dialog open={penaltyDialogOpen} onOpenChange={setPenaltyDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full mt-2"
                    >
                      Open Calculator
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-blue-700" />
                        Regulatory Penalty Calculator
                      </DialogTitle>
                      <DialogDescription>
                        Estimate potential penalties for water quality regulatory violations
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="violation-type">Violation Type</Label>
                        <Select value={violationType} onValueChange={setViolationType}>
                          <SelectTrigger id="violation-type">
                            <SelectValue placeholder="Select violation type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quality">Water Quality Standard</SelectItem>
                            <SelectItem value="reporting">Reporting Failure</SelectItem>
                            <SelectItem value="permit">Permit Violation</SelectItem>
                            <SelectItem value="monitoring">Monitoring Failure</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="days-of-violation">Days of Violation</Label>
                        <Input 
                          id="days-of-violation" 
                          type="number" 
                          value={daysOfViolation}
                          onChange={(e) => setDaysOfViolation(e.target.value)}
                          min="1"
                        />
                        <p className="text-xs text-gray-500">Number of days the violation has persisted</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Severity Level: {severityLevel[0]}%</Label>
                        <Slider
                          defaultValue={severityLevel}
                          max={100}
                          step={1}
                          onValueChange={setSeverityLevel}
                        />
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500">Minor</span>
                          <span className="text-xs text-gray-500">Moderate</span>
                          <span className="text-xs text-gray-500">Severe</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company-size">Company Size</Label>
                        <Select value={companySize} onValueChange={setCompanySize}>
                          <SelectTrigger id="company-size">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small (&lt; 50 employees)</SelectItem>
                            <SelectItem value="medium">Medium (50-500 employees)</SelectItem>
                            <SelectItem value="large">Large (&gt; 500 employees)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="prior-violations">Prior Violations (Last 3 Years)</Label>
                        <Input 
                          id="prior-violations" 
                          type="number" 
                          value={priorViolations}
                          onChange={(e) => setPriorViolations(e.target.value)}
                          min="0"
                        />
                      </div>
                      
                      {calculatedPenalty !== null && (
                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                          <p className="font-medium text-blue-900">Estimated Penalty</p>
                          <p className="text-2xl font-bold text-blue-700">${calculatedPenalty.toLocaleString()}</p>
                          <p className="text-xs text-blue-700 mt-1">
                            Note: This is an estimate. Actual penalties may vary based on regulatory authority discretion and mitigating factors.
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setPenaltyDialogOpen(false)} className="mr-2">
                        <X className="h-4 w-4 mr-2" />
                        Close
                      </Button>
                      <Button onClick={handleCalculatePenalty}>
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate Penalty
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          
          <div className="p-3 rounded bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded text-purple-700">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium">Regulatory Scanner</h4>
                <p className="text-sm text-gray-600">
                  Scan documents for compliance vulnerabilities
                </p>
                <Dialog open={scannerDialogOpen} onOpenChange={setScannerDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full mt-2"
                    >
                      Upload Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-purple-700" />
                        Regulatory Compliance Scanner
                      </DialogTitle>
                      <DialogDescription>
                        Scan your documents for regulatory compliance issues
                      </DialogDescription>
                    </DialogHeader>
                    
                    {scanStep === 1 && (
                      <div className="space-y-4 py-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                          <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">Drag and drop your document here, or click to browse</p>
                          <p className="text-xs text-gray-500 mb-3">Supports PDF, DOC, DOCX (max 10MB)</p>
                          <Button size="sm" onClick={() => setScanStep(2)}>
                            Select Document
                          </Button>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-2">Recently Scanned Documents</p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-gray-500" />
                                <span>Q3-Water-Quality-Report.pdf</span>
                              </div>
                              <span className="text-xs text-amber-600">3 issues found</span>
                            </div>
                            <div className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-gray-500" />
                                <span>Treatment-Protocol-2023.docx</span>
                              </div>
                              <span className="text-xs text-green-600">0 issues found</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {scanStep === 2 && (
                      <div className="space-y-6 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="document-type">Document Type</Label>
                          <Select defaultValue="policy">
                            <SelectTrigger id="document-type">
                              <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="policy">Compliance Policy</SelectItem>
                              <SelectItem value="report">Water Quality Report</SelectItem>
                              <SelectItem value="protocol">Treatment Protocol</SelectItem>
                              <SelectItem value="permit">Permit Application</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="regulations">Applicable Regulations</Label>
                          <Select defaultValue="sdwa">
                            <SelectTrigger id="regulations">
                              <SelectValue placeholder="Select regulations" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sdwa">Safe Drinking Water Act</SelectItem>
                              <SelectItem value="cwa">Clean Water Act</SelectItem>
                              <SelectItem value="local">Local Water Regulations</SelectItem>
                              <SelectItem value="all">All Applicable Regulations</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="scan-depth">Scan Depth</Label>
                          <Select defaultValue="thorough">
                            <SelectTrigger id="scan-depth">
                              <SelectValue placeholder="Select scan depth" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="quick">Quick Scan</SelectItem>
                              <SelectItem value="standard">Standard Analysis</SelectItem>
                              <SelectItem value="thorough">Thorough Review</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500">A more thorough scan takes longer but catches more issues</p>
                        </div>
                        
                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => setScanStep(1)}>
                            Back
                          </Button>
                          <Button onClick={() => {
                            setScanStep(3);
                            handleStartScan();
                          }}>
                            Start Scan
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {scanStep === 3 && (
                      <div className="space-y-6 py-4">
                        {!scanningComplete ? (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <Label>Scanning Document</Label>
                                <span className="text-sm text-gray-500">{scanProgress}%</span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-purple-600 transition-all duration-300"
                                  style={{ width: `${scanProgress}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Current Operation:</p>
                              <p className="text-sm text-gray-600">
                                {scanProgress < 30 ? 'Analyzing document structure...' : 
                                 scanProgress < 60 ? 'Comparing against regulatory requirements...' : 
                                 scanProgress < 90 ? 'Identifying potential compliance issues...' : 
                                 'Generating recommendations...'}
                              </p>
                            </div>
                            
                            <div className="flex justify-center">
                              <Button variant="outline" disabled>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Scanning in progress...
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex justify-between bg-green-50 p-3 rounded-md">
                              <div className="flex items-center gap-2">
                                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                  <Shield className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                  <p className="font-medium">Scan Complete</p>
                                  <p className="text-sm text-gray-600">Document analyzed successfully</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-bold text-green-700">{scanResults?.complianceScore}%</p>
                                <p className="text-xs text-green-600">Compliance Score</p>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <p className="font-medium">Issues Found:</p>
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="p-2 bg-red-50 rounded-md">
                                  <p className="text-xl font-bold text-red-700">{scanResults?.violations}</p>
                                  <p className="text-xs text-gray-600">Violations</p>
                                </div>
                                <div className="p-2 bg-amber-50 rounded-md">
                                  <p className="text-xl font-bold text-amber-700">{scanResults?.risks}</p>
                                  <p className="text-xs text-gray-600">Risks</p>
                                </div>
                                <div className="p-2 bg-blue-50 rounded-md">
                                  <p className="text-xl font-bold text-blue-700">{scanResults?.criticalIssues}</p>
                                  <p className="text-xs text-gray-600">Critical</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <p className="font-medium">Recommendations:</p>
                              <ul className="space-y-1 text-sm">
                                {scanResults?.recommendations.map((rec: string, i: number) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <div className="min-w-4 min-h-4 mt-1 rounded-full bg-purple-100 flex items-center justify-center">
                                      <span className="text-xs text-purple-700">{i+1}</span>
                                    </div>
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex justify-between">
                              <Button variant="outline" onClick={() => setScanStep(1)}>
                                New Scan
                              </Button>
                              <Button onClick={() => {
                                setScannerDialogOpen(false);
                                toast({
                                  title: "Report Downloaded",
                                  description: "Full compliance report has been saved to your downloads"
                                });
                              }}>
                                Download Full Report
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          
          <div className="p-3 rounded bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="bg-red-100 p-2 rounded text-red-700">
                <VolumeX className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium">Violation Resolver</h4>
                <p className="text-sm text-gray-600">
                  AI guidance to resolve existing violations
                </p>
                <Dialog open={resolverDialogOpen} onOpenChange={setResolverDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full mt-2"
                    >
                      Start Resolution
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <VolumeX className="h-5 w-5 text-red-700" />
                        Violation Resolution Assistant
                      </DialogTitle>
                      <DialogDescription>
                        Step-by-step guidance to resolve regulatory violations
                      </DialogDescription>
                    </DialogHeader>
                    
                    <Tabs value={violationStatus} className="py-4">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="identify" disabled={true} className="text-xs">Identify</TabsTrigger>
                        <TabsTrigger value="plan" disabled={true} className="text-xs">Plan</TabsTrigger>
                        <TabsTrigger value="implement" disabled={true} className="text-xs">Implement</TabsTrigger>
                        <TabsTrigger value="verify" disabled={true} className="text-xs">Verify</TabsTrigger>
                        <TabsTrigger value="complete" disabled={true} className="text-xs">Complete</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="identify" className="space-y-4 mt-4">
                        <div className="bg-blue-50 p-3 rounded-md">
                          <p className="font-medium text-blue-800">Step 1: Identify Violation Details</p>
                          <p className="text-sm text-blue-700 mt-1">
                            Document all relevant information about the violation to create an effective resolution plan.
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label>Violation Type</Label>
                            <Select defaultValue="exceeded">
                              <SelectTrigger>
                                <SelectValue placeholder="Select violation type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="exceeded">Exceeded Contaminant Levels</SelectItem>
                                <SelectItem value="reporting">Failed Reporting Requirement</SelectItem>
                                <SelectItem value="monitoring">Inadequate Monitoring</SelectItem>
                                <SelectItem value="treatment">Treatment Technique Violation</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Violation Details</Label>
                            <textarea 
                              className="w-full min-h-[100px] p-3 border rounded-md resize-none" 
                              placeholder="Describe the specific details of the violation..."
                              defaultValue="Lead levels exceeded the action level of 15 ppb. Samples from the distribution system showed levels between 18-22 ppb in multiple locations."
                            ></textarea>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Regulatory Authority</Label>
                            <Select defaultValue="epa">
                              <SelectTrigger>
                                <SelectValue placeholder="Select authority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="epa">EPA (Federal)</SelectItem>
                                <SelectItem value="state">State Environmental Agency</SelectItem>
                                <SelectItem value="local">Local Water Authority</SelectItem>
                                <SelectItem value="multiple">Multiple Agencies</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        {resolutionProgress > 0 && (
                          <div className="mt-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Identifying violation details</span>
                              <span className="text-sm">{resolutionProgress}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-600 transition-all duration-200"
                                style={{ width: `${resolutionProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-end">
                          <Button onClick={handleResolveViolation}>
                            Continue
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="plan" className="space-y-4 mt-4">
                        <div className="bg-indigo-50 p-3 rounded-md">
                          <p className="font-medium text-indigo-800">Step 2: Create Resolution Plan</p>
                          <p className="text-sm text-indigo-700 mt-1">
                            Develop a comprehensive plan to address the root cause and resolve the violation.
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="p-3 border rounded-md">
                            <p className="font-medium">AI-Generated Resolution Plan</p>
                            <ul className="space-y-2 mt-2 text-sm">
                              <li className="flex items-start gap-2">
                                <div className="min-w-5 min-h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-700">1</div>
                                <span>Immediately adjust corrosion control treatment by increasing orthophosphate dosage to 1.2 mg/L to reduce lead leaching.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="min-w-5 min-h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-700">2</div>
                                <span>Conduct follow-up sampling within 14 days at all locations that exceeded the action level.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="min-w-5 min-h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-700">3</div>
                                <span>Issue public notification to all affected customers within 30 days as required by regulation.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="min-w-5 min-h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-700">4</div>
                                <span>Begin lead service line inventory and develop replacement program for high-risk areas.</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Responsible Personnel</Label>
                            <Input defaultValue="John Smith (Water Quality Manager)" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Timeline for Completion</Label>
                            <Select defaultValue="60">
                              <SelectTrigger>
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="7">7 days (Urgent)</SelectItem>
                                <SelectItem value="30">30 days (High Priority)</SelectItem>
                                <SelectItem value="60">60 days (Standard)</SelectItem>
                                <SelectItem value="90">90 days (Complex Resolution)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        {resolutionProgress > 0 && (
                          <div className="mt-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Creating resolution plan</span>
                              <span className="text-sm">{resolutionProgress}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-indigo-600 transition-all duration-200"
                                style={{ width: `${resolutionProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-end">
                          <Button onClick={handleResolveViolation}>
                            Implement Plan
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="implement" className="space-y-4 mt-4">
                        <div className="bg-purple-50 p-3 rounded-md">
                          <p className="font-medium text-purple-800">Step 3: Implement Resolution Actions</p>
                          <p className="text-sm text-purple-700 mt-1">
                            Put your plan into action and track progress on all required steps.
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <p className="font-medium">Implementation Progress</p>
                            <div className="space-y-3">
                              <div className="flex items-center p-2 bg-gray-50 rounded">
                                <input type="checkbox" className="mr-3" checked readOnly />
                                <span className="text-sm flex-1">Adjusted corrosion control treatment</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Complete</span>
                              </div>
                              <div className="flex items-center p-2 bg-gray-50 rounded">
                                <input type="checkbox" className="mr-3" checked readOnly />
                                <span className="text-sm flex-1">Conducted follow-up sampling</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Complete</span>
                              </div>
                              <div className="flex items-center p-2 bg-gray-50 rounded">
                                <input type="checkbox" className="mr-3" />
                                <span className="text-sm flex-1">Issued public notification</span>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">In Progress</span>
                              </div>
                              <div className="flex items-center p-2 bg-gray-50 rounded">
                                <input type="checkbox" className="mr-3" />
                                <span className="text-sm flex-1">Began lead service line inventory</span>
                                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">Not Started</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-3 border border-blue-200 bg-blue-50 rounded-md">
                            <p className="font-medium text-blue-800">Implementation Notes</p>
                            <p className="text-sm text-blue-700 mt-1">
                              Initial results from adjusted treatment show promising reduction in lead levels.
                              Public notification scheduled for distribution on Thursday.
                            </p>
                          </div>
                        </div>
                        
                        {resolutionProgress > 0 && (
                          <div className="mt-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Implementing resolution actions</span>
                              <span className="text-sm">{resolutionProgress}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-purple-600 transition-all duration-200"
                                style={{ width: `${resolutionProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-end">
                          <Button onClick={handleResolveViolation}>
                            Verify Results
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="verify" className="space-y-4 mt-4">
                        <div className="bg-emerald-50 p-3 rounded-md">
                          <p className="font-medium text-emerald-800">Step 4: Verify Resolution</p>
                          <p className="text-sm text-emerald-700 mt-1">
                            Confirm that all corrective actions have resolved the violation and prevented recurrence.
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="p-3 border rounded">
                            <p className="font-medium">Verification Results</p>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center">
                                <div className="w-24 text-sm">Lead Level:</div>
                                <div className="flex-1">
                                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500" style={{width: "65%"}}></div>
                                  </div>
                                </div>
                                <div className="w-20 text-right text-sm">9.5 ppb</div>
                              </div>
                              <div className="flex items-center">
                                <div className="w-24 text-sm">Compliance:</div>
                                <div className="flex-1">
                                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500" style={{width: "100%"}}></div>
                                  </div>
                                </div>
                                <div className="w-20 text-right text-sm text-green-700">Compliant</div>
                              </div>
                              <div className="flex items-center">
                                <div className="w-24 text-sm">Documentation:</div>
                                <div className="flex-1">
                                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500" style={{width: "85%"}}></div>
                                  </div>
                                </div>
                                <div className="w-20 text-right text-sm">85% Complete</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Verification Comments</Label>
                            <textarea 
                              className="w-full min-h-[100px] p-3 border rounded-md resize-none" 
                              placeholder="Add verification comments..."
                              defaultValue="All follow-up samples are now below the action level of 15 ppb. Corrosion control adjustment was successful. Public notification completed ahead of schedule. Lead service line inventory is 65% complete."
                            ></textarea>
                          </div>
                        </div>
                        
                        {resolutionProgress > 0 && (
                          <div className="mt-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Verifying resolution effectiveness</span>
                              <span className="text-sm">{resolutionProgress}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-emerald-600 transition-all duration-200"
                                style={{ width: `${resolutionProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-end">
                          <Button onClick={handleResolveViolation}>
                            Complete Process
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="complete" className="space-y-4 mt-4">
                        <div className="bg-green-50 p-6 rounded-md text-center">
                          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="h-8 w-8 text-green-600" />
                          </div>
                          <p className="text-xl font-bold text-green-800">Violation Successfully Resolved!</p>
                          <p className="text-sm text-green-700 mt-2 mb-4">
                            All required actions have been completed and verified. The water system is now in compliance.
                          </p>
                          <Button 
                            className="mx-auto" 
                            onClick={() => {
                              setResolverDialogOpen(false);
                              toast({
                                title: "Resolution Plan Completed",
                                description: "A summary report has been generated for your records"
                              });
                            }}
                          >
                            Generate Resolution Report
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
