
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Fingerprint, MapPin, UserCheck, ShieldAlert, MessageSquareWarning, CalendarDays, TrendingUp, FileText, Users, BarChart2, ListChecks, Construction, AlertTriangle, Edit, UserCog } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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

interface SampleLeave {
  date: Date;
  type: 'planned' | 'unplanned';
  description: string;
}

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [hrSelectedDate, setHrSelectedDate] = useState<Date | undefined>(new Date());
  const [displayYear, setDisplayYear] = useState<number>(new Date().getFullYear());
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(new Date().getMonth());
  const [viewMode, setViewMode] = useState<'month' | 'year'>('year');
  const [isMounted, setIsMounted] = useState(false);
  const yearOptions = useMemo(() => generateYearOptions(), []);
  const { toast } = useToast();

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

  const sampleLeaves = useMemo((): SampleLeave[] => {
    return [
      { date: new Date(displayYear, 0, 10), type: 'planned', description: 'Annual Leave' }, 
      { date: new Date(displayYear, 1, 5), type: 'unplanned', description: 'Sick Leave' },  
      { date: new Date(displayYear, 1, 6), type: 'unplanned', description: 'Sick Leave' },  
      { date: new Date(displayYear, 4, 20), type: 'planned', description: 'Conference' }, 
      { date: new Date(displayYear, 6, 1), type: 'unplanned', description: 'Urgent Personal' }, 
      { date: new Date(displayYear, 8, 15), type: 'planned', description: 'Vacation' }, 
      { date: new Date(displayYear, 10, 10), type: 'planned', description: 'Vacation' }, 
      { date: new Date(displayYear, 0, 7), type: 'planned', description: 'Sunday Leave' }, // Example for style precedence
    ];
  }, [displayYear]);

  const holidayMatcher = (date: Date) => {
    return holidays.some(holidayDate =>
      date.getFullYear() === holidayDate.getFullYear() &&
      date.getMonth() === holidayDate.getMonth() &&
      date.getDate() === holidayDate.getDate()
    );
  };

  const sundayMatcher = (date: Date) => {
    return date.getDay() === 0; // 0 is Sunday
  };

  const plannedLeaveMatcher = (date: Date) => {
    return sampleLeaves.some(leave =>
      leave.type === 'planned' &&
      date.getFullYear() === leave.date.getFullYear() &&
      date.getMonth() === leave.date.getMonth() &&
      date.getDate() === leave.date.getDate()
    );
  };

  const unplannedLeaveMatcher = (date: Date) => {
    return sampleLeaves.some(leave =>
      leave.type === 'unplanned' &&
      date.getFullYear() === leave.date.getFullYear() &&
      date.getMonth() === leave.date.getMonth() &&
      date.getDate() === leave.date.getDate()
    );
  };
  
  const holidayStyle = { color: 'hsl(0, 84.2%, 60.2%)', fontWeight: 'bold' }; 
  const plannedLeaveStyle = { color: 'hsl(120, 60%, 35%)', fontWeight: 'bold' }; 
  const unplannedLeaveStyle = { color: 'hsl(270, 60%, 55%)', fontWeight: 'bold' };


  const handleYearChange = (value: string) => {
    setDisplayYear(parseInt(value, 10));
  };

  const handleMonthChange = (value: string) => {
    setSelectedMonthIndex(parseInt(value, 10));
  };

  const handleViewModeChange = (value: 'month' | 'year') => {
    setViewMode(value);
  };
  
  const handleManualUpdate = () => {
    if (!hrSelectedDate) {
      toast({
        title: "No Date Selected in HR Panel",
        description: "Please select a date from the HR panel calendar to update attendance.",
        variant: "destructive",
      });
      return;
    }
    // In a real app, you'd get employee ID and new status from inputs
    toast({
      title: "Manual Update (Demo)",
      description: `Attendance for ${hrSelectedDate.toLocaleDateString()} would be updated for the specified employee. Backend not connected.`,
    });
  };

  const initialCalendarMonth = useMemo(() => {
    if (viewMode === 'year') {
      return new Date(displayYear, 0, 1);
    }
    return new Date(displayYear, selectedMonthIndex, 1);
  }, [viewMode, displayYear, selectedMonthIndex]);

  const numberOfMonthsToDisplay = viewMode === 'year' ? 12 : 1;

  const calendarGridClassNames = {
    months: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-center",
    month: "border rounded-lg p-3 sm:p-4 bg-card shadow-md flex flex-col min-h-0",
    caption: "flex justify-center pt-1 relative items-center mb-2.5 mt-1",
    caption_label: "text-sm sm:text-base font-semibold text-center block w-full",
    nav_button: "hidden",
    table: "w-full border-collapse mt-2.5 mb-1",
    head_row: "flex justify-around mb-1.5",
    head_cell: "text-muted-foreground rounded-md w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-normal text-[0.7rem] sm:text-xs text-center",
    row: "flex w-full mt-1 justify-around",
    cell: "h-7 w-7 sm:h-8 sm:h-8 text-center text-xs sm:text-sm p-0 relative flex items-center justify-center",
    day: cn(
      buttonVariants({ variant: "ghost" }),
      "h-7 w-7 sm:h-8 sm:h-8 p-0 font-normal aria-selected:opacity-100 rounded-full"
    ),
    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
    day_today: "bg-accent text-accent-foreground",
    day_outside: "day-outside text-muted-foreground opacity-20",
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
              Track and manage employee attendance and related activities. Holiday, Sunday, and sample leave markings are illustrative.
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
                    modifiers={{
                        holiday: holidayMatcher,
                        sunday: sundayMatcher,
                        plannedLeave: plannedLeaveMatcher,
                        unplannedLeave: unplannedLeaveMatcher,
                    }}
                    modifiersStyles={{
                        holiday: holidayStyle,
                        sunday: holidayStyle, 
                        plannedLeave: plannedLeaveStyle,
                        unplannedLeave: unplannedLeaveStyle,
                    }}
                  />
                  {selectedDate && (
                    <p className="mt-3 text-sm text-center text-primary p-2 border-t">
                      Main Calendar Selected Date: {selectedDate.toLocaleDateString()}
                    </p>
                  )}
                  {!selectedDate && (
                     <p className="mt-3 text-sm text-center text-muted-foreground p-2 border-t">
                      {viewMode === 'year'
                        ? `Full year view for ${displayYear}. Click a date to select on main calendar. Month focus: ${MONTH_NAMES[selectedMonthIndex]}.`
                        : `Month view for ${MONTH_NAMES[selectedMonthIndex]} ${displayYear}. Click a date to select on main calendar.`
                      }
                    </p>
                  )}
                   <div className="text-xs text-center text-muted-foreground pt-1 italic px-2 space-y-0.5 pb-2">
                      <p>Note: Sundays and illustrative holidays are marked in <span style={holidayStyle}>red</span>.</p>
                      <p>Sample employee planned leaves (in <span style={plannedLeaveStyle}>green</span>) and unplanned leaves (in <span style={unplannedLeaveStyle}>purple</span>) are shown for demonstration.</p>
                   </div>
                </div>

                <p className="text-sm text-foreground/70 font-semibold pt-4">Planned Data Sources & Features:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
                    <li className="flex items-center"><Fingerprint className="h-4 w-4 mr-2 text-primary/80 flex-shrink-0" /> Biometric Systems Integration</li>
                    <li className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-primary/80 flex-shrink-0" /> GPS-based Attendance (for field staff)</li>
                    <li className="flex items-center"><Users className="h-4 w-4 mr-2 text-primary/80 flex-shrink-0" /> Manual Entry/Correction (by HR via controls below)</li>
                </ul>
                <Button variant="outline" size="sm" disabled className="mt-2">View Full Attendance Logs (Coming Soon)</Button>
              </CardContent>
            </Card>

            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center"><UserCog className="mr-2 h-5 w-5"/>HR Manual Attendance Override</CardTitle>
                <CardDescription className="text-xs">Authorized HR personnel can manually update or record attendance for specific employees.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="hrEmployeeId" className="text-sm">Employee ID</Label>
                      <Input id="hrEmployeeId" placeholder="Enter Employee ID" disabled className="mt-1"/>
                       <p className="text-xs text-muted-foreground mt-1">Employee ID field (backend integration needed).</p>
                    </div>
                    <div>
                      <Label htmlFor="hrAttendanceStatus" className="text-sm">New Attendance Status</Label>
                      <Select disabled>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Present">Present</SelectItem>
                          <SelectItem value="Absent">Absent</SelectItem>
                          <SelectItem value="OnLeave_Planned">On Leave (Planned)</SelectItem>
                          <SelectItem value="OnLeave_Unplanned">On Leave (Unplanned)</SelectItem>
                          <SelectItem value="HalfDay">Half Day</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">Status selection (backend integration needed).</p>
                    </div>
                     <div>
                        <Label htmlFor="hrRemarks" className="text-sm">Reason / Remarks (Optional)</Label>
                        <Textarea id="hrRemarks" placeholder="Enter reason for manual update..." disabled className="mt-1" rows={2} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Select Date for Update</Label>
                    <Calendar
                      mode="single"
                      selected={hrSelectedDate}
                      onSelect={setHrSelectedDate}
                      className="rounded-md border p-2 bg-card shadow-sm w-full sm:max-w-xs mx-auto"
                      initialFocus
                      month={hrSelectedDate || new Date()} // Ensure calendar opens to current month or selected
                      modifiers={{
                        holiday: holidayMatcher,
                        sunday: sundayMatcher,
                      }}
                      modifiersStyles={{
                          holiday: holidayStyle,
                          sunday: holidayStyle, 
                      }}
                    />
                    {hrSelectedDate && (
                        <p className="text-xs text-center text-primary pt-1">
                        HR Panel Selected Date: {hrSelectedDate.toLocaleDateString()}
                        </p>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleManualUpdate} className="mt-4">
                  <Edit className="mr-2 h-4 w-4"/> Update Attendance Record
                </Button>
                <p className="text-xs text-muted-foreground mt-1">This is a UI demonstration. Backend not connected.</p>
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
            
            <div className="mt-10 p-4 bg-blue-50 border border-blue-300 rounded-md text-sm text-blue-700">
                <div className="flex items-start">
                    <AlertTriangle className="inline-block h-5 w-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <strong className="font-semibold">Developer Note:</strong>
                        <p className="mt-1">
                        The calendars and forms above are functional UI demonstrations. 
                        Integration with a live backend for storing/retrieving actual holidays, employee schedules, leave requests, biometric data, and GPS data is required for full functionality. 
                        Performance metric calculations and complaint logging also depend on backend services. Manual updates shown are for UI demonstration only.
                        </p>
                    </div>
                </div>
            </div>

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

