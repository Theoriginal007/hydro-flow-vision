
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, FileText, CalendarDays, Download, Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Report {
  id: string;
  title: string;
  date: string;
  type: 'compliance' | 'quality' | 'treatment' | 'risk';
  status: 'compliant' | 'non-compliant' | 'review' | 'expired';
  downloadUrl: string;
}

const HistoricalReports = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  // Sample historical reports data
  const reports: Report[] = [
    {
      id: "rep-2023-12-001",
      title: "Q4 Water Quality Compliance Report",
      date: "2023-12-15",
      type: "compliance",
      status: "compliant",
      downloadUrl: "#"
    },
    {
      id: "rep-2023-11-002",
      title: "Municipal Water Treatment Analysis",
      date: "2023-11-22",
      type: "treatment",
      status: "compliant",
      downloadUrl: "#"
    },
    {
      id: "rep-2023-10-003",
      title: "Lead Contamination Risk Assessment",
      date: "2023-10-08",
      type: "risk",
      status: "non-compliant",
      downloadUrl: "#"
    },
    {
      id: "rep-2023-09-004",
      title: "Quarterly Water Quality Report",
      date: "2023-09-30",
      type: "quality",
      status: "review",
      downloadUrl: "#"
    },
    {
      id: "rep-2023-08-005",
      title: "Annual Compliance Certification",
      date: "2023-08-15",
      type: "compliance",
      status: "expired",
      downloadUrl: "#"
    },
    {
      id: "rep-2023-07-006",
      title: "Treatment System Effectiveness Report",
      date: "2023-07-12",
      type: "treatment",
      status: "compliant",
      downloadUrl: "#"
    },
    {
      id: "rep-2023-06-007",
      title: "Bacterial Contamination Analysis",
      date: "2023-06-25",
      type: "quality",
      status: "non-compliant",
      downloadUrl: "#"
    },
    {
      id: "rep-2023-05-008",
      title: "Drinking Water Safety Assessment",
      date: "2023-05-19",
      type: "risk",
      status: "compliant",
      downloadUrl: "#"
    }
  ];
  
  // Filter reports based on search query and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          report.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || report.type === filterType;
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  const handleDownload = (report: Report) => {
    toast({
      title: "Report Downloaded",
      description: `${report.title} has been downloaded.`,
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "compliant":
        return <Badge className="bg-green-500">Compliant</Badge>;
      case "non-compliant":
        return <Badge className="bg-red-500">Non-Compliant</Badge>;
      case "review":
        return <Badge className="bg-amber-500">Under Review</Badge>;
      case "expired":
        return <Badge className="bg-gray-500">Expired</Badge>;
      default:
        return <Badge className="bg-blue-500">{status}</Badge>;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch(type) {
      case "compliance":
        return <div className="p-2 bg-purple-100 rounded-full"><FileText className="h-4 w-4 text-purple-600" /></div>;
      case "quality":
        return <div className="p-2 bg-blue-100 rounded-full"><FileText className="h-4 w-4 text-blue-600" /></div>;
      case "treatment":
        return <div className="p-2 bg-green-100 rounded-full"><FileText className="h-4 w-4 text-green-600" /></div>;
      case "risk":
        return <div className="p-2 bg-amber-100 rounded-full"><FileText className="h-4 w-4 text-amber-600" /></div>;
      default:
        return <div className="p-2 bg-gray-100 rounded-full"><FileText className="h-4 w-4 text-gray-600" /></div>;
    }
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
                <BreadcrumbLink asChild>
                  <Link to="/">
                    <Home className="h-4 w-4 mr-1" />
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/reports">
                    <FileText className="h-4 w-4 mr-1" />
                    Reports
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/historical-reports">
                  History
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 text-water-dark">
              Historical Reports
            </h1>
            <p className="text-lg text-gray-600">
              Access and download past water quality reports and assessments
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Report Search & Filters</CardTitle>
              <CardDescription>Find specific reports based on title, type, or status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    type="search" 
                    placeholder="Search by report title or ID..." 
                    className="pl-8" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[180px]">
                      <span className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        <span>Type</span>
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="quality">Water Quality</SelectItem>
                      <SelectItem value="treatment">Treatment</SelectItem>
                      <SelectItem value="risk">Risk Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <span className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        <span>Status</span>
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="compliant">Compliant</SelectItem>
                      <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                      <SelectItem value="review">Under Review</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <Card key={report.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-6">
                      <div className="flex items-start gap-4">
                        {getTypeIcon(report.type)}
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between mb-2">
                            <h3 className="text-lg font-semibold">{report.title}</h3>
                            {getStatusBadge(report.status)}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <CalendarDays className="h-4 w-4" />
                            <span>{report.date}</span>
                            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full ml-2">{report.id}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button size="sm" onClick={() => handleDownload(report)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download Report
                            </Button>
                            <Button size="sm" variant="outline">
                              <FileText className="h-4 w-4 mr-2" />
                              View Summary
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center p-12 bg-gray-50 rounded-lg border border-gray-200">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No reports found</h3>
                <p className="text-gray-600 mb-4">No reports matching your search criteria were found</p>
                <Button onClick={() => {
                  setSearchQuery("");
                  setFilterType("all");
                  setFilterStatus("all");
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
      {isMobile && <Sidebar />}
    </div>
  );
};

export default HistoricalReports;
