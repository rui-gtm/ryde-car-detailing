import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2, Phone } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const QUOTE_API_URL = import.meta.env.VITE_QUOTE_API_URL || "https://ryde-car-detailing.vercel.app/api/quote";

const TIME_OPTIONS = (() => {
  const options: string[] = [];
  for (let minutes = 6 * 60; minutes < 24 * 60; minutes += 30) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    options.push(`${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`);
  }
  options.push("00:00");
  return options;
})();

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
    carModel: z.string().trim().max(50, "Car model cannot exceed 50 characters").optional(),
    year: z
      .string()
      .trim()
      .optional()
      .refine((value) => !value || /^\d{4}$/.test(value), "Please enter a valid year"),
    date: z.date().optional(),
    time: z.string().trim().optional(),
    address: z
      .string()
      .max(200, "Address cannot exceed 200 characters")
      .optional(),
    message: z
      .string()
      .max(2000, "Message cannot exceed 2000 characters")
      .optional(),
    agreeToTerms: z.boolean().refine((value) => value === true, {
      message: "You must agree to the Terms & Conditions to book.",
    }),
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

type BookingFormValues = z.infer<typeof formSchema>;

// Kept in module scope (not component state) so it survives client-side route
// navigation away from and back to the booking page, but is naturally cleared
// on a full page refresh.
let bookingFormDraft: BookingFormValues | null = null;

interface ChecklistItem {
  title: string;
  description: string;
}

interface ContactPhone {
  href: string;
  label: string;
}

interface BookingFormProps {
  defaultPackage?: string;
  onSuccess?: () => void;
  confirmChecklist?: ChecklistItem[];
  contactPhone?: ContactPhone;
}

const BookingForm = ({ defaultPackage, onSuccess, confirmChecklist, contactPhone }: BookingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const d2f9f94d_8345_46ae_9684_e0a629cb2cf2 = "88e97baa5d7f5ccb3421e709774efa24e8817251a86a62075892d156b92baacc";

  const emptyDefaultValues: BookingFormValues = {
    name: "",
    phone: "",
    email: "",
    vehicleType: "",
    package: defaultPackage ?? "",
    carModel: "",
    year: "",
    date: undefined,
    time: "",
    address: "",
    message: "",
    agreeToTerms: false,
  };

  const defaultValues = bookingFormDraft ?? emptyDefaultValues;

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const agreeToTerms = form.watch("agreeToTerms");

  useEffect(() => {
    const subscription = form.watch((values) => {
      bookingFormDraft = values as BookingFormValues;
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      const { agreeToTerms, date, ...rest } = values;
      const payload = {
        ...rest,
        date: date ? format(date, "yyyy-MM-dd") : "",
      };

      const response = await fetch(QUOTE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": d2f9f94d_8345_46ae_9684_e0a629cb2cf2,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      toast({
        title: "Booking Request Sent!",
        description: "We'll get back to you shortly to confirm your appointment.",
      });
      form.reset(emptyDefaultValues);
      bookingFormDraft = null;
      onSuccess?.();
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

  const handleMobileSubmitClick = async () => {
    const isValid = await form.trigger([
      "name",
      "phone",
      "email",
      "vehicleType",
      "package",
      "carModel",
      "year",
      "date",
      "time",
      "address",
      "message",
    ]);
    if (isValid) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmAgree = async () => {
    setShowConfirmDialog(false);
    await onSubmit({ ...form.getValues(), agreeToTerms: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="vehicleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="other">UTE</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
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
                <Select onValueChange={field.onChange} value={field.value}>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="carModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car Model</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Toyota Camry" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 2020" inputMode="numeric" maxLength={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
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
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Time</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    {TIME_OPTIONS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Address</FormLabel>
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
              <FormLabel>Additional Details</FormLabel>
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
        {!isMobile && (
          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-lg bg-muted/30 p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
                </FormControl>
                <div className="space-y-1 leading-snug">
                  <FormLabel className="font-normal leading-snug text-muted-foreground">
                    By submitting this booking, I confirm that the information I have provided is accurate and complete, and that I have read and agree to the{" "}
                    <Link to="/terms" className="font-medium text-primary hover:text-primary/80">
                      Terms &amp; Conditions
                    </Link>
                    .
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        )}
        <Button
          type={isMobile ? "button" : "submit"}
          className="w-full"
          disabled={isSubmitting || (!isMobile && !agreeToTerms)}
          onClick={isMobile ? handleMobileSubmitClick : undefined}
        >
          {isSubmitting ? "Sending..." : "Submit Booking Request"}
        </Button>
      </form>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="flex max-h-[85vh] flex-col gap-0 p-0">
          <DialogHeader className="shrink-0 p-6 pb-4">
            <DialogTitle>Before Confirming Your Booking</DialogTitle>
            <DialogDescription>Please check the following details:</DialogDescription>
          </DialogHeader>
          <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-6">
            <ul className="space-y-4">
              {confirmChecklist?.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-snug">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground leading-snug border-t border-border pt-4">
              By submitting this booking, I confirm that the information I have provided is accurate and complete, and that I have read and agree to the{" "}
              <Link to="/terms" className="font-medium text-primary hover:text-primary/80">
                Terms &amp; Conditions
              </Link>
              .
            </p>
            {contactPhone && (
              <a
                href={contactPhone.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                {contactPhone.label}
              </a>
            )}
          </div>
          <DialogFooter className="shrink-0 flex-row justify-end gap-2 border-t border-border p-6 pt-4 sm:space-x-0">
            <Button type="button" variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleConfirmAgree} disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Agree"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default BookingForm;
