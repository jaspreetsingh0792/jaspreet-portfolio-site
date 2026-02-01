import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const companies = [
  { name: 'Databricks', logo: 'Databricks' },
  { name: 'Snowflake', logo: 'Snowflake' },
  { name: 'PwC', logo: 'PwC' },
  { name: 'ChargePoint', logo: 'ChargePoint' },
  { name: 'EY', logo: 'EY' },
];

export default function LogoStream() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Velocity-based marquee effect
      let scrollVelocity = 0;
      let baseSpeed = 50;

      const updateMarquee = () => {
        if (trackRef.current) {
          const currentTransform = gsap.getProperty(trackRef.current, 'x') as number;
          const newPosition = currentTransform - (baseSpeed + scrollVelocity) * 0.016;
          
          if (newPosition < -trackRef.current.scrollWidth / 2) {
            gsap.set(trackRef.current, { x: 0 });
          } else {
            gsap.set(trackRef.current, { x: newPosition });
          }
        }
        scrollVelocity *= 0.95;
        requestAnimationFrame(updateMarquee);
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          scrollVelocity = Math.abs(self.getVelocity()) * 0.1;
        },
      });

      requestAnimationFrame(updateMarquee);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-background border-y border-border overflow-hidden"
    >
      {/* Section header */}
      <div className="text-center mb-12 px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 mb-4">
          <Building2 size={16} className="text-orange" />
          <span className="text-sm text-orange font-medium">Trusted By</span>
        </div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Industry Leaders I've Worked With
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative overflow-hidden">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Marquee track */}
        <div ref={trackRef} className="flex items-center gap-16 whitespace-nowrap">
          {/* Double the items for seamless loop */}
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-8 py-4 group cursor-default"
            >
              <span className="font-display text-4xl lg:text-5xl text-muted-foreground/30 hover:text-orange transition-colors duration-500">
                {company.logo}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent" />
    </section>
  );
}
