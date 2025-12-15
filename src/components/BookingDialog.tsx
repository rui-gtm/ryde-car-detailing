import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    name: z.string().trim().max(100, "Name cannot exceed 100 characters").optional(),
    phone: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => !value || value.length === 0 || value.replace(/\D/g, "").length >= 10,
        "Please enter a valid phone number",
      ),
    email: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => !value || value.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        "Please enter a valid email address",
      ),
    vehicleType: z.string().trim().optional(),
    package: z.string().trim().optional(),
    address: z
      .string()
      .max(200, "Address cannot exceed 200 characters")
      .optional(),
    message: z
      .string()
      .max(2000, "Message cannot exceed 2000 characters")
      .optional(),
  })
  .superRefine((data, ctx) => {
    const hasPhone = !!data.phone && data.phone.trim().length > 0;
    const hasEmail = !!data.email && data.email.trim().length > 0;

    if (!hasPhone && !hasEmail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Please provide a phone number or an email address.",
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Please provide a phone number or an email address.",
      });
    }
  });

interface BookingDialogProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  defaultPackage?: string;
}

const BookingDialog = ({ children, onOpenChange, defaultPackage }: BookingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const d2f9f94d_8345_46ae_9684_e0a629cb2cf2 = "88e97baa5d7f5ccb3421e709774efa24e8817251a86a62075892d156b92baacc";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      vehicleType: "",
      package: defaultPackage ?? "",
      address: "",
      message: "",
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      const response = await fetch("https://jade-mandazi-77ee90.netlify.app/.netlify/functions/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": d2f9f94d_8345_46ae_9684_e0a629cb2cf2,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      toast({
        title: "Booking Request Sent!",
        description: "We'll get back to you shortly to confirm your appointment.",
      });
      handleOpenChange(false);
      form.reset({
        name: "",
        phone: "",
        email: "",
        vehicleType: "",
        package: defaultPackage ?? "",
        address: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send booking request to Netlify function", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="fixed left-[50%] top-[50%] z-50 flex w-full max-w-lg translate-x-[-50%] translate-y-[-50%] flex-col border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg sm:max-w-[500px] max-h-[90vh] overflow-hidden">
        <div className="shrink-0 border-b border-border/60 p-6">
          <DialogHeader className="gap-1.5 text-left">
            <DialogTitle>Book Your Detail</DialogTitle>
            <DialogDescription>
              Fill out the form below and we'll contact you to confirm your appointment.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden min-h-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col min-h-0">
              <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 pt-5 pb-6 min-h-0">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="0400 000 000" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || undefined}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sedan">Sedan</SelectItem>
                              <SelectItem value="suv">SUV</SelectItem>
                              <SelectItem value="truck">Truck</SelectItem>
                              <SelectItem value="van">Van</SelectItem>
                              <SelectItem value="other">Sports Car</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="package"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Package</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || undefined}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select package" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="basic">Basic Exterior Wash</SelectItem>
                              <SelectItem value="interior">Interior Deep Clean</SelectItem>
                              <SelectItem value="premium">Premium Full Detail</SelectItem>
                              <SelectItem value="ceramic">Ceramic Coating</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Address (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="address where the service will be performed"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional details (Car Model and Year)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific requirements or questions?"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="border-t border-border/60 bg-background px-6 py-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Submit Booking Request"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
