
"use client";

import React, { useState, useEffect } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';


interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  timestamp: number;
}

export default function FieldAttendancePage() {
  const [currentPosition, setCurrentPosition] = useState<GeolocationPosition | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("Click the button to record your attendance.");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRecordAttendance = () => {
    if (!navigator.geolocation) {
      setStatusMessage("Geolocation is not supported by your browser.");
      toast({ title: "Error", description: "Geolocation not supported.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    setStatusMessage("Fetching your location...");
    setCurrentPosition(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition(position);
        setStatusMessage(`Location captured at ${new Date(position.timestamp).toLocaleTimeString()}`);
        setIsProcessing(false);
        // Simulate sending data to backend
        console.log("Attendance Data:", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
          employeeId: "EMP_FIELD_001", // Placeholder Employee ID
        });
        toast({
          title: "Attendance Recorded (Demo)",
          description: `Lat: ${position.coords.latitude.toFixed(5)}, Lng: ${position.coords.longitude.toFixed(5)}`,
          action: <CheckCircle className="text-green-500" />,
        });
      },
      (error) => {
        let errorMessage = "Could not retrieve location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied. Please enable it in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred while fetching location.";
            break;
        }
        setStatusMessage(errorMessage);
        setIsProcessing(false);
        toast({ title: "Location Error", description: errorMessage, variant: "destructive" });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };
  
  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 sm:py-16 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="mt-4 text-lg">Loading Attendance Module...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
         <div className="mb-8">
          <Link href="/" legacyBehavior>
            <Button variant="outline" className="text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <div className="text-center mb-12">
          <MapPin className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Field Staff Attendance
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Record your attendance using your current GPS location. Please ensure location services are enabled.
          </p>
        </div>

        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Record Your Location</CardTitle>
            <CardDescription>{statusMessage}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={handleRecordAttendance} 
              disabled={isProcessing}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              size="lg"
            >
              {isProcessing ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <MapPin className="mr-2 h-5 w-5" />
              )}
              {isProcessing ? "Processing..." : "Record My Attendance"}
            </Button>

            {currentPosition && (
              <div className="p-4 border rounded-md bg-muted/50 text-sm">
                <p><strong>Latitude:</strong> {currentPosition.coords.latitude.toFixed(6)}</p>
                <p><strong>Longitude:</strong> {currentPosition.coords.longitude.toFixed(6)}</p>
                <p><strong>Accuracy:</strong> {currentPosition.coords.accuracy.toFixed(2)} meters</p>
                <p><strong>Timestamp:</strong> {new Date(currentPosition.timestamp).toLocaleString()}</p>
              </div>
            )}

            <div className="h-48 bg-gray-200 rounded-md flex items-center justify-center text-center text-muted-foreground p-4">
              <p>Map will be displayed here.
              <br />
              <span className="text-xs">(Requires Google Maps API Key & Integration)</span>
              </p>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-300 rounded-md text-xs text-blue-700">
                <div className="flex items-start">
                    <AlertTriangle className="inline-block h-4 w-4 mr-2 text-blue-500 flex-shrink-0 mt-px" />
                    <div>
                        <strong className="font-semibold">Privacy Note:</strong> Your location data is captured only when you click the button and is used solely for attendance purposes. By clicking, you consent to sharing your location.
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
        
        <p className="text-xs text-center text-muted-foreground mt-8">
            This is a demonstration of GPS attendance. Backend integration for data storage and full map display are pending.
        </p>

      </main>
      <Footer />
    </div>
  );
}

