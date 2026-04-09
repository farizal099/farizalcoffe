import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      lines: ["Kota Baru", "Jambi, Indonesia"],
    },
    {
      icon: Phone,
      title: "Call Us",
      lines: ["+62 87713909103", "Mon–Sun, 7am–10pm"],
    },
    {
      icon: Mail,
      title: "Email Us",
      lines: ["farizzaldn@gmail.com", "We reply within 24 hours"],
    },
    {
      icon: Clock,
      title: "Opening Hours",
      lines: ["Mon–Fri: 7:00 – 22:00", "Sat–Sun: 8:00 – 23:00"],
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Banner */}
      <div className="relative h-56 md:h-72 mb-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1600&q=80"
          alt="Contact us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/75 flex flex-col items-center justify-center text-center px-4">
          <motion.p
            className="text-primary font-medium tracking-widest uppercase text-sm mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.p>
          <motion.h1
            className="font-serif text-4xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-muted-foreground mt-3 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a question, feedback, or special request? We'd love to hear from you.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactInfo.map((info, i) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.title}
                className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif font-semibold mb-2">{info.title}</h3>
                {info.lines.map((line) => (
                  <p key={line} className="text-muted-foreground text-sm">{line}</p>
                ))}
              </motion.div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            className="bg-card border border-border/50 rounded-2xl p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-serif text-2xl font-semibold mb-2">Send Us a Message</h2>
            <p className="text-muted-foreground text-sm mb-8">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            {submitted ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground text-sm">
                  Thank you, {form.name}! We'll reach out to {form.email} within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-contact">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground/80 text-sm">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    data-testid="input-name"
                    className="bg-background border-border/50 focus:border-primary rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground/80 text-sm">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    data-testid="input-email"
                    className="bg-background border-border/50 focus:border-primary rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground/80 text-sm">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    data-testid="input-message"
                    rows={5}
                    className="bg-background border-border/50 focus:border-primary rounded-xl resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  data-testid="button-send-message"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-5 font-semibold"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Map & WhatsApp */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Map Placeholder */}
            <div className="bg-card border border-border/50 rounded-2xl overflow-hidden h-72 md:h-80 relative">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80"
                alt="Location map"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-6 text-center max-w-xs">
                  <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-serif font-semibold mb-1">Find Us Here</h3>
                  <p className="text-muted-foreground text-sm">Jl. Kota Baru</p>
                  <p className="text-muted-foreground text-sm mb-4">Jambi, Indonesia</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-google-maps"
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-card border border-border/50 rounded-2xl p-7">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-semibold mb-1">Chat on WhatsApp</h3>
                  <p className="text-muted-foreground text-sm mb-5">
                    Get an instant response! Chat with us directly on WhatsApp for orders, reservations, or any questions.
                  </p>
                  <a
                    href="https://wa.me/6287713909103?text=Halo%20FARIZAL%20COFFE!%20Saya%20ingin%20bertanya%20tentang%20menu%20Anda."
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-whatsapp"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Start WhatsApp Chat
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
