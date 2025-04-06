
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, RefreshCw, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const diagnosticItems = [
  { name: "Water Quality Sensors", status: "passed" },
  { name: "Treatment Modules", status: "passed" },
  { name: "Monitoring Network", status: "warning" },
  { name: "Alert System", status: "passed" },
  { name: "Data Storage", status: "failed" },
  { name: "Backup Systems", status: "passed" },
  { name: "Remote Monitoring", status: "warning" },
  { name: "Security Protocols", status: "passed" },
];

const Diagnostics = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate scanning process
    if (isScanning) {
      const timer = setInterval(() => {
        setProgress(oldProgress => {
          const newProgress = Math.min(oldProgress + 2, 100);
          if (newProgress >= (currentStep + 1) * (100 / diagnosticItems.length)) {
            setResults(prev => [...prev, diagnosticItems[currentStep]]);
            setCurrentStep(old => Math.min(old + 1, diagnosticItems.length - 1));
          }
          if (newProgress === 100) {
            clearInterval(timer);
            setIsScanning(false);
            toast({
              title: "System Scan Complete",
              description: "Diagnostic scan has been completed successfully.",
            });
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [isScanning, currentStep, toast]);

  const restartScan = () => {
    setProgress(0);
    setCurrentStep(0);
    setResults([]);
    setIsScanning(true);
  };

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
                <BreadcrumbLink href="/diagnostics">System Diagnostics</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-water-dark">
              System Diagnostics
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Comprehensive scan of all water quality monitoring and treatment systems
            </p>
          </header>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-blue-600" />
                Diagnostic Scan Progress
              </CardTitle>
              <CardDescription>
                Scanning all connected systems and components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Progress value={progress} className="h-2" />
                <p className="text-right text-sm text-gray-500 mt-1">{progress}% Complete</p>
              </div>

              <div className="space-y-2 mb-6">
                {diagnosticItems.map((item, index) => (
                  <div key={index} className="p-3 border rounded-md flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {results.find(r => r.name === item.name) ? (
                        results.find(r => r.name === item.name).status === "passed" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : results.find(r => r.name === item.name).status === "warning" ? (
                          <CheckCircle className="h-5 w-5 text-amber-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )
                      ) : currentStep === index && isScanning ? (
                        <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                      )}
                      <span>{item.name}</span>
                    </div>
                    <span className="text-sm">
                      {results.find(r => r.name === item.name) ? (
                        results.find(r => r.name === item.name).status === "passed" ? (
                          <span className="text-green-500">Passed</span>
                        ) : results.find(r => r.name === item.name).status === "warning" ? (
                          <span className="text-amber-500">Warning</span>
                        ) : (
                          <span className="text-red-500">Failed</span>
                        )
                      ) : (
                        <span className="text-gray-400">Pending</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => navigate("/")}>
                  Back to Dashboard
                </Button>
                {!isScanning && (
                  <Button onClick={restartScan}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Restart Scan
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {!isScanning && (
            <Card>
              <CardHeader>
                <CardTitle>System Diagnostic Summary</CardTitle>
                <CardDescription>Issues detected that require attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded">
                    <h3 className="font-medium text-red-800">Critical Issue: Data Storage</h3>
                    <p className="text-sm text-red-700 mt-1">
                      Database storage capacity at 95%. Recommend immediate expansion of storage capacity to prevent data loss.
                    </p>
                    <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700">
                      Resolve Issue
                    </Button>
                  </div>
                  
                  <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded">
                    <h3 className="font-medium text-amber-800">Warning: Monitoring Network</h3>
                    <p className="text-sm text-amber-700 mt-1">
                      3 remote monitoring stations showing intermittent connectivity. Recommend maintenance check.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2 text-amber-600 border-amber-600 hover:bg-amber-50 hover:text-amber-700">
                      Schedule Maintenance
                    </Button>
                  </div>
                  
                  <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded">
                    <h3 className="font-medium text-amber-800">Warning: Remote Monitoring</h3>
                    <p className="text-sm text-amber-700 mt-1">
                      Remote access security certificates expiring in 15 days. Renewal required.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2 text-amber-600 border-amber-600 hover:bg-amber-50 hover:text-amber-700">
                      Renew Certificates
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
      {isMobile && <Sidebar />}
    </div>
  );
};

export default Diagnostics;
