import { useState, forwardRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Copy, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// --- START: SELF-CONTAINED UI COMPONENTS ---
const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "outline"; size?: "sm" }
>(({ className, variant, size, ...props }, ref) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variantClasses =
    variant === "outline"
      ? "border border-input hover:bg-accent hover:text-accent-foreground"
      : "bg-primary text-primary-foreground hover:bg-primary/90";

  const sizeClasses = size === "sm" ? "h-9 px-3" : "h-10 py-2 px-4";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
// --- END: SELF-CONTAINED UI COMPONENTS ---

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = {
    email: "surajspillai57@gmail.com",
    phone: "+91 9567846357",
    linkedin: "https://linkedin.com/in/suraj-s-pillai-vk187",
    github: "https://github.com/iconicmask7",
  };

  const handleCopy = (text: string, label: string) => {
    const textArea = document.createElement("textarea");
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard.`,
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast({
        title: "Error",
        description: `Could not copy ${label}.`,
        variant: "destructive",
      });
    }
    document.body.removeChild(textArea);
  };

  // ✅ UPDATED HANDLE SUBMIT (Formspree Integration)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xanpkrap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out — I’ll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: "Message could not be sent. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Build Something Amazing
          </h2>
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Available for immediate hire</span>
            </div>
            <p>📍 Alappuzha, Kerala, India</p>
            <p>💼 Open to: Remote | Hybrid | On-site</p>
          </div>
        </motion.div>

        {/* Contact Form + Quick Connect */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background/50"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background/50"
              />
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="bg-background/50 resize-none"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Quick Connect Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold mb-6">Quick Connect</h3>

            {/* Email Card */}
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{contactInfo.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleCopy(contactInfo.email, "Email")}
                >
                  <Copy className="mr-2 h-3 w-3" /> Copy
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() =>
                    (window.location.href = `mailto:${contactInfo.email}`)
                  }
                >
                  <Send className="mr-2 h-3 w-3" /> Send
                </Button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleCopy(contactInfo.phone, "Phone number")}
                >
                  <Copy className="mr-2 h-3 w-3" /> Copy
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() =>
                    (window.location.href = `tel:${contactInfo.phone}`)
                  }
                >
                  <Phone className="mr-2 h-3 w-3" /> Call
                </Button>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Linkedin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <p className="font-medium text-sm truncate">
                    linkedin.com/in/suraj-s-pillai-vk187
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full"
                onClick={() => window.open(contactInfo.linkedin, "_blank")}
              >
                View Profile →
              </Button>
            </div>

            {/* GitHub Card */}
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Github className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <p className="font-medium text-sm">github.com/iconicmask7</p>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full"
                onClick={() => window.open(contactInfo.github, "_blank")}
              >
                View Repos →
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
