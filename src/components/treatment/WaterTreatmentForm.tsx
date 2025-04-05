
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Building, 
  Upload, 
  Calculator, 
  Clock, 
  Droplet, 
  MapPin, 
  DollarSign,
  FileText,
  Factory,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileUploader } from "../reports/FileUploader";
import { useToast } from "@/components/ui/use-toast";

// Define the form schema with Zod
const formSchema = z.object({
  clientName: z.string().min(2, { message: "Client name is required" }),
  contactInfo: z.string().min(5, { message: "Contact information is required" }),
  waterSource: z.string().min(1, { message: "Please select a water source" }),
  waterSourceOther: z.string().optional(),
  dailyRequirement: z.string().min(1, { message: "Daily water requirement is required" }),
  estimatedFlow: z.string().min(1, { message: "Estimated water flow is required" }),
  hoursOfOperation: z.string().min(1, { message: "Please select hours of operation" }),
  intendedUse: z.string().min(1, { message: "Please select intended use" }),
  intendedUseOther: z.string().optional(),
  ph: z.string().optional(),
  tds: z.string().optional(),
  conductivity: z.string().optional(),
  hardness: z.string().optional(),
  iron: z.string().optional(),
  location: z.string().min(3, { message: "Location is required" }),
  region: z.string().min(1, { message: "Please select a region" }),
  budget: z.number().min(0, { message: "Budget must be greater than or equal to 0" }),
  urgency: z.string().min(1, { message: "Please select urgency level" }),
  industryType: z.string().min(1, { message: "Please select industry type" }),
});

type FormValues = z.infer<typeof formSchema>;

export function WaterTreatmentForm() {
  const { toast } = useToast();
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [provisionalQuote, setProvisionalQuote] = useState<null | { 
    components: Array<{name: string, price: number}>,
    total: number,
    deliveryTimeEstimate: string 
  }>(null);
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      contactInfo: "",
      waterSource: "",
      waterSourceOther: "",
      dailyRequirement: "",
      estimatedFlow: "",
      hoursOfOperation: "",
      intendedUse: "",
      intendedUseOther: "",
      ph: "",
      tds: "",
      conductivity: "",
      hardness: "",
      iron: "",
      location: "",
      region: "",
      budget: 5000,
      urgency: "",
      industryType: "",
    }
  });
  
  // Watch the values for dynamic form behavior
  const waterSource = form.watch("waterSource");
  const intendedUse = form.watch("intendedUse");
  
  const handleFilesUploaded = (files: File[]) => {
    toast({
      title: "Lab results uploaded",
      description: `${files.length} file(s) have been processed successfully.`,
    });
    
    // Simulate extracting data from files
    form.setValue("ph", "7.2");
    form.setValue("tds", "450");
    form.setValue("conductivity", "750");
    form.setValue("hardness", "180");
    form.setValue("iron", "0.3");
  };
  
  const generateRecommendations = (data: FormValues) => {
    // Simulate AI-based recommendation logic
    const recommendations: string[] = [];
    
    // pH-based recommendations
    const ph = parseFloat(data.ph || "7.0");
    if (ph < 6.5) {
      recommendations.push("pH Correction System (Alkaline)");
    } else if (ph > 8.5) {
      recommendations.push("pH Correction System (Acidic)");
    }
    
    // TDS-based recommendations
    const tds = parseFloat(data.tds || "0");
    if (tds > 500) {
      recommendations.push("Reverse Osmosis System");
    } else if (tds > 200) {
      recommendations.push("Nanofiltration System");
    }
    
    // Water source recommendations
    if (data.waterSource === "river" || data.waterSource === "well") {
      recommendations.push("Sediment Filtration");
      recommendations.push("UV Sterilization");
    }
    
    // Industry-specific recommendations
    if (data.industryType === "pharmaceuticals") {
      recommendations.push("Deionization System");
      recommendations.push("Ozone Treatment");
    } else if (data.industryType === "beverages") {
      recommendations.push("Carbon Filtration");
      recommendations.push("Chlorine Removal System");
    }
    
    // Always recommend based on iron content
    const iron = parseFloat(data.iron || "0");
    if (iron > 0.2) {
      recommendations.push("Iron Removal System");
    }
    
    // Add general recommendations if none were added
    if (recommendations.length === 0) {
      recommendations.push("Basic Filtration System");
      recommendations.push("Water Softener");
    }
    
    return recommendations;
  };
  
  const generateProvisionalQuote = (recommendations: string[]) => {
    // Simulate fetching component pricing from ERP system
    const componentPricing: Record<string, number> = {
      "pH Correction System (Alkaline)": 1200,
      "pH Correction System (Acidic)": 1300,
      "Reverse Osmosis System": 3500,
      "Nanofiltration System": 2800,
      "Sediment Filtration": 800,
      "UV Sterilization": 1200,
      "Deionization System": 2500,
      "Ozone Treatment": 1800,
      "Carbon Filtration": 1100,
      "Chlorine Removal System": 900,
      "Iron Removal System": 1600,
      "Basic Filtration System": 1000,
      "Water Softener": 1400,
    };
    
    const components = recommendations.map(item => ({
      name: item,
      price: componentPricing[item] || 1000 // Default price if not found
    }));
    
    const total = components.reduce((sum, item) => sum + item.price, 0);
    
    // Add installation and service estimate (30% of components)
    const installationCost = total * 0.3;
    components.push({
      name: "Installation & Service",
      price: installationCost
    });
    
    const grandTotal = total + installationCost;
    
    // Determine delivery time based on urgency
    let deliveryTimeEstimate = "3-4 weeks";
    const urgency = form.getValues("urgency");
    if (urgency === "immediate") {
      deliveryTimeEstimate = "1-3 days (express fee applied)";
    } else if (urgency === "short") {
      deliveryTimeEstimate = "1-2 weeks";
    }
    
    return {
      components,
      total: grandTotal,
      deliveryTimeEstimate
    };
  };
  
  const onSubmit = (data: FormValues) => {
    const generatedRecommendations = generateRecommendations(data);
    setRecommendations(generatedRecommendations);
    setProvisionalQuote(generateProvisionalQuote(generatedRecommendations));
    setShowRecommendations(true);
    
    toast({
      title: "Form submitted successfully",
      description: "Your treatment recommendations are ready",
    });
    
    // Scroll to recommendations
    setTimeout(() => {
      document.getElementById("recommendations")?.scrollIntoView({
        behavior: "smooth"
      });
    }, 100);
  };
  
  const generateFinalQuote = () => {
    toast({
      title: "Final quote generated",
      description: "A detailed quote has been sent to your email.",
    });
  };
  
  return (
    <div className="w-full space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Client Information Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-500" />
                Client Information
              </CardTitle>
              <CardDescription>Enter the client details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter client name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Information</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone, email, or other contact details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          {/* Water Source Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-blue-500" />
                Water Source Details
              </CardTitle>
              <CardDescription>Provide details about the water source</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="waterSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Water Source</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select water source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="borehole">Borehole</SelectItem>
                        <SelectItem value="river">River</SelectItem>
                        <SelectItem value="tap">Tap</SelectItem>
                        <SelectItem value="well">Well</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {waterSource === "other" && (
                <FormField
                  control={form.control}
                  name="waterSourceOther"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specify Other Water Source</FormLabel>
                      <FormControl>
                        <Input placeholder="Specify water source" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dailyRequirement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Water Requirement (Liters)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="estimatedFlow"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Water Flow (Liters per hour)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="hoursOfOperation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours of Operation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select hours of operation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-4">1-4 hours</SelectItem>
                        <SelectItem value="5-8">5-8 hours</SelectItem>
                        <SelectItem value="9-12">9-12 hours</SelectItem>
                        <SelectItem value="24">Full day (24 hours)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="intendedUse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intended Use of Water</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select intended use" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="domestic">Domestic</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="agricultural">Agricultural</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {intendedUse === "other" && (
                <FormField
                  control={form.control}
                  name="intendedUseOther"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specify Other Intended Use</FormLabel>
                      <FormControl>
                        <Input placeholder="Specify intended use" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>
          
          {/* Lab Results Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Lab Results
              </CardTitle>
              <CardDescription>Upload lab report or manually enter water quality parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileUploader onFilesUploaded={handleFilesUploaded} />
              
              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-medium mb-3">Manual Entry</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="ph"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>pH</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 7.0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TDS (mg/L)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="conductivity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conductivity (μS/cm)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 700" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="hardness"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hardness (mg/L CaCO3)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 150" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="iron"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Iron (mg/L)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 0.3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Location & Installation Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                Location & Installation Details
              </CardTitle>
              <CardDescription>Provide information about the installation location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address/Location</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter the complete address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region/Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="north">North Region</SelectItem>
                        <SelectItem value="south">South Region</SelectItem>
                        <SelectItem value="east">East Region</SelectItem>
                        <SelectItem value="west">West Region</SelectItem>
                        <SelectItem value="central">Central Region</SelectItem>
                        <SelectItem value="remote">Remote/Hard to Access</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          {/* Budget & Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-500" />
                Budget & Timeline
              </CardTitle>
              <CardDescription>Provide budget constraints and timeline requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Budget (Local Currency)</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Slider
                          min={1000}
                          max={50000}
                          step={1000}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground">Budget: {field.value}</p>
                          <Input
                            type="number"
                            className="w-24"
                            value={field.value}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Urgency</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="immediate" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Immediate (1-3 days)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="short" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Short term (1-2 weeks)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="long" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Long term (3+ weeks)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          {/* Industry Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="h-5 w-5 text-blue-500" />
                Industry Type
              </CardTitle>
              <CardDescription>Specify the industry for which the water treatment is needed</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="industryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beverages">Beverages</SelectItem>
                        <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                        <SelectItem value="bottling">Bottling Water</SelectItem>
                        <SelectItem value="agriculture">Agriculture</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Generate Recommendations</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      
      {/* Recommendations and Quote Section */}
      {showRecommendations && (
        <div id="recommendations" className="space-y-8 pt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Treatment Recommendations
              </CardTitle>
              <CardDescription>AI-generated recommendations based on your requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recommendations.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {provisionalQuote && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-500" />
                  Provisional Quote
                </CardTitle>
                <CardDescription>Estimated costs based on recommended solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">Component</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Price</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {provisionalQuote.components.map((item, index) => (
                          <tr 
                            key={index} 
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">{item.name}</td>
                            <td className="p-4 align-middle text-right">${item.price.toLocaleString()}</td>
                          </tr>
                        ))}
                        <tr className="bg-muted/50 font-medium">
                          <td className="p-4 align-middle">Total</td>
                          <td className="p-4 align-middle text-right">${provisionalQuote.total.toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex flex-row items-start space-x-2">
                      <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">Estimated Delivery Time</p>
                        <p className="text-blue-700">{provisionalQuote.deliveryTimeEstimate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save Quote</Button>
                <Button onClick={generateFinalQuote}>Generate Final Quote</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
