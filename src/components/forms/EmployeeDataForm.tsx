
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React, { useState, useEffect } from "react";

const departments = [
  "Administration",
  "Education Wing",
  "Environmental Wing",
  "Youth Empowerment Wing",
  "Women Empowerment Wing",
  "Farmer Welfare Wing",
  "IT & Communications",
  "Finance & Accounts",
  "Field Operations",
  "Counseling Services",
  "Other",
] as const;

const designations = [
  "Project Manager",
  "Field Officer",
  "Program Coordinator",
  "Counselor",
  "Accountant",
  "HR Manager",
  "IT Specialist",
  "Administrative Assistant",
  "Social Worker",
  "Director",
  "Founder",
  "Team Lead",
  "Volunteer Coordinator",
  "Operations Manager",
  "Communications Officer",
  "Data Analyst",
  "Researcher",
  "Trainer",
  "Consultant",
  "Intern",
  "Other",
] as const;

const employeeDataFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  employeeId: z.string().min(1, { message: "Employee ID is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^\+?[0-9\s-()]*$/, { message: "Invalid phone number format." }),
  dateOfJoining: z.date({ required_error: "Date of joining is required." }),
  department: z.enum(departments, { required_error: "Please select a department." }),
  designation: z.enum(designations, { required_error: "Please select a designation." }),
  communicationAddress: z.string().min(10, { message: "Communication address must be at least 10 characters." }),
  permanentAddress: z.string().min(10, { message: "Permanent address must be at least 10 characters." }),
  sameAsCommunicationAddress: z.boolean().optional(),
  emergencyContactName: z.string().min(2, { message: "Emergency contact name is required." }),
  emergencyContactPhone: z.string().min(10, { message: "Emergency contact phone must be at least 10 digits." }).regex(/^\+?[0-9\s-()]*$/, { message: "Invalid phone number format." }),
});

type EmployeeDataFormValues = z.infer<typeof employeeDataFormSchema>;

export function EmployeeDataForm() {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<EmployeeDataFormValues>({
    resolver: zodResolver(employeeDataFormSchema),
    defaultValues: {
      fullName: "",
      employeeId: "",
      email: "",
      phone: "",
      dateOfJoining: undefined,
      department: undefined,
      designation: undefined,
      communicationAddress: "",
      permanentAddress: "",
      sameAsCommunicationAddress: false,
      emergencyContactName: "",
      emergencyContactPhone: "",
    },
  });

  const watchedCommunicationAddress = form.watch("communicationAddress");
  const watchedSameAsCommunicationAddress = form.watch("sameAsCommunicationAddress");

  useEffect(() => {
    if (watchedSameAsCommunicationAddress) {
      form.setValue("permanentAddress", watchedCommunicationAddress);
      if (watchedCommunicationAddress.length >= 10) {
        form.clearErrors("permanentAddress");
      } else {
        // Optionally trigger validation if communication address itself is not yet valid
        form.trigger("permanentAddress");
      }
    }
  }, [watchedCommunicationAddress, watchedSameAsCommunicationAddress, form]);


  function onSubmit(data: EmployeeDataFormValues) {
    console.log("Employee Data Submitted (Demo):", data);
    toast({
      title: "Employee Data Submitted (Demo)",
      description: `Data for ${data.fullName} has been logged. Backend saving not implemented.`,
      variant: "default",
    });
    form.reset();
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Internal Employee Data</CardTitle>
        <CardDescription>Enter or update employee information. (This is a UI demo, data is not saved).</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Employee's Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Unique Employee ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="employee.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Employee's Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfJoining"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Joining</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a designation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {designations.map((designation) => (
                          <SelectItem key={designation} value={designation}>
                            {designation}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="communicationAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Communication Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Employee's current communication address" {...field} rows={3}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sameAsCommunicationAddress"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checkedState) => {
                        field.onChange(checkedState);
                        if (checkedState) {
                          form.setValue("permanentAddress", form.getValues("communicationAddress"));
                           if (form.getValues("communicationAddress").length >= 10) {
                            form.clearErrors("permanentAddress");
                          } else {
                            form.trigger("permanentAddress");
                          }
                        } else {
                          form.setValue("permanentAddress", ""); // Clear if unchecked
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Permanent address is the same as communication address
                  </FormLabel>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="permanentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permanent Address</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Employee's permanent residential address" 
                      {...field} 
                      rows={3}
                      disabled={watchedSameAsCommunicationAddress} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="emergencyContactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of emergency contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyContactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Phone of emergency contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-8" size="lg">
              Save Employee Data
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
