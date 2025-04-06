
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Download, FileText, Calendar, Filter, ChevronDown, BarChart, PieChart, LineChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { mockWaterData } from "@/data/mockData";

const GenerateReport = () => {
  const [reportType, setReportType] = useState("quality");
  const [timeRange, setTimeRange] = useState("30d");
  const [format, setFormat] = useState("pdf");
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(false);
  const [includeRecommendations, setIncludeRecommendations] = useState(true);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleGenerateReport = () => {
    setGeneratingReport(true);
    setProgress(0);
    
    // Simulate report generation
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setGeneratingReport(false);
          
          toast({
            title: "Report Generated",
            description: `Your ${reportType} report has been successfully generated.`
          });
        }
        return newProgress;
      });
    }, 150);
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
                <BreadcrumbLink href="/generate-report">Generate Report</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-water-dark">
              Generate Water Quality Report
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Create comprehensive reports for analysis and compliance
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Report Options
                </CardTitle>
                <CardDescription>
                  Configure your report parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="report-type" className="font-medium mb-2 block">Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quality">Water Quality Analysis</SelectItem>
                      <SelectItem value="compliance">Regulatory Compliance</SelectItem>
                      <SelectItem value="treatment">Treatment Efficiency</SelectItem>
                      <SelectItem value="contamination">Contamination Tracking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="time-range" className="font-medium mb-2 block">Time Range</Label>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger id="time-range">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="90d">Last 90 Days</SelectItem>
                      <SelectItem value="1y">Last Year</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="format" className="font-medium mb-2 block">Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger id="format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                      <SelectItem value="html">Web Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <Label className="font-medium block">Report Contents</Label>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-charts" 
                      checked={includeCharts}
                      onCheckedChange={(checked) => setIncludeCharts(checked === true)}
                    />
                    <label
                      htmlFor="include-charts"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Include Visualizations & Charts
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-raw-data" 
                      checked={includeRawData}
                      onCheckedChange={(checked) => setIncludeRawData(checked === true)}
                    />
                    <label
                      htmlFor="include-raw-data"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Include Raw Data Tables
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-recommendations" 
                      checked={includeRecommendations}
                      onCheckedChange={(checked) => setIncludeRecommendations(checked === true)}
                    />
                    <label
                      htmlFor="include-recommendations"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Include AI Recommendations
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleGenerateReport}
                  disabled={generatingReport}
                >
                  {generatingReport ? (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2 animate-bounce" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Report Preview</CardTitle>
                <CardDescription>
                  Preview of your report based on selected options
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatingReport ? (
                  <div className="space-y-4">
                    <Progress value={progress} className="h-2" />
                    <p className="text-center text-sm text-gray-500">
                      Generating {reportType} report ({progress}% complete)
                    </p>
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="border rounded-md p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {reportType === "quality" && "Water Quality Analysis Report"}
                        {reportType === "compliance" && "Regulatory Compliance Report"}
                        {reportType === "treatment" && "Treatment Efficiency Report"}
                        {reportType === "contamination" && "Contamination Tracking Report"}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Time Period: {timeRange === "7d" ? "Last 7 Days" : 
                                      timeRange === "30d" ? "Last 30 Days" : 
                                      timeRange === "90d" ? "Last 90 Days" : 
                                      timeRange === "1y" ? "Last Year" : "All Time"}
                      </p>
                      
                      <p className="text-sm text-gray-700 mb-4">
                        This report provides a comprehensive analysis of water quality metrics across all monitored water sources.
                        It includes trends, anomalies, and recommendations for improving water quality.
                      </p>
                      
                      {includeCharts && (
                        <div className="mb-4 space-y-4">
                          <h4 className="text-md font-medium">Charts & Visualizations</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-100 p-4 rounded-md flex flex-col items-center justify-center">
                              <BarChart className="h-6 w-6 text-blue-600 mb-2" />
                              <p className="text-xs text-center text-gray-600">Water Quality Trends</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-md flex flex-col items-center justify-center">
                              <PieChart className="h-6 w-6 text-purple-600 mb-2" />
                              <p className="text-xs text-center text-gray-600">Contaminant Distribution</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-md flex flex-col items-center justify-center">
                              <LineChart className="h-6 w-6 text-green-600 mb-2" />
                              <p className="text-xs text-center text-gray-600">pH Levels Over Time</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-md flex flex-col items-center justify-center">
                              <Filter className="h-6 w-6 text-amber-600 mb-2" />
                              <p className="text-xs text-center text-gray-600">Treatment Effectiveness</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {includeRawData && (
                        <div className="mb-4">
                          <h4 className="text-md font-medium mb-2">Sample Data (Preview)</h4>
                          <div className="text-xs overflow-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">pH</th>
                                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toxicity</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {mockWaterData.slice(0, 5).map((sample, index) => (
                                  <tr key={index}>
                                    <td className="px-2 py-2 whitespace-nowrap">{sample.location}</td>
                                    <td className="px-2 py-2 whitespace-nowrap">{sample.collectionDate}</td>
                                    <td className="px-2 py-2 whitespace-nowrap">{sample.metrics?.pH || "-"}</td>
                                    <td className="px-2 py-2 whitespace-nowrap">{sample.toxicityLevel}%</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      
                      {includeRecommendations && (
                        <div>
                          <h4 className="text-md font-medium mb-2">AI Recommendations</h4>
                          <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800">
                            <p className="mb-2">Based on the analyzed data, we recommend:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Increase chlorine dosing at River Alpha intake by 0.2 ppm</li>
                              <li>Schedule maintenance for Industrial Zone Canal filters</li>
                              <li>Implement additional heavy metal monitoring at Urban Stream Delta</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        variant="outline" 
                        className="mr-2"
                        onClick={() => {
                          toast({
                            title: "Report Shared",
                            description: "Report has been sent to your team members"
                          });
                        }}
                      >
                        Share Report
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Report Scheduled",
                            description: "This report will be automatically generated monthly"
                          });
                        }}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Recurring
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      {isMobile && <Sidebar />}
    </div>
  );
};

export default GenerateReport;
