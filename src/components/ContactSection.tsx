import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Linkedin, Clock, Check, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import StatusBadge from '@/components/StatusBadge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Define the form schema with zod for validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Call the Supabase Edge Function to send the email
      const { data: responseData, error } = await supabase.functions.invoke('send-contact-email', {
        body: data,
      });

      if (error) {
        throw new Error(error.message || 'Failed to send message');
      }

      // Show enhanced success toast with icon
      toast.success("Message sent successfully!", {
        description: "I'll get back to you as soon as possible.",
        icon: <Check className="h-5 w-5 text-green-500" />,
        duration: 5000,
      });
      
      // Update submit status for UI feedback
      setSubmitStatus('success');
      
      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      
      // Show enhanced error toast with icon
      toast.error("Failed to send message", {
        description: "Please try again or contact me directly via email.",
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        duration: 7000,
      });
      
      // Update submit status for UI feedback
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after a delay
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="min-h-screen w-full py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-black vintage-effect">
      <div className="max-w-6xl mx-auto relative">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-12 md:mb-16 text-center text-gray-100 vintage-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </motion.h2>
        
        <div className="mb-8 max-w-3xl mx-auto text-center">
          <motion.p 
            className="text-lg text-gray-300/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Interested in working together? I'd love to hear from you.
          </motion.p>
        </div>

        {/* Status Alerts */}
        {submitStatus === 'success' && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Alert className="border-green-500/30 bg-green-500/10 text-green-200">
              <Check className="h-5 w-5 text-green-500" />
              <AlertTitle className="text-green-300">Message Sent Successfully!</AlertTitle>
              <AlertDescription className="text-green-200/80">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
        
        {submitStatus === 'error' && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Alert className="border-red-500/30 bg-red-500/10 text-red-200">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <AlertTitle className="text-red-300">Failed to Send Message</AlertTitle>
              <AlertDescription className="text-red-200/80">
                There was an error sending your message. Please try again or contact me directly via email.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Contact Info Column */}
          <div className="lg:col-span-2 flex">
            {/* Contact Card - Added flex-grow for full height, reduced grain effect */}
            <div className="vintage-card p-6 md:p-8 rounded-xl bg-gradient-to-br from-blue-900/20 to-purple-900/10 border border-white/10 backdrop-blur-sm w-full flex flex-col">
              <div className="absolute inset-0 grain-effect-subtle rounded-xl"></div>
              
              {/* Alternative Contact Methods */}
              <h3 className="text-xl font-semibold text-white mb-6 relative z-10">Contact Details</h3>
              
              <div className="space-y-5 relative z-10">
                <a 
                  href="mailto:haritsnaufal479@gmail.com" 
                  className="flex items-center gap-4 text-gray-300 hover:text-accent transition-colors group"
                >
                  <div className="p-3 rounded-full bg-blue-900/20 border border-blue-400/20 group-hover:border-blue-400/40 transition-all">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Email</p>
                    <p className="text-white">haritsnaufal479@gmail.com</p>
                  </div>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/muhammad-harits7" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 text-gray-300 hover:text-accent transition-colors group"
                >
                  <div className="p-3 rounded-full bg-blue-900/20 border border-blue-400/20 group-hover:border-blue-400/40 transition-all">
                    <Linkedin className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">LinkedIn</p>
                    <p className="text-white">linkedin.com/in/muhammad-harits7</p>
                  </div>
                </a>
              </div>
              
              {/* Push the availability section to the bottom with flex-grow */}
              <div className="mt-8 pt-8 border-t border-white/10 flex-grow flex flex-col justify-end relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium">Current Availability</h4>
                  <StatusBadge status="available" />
                </div>
                
                <div className="flex items-start gap-3 mt-6 text-white/70">
                  <Clock className="h-5 w-5 text-blue-400 mt-1" />
                  <p className="text-sm">
                    I typically respond to inquiries within 24-48 hours. For urgent matters, please mention it in the subject line.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form Column */}
          <div className="lg:col-span-3 flex">
            <div className="vintage-card p-6 md:p-8 rounded-xl bg-gradient-to-br from-amber-900/10 to-purple-900/5 border border-white/10 backdrop-blur-sm w-full flex flex-col">
              <div className="absolute inset-0 grain-effect-subtle rounded-xl"></div>
              
              <h3 className="text-xl font-semibold text-white mb-6 relative z-10">Send Me a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex-grow flex flex-col relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              className="bg-white/5 border-white/10 text-white" 
                              {...field} 
                            />
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
                          <FormLabel className="text-gray-200">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your email" 
                              type="email" 
                              className="bg-white/5 border-white/10 text-white" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Subject</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Project Inquiry">Project Inquiry</SelectItem>
                            <SelectItem value="Job Opportunity">Job Opportunity</SelectItem>
                            <SelectItem value="Collaboration">Collaboration</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="flex-grow flex flex-col">
                        <FormLabel className="text-gray-200">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message..." 
                            className="bg-white/5 border-white/10 text-white flex-grow min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-2 mt-auto">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`relative overflow-hidden transition-all duration-300 ${
                        isSubmitting 
                          ? 'bg-blue-700 text-white' 
                          : submitStatus === 'success'
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : submitStatus === 'error'
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white'
                      } border-none w-full sm:w-auto px-8 py-2 h-auto text-base hover:scale-[1.02]`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-pulse">Sending...</span>
                          <span className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></span>
                        </>
                      ) : submitStatus === 'success' ? (
                        <span className="flex items-center">
                          <Check className="mr-2 h-5 w-5" />
                          Sent Successfully
                        </span>
                      ) : submitStatus === 'error' ? (
                        <span className="flex items-center">
                          <AlertTriangle className="mr-2 h-5 w-5" />
                          Try Again
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
