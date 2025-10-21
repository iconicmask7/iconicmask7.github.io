// Contact.tsx
import { useState, forwardRef } from "react";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Copy, Send } from "lucide-react";

/**
 * Contact component (TypeScript + React).
 * - Does NOT display raw email/phone/URLs inline.
 * - Provides Copy and Navigate/Open actions.
 * - Type-safe forwardRef components (Button, Input, Textarea).
 * - Fully responsive layout with adaptive button text.
 */

/* ---------------------- Toast Hook ---------------------- */
const useToast = () => {
  const [toasts, setToasts] = useState<
    { id: string; title: string; description?: string; variant?: string }[]
  >([]);

  const toast = ({
    title,
    description,
    variant = "default",
  }: {
    title: string;
    description?: string;
    variant?: "default" | "destructive";
  }) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  return { toast, toasts };
};

const Toaster = ({ toasts }: { toasts: ReturnType<typeof useToast>["toasts"] }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className={`p-3 rounded-xl shadow-lg max-w-sm ${
            t.variant === "destructive" ? "bg-red-600 text-white" : "bg-gray-900 text-white"
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="font-medium">{t.title}</div>
          {t.description && <div className="text-sm opacity-90 mt-1">{t.description}</div>}
        </motion.div>
      ))}
    </div>
  );
};

/* ---------------------- UI Primitives ---------------------- */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: ReactNode;
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";
    const variantClasses =
      variant === "outline"
        ? "bg-transparent border border-gray-700 hover:bg-gray-800/60 text-gray-100"
        : "bg-blue-600 hover:bg-blue-700 text-white";
    const sizeClasses = size === "sm" ? "h-9 px-2 sm:px-3 text-xs sm:text-sm" : size === "lg" ? "h-11 px-6 text-sm" : "h-10 py-2 px-4 text-sm";

    return (
      <button ref={ref} className={`${base} ${variantClasses} ${sizeClasses} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
const Input = forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`flex h-10 w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
});
Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`min-h-[80px] w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

/* ---------------------- Main Component ---------------------- */

export default function Contact() {
  const { toast, toasts } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hidden source-of-truth contact values (not displayed directly)
  const contactInfo = {
    email: "surajspillai57@gmail.com",
    phone: "+919567846357", // normalized for tel:
    linkedin: "https://linkedin.com/in/suraj-s-pillai-vk187",
    github: "https://github.com/iconicmask7",
  };

  // Copy to clipboard helper - uses modern navigator.clipboard if available
  const handleCopy = async (value: string, label: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        // fallback - append a hidden textarea and execCommand
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      toast({ title: `${label} copied`, description: `${label} is on your clipboard.` });
    } catch (err) {
      console.error("Copy failed", err);
      toast({ title: "Copy failed", description: `Could not copy ${label}.`, variant: "destructive" });
    }
  };

  // Navigation/open helpers
  const openMail = (email: string) => (window.location.href = `mailto:${email}`);
  const openTel = (phone: string) => (window.location.href = `tel:${phone}`);
  const openExternal = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const resp = await fetch("https://formspree.io/f/xanpkrap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (resp.ok) {
        toast({ title: "Message Sent!", description: "Thanks — I'll reply soon." });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast({ title: "Send failed", description: "Please try again later.", variant: "destructive" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Network error", description: "Check your connection.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Visual card helper: renders a clean header + action buttons, *without* showing raw value */
  const ContactCard = ({
    title,
    icon,
    actions,
    description,
  }: {
    title: string;
    icon: ReactNode;
    description?: string;
    actions: ReactNode;
  }) => (
    <div className="p-4 sm:p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-500/10 flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-400">{title}</p>
          {description ? (
            <p className="font-medium text-xs sm:text-sm text-gray-200 mt-1">{description}</p>
          ) : (
            // Friendly masked/hidden hint that's visually subtle and won't overflow
            <p className="text-sm text-gray-400 mt-1 select-none" aria-hidden>
              ••••••••••••••
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {actions}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Toaster toasts={toasts} />

      <section id="contact" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Build Something Amazing</h2>
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Available for immediate hire</span>
              </div>
              <p>📍 Alappuzha, Kerala, India</p>
              <p>💼 Open to: Remote | Hybrid | On-site</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
            >
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95"
                  aria-label="Send message"
                >
                  {isSubmitting ? "Sending..." : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Quick Connect */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold mb-6">Quick Connect</h3>

              {/* Email */}
              <ContactCard
                title="Email"
                icon={<Mail className="h-5 w-5 text-blue-500" />}
                description="Send a direct email or copy to clipboard"
                actions={
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleCopy(contactInfo.email, "Email")}
                      aria-label="Copy email"
                      title="Copy email"
                    >
                      <Copy className="mr-1 sm:mr-2 h-4 w-4 flex-shrink-0" /> 
                      <span className="hidden xs:inline sm:hidden">Copy</span>
                      <span className="hidden sm:inline">Copy Email</span>
                      <span className="inline xs:hidden">Copy</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openMail(contactInfo.email)}
                      aria-label="Send email"
                      title="Send email"
                    >
                      <Send className="mr-1 sm:mr-2 h-4 w-4 flex-shrink-0" /> Send
                    </Button>
                  </>
                }
              />

              {/* Phone */}
              <ContactCard
                title="Phone"
                icon={<Phone className="h-5 w-5 text-blue-500" />}
                description="Call directly or copy number"
                actions={
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleCopy(contactInfo.phone, "Phone number")}
                      aria-label="Copy phone number"
                      title="Copy phone"
                    >
                      <Copy className="mr-1 sm:mr-2 h-4 w-4 flex-shrink-0" /> Copy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openTel(contactInfo.phone)}
                      aria-label="Call phone"
                      title="Call"
                    >
                      <Phone className="mr-1 sm:mr-2 h-4 w-4 flex-shrink-0" /> Call
                    </Button>
                  </>
                }
              />

              {/* LinkedIn */}
              <ContactCard
                title="LinkedIn"
                icon={<Linkedin className="h-5 w-5 text-blue-500" />}
                description="Open profile or copy profile link"
                actions={
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleCopy(contactInfo.linkedin, "LinkedIn URL")}
                      aria-label="Copy LinkedIn URL"
                      title="Copy LinkedIn link"
                    >
                      <Copy className="mr-1 sm:mr-2 h-4 w-4 flex-shrink-0" /> 
                      <span className="hidden sm:inline">Copy Link</span>
                      <span className="inline sm:hidden">Copy</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openExternal(contactInfo.linkedin)}
                      aria-label="Open LinkedIn profile"
                      title="Open LinkedIn"
                    >
                      <span className="hidden sm:inline">View Profile →</span>
                      <span className="inline sm:hidden">View →</span>
                    </Button>
                  </>
                }
              />

              {/* GitHub */}
              <ContactCard
                title="GitHub"
                icon={<Github className="h-5 w-5 text-blue-500" />}
                description="Open repos or copy GitHub link"
                actions={
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleCopy(contactInfo.github, "GitHub URL")}
                      aria-label="Copy GitHub URL"
                      title="Copy GitHub link"
                    >
                      <Copy className="mr-1 sm:mr-2 h-4 w-4 flex-shrink-0" /> 
                      <span className="hidden sm:inline">Copy Link</span>
                      <span className="inline sm:hidden">Copy</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openExternal(contactInfo.github)}
                      aria-label="Open GitHub"
                      title="Open GitHub"
                    >
                      <span className="hidden sm:inline">View Repos →</span>
                      <span className="inline sm:hidden">View →</span>
                    </Button>
                  </>
                }
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}