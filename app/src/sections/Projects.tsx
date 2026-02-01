import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'AI Risk Management Platform',
    company: 'Databricks',
    description:
      'Designed and implemented an AI-powered enterprise risk management platform using Databricks Lakehouse architecture. The platform automates security risk intake, classification, scoring, and lifecycle tracking across engineering, IT, and security teams.',
    image: '/project-ai-risk.jpg',
    technologies: [
      'Databricks Lakehouse',
      'Mosaic AI',
      'Delta Tables',
      'LLMs',
      'Vector Search',
      'MITRE ATT&CK',
    ],
    metrics: [
      { label: 'Risk Items Tracked', value: '10K+' },
      { label: 'Automation', value: '85%' },
    ],
    links: {
      demo: '#',
      github: '#',
    },
  },
  {
    title: 'FedRAMP Compliance Program',
    company: 'Snowflake',
    description:
      'Led the FedRAMP (Federal Risk and Authorization Management Program) compliance initiative for Snowflake Data Cloud. Conducted comprehensive gap assessments and coordinated cross-functional efforts to achieve federal authorization.',
    image: '/project-compliance.jpg',
    technologies: [
      'FedRAMP Rev 5',
      'IRAP',
      'Common Controls Framework',
      'SDLC Security',
      'Compliance Automation',
    ],
    metrics: [
      { label: 'Controls Implemented', value: '325+' },
      { label: 'Compliance Score', value: '98%' },
    ],
    links: {
      demo: '#',
      github: '#',
    },
  },
  {
    title: 'GRC Implementation',
    company: 'ChargePoint',
    description:
      'Implemented LogicGate as a comprehensive GRC solution, creating a Common Control Framework (CCF), Third Party Risk Management (TPRM), and InfoSec Risk Management modules. Enabled senior management with continuous security insights.',
    image: '/project-grc.jpg',
    technologies: [
      'LogicGate',
      'NIST 800-171',
      'TPRM',
      'Policy Management',
      'Audit Management',
    ],
    metrics: [
      { label: 'Vendors Assessed', value: '200+' },
      { label: 'Processes Automated', value: '15' },
    ],
    links: {
      demo: '#',
      github: '#',
    },
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

      // Slider entrance
      gsap.fromTo(
        sliderRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sliderRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        const next = (currentIndex + 1) % projects.length;
        goToSlide(next);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);

    const direction = index > currentIndex ? 1 : -1;
    const currentSlide = sliderRef.current?.querySelector(`[data-slide="${currentIndex}"]`);
    const nextSlide = sliderRef.current?.querySelector(`[data-slide="${index}"]`);

    if (currentSlide && nextSlide) {
      gsap.to(currentSlide, {
        x: -100 * direction + '%',
        opacity: 0,
        duration: 0.6,
        ease: 'power3.inOut',
      });

      gsap.fromTo(
        nextSlide,
        { x: 100 * direction + '%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          duration: 0.6,
          ease: 'power3.inOut',
          onComplete: () => {
            setCurrentIndex(index);
            setIsAnimating(false);
          },
        }
      );
    }
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % projects.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentIndex - 1 + projects.length) % projects.length;
    goToSlide(prev);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange/5 rounded-full blur-[150px]" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 mb-6">
            <Layers size={16} className="text-orange" />
            <span className="text-sm text-orange font-medium">Portfolio</span>
          </div>
          <h2 className="font-display text-5xl lg:text-7xl text-foreground mb-6">
            KEY PROJECTS
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transformative security and compliance initiatives delivered for 
            leading technology organizations.
          </p>
        </div>

        {/* Project Slider */}
        <div ref={sliderRef} className="relative max-w-6xl mx-auto">
          {/* Slides container */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            {projects.map((project, index) => (
              <div
                key={index}
                data-slide={index}
                className={`${
                  index === currentIndex ? 'relative' : 'absolute inset-0'
                }`}
                style={{
                  opacity: index === currentIndex ? 1 : 0,
                  transform: index === currentIndex ? 'translateX(0)' : 'translateX(100%)',
                }}
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[550px] overflow-hidden group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 lg:bg-gradient-to-l" />
                    
                    {/* Company badge */}
                    <div className="absolute top-6 left-6 px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full border border-border">
                      <span className="text-sm font-medium text-orange">{project.company}</span>
                    </div>

                    {/* Image overlay links */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                      <a
                        href={project.links.demo}
                        className="p-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-orange transition-colors"
                      >
                        <ExternalLink size={24} className="text-white" />
                      </a>
                      <a
                        href={project.links.github}
                        className="p-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-orange transition-colors"
                      >
                        <Github size={24} className="text-white" />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-8 lg:p-12 bg-card">
                    <h3 className="font-display text-3xl lg:text-4xl text-foreground mb-4">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-8">
                      <p className="text-sm text-muted-foreground uppercase tracking-wider mb-3">
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-lg border border-border hover:border-orange/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="flex gap-8 mb-8">
                      {project.metrics.map((metric, mIndex) => (
                        <div key={mIndex}>
                          <p className="font-display text-3xl text-orange mb-1">
                            {metric.value}
                          </p>
                          <p className="text-sm text-muted-foreground">{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex gap-4">
                      <a
                        href={project.links.demo}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white font-medium rounded-full hover:bg-orange-600 transition-colors"
                      >
                        View Details
                        <ExternalLink size={18} />
                      </a>
                      <a
                        href={project.links.github}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-full hover:bg-secondary transition-colors"
                      >
                        <Github size={18} />
                        Source
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-orange w-8'
                      : 'bg-border hover:bg-muted-foreground w-3'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="p-3 rounded-full border border-border text-foreground hover:bg-secondary hover:border-orange transition-all duration-300 disabled:opacity-50"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="p-3 rounded-full border border-border text-foreground hover:bg-secondary hover:border-orange transition-all duration-300 disabled:opacity-50"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
