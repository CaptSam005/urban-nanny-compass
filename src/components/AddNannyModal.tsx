
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface AddNannyFormData {
  fullName: string;
  phoneNumber: string;
  homeLocation: string;
  languages: string[];
  experienceYears: number;
  typeOfRole: string;
  currentAvailability: string;
  notes: string;
}

const languageOptions = [
  { id: "hindi", label: "Hindi" },
  { id: "kannada", label: "Kannada" },
  { id: "tamil", label: "Tamil" },
  { id: "english", label: "English" },
  { id: "other", label: "Other" },
];

export function AddNannyModal() {
  const [open, setOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<AddNannyFormData>({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      homeLocation: "",
      languages: [],
      experienceYears: 0,
      typeOfRole: "",
      currentAvailability: "",
      notes: "",
    },
  });

  const handleLanguageChange = (languageId: string, checked: boolean) => {
    setSelectedLanguages(prev => 
      checked 
        ? [...prev, languageId]
        : prev.filter(id => id !== languageId)
    );
  };

  const onSubmit = async (data: AddNannyFormData) => {
    try {
      // Here you would typically send the data to your backend/Google Sheets
      // For now, we'll just show a success message
      const formData = {
        ...data,
        languages: selectedLanguages,
        source: "App",
        timestamp: new Date().toISOString(),
      };

      console.log("Adding nanny:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: "Nanny added successfully ✅",
      });

      // Reset form and close modal
      form.reset();
      setSelectedLanguages([]);
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add nanny. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          Add New Nanny
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Nanny</DialogTitle>
          <DialogDescription>
            Enter the nanny's details below. All fields are required except Notes.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              rules={{ required: "Full name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="homeLocation"
              rules={{ required: "Home location is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Location *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter home location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Languages * (Select at least one)</FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {languageOptions.map((language) => (
                  <div key={language.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={language.id}
                      checked={selectedLanguages.includes(language.id)}
                      onCheckedChange={(checked) => 
                        handleLanguageChange(language.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={language.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {language.label}
                    </label>
                  </div>
                ))}
              </div>
              {selectedLanguages.length === 0 && (
                <p className="text-sm text-red-500">Please select at least one language</p>
              )}
            </div>

            <FormField
              control={form.control}
              name="experienceYears"
              rules={{ 
                required: "Experience is required",
                min: { value: 0, message: "Experience cannot be negative" }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience in Years *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter years of experience" 
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="typeOfRole"
              rules={{ required: "Type of role is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Role *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type of role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="on-call">On-call</SelectItem>
                      <SelectItem value="live-in">Live-in</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentAvailability"
              rules={{ required: "Current availability is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Availability *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="immediately">Immediately</SelectItem>
                      <SelectItem value="1-week">1 Week</SelectItem>
                      <SelectItem value="2-weeks">2 Weeks</SelectItem>
                      <SelectItem value="not-available">Not Available</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter any additional notes (optional)"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={selectedLanguages.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add Nanny
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
