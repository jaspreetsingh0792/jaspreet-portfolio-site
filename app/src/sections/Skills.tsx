import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Brain,
  Cloud,
  Shield,
  FileCheck,
  Users,
  Lock,
  ChevronRight,
  Zap,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    icon: Brain,
    title: 'AI-Powered Risk Management',
    description:
      'Leveraging Databricks Lakehouse, Delta tables, and Mosaic AI to automate security risk intake, classification, and lifecycle tracking.',
    technologies: ['Databricks', 'LLMs', 'Mosaic AI', 'Vector Search'],
    color: '#ff4c11',
  },
  {
    icon: Cloud,
    title: 'Cloud Security & Compliance',
    description:
      'Ensuring FedRAMP, IRAP, and industry framework compliance for cloud data platforms and infrastructure.',
    technologies: ['Snowflake', 'FedRAMP', 'IRAP', 'SDLC'],
    color: '#29b5e8',
  },
  {
    icon: Shield,
    title: 'GRC Implementation',
    description:
      'Building comprehensive Governance, Risk, and Compliance frameworks with automated workflows and real-time monitoring.',
    technologies: ['LogicGate', 'NIST 800-171', 'ISO 27001', 'CCF'],
    color: '#00b050',
  },
  {
    icon: FileCheck,
    title: 'Security Governance',
    description:
      'Designing and implementing security policies, procedures, and control frameworks aligned with industry standards.',
    technologies: ['Policy Design', 'Audit Management', 'Controls Testing'],
    color: '#f59e0b',
  },
  {
    icon: Users,
    title: 'Third-Party Risk',
    description:
      'Establishing vendor risk management frameworks, security assessments, and mitigation strategies.',
    technologies: ['TPRM', 'Vendor Assessment', 'Risk Profiling'],
    color: '#8b5cf6',
  },
  {
    icon: Lock,
    title: 'Privacy & Data Protection',
    description:
      'Implementing privacy compliance programs including GDPR, PIMS, and data flow mapping.',
    technologies: ['GDPR', 'PIMS', 'Data Privacy', 'Impact Assessment'],
    color: '#ec4899',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange/5 rounded-full blur-[150px] -translate-y-1/2" />
      
      {/* Animated grid */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,76,17,0.5) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 mb-6">
            <Zap size={16} className="text-orange" />
            <span className="text-sm text-orange font-medium">What I Do Best</span>
          </div>
          <h2 className="font-display text-5xl lg:text-7xl text-foreground mb-6">
            CORE COMPETENCIES
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized skills in cybersecurity, risk management, and compliance 
            built over 8+ years of industry experience.
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          style={{ perspective: '1000px' }}
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className="skill-card group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onMouseMove={handleMouseMove}
                style={{
                  transform: isHovered
                    ? 'rotateX(0deg) rotateY(0deg) translateZ(20px)'
                    : 'rotateX(5deg) rotateY(-3deg)',
                  transition: 'transform 0.4s ease-out',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className={`relative h-full p-6 lg:p-8 rounded-2xl border transition-all duration-500 overflow-hidden ${
                    isHovered
                      ? 'bg-card border-orange/50 shadow-glow'
                      : 'bg-card/50 border-border'
                  }`}
                >
                  {/* Spotlight effect */}
                  {isHovered && (
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${skill.color} 0%, transparent 50%)`,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-all duration-500 relative z-10`}
                    style={{
                      backgroundColor: isHovered ? skill.color : `${skill.color}20`,
                      color: isHovered ? '#fff' : skill.color,
                    }}
                  >
                    <Icon size={28} className={isHovered ? 'animate-spin' : ''} style={{ animationDuration: '0.5s' }} />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-2xl text-foreground mb-3 relative z-10">
                    {skill.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 relative z-10">
                    {skill.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {skill.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full border border-border hover:border-orange/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Hover arrow */}
                  <div
                    className={`absolute bottom-6 right-6 transition-all duration-300 ${
                      isHovered
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-2'
                    }`}
                  >
                    <ChevronRight className="text-orange" size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
