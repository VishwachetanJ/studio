
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ScanSearch, UploadCloud, Edit3, FlaskConical } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect } from "react"; // Added useEffect and useState

export default function SoilAnalysisPage() {
  const { toast } = useToast();
  const [soilReportFile, setSoilReportFile] = useState<File | null>(null);
  const [manualData, setManualData] = useState<Record<string, string>>({});
  const [soilTexture, setSoilTexture] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isMounted, setIsMounted] = useState(false); // Added isMounted state

  useEffect(() => { // Added useEffect to set isMounted
    setIsMounted(true);
  }, []);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSoilReportFile(event.target.files[0]);
      // TODO: Add file validation (type, size)
    }
  };

  const handleManualDataChange = (propertyId: string, value: string) => {
    setManualData(prev => ({ ...prev, [propertyId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement backend API call for data submission and analysis
    console.log("Soil Data Submitted:", { soilReportFile, manualData, soilTexture, additionalNotes });
    toast({
      title: "Soil Data Submitted (Demo)",
      description: "Your soil information has been logged. Analysis features are under development.",
    });
  };

  if (!isMounted) { // Added check for isMounted
    return null; // Or a loading spinner
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="mb-8">
          <Link href="/farmers-welfare/smart-crop-selection" legacyBehavior>
            <Button variant="outline" className="text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Smart Crop Selection
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <ScanSearch className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Soil Type & Health Analysis
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Understand your soil's characteristics to select suitable crops, optimize fertilizer use, and improve overall farm productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center"><UploadCloud className="mr-2 h-6 w-6"/> Upload Soil Test Report</CardTitle>
              <CardDescription>If you have a recent soil test report, please upload it here (PDF, JPG, PNG).</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="soilReport">Soil Test Report File</Label>
                  <Input id="soilReport" type="file" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png"/>
                  {soilReportFile && <p className="text-sm text-muted-foreground mt-2">Selected: {soilReportFile.name}</p>}
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-accent mb-3 flex items-center"><Edit3 className="mr-2 h-5 w-5"/> Or Enter Data Manually</h3>
                  <div>
                    <Label htmlFor="soilTexture">Predominant Soil Texture</Label>
                    <Input id="soilTexture" value={soilTexture} onChange={(e) => setSoilTexture(e.target.value)} placeholder="e.g., Loamy, Clayey, Sandy, Black Cotton Soil" />
                  </div>
                  {[
                    { id: "ph", label: "pH Level", placeholder: "e.g., 6.5 - 7.5" },
                    { id: "organic_carbon", label: "Organic Carbon (%)", placeholder: "e.g., 0.5 - 0.75%" },
                    { id: "nitrogen", label: "Nitrogen (N) (kg/ha)", placeholder: "e.g., 280-560 kg/ha" },
                    { id: "phosphorus", label: "Phosphorus (P) (kg/ha)", placeholder: "e.g., 10-25 kg/ha" },
                    { id: "potassium", label: "Potassium (K) (kg/ha)", placeholder: "e.g., 120-280 kg/ha" },
                  ].map(prop => (
                    <div key={prop.id} className="mt-3">
                      <Label htmlFor={prop.id}>{prop.label}</Label>
                      <Input 
                        id={prop.id} 
                        value={manualData[prop.id] || ""} 
                        onChange={(e) => handleManualDataChange(prop.id, e.target.value)} 
                        placeholder={prop.placeholder} 
                      />
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Label htmlFor="additionalNotes">Additional Observations/Notes</Label>
                  <Textarea id="additionalNotes" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} placeholder="e.g., Waterlogging issues, Previous crop history, Specific concerns..." rows={3}/>
                </div>

                <Button type="submit" className="w-full bg-accent hover:bg-accent/90">Submit Soil Data</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-accent/30">
            <CardHeader>
              <CardTitle className="text-2xl text-accent flex items-center"><FlaskConical className="mr-2 h-6 w-6"/> Soil Analysis Results (Placeholder)</CardTitle>
              <CardDescription>Based on your input, key insights and recommendations will be displayed here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-primary mb-1">Key Soil Characteristics:</h4>
                <p className="text-sm text-foreground/70">Summary of pH, N, P, K levels, organic matter, etc.</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-primary mb-1">Nutrient Management Plan:</h4>
                <p className="text-sm text-foreground/70">Recommendations for fertilizer types and quantities.</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-primary mb-1">Crop Suitability:</h4>
                <p className="text-sm text-foreground/70">List of crops suitable for your soil conditions.</p>
              </div>
              <p className="text-sm text-center mt-6 text-primary font-semibold">
                Automated analysis, detailed reports, and crop matching algorithms are under development.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
