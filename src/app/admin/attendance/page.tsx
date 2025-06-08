
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Fingerprint, MapPin, UserCheck, ShieldAlert, MessageSquareWarning, CalendarDays, TrendingUp, FileText, Users, BarChart2, ListChecks, ChevronLeft, ChevronRight, Construction } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import { Calendar, type CalendarProps } from "@/components/ui/calendar"; // Ensure CalendarProps is imported if needed for type safety, though not directly used in this file's logic.
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";


export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date()); 
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePreviousYear = () => {
    setCurrentYear(prevYear => prevYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(prevYear => prevYear + 1);
  };

  // Create a date object for the first day of the currentYear for the calendar
  const startOfYear = new Date(currentYear, 0, 1);

  // This function is primarily to satisfy the onMonthChange prop if react-day-picker strictly requires it
  // when month prop is controlled. However, with disableNavigation=true, it might not be actively called by user.
  const handleMonthChangeForYearView = (month: Date) => {
    // If the year of the changed month is different, update currentYear
    // This ensures consistency if internal navigation was somehow triggered (though it's disabled)
    if (month.getFullYear() !== currentYear) {
      setCurrentYear(month.getFullYear());
    }
  };


  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
          <div className="mb-8">
            <Link href="/admin" legacyBehavior>
              <Button variant="outline" className="text-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Admin Dashboard
              </Button>
            </Link>
          </div>
           <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
              Employee Attendance & Monitoring
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
              Loading attendance system...
            </p>
          </div>
          <div className="flex justify-center items-center py-10">
            <Construction className="h-12 w-12 text-primary animate-spin" />
            <p className="ml-4 text-lg text-foreground/70">Loading interface...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-10"> {/* Reduced py for more space */}
        <div className="mb-6">
          <Link href="/admin" legacyBehavior>
            <Button variant="outline" className="text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin Dashboard
            </Button>
          </Link>
        </div>
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-headline text-primary mb-3">
            Employee Attendance & Monitoring
          </h1>
          <p className="text-md sm:text-lg text-foreground/80 max-w-3xl mx-auto">
            This section provides a comprehensive system for managing employee attendance, punctuality, and related performance metrics, monitored by the HR department.
          </p>
           <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md max-w-3xl mx-auto text-sm text-destructive text-left">
            <div className="flex items-start">
                <ShieldAlert className="inline-block h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                    <strong className="font-semibold">Security & Future Enhancements Note:</strong>
                    <p className="mt-1 text-xs">
                    Access to this module is intended for authorized HR personnel and management. Full implementation of role-based access control (RBAC), data integrations, and secure login systems is pending backend development. The features described below are planned.
                    </p>
                </div>
            </div>
          </div>
        </div>

        <Card className="max-w-full mx-auto shadow-md"> 
          <CardHeader className="items-center text-center pb-4">
            <CardTitle className="text-xl font-semibold text-accent">Employee Attendance Management System</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Track and manage employee attendance and related activities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 px-2 sm:px-6">
            
            <Card className="border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-primary flex items-center"><CalendarDays className="mr-2 h-5 w-5"/>Yearly Attendance Calendar & Data Integration</CardTitle>
                <CardDescription className="text-xs">View a full year of employee attendance. Data from various sources will be consolidated here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-card border rounded-lg shadow-sm">
                  <div className="flex justify-center items-center space-x-4 py-3 px-2 border-b">
                    <Button variant="outline" size="icon" onClick={handlePreviousYear} aria-label="Previous Year">
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <span className="text-lg font-semibold text-primary tabular-nums">{currentYear}</span>
                    <Button variant="outline" size="icon" onClick={handleNextYear} aria-label="Next Year">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    month={startOfYear}
                    onMonthChange={handleMonthChangeForYearView} // Handles potential internal changes
                    numberOfMonths={12}
                    disableNavigation // Using custom year navigation
                    className="w-full border-0 shadow-none p-1 sm:p-2" // Remove default border/shadow from Calendar itself, allow full width, small padding
                    classNames={{
                      months: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 p-1 justify-center",
                      month: "border rounded-lg p-2 sm:p-3 bg-background shadow-sm flex flex-col", // Each month is a card, flex col for better internal spacing
                      caption: "flex justify-center pt-1 relative items-center mb-2", // Default caption styling is fine
                      caption_label: "text-sm sm:text-base font-semibold text-center block w-full",
                      nav_button: "hidden", // Hide default nav buttons as disableNavigation is true
                      table: "w-full border-collapse mt-1", 
                      head_row: "flex justify-around mb-1",
                      head_cell: "text-muted-foreground rounded-md w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-normal text-[0.7rem] sm:text-xs text-center",
                      row: "flex w-full mt-0.5 justify-around",
                      cell: "h-7 w-7 sm:h-8 sm:w-8 text-center text-xs sm:text-sm p-0 relative flex items-center justify-center",
                      day: cn(
                        buttonVariants({ variant: "ghost" }),
                        "h-7 w-7 sm:h-8 sm:w-8 p-0 font-normal aria-selected:opacity-100 rounded-full" 
                      ),
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_today: "bg-accent text-accent-foreground",
                      day_outside: "day-outside text-muted-foreground opacity-30",
                    }}
                  />
                  {selectedDate && (
                    <p className="mt-3 text-sm text-center text-primary p-2 border-t">
                      Selected Date: {selectedDate.toLocaleDateString()}
                    </p>
                  )}
                  {!selectedDate && (
                     <p className="mt-3 text-sm text-center text-muted-foreground p-2 border-t">
                      Full year view for {currentYear}. Click a date to select.
                    </p>
                  )}
                </div>
                <p className="text-sm text-foreground/70 font-semibold pt-2">Planned Data Sources & Features:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
                    <li className="flex items-center"><Fingerprint className="h-4 w-4 mr-2 text-primary/80 flex-shrink-0" /> Biometric Systems Integration</li>
                    <li className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-primary/80 flex-shrink-0" /> GPS-based Attendance (for field staff)</li>
                    <li className="flex items-center"><Users className="h-4 w-4 mr-2 text-primary/80 flex-shrink-0" /> Manual Entry/Correction (by HR)</li>
                </ul>
                <Button variant="outline" size="sm" disabled className="mt-2">View Full Attendance Logs (Coming Soon)</Button>
              </CardContent>
            </Card>

            <Separator />

            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center"><TrendingUp className="mr-2 h-5 w-5"/>Performance & Punctuality Metrics</CardTitle>
                <CardDescription className="text-xs">Analyze punctuality and calculate performance scores based on attendance data.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg min-h-[100px] flex flex-col items-center justify-center text-center">
                        <BarChart2 className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium text-foreground/80">Punctuality Reports</p>
                        <p className="text-xs text-muted-foreground">(e.g., Late arrivals, Early departures) (Coming Soon)</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg min-h-[100px] flex flex-col items-center justify-center text-center">
                        <UserCheck className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium text-foreground/80">Performance Scores</p>
                        <p className="text-xs text-muted-foreground">(Based on attendance, customizable metrics) (Coming Soon)</p>
                    </div>
                 </div>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
                    <li>Payroll Reporting Data (for Accounts department)</li>
                    <li>Individual Employee Performance Dashboards</li>
                </ul>
                <Button variant="outline" size="sm" disabled className="mt-2">Generate Performance Report (Coming Soon)</Button>
              </CardContent>
            </Card>

            <Separator />

            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center"><MessageSquareWarning className="mr-2 h-5 w-5"/>Employee Complaint & Issue Logging</CardTitle>
                <CardDescription className="text-xs">Track and manage employee-related complaints or issues reported to HR.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 bg-muted/30 rounded-lg min-h-[100px] flex flex-col items-center justify-center text-center">
                    <ListChecks className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium text-foreground/80">Complaint Log & Tracking System</p>
                    <p className="text-xs text-muted-foreground">(Status, resolution, history) (Coming Soon)</p>
                </div>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
                    <li>Secure submission of complaints</li>
                    <li>Assignment to HR personnel</li>
                    <li>Audit trail for complaint handling</li>
                </ul>
                <Button variant="outline" size="sm" disabled className="mt-2">View Complaint Dashboard (Coming Soon)</Button>
              </CardContent>
            </Card>
            
            <p className="text-sm text-center text-muted-foreground mt-8">
              Full backend integration, API connections, and interactive features are planned.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
