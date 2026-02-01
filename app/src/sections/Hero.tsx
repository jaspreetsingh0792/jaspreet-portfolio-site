import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Linkedin, Mail, Phone, Download, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image mask reveal with morphing effect
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
        {
          clipPath: 'circle(100% at 50% 50%)',
          opacity: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          delay: 0.2,
        }
      );

      // Headline character animation
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { y: '100%', opacity: 0, rotateX: -90 },
          {
            y: '0%',
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.03,
            ease: 'expo.out',
            delay: 0.4,
          }
        );
      }

      // Subheadline reveal
      gsap.fromTo(
        subheadlineRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.9,
        }
      );

      // Body fade in
      gsap.fromTo(
        bodyRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 1.1,
        }
      );

      // CTA buttons
      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 1.3,
        }
      );

      // Floating elements animation
      const floatingElements = floatingElementsRef.current?.querySelectorAll('.floating-item');
      if (floatingElements) {
        floatingElements.forEach((el, i) => {
          gsap.to(el, {
            y: `${Math.sin(i) * 15}`,
            x: `${Math.cos(i) * 10}`,
            duration: 3 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }

      // Parallax on scroll
      gsap.to(imageRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(headlineRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split headline into characters
  const headlineText = 'JASPREET SINGH';
  const chars = headlineText.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ perspective: '1000px' }}>
      <span className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-background"
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange/5 to-transparent rounded-full" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,76,17,0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,76,17,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen">
          {/* Left Content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 mb-6 w-fit">
              <Sparkles size={16} className="text-orange" />
              <span className="text-sm text-orange font-medium">Available for Opportunities</span>
            </div>

            <h1
              ref={headlineRef}
              className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-foreground leading-none mb-4"
            >
              {chars}
            </h1>

            <p
              ref={subheadlineRef}
              className="text-lg sm:text-xl lg:text-2xl text-orange font-medium mb-6"
            >
              Senior Security Risk Management | AI & GRC Specialist
            </p>

            <p
              ref={bodyRef}
              className="text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed mb-8"
            >
              Building AI-powered enterprise risk platforms and securing cloud infrastructure at Databricks. 
              8+ years driving cybersecurity, compliance, and governance excellence across global organizations.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-orange text-white font-medium rounded-full hover:bg-orange-600 transition-all duration-300 hover:shadow-glow group"
              >
                View My Experience
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </a>
              <a
                href="/JaspreetSingh_Resume_AI_Risk_Databricks_2026.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-border text-foreground font-medium rounded-full hover:bg-secondary transition-all duration-300"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/jaspreet-singh-266b01a4"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full border border-border text-muted-foreground hover:text-orange hover:border-orange transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-orange/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                <Linkedin size={20} className="relative z-10" />
              </a>
              <a
                href="mailto:jaspreetsingh.sitm@gmail.com"
                className="group p-3 rounded-full border border-border text-muted-foreground hover:text-orange hover:border-orange transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-orange/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                <Mail size={20} className="relative z-10" />
              </a>
              <a
                href="tel:+917720020333"
                className="group p-3 rounded-full border border-border text-muted-foreground hover:text-orange hover:border-orange transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-orange/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                <Phone size={20} className="relative z-10" />
              </a>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Floating decorative elements */}
              <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
                <div className="floating-item absolute -top-8 -left-8 w-20 h-20 border-2 border-orange/30 rounded-2xl" />
                <div className="floating-item absolute -bottom-4 -right-4 w-16 h-16 bg-orange/20 rounded-full blur-xl" />
                <div className="floating-item absolute top-1/4 -right-12 w-8 h-8 bg-orange/40 rounded-lg rotate-45" />
              </div>

              {/* Main image with morphing border */}
              <div
                ref={imageRef}
                className="relative w-full max-w-md lg:max-w-lg animate-morph overflow-hidden"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="/hero-profile.jpg"
                    alt="Jaspreet Singh"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Stats card */}
              <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-card border border-border rounded-xl p-4 backdrop-blur-lg shadow-xl">
                <p className="font-display text-3xl text-orange">8+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>

              {/* Location badge */}
              <div className="absolute -top-4 -left-4 lg:-left-8 bg-card border border-border rounded-xl px-4 py-2 backdrop-blur-lg shadow-xl">
                <p className="text-sm text-muted-foreground">📍 Amsterdam, NL</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-orange rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
