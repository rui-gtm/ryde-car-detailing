import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
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

      const { agreeToTerms, ...payload } = values;

      const response = await fetch("https://jade-mandazi-77ee90.netlify.app/.netlify/functions/quote", {
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
                  <Link to="/terms" className="text-primary underline underline-offset-4">
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
