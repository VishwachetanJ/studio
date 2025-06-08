
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Fingerprint, MapPin, UserCheck, ShieldAlert, MessageSquareWarning, CalendarDays, TrendingUp, FileText, Users, BarChart2, ListChecks, ChevronLeft, ChevronRight, Construction } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
  const [isMounted, setIsMounted] = useState(false);
  const yearOptions = useMemo(() => generateYearOptions(), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const holidays = useMemo(() => {
    // Sample fixed holidays (month is 0-indexed)
    // In a real app, this would come from an API or a more sophisticated holiday calculation library
    return [
      new Date(displayYear, 0, 1),  // New Year's Day
      new Date(displayYear, 0, 26), // Republic Day (India)
      new Date(displayYear, 7, 15), // Independence Day (India)
      new Date(displayYear, 9, 2),  // Gandhi Jayanti (India)
      new Date(displayYear, 11, 25),// Christmas
      // Add more sample holidays as needed
    ];
  }, [displayYear]);

  const holidayMatcher = (date: Date) => {
      return holidays.some(holidayDate => 
          date.getFullYear() === holidayDate.getFullYear() &&
          date.getMonth() === holidayDate.getMonth() &&
          date.getDate() === holidayDate.getDate()
      );
  };

  // Define HSL color for destructive (red) directly for modifiersStyles
  // Note: CSS variables like hsl(var(--destructive)) won't work directly in JS for react-day-picker's style prop.
  // We need to use a fixed HSL value or a hex/rgb value. Let's use a standard red.
  // The theme's destructive color is 0 84.2% 60.2%
  const holidayStyle = { color: 'hsl(0, 84.2%, 60.2%)', fontWeight: 'bold' };

  const handleYearChange = (value: string) => {
    setDisplayYear(parseInt(value, 10));
  };

  const handleMonthChange = (value: string) => {
    setSelectedMonthIndex(parseInt(value, 10));
  };

  const startOfYearForCalendar = new Date(displayYear, 0, 1);

  // This handler might not be strictly necessary if internal calendar navigation is fully disabled
  // and year changes are only through our custom buttons.
  const handleCalendarMonthChangeForYearView = (month: Date) => {
    // This callback receives the first displayed month when internal navigation changes it.
    // Since we show 12 months and disable navigation, this might only be relevant
    // if we re-enable some form of internal navigation or initial mount.
    // For now, our primary year control is through the displayYear state.
    if (month.getFullYear() !== displayYear) {
      // setDisplayYear(month.getFullYear()); // This could cause a loop if not handled carefully with disabledNavigation
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
                <CardTitle className="text-lg text-primary flex items-center"><CalendarDays className="mr-2 h-5 w-5"/>Yearly Attendance Calendar & Data Integration</CardTitle>
                <CardDescription className="text-xs">View a full year of employee attendance. Data from various sources will be consolidated here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-card border rounded-lg shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 py-3 px-2 border-b">
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
                      Calendar displays Jan-Dec of {displayYear}. Selected month focus: {MONTH_NAMES[selectedMonthIndex]}.
                    </p>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    month={startOfYearForCalendar} 
                    onMonthChange={handleCalendarMonthChangeForYearView} // Handles internal navigation if re-enabled
                    numberOfMonths={12}
                    disableNavigation // Disables built-in month/year navigation arrows
                    className="w-full border-0 shadow-none p-1 sm:p-2" 
                    classNames={{
                      months: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 p-1 justify-center",
                      month: "border rounded-lg p-2 sm:p-3 bg-background shadow-sm flex flex-col", 
                      caption: "flex justify-center pt-1 relative items-center mb-2", 
                      caption_label: "text-sm sm:text-base font-semibold text-center block w-full", // Month name style
                      nav_button: "hidden", // Hide default nav buttons as we have custom year nav
                      table: "w-full border-collapse mt-1", 
                      head_row: "flex justify-around mb-1",
                      head_cell: "text-muted-foreground rounded-md w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-normal text-[0.7rem] sm:text-xs text-center", // Day names (S, M, T..)
                      row: "flex w-full mt-0.5 justify-around",
                      cell: "h-7 w-7 sm:h-8 sm:w-8 text-center text-xs sm:text-sm p-0 relative flex items-center justify-center", // Cell container for each day
                      day: cn(
                        buttonVariants({ variant: "ghost" }),
                        "h-7 w-7 sm:h-8 sm:w-8 p-0 font-normal aria-selected:opacity-100 rounded-full" // Individual day button
                      ),
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_today: "bg-accent text-accent-foreground",
                      day_outside: "day-outside text-muted-foreground opacity-30", // Days not in the current month (less relevant for 12 month view)
                      // No specific class for holiday text color, will use modifiersStyles
                    }}
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
                      Full year view for {displayYear}. Click a date to select. Month focus: {MONTH_NAMES[selectedMonthIndex]}.
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

