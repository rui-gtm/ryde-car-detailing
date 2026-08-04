import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
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

interface BookingFormProps {
  defaultPackage?: string;
  onSuccess?: () => void;
}

const BookingForm = ({ defaultPackage, onSuccess }: BookingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const d2f9f94d_8345_46ae_9684_e0a629cb2cf2 = "88e97baa5d7f5ccb3421e709774efa24e8817251a86a62075892d156b92baacc";

  const defaultValues = {
    name: "",
    phone: "",
    email: "",
    vehicleType: "",
    package: defaultPackage ?? "",
    date: undefined as Date | undefined,
    time: "",
    address: "",
    message: "",
    agreeToTerms: false,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const agreeToTerms = form.watch("agreeToTerms");

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
      form.reset(defaultValues);
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
                <Select onValueChange={field.onChange} value={field.value || undefined}>
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
        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-md p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
              </FormControl>
              <div className="space-y-1 leading-snug">
                <FormLabel className="font-normal leading-snug">
                  I have read and agree to the{" "}
                  <Link to="/terms" className="text-primary">
                    Terms &amp; Conditions
                  </Link>
                  .
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting || !agreeToTerms}>
          {isSubmitting ? "Sending..." : "Submit Booking Request"}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
