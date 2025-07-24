import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { leadCaptureSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { LeadCaptureInput } from "@shared/schema";

interface LeadFormProps {
  onSuccess?: () => void;
}

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const { toast } = useToast();
  
  const form = useForm<LeadCaptureInput>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      interests: [],
    },
  });

  const leadMutation = useMutation({
    mutationFn: async (data: LeadCaptureInput) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your details have been submitted. We'll be in touch soon.",
      });
      form.reset();
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LeadCaptureInput) => {
    leadMutation.mutate(data);
  };

  const interests = [
    { id: "solar", label: "Solar Panels" },
    { id: "battery", label: "Battery Storage" },
    { id: "heat_pump", label: "Heat Pumps" },
    { id: "ev_charger", label: "EV Chargers" },
  ];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            {...form.register("firstName")}
            id="firstName"
            placeholder="First Name"
          />
          {form.formState.errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.firstName.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            {...form.register("lastName")}
            id="lastName"
            placeholder="Last Name"
          />
          {form.formState.errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.lastName.message}</p>
          )}
        </div>
      </div>
      
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          {...form.register("email")}
          id="email"
          type="email"
          placeholder="Email Address"
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          {...form.register("phone")}
          id="phone"
          type="tel"
          placeholder="Phone Number"
        />
        {form.formState.errors.phone && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="address">Property Address</Label>
        <Input
          {...form.register("address")}
          id="address"
          placeholder="Property Address"
        />
        {form.formState.errors.address && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.address.message}</p>
        )}
      </div>
      
      <div>
        <Label>What interests you? (Optional)</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {interests.map((interest) => (
            <div key={interest.id} className="flex items-center space-x-2">
              <Checkbox
                id={interest.id}
                {...form.register("interests")}
                value={interest.id}
              />
              <Label htmlFor={interest.id} className="text-sm">
                {interest.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        type="submit"
        disabled={leadMutation.isPending}
        className="w-full bg-energy-green text-white hover:bg-energy-dark"
      >
        {leadMutation.isPending ? (
          <>
            <i className="fas fa-spinner fa-spin mr-2"></i>
            Submitting...
          </>
        ) : (
          <>
            Get My Free Assessment
            <i className="fas fa-arrow-right ml-2"></i>
          </>
        )}
      </Button>
      
      <p className="text-sm text-gray-500 text-center">
        By submitting this form, you agree to be contacted by Enerwise and our trusted partners.
      </p>
    </form>
  );
}
