
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Home, Settings as SettingsIcon, Files, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpDocumentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search functionality",
      description: `Searching for: ${searchQuery}`,
    });
  };
  
  // Documentation sections
  const waterQualityDocs = [
    {
      title: "Understanding Water Quality Parameters",
      content: `
        <h3>Key Water Quality Parameters</h3>
        <p>Water quality is measured through various parameters that indicate its purity and safety. The most important parameters include:</p>
        <ul>
          <li><strong>pH</strong>: Measures acidity/alkalinity on a scale of 0-14. Ideal drinking water is typically between 6.5-8.5.</li>
          <li><strong>Total Dissolved Solids (TDS)</strong>: Represents the total concentration of dissolved substances. Generally, lower values indicate purer water.</li>
          <li><strong>Turbidity</strong>: Measures water cloudiness. High turbidity can indicate presence of pathogens and contaminants.</li>
          <li><strong>Chlorine</strong>: Used as a disinfectant in water treatment. Effective against many bacteria and viruses.</li>
          <li><strong>Hardness</strong>: Primarily caused by calcium and magnesium. Not typically a health concern but affects water use.</li>
          <li><strong>Heavy Metals</strong>: Including lead, arsenic, and mercury. Have serious health implications above certain concentrations.</li>
          <li><strong>Biological Contaminants</strong>: Bacteria, viruses, and parasites that can cause illness.</li>
        </ul>
      `
    },
    {
      title: "Water Sampling Best Practices",
      content: `
        <h3>How to Collect Water Samples</h3>
        <p>Proper sampling technique is crucial for accurate water quality assessment:</p>
        <ol>
          <li>Use appropriate sterile containers provided by testing laboratories.</li>
          <li>For tap water samples, let the water run for 2-3 minutes before collection.</li>
          <li>For surface water, collect from flowing, not stagnant areas.</li>
          <li>Fill containers completely, leaving minimal air space.</li>
          <li>Keep samples cool (around 4°C) but do not freeze.</li>
          <li>Deliver to laboratory within 24 hours for most accurate results.</li>
          <li>Maintain proper chain of custody documentation.</li>
        </ol>
        <p>For AR-assisted sampling, ensure your device is calibrated according to manufacturer specifications before field use.</p>
      `
    },
    {
      title: "Regulatory Standards & Compliance",
      content: `
        <h3>Key Regulatory Frameworks</h3>
        <p>Water quality is governed by various regulatory frameworks depending on jurisdiction:</p>
        <ul>
          <li><strong>Safe Drinking Water Act (SDWA)</strong>: Primary U.S. federal law for drinking water quality.</li>
          <li><strong>Clean Water Act (CWA)</strong>: Regulates discharges of pollutants into waters and sets quality standards.</li>
          <li><strong>WHO Guidelines</strong>: International recommendations for drinking water quality.</li>
          <li><strong>EU Water Framework Directive</strong>: Comprehensive water policy in the European Union.</li>
        </ul>
        <p>The AquaPure AI system continuously updates its compliance modules to reflect the latest regulatory changes across jurisdictions.</p>
      `
    }
  ];
  
  const treatmentDocs = [
    {
      title: "Treatment Solution Selection Guide",
      content: `
        <h3>Selecting the Right Treatment Approach</h3>
        <p>Choosing the appropriate water treatment solution depends on several factors:</p>
        <ul>
          <li><strong>Water source</strong>: Different sources (groundwater, surface water, etc.) have different treatment needs</li>
          <li><strong>Contaminant profile</strong>: Specific contaminants require targeted removal methods</li>
          <li><strong>Intended use</strong>: Drinking water requires more rigorous treatment than industrial process water</li>
          <li><strong>Scale of operation</strong>: Flow rate and volume requirements affect system sizing</li>
          <li><strong>Budget constraints</strong>: Capital vs. operational costs vary by treatment method</li>
        </ul>
        <p>The HydraScore analytics engine evaluates these factors to recommend optimal treatment combinations.</p>
      `
    },
    {
      title: "Treatment Technology Comparison",
      content: `
        <h3>Common Treatment Technologies</h3>
        <table border="1" cellpadding="5">
          <tr>
            <th>Technology</th>
            <th>Best For</th>
            <th>Limitations</th>
            <th>Relative Cost</th>
          </tr>
          <tr>
            <td>Reverse Osmosis</td>
            <td>Desalination, removal of dissolved solids</td>
            <td>High energy consumption, water waste</td>
            <td>High</td>
          </tr>
          <tr>
            <td>UV Disinfection</td>
            <td>Microbial inactivation</td>
            <td>No residual protection, requires clear water</td>
            <td>Medium</td>
          </tr>
          <tr>
            <td>Activated Carbon</td>
            <td>Organic compounds, chlorine, taste/odor</td>
            <td>Limited heavy metal removal</td>
            <td>Low-Medium</td>
          </tr>
          <tr>
            <td>Chlorination</td>
            <td>Disinfection, residual protection</td>
            <td>Disinfection byproducts, chemical handling</td>
            <td>Low</td>
          </tr>
          <tr>
            <td>Ozonation</td>
            <td>Strong disinfection, color/odor removal</td>
            <td>No residual, complex system</td>
            <td>High</td>
          </tr>
        </table>
      `
    },
    {
      title: "System Maintenance Requirements",
      content: `
        <h3>Maintenance Schedules for Treatment Systems</h3>
        <p>Regular maintenance is essential for optimal performance and longevity:</p>
        <ul>
          <li><strong>Daily</strong>: Visual inspection, monitoring of basic parameters</li>
          <li><strong>Weekly</strong>: Chemical checks, backwashing filters</li>
          <li><strong>Monthly</strong>: Deeper cleaning of components, calibration checks</li>
          <li><strong>Quarterly</strong>: Replacement of smaller consumables (filters, UV lamps)</li>
          <li><strong>Annually</strong>: Major inspection, replacement of larger components</li>
        </ul>
        <p>The AquaPure AI system can generate customized maintenance schedules based on your specific installation.</p>
      `
    }
  ];
  
  const aiFeaturesDocs = [
    {
      title: "Using the AI Chatbot Effectively",
      content: `
        <h3>Maximizing Value from the AI Assistant</h3>
        <p>The HydraLex AI Assistant is designed to provide expert-level water quality guidance. Here are tips for effective use:</p>
        <ul>
          <li>Ask specific questions about water quality parameters, treatment methods, or regulatory requirements</li>
          <li>Upload water test results for automated analysis and recommendations</li>
          <li>Use voice commands for hands-free operation during field work</li>
          <li>Explore the quick reference tools for instant access to common information</li>
          <li>Generate compliance reports by connecting lab results with regulatory frameworks</li>
        </ul>
        <p>The assistant continuously learns from interactions across the AquaPure network while maintaining strict data privacy.</p>
      `
    },
    {
      title: "Water Quality Prediction Models",
      content: `
        <h3>Understanding AI Predictions</h3>
        <p>The AquaPure AI employs several predictive models:</p>
        <ol>
          <li><strong>Time Series Analysis</strong>: Forecasts water quality trends based on historical data</li>
          <li><strong>Anomaly Detection</strong>: Identifies unusual patterns that may indicate contamination events</li>
          <li><strong>Root Cause Analysis</strong>: Traces contamination to likely sources by correlating multiple parameters</li>
          <li><strong>Treatment Efficacy Prediction</strong>: Estimates how effectively different treatment approaches will address specific issues</li>
        </ol>
        <p>All predictions include confidence scores and uncertainty measures to aid in decision-making.</p>
      `
    },
    {
      title: "AR Field Assessment Guide",
      content: `
        <h3>Augmented Reality Sampling Assistance</h3>
        <p>The AR Field Assessment tool provides real-time guidance for water sampling and testing:</p>
        <ul>
          <li>Visual overlay shows optimal sampling locations based on GPS and historical data</li>
          <li>Step-by-step sampling procedure guidance with visual cues</li>
          <li>Real-time colorimetric analysis using device camera</li>
          <li>Automatic documentation of sampling conditions (weather, time, location)</li>
          <li>Integration with lab results for field-to-lab correlation</li>
        </ul>
        <p>For best results, ensure adequate lighting and calibrate the AR system monthly using the provided calibration card.</p>
      `
    }
  ];
  
  const supportDocs = [
    {
      title: "Technical Support Contacts",
      content: `
        <h3>Getting Help When You Need It</h3>
        <p>Multiple support channels are available:</p>
        <ul>
          <li><strong>In-App AI Support</strong>: Available 24/7 through the AI Chatbot</li>
          <li><strong>Email Support</strong>: support@aquapure.ai for non-urgent inquiries (24-48 hour response)</li>
          <li><strong>Phone Support</strong>: +1-555-WATER-AI (Monday-Friday, 8am-8pm EST)</li>
          <li><strong>Emergency Hotline</strong>: +1-555-WATER-911 (24/7 for critical issues)</li>
        </ul>
        <p>For fastest resolution, please have your system ID, error messages, and recent water quality data available when contacting support.</p>
      `
    },
    {
      title: "Troubleshooting Common Issues",
      content: `
        <h3>Resolving Frequent Problems</h3>
        <p>Here are solutions to common issues:</p>
        <dl>
          <dt>Inaccurate Readings</dt>
          <dd>
            <ol>
              <li>Verify sensor calibration using standard solutions</li>
              <li>Check for air bubbles in sample chambers</li>
              <li>Ensure proper temperature compensation</li>
              <li>Clean optical surfaces with provided cleaning solution</li>
            </ol>
          </dd>
          
          <dt>Connection Issues</dt>
          <dd>
            <ol>
              <li>Verify internet connectivity</li>
              <li>Check that firewall allows required connections</li>
              <li>Restart the system router</li>
              <li>Ensure firmware is updated to latest version</li>
            </ol>
          </dd>
          
          <dt>Report Generation Errors</dt>
          <dd>
            <ol>
              <li>Verify all required data fields are complete</li>
              <li>Check for invalid characters in text fields</li>
              <li>Ensure PDF generation permissions are enabled</li>
              <li>Try clearing browser cache or using incognito mode</li>
            </ol>
          </dd>
        </dl>
      `
    },
    {
      title: "System Updates & Patches",
      content: `
        <h3>Keeping Your System Current</h3>
        <p>AquaPure AI regularly releases updates to improve functionality and security:</p>
        <ul>
          <li>Major updates are released quarterly with new features and significant improvements</li>
          <li>Minor updates and patches are released monthly for bug fixes and small enhancements</li>
          <li>Security patches are released as needed and should be applied immediately</li>
        </ul>
        <p>Update procedures:</p>
        <ol>
          <li>Back up all system data before updating</li>
          <li>Schedule updates during low-usage periods</li>
          <li>Follow the on-screen instructions during the update process</li>
          <li>Verify system functionality after updating</li>
        </ol>
        <p>Automatic updates can be enabled in System Settings for convenience.</p>
      `
    }
  ];
  
  const sections = [
    { id: "water-quality", name: "Water Quality Analysis", docs: waterQualityDocs },
    { id: "treatment", name: "Treatment Technologies", docs: treatmentDocs },
    { id: "ai-features", name: "AI Features & Tools", docs: aiFeaturesDocs },
    { id: "support", name: "Support & Troubleshooting", docs: supportDocs }
  ];
  
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
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/settings">
                    <SettingsIcon className="h-4 w-4 mr-1" />
                    Settings
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink className="flex items-center" href="/settings/help">
                  <Files className="h-4 w-4 mr-1" />
                  Help & Documentation
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 text-water-dark">
              Help & Documentation
            </h1>
            <p className="text-lg text-gray-600">
              Comprehensive guides, tutorials, and reference materials
            </p>
          </div>

          <div className="mb-6">
            <form onSubmit={handleSearch} className="flex w-full max-w-lg gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  type="search" 
                  placeholder="Search documentation..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </div>

          <Tabs defaultValue="browse">
            <TabsList className="mb-4">
              <TabsTrigger value="browse">Browse by Category</TabsTrigger>
              <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
              <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse" className="space-y-6">
              {sections.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle>{section.name}</CardTitle>
                    <CardDescription>
                      {section.id === "water-quality" && "Understanding water quality parameters and analysis methods"}
                      {section.id === "treatment" && "Learn about different water treatment technologies and their applications"}
                      {section.id === "ai-features" && "Guides for using AI-powered features of the platform"}
                      {section.id === "support" && "Get help with common issues and system troubleshooting"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {section.docs.map((doc, idx) => (
                        <AccordionItem key={idx} value={`item-${idx}`}>
                          <AccordionTrigger>{doc.title}</AccordionTrigger>
                          <AccordionContent>
                            <div dangerouslySetInnerHTML={{ __html: doc.content }} />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All {section.name} Documentation
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Quick answers to common questions about AquaPure AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq-1">
                      <AccordionTrigger>
                        How accurate are the water quality predictions?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          AquaPure AI's prediction models have been validated to achieve 94-97% accuracy when
                          compared to laboratory testing for most common parameters. The system explicitly 
                          reports confidence intervals with all predictions, and these should be considered
                          when making decisions. Factors that can affect accuracy include the quality and 
                          quantity of historical data available, sensor calibration, and unusual environmental
                          conditions.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="faq-2">
                      <AccordionTrigger>
                        Can I export data to external systems?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Yes, AquaPure AI supports multiple export formats including CSV, JSON, and XML.
                          Data can be exported manually from any dashboard or automated via the API. 
                          The system also has direct integration plugins for common LIMS (Laboratory
                          Information Management Systems), ERP systems, and regulatory reporting platforms.
                          For custom integrations, refer to the API documentation or contact technical support.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="faq-3">
                      <AccordionTrigger>
                        How often should I calibrate the sensors?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Calibration frequency depends on the sensor type and usage conditions:
                        </p>
                        <ul className="list-disc pl-6 mt-2">
                          <li>pH sensors: Biweekly for high-precision applications, monthly for general use</li>
                          <li>Conductivity sensors: Monthly calibration is typically sufficient</li>
                          <li>Turbidity sensors: Monthly, or after any high-turbidity event</li>
                          <li>Dissolved oxygen sensors: Weekly for critical applications, biweekly otherwise</li>
                          <li>Chemical-specific sensors: Follow manufacturer recommendations</li>
                        </ul>
                        <p className="mt-2">
                          The system will automatically remind you when calibration is due based on your
                          configuration and usage patterns.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="faq-4">
                      <AccordionTrigger>
                        Is my water quality data secure?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          AquaPure AI implements multiple layers of security:
                        </p>
                        <ul className="list-disc pl-6 mt-2">
                          <li>All data is encrypted in transit using TLS 1.3</li>
                          <li>Stored data is encrypted at rest using AES-256</li>
                          <li>Role-based access controls limit data visibility</li>
                          <li>Regular security audits and penetration testing</li>
                          <li>Compliance with GDPR, CCPA, and industry standards</li>
                        </ul>
                        <p className="mt-2">
                          For organizations with specific compliance requirements, we offer data residency
                          options and custom security configurations. Contact your account representative
                          for details.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="faq-5">
                      <AccordionTrigger>
                        Can I use the system offline?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Yes, AquaPure AI has offline capabilities:
                        </p>
                        <ul className="list-disc pl-6 mt-2">
                          <li>The field mobile app works in offline mode and syncs when connection is restored</li>
                          <li>On-premise deployments can operate independently of cloud services</li>
                          <li>Sensor systems continue to collect and store data during connectivity loss</li>
                        </ul>
                        <p className="mt-2">
                          However, advanced AI features like predictive analytics and cross-location
                          correlation require online connectivity to access the full AI model. The system
                          will automatically queue analysis requests and process them when connectivity
                          is restored.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Complete FAQ
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="videos">
              <Card>
                <CardHeader>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>
                    Step-by-step video guides for using AquaPure AI features
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Video cards would go here */}
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Getting Started with AquaPure AI</CardTitle>
                    </CardHeader>
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <Files className="h-8 w-8 text-gray-400" />
                    </div>
                    <CardFooter className="p-4">
                      <Button variant="outline" className="w-full text-sm">Watch (10:21)</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Using the Treatment Simulator</CardTitle>
                    </CardHeader>
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <Files className="h-8 w-8 text-gray-400" />
                    </div>
                    <CardFooter className="p-4">
                      <Button variant="outline" className="w-full text-sm">Watch (8:45)</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Water Quality Analysis</CardTitle>
                    </CardHeader>
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <Files className="h-8 w-8 text-gray-400" />
                    </div>
                    <CardFooter className="p-4">
                      <Button variant="outline" className="w-full text-sm">Watch (15:32)</Button>
                    </CardFooter>
                  </Card>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Video Tutorials
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      {isMobile && <Sidebar />}
    </div>
  );
};

export default HelpDocumentation;
