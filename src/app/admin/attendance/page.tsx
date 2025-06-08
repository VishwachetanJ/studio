
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Fingerprint, MapPin, UserCheck, ShieldAlert, MessageSquareWarning, CalendarDays, TrendingUp, FileText, Users, BarChart2, ListChecks, Construction } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const VIEW_MODES = [
  { value: "year", label: "Entire Year View" },
  { value: "month", label: "Single Month View" },
];

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 10; i <= currentYear + 5; i++) {
    years.push(i);
  }
  return years;
};

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined); 
  const [displayYear, setDisplayYear] = useState<number>(new Date().getFullYear());
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(new Date().getMonth());
  const [viewMode, setViewMode] = useState<'month' | 'year'>('year');
  const [isMounted, setIsMounted] = useState(false);
  const yearOptions = useMemo(() => generateYearOptions(), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const holidays = useMemo(() => {
    return [
      new Date(displayYear, 0, 1),  // New Year's Day
      new Date(displayYear, 0, 26), // Republic Day (India)
      new Date(displayYear, 7, 15), // Independence Day (India)
      new Date(displayYear, 9, 2),  // Gandhi Jayanti (India)
      new Date(displayYear, 11, 25),// Christmas
    ];
  }, [displayYear]);

  const holidayMatcher = (date: Date) => {
      return holidays.some(holidayDate => 
          date.getFullYear() === holidayDate.getFullYear() &&
          date.getMonth() === holidayDate.getMonth() &&
          date.getDate() === holidayDate.getDate()
      );
  };

  const holidayStyle = { color: 'hsl(0, 84.2%, 60.2%)', fontWeight: 'bold' };

  const handleYearChange = (value: string) => {
    setDisplayYear(parseInt(value, 10));
  };

  const handleMonthChange = (value: string) => {
    setSelectedMonthIndex(parseInt(value, 10));
  };

  const handleViewModeChange = (value: 'month' | 'year') => {
    setViewMode(value);
  };

  const initialCalendarMonth = useMemo(() => {
    if (viewMode === 'year') {
      return new Date(displayYear, 0, 1); // January of the display year
    }
    return new Date(displayYear, selectedMonthIndex, 1); // Selected month of the display year
  }, [viewMode, displayYear, selectedMonthIndex]);

  const numberOfMonthsToDisplay = viewMode === 'year' ? 12 : 1;

  const calendarGridClassNames = {
    // Container for all 12 month blocks
    months: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-center", // Increased gap
    // Individual month block
    month: "border rounded-lg p-3 sm:p-4 bg-background shadow-md flex flex-col min-h-0", // Increased padding, added shadow-md for better separation
    // Month name above days
    caption: "flex justify-center pt-1 relative items-center mb-2.5", 
    caption_label: "text-sm sm:text-base font-semibold text-center block w-full",
    nav_button: "hidden", // Custom navigation handles this
    // Table containing days
    table: "w-full border-collapse mt-2", 
    // Row for day names (S M T W T F S)
    head_row: "flex justify-around mb-1.5", 
    head_cell: "text-muted-foreground rounded-md w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-normal text-[0.7rem] sm:text-xs text-center", // Day name cells
    // Week row
    row: "flex w-full mt-1 justify-around", 
    // Day number cell container
    cell: "h-7 w-7 sm:h-8 sm:h-8 text-center text-xs sm:text-sm p-0 relative flex items-center justify-center", 
    // Clickable day element
    day: cn(
      buttonVariants({ variant: "ghost" }),
      "h-7 w-7 sm:h-8 sm:h-8 p-0 font-normal aria-selected:opacity-100 rounded-full"
    ),
    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
    day_today: "bg-accent text-accent-foreground",
    day_outside: "day-outside text-muted-foreground opacity-20", // Made outside days much fainter
  };

  const calendarSingleMonthClassNames = {
    month: "space-y-4", 
    caption: "flex justify-center pt-1 relative items-center",
    caption_label: "text-sm font-medium", 
    nav_button: "hidden", 
    day: cn(
      buttonVariants({ variant: "ghost" }),
      "h-9 w-9 p-0 font-normal aria-selected:opacity-100" 
    ),
    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
    day_today: "bg-accent text-accent-foreground",
    day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:opacity-100", 
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
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-10">
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
              Track and manage employee attendance and related activities. Holiday markings are illustrative.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 px-2 sm:px-6">
            
            <Card className="border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-primary flex items-center"><CalendarDays className="mr-2 h-5 w-5"/>Attendance Calendar & Data Integration</CardTitle>
                <CardDescription className="text-xs">View employee attendance. Data from various sources will be consolidated here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-card border rounded-lg shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-center items-center flex-wrap gap-2 sm:gap-4 py-3 px-2 border-b">
                    <Select value={viewMode} onValueChange={handleViewModeChange}>
                      <SelectTrigger className="w-full sm:w-auto sm:min-w-[160px]">
                        <SelectValue placeholder="Select view" />
                      </SelectTrigger>
                      <SelectContent>
                        {VIEW_MODES.map((mode) => (
                          <SelectItem key={mode.value} value={mode.value}>
                            {mode.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={displayYear.toString()} onValueChange={handleYearChange}>
                      <SelectTrigger className="w-full sm:w-[120px]">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedMonthIndex.toString()} onValueChange={handleMonthChange}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {MONTH_NAMES.map((month, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                   <p className="text-xs text-center text-muted-foreground pt-2">
                      {viewMode === 'year' 
                        ? `Calendar displays Jan-Dec of ${displayYear}. Month focus: ${MONTH_NAMES[selectedMonthIndex]}.`
                        : `Displaying: ${MONTH_NAMES[selectedMonthIndex]} ${displayYear}.`
                      }
                    </p>
                  <Calendar
                    key={`${viewMode}-${displayYear}-${selectedMonthIndex}`}
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    month={initialCalendarMonth} 
                    numberOfMonths={numberOfMonthsToDisplay}
                    disableNavigation 
                    className={cn(
                        "w-full border-0 shadow-none",
                        viewMode === 'month' ? "max-w-md mx-auto p-1 sm:p-2" : "p-2" 
                    )}
                    classNames={viewMode === 'year' ? calendarGridClassNames : calendarSingleMonthClassNames}
                    modifiers={{ holiday: holidayMatcher }}
                    modifiersStyles={{ holiday: holidayStyle }}
                  />
                  {selectedDate && (
                    <p className="mt-3 text-sm text-center text-primary p-2 border-t">
                      Selected Date: {selectedDate.toLocaleDateString()}
                    </p>
                  )}
                  {!selectedDate && (
                     <p className="mt-3 text-sm text-center text-muted-foreground p-2 border-t">
                      {viewMode === 'year' 
                        ? `Full year view for ${displayYear}. Click a date to select. Month focus: ${MONTH_NAMES[selectedMonthIndex]}.`
                        : `Month view for ${MONTH_NAMES[selectedMonthIndex]} ${displayYear}. Click a date to select.`
                      }
                    </p>
                  )}
                   <p className="text-xs text-center text-muted-foreground pt-1 italic">
                      Note: Holiday markings (in red) are illustrative and based on sample data.
                    </p>
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

    