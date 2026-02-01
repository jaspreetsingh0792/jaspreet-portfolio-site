import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Send,
  ArrowUpRight,
  MessageSquare,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Amsterdam, Netherlands',
    href: null,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'jaspreetsingh.sitm@gmail.com',
    href: 'mailto:jaspreetsingh.sitm@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 7720020333',
    href: 'tel:+917720020333',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/jaspreet-singh',
    href: 'https://www.linkedin.com/in/jaspreet-singh-266b01a4',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Info animation
      gsap.fromTo(
        infoRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange/5 rounded-full blur-[200px]" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 mb-6">
            <MessageSquare size={16} className="text-orange" />
            <span className="text-sm text-orange font-medium">Get in Touch</span>
          </div>
          <h2 className="font-display text-5xl lg:text-7xl text-foreground mb-6">
            LET'S CONNECT
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Open to opportunities in security leadership, AI governance, and 
            enterprise risk management. Let's discuss how I can contribute to your organization.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {submitted ? (
              <div className="p-8 rounded-2xl bg-card border border-orange/30 text-center">
                <div className="w-16 h-16 rounded-full bg-orange/10 flex items-center justify-center mx-auto mb-4">
                  <Send size={28} className="text-orange" />
                </div>
                <h3 className="font-display text-2xl text-foreground mb-2">
                  MESSAGE SENT!
                </h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-orange focus:ring-orange/20 rounded-xl h-12"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-orange focus:ring-orange/20 rounded-xl h-12"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-orange focus:ring-orange/20 rounded-xl h-12"
                    placeholder="Job Opportunity / Collaboration"
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-orange focus:ring-orange/20 rounded-xl resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-orange hover:bg-orange-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-glow disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send size={18} />
                    </span>
                  )}
                </Button>
              </>
            )}
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="font-display text-2xl text-foreground mb-6">
                CONTACT INFORMATION
              </h3>
              <p className="text-muted-foreground mb-8">
                Feel free to reach out through any of the following channels. 
                I'm always open to discussing new opportunities and collaborations.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-orange/30 transition-all duration-300 group hover:bg-card">
                    <div className="w-12 h-12 rounded-lg bg-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange/20 transition-colors">
                      <Icon size={20} className="text-orange" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground font-medium truncate">{item.value}</p>
                    </div>
                    {item.href && (
                      <ArrowUpRight
                        size={18}
                        className="text-muted-foreground group-hover:text-orange transition-colors flex-shrink-0"
                      />
                    )}
                  </div>
                );

                return item.href ? (
                  <a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>

            {/* Availability badge */}
            <div className="p-6 rounded-xl bg-orange/5 border border-orange/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-foreground">Available for Opportunities</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Currently open to senior security leadership roles in AI governance, 
                enterprise risk management, and GRC strategy.
              </p>
            </div>

            {/* Calendar CTA */}
            <a
              href="https://calendly.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-orange/30 transition-all duration-300 group hover:bg-card"
            >
              <div className="w-12 h-12 rounded-lg bg-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange/20 transition-colors">
                <Calendar size={20} className="text-orange" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Schedule a Call</p>
                <p className="text-foreground font-medium">Book a 30-min consultation</p>
              </div>
              <ArrowUpRight
                size={18}
                className="text-muted-foreground group-hover:text-orange transition-colors"
              />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-display text-2xl text-foreground">JS</span>
              <p className="text-sm text-muted-foreground">
                © 2025 Jaspreet Singh. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/jaspreet-singh-266b01a4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-orange transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:jaspreetsingh.sitm@gmail.com"
                className="text-sm text-muted-foreground hover:text-orange transition-colors"
              >
                Email
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-orange transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
