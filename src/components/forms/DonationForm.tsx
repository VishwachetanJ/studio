
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React from "react";

const donationAmounts = [25, 50, 100, 250, 500];

const donationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  amount: z.number().min(1, { message: "Donation amount must be at least 1." }),
  customAmount: z.string().optional(), // For the "Other" input field
  paymentMethod: z.enum(["credit_card", "paypal", "debit_card", "net_banking", "upi"], {
    required_error: "You need to select a payment method.",
  }),
  comment: z.string().optional(),
  requestInvoice: z.boolean().default(false).optional(),
}).refine(data => !(data.amount === -1 && (!data.customAmount || isNaN(parseFloat(data.customAmount)) || parseFloat(data.customAmount) < 1)), {
  message: "Please enter a valid custom amount if 'Other' is selected.",
  path: ["customAmount"],
});


type DonationFormValues = z.infer<typeof donationFormSchema>;

export function DonationForm() {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = React.useState<number | null>(null);
  const [showCustomAmount, setShowCustomAmount] = React.useState(false);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      amount: 0,
      customAmount: "",
      paymentMethod: undefined,
      comment: "",
      requestInvoice: false,
    },
  });

  const handleAmountButtonClick = (amount: number) => {
    setSelectedAmount(amount);
    setShowCustomAmount(false);
    form.setValue("amount", amount);
    form.setValue("customAmount", ""); // Clear custom amount
    form.clearErrors("customAmount");
  };

  const handleOtherAmountClick = () => {
    setSelectedAmount(null); // Deselect predefined amounts
    setShowCustomAmount(true);
    form.setValue("amount", -1); // Indicate custom amount is active
  };
  
  React.useEffect(() => {
    if (showCustomAmount) {
      const customAmountValue = form.watch("customAmount");
      if (customAmountValue && !isNaN(parseFloat(customAmountValue))) {
        form.setValue("amount", parseFloat(customAmountValue));
      } else {
         form.setValue("amount", -1); // Reset if invalid
      }
    }
  }, [form.watch("customAmount"), showCustomAmount, form]);


  function onSubmit(data: DonationFormValues) {
    let finalData = { ...data };
    if (data.amount === -1 && data.customAmount) {
      finalData.amount = parseFloat(data.customAmount);
    }
    delete finalData.customAmount; // Remove temporary field

    console.log(finalData);
    toast({
      title: "Donation Processing!",
      description: `Thank you for your generous donation of $${finalData.amount.toFixed(2)}. ${finalData.requestInvoice ? "A receipt will be emailed to you shortly." : "Your support is invaluable."}`,
    });
    form.reset();
    setSelectedAmount(null);
    setShowCustomAmount(false);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Make a Donation</CardTitle>
        <CardDescription>Your contribution helps us continue our work. Every bit counts!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Full Name" {...field} />
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
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormItem>
              <FormLabel>Donation Amount ($)</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                  {donationAmounts.map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant={selectedAmount === amount && !showCustomAmount ? "default" : "outline"}
                      onClick={() => handleAmountButtonClick(amount)}
                      className="w-full"
                    >
                      ${amount}
                    </Button>
                  ))}
                  <Button
                    type="button"
                    variant={showCustomAmount ? "default" : "outline"}
                    onClick={handleOtherAmountClick}
                    className="w-full"
                  >
                    Other
                  </Button>
                </div>
              </FormControl>
              {showCustomAmount && (
                <FormField
                  control={form.control}
                  name="customAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter custom amount" 
                          {...field} 
                          onChange={e => {
                            field.onChange(e.target.value);
                            if (e.target.value && !isNaN(parseFloat(e.target.value))) {
                                form.setValue("amount", parseFloat(e.target.value));
                            } else {
                                form.setValue("amount", -1); // Reset if invalid
                            }
                          }}
                        />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
              )}
               <FormField
                  control={form.control}
                  name="amount"
                  render={() => <FormMessage />} // This will show errors for the base 'amount' field
                />
            </FormItem>

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method (Illustrative)</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="credit_card" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Credit Card
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="debit_card" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Debit Card
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="paypal" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          PayPal
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="net_banking" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Net Banking
                        </FormLabel>
                      </FormItem>
                       <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="upi" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          UPI
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave a Comment (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any message you'd like to share?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="requestInvoice"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Send me a receipt/invoice
                    </FormLabel>
                    <FormDescription>
                      An email with the donation receipt will be sent to your provided email address.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              Donate Now
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

