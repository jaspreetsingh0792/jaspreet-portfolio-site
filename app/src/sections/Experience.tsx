import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Briefcase, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'Databricks',
    role: 'Senior Security Risk Management',
    location: 'Amsterdam, Netherlands',
    period: 'Sept 2024 – Present',
    description:
      'Leading the design and implementation of an AI-powered enterprise risk management platform using Databricks Lakehouse, Delta tables, and Mosaic AI. Building intelligent risk classification pipelines leveraging LLMs and vector search to map vulnerabilities to MITRE ATT&CK framework.',
    highlights: [
      'Built unified risk register and leadership dashboards integrating Jira, Confluence, and vulnerability scanners',
      'Implemented automated security exception workflows using Jira Automation and Tines',
      'Designed advanced risk scoring models for data-driven prioritization',
      'Authored executive and board-level risk reports and AI governance documentation',
    ],
    color: '#ff4c11',
  },
  {
    company: 'Snowflake',
    role: 'Senior Security Analyst',
    location: 'Pune, India',
    period: 'Nov 2022 – Sept 2024',
    description:
      'Engaged with Snowflake engineering and product teams to ensure implementation of security controls within the Snowflake Data Cloud product. Ensured consistent implementation of security controls in accordance with the Common Controls Framework.',
    highlights: [
      'Conducted gap assessment of FedRAMP baseline Rev 5 for Snowflake Data Cloud',
      'Led and coordinated efforts for achieving IRAP compliance',
      'Automated customer security questionnaire process, increasing efficiency and accuracy',
      'Collaborated with engineering teams to evaluate compliance impact during SDLC',
    ],
    color: '#29b5e8',
  },
  {
    company: 'ChargePoint Technologies',
    role: 'Senior Security, Risk and Compliance',
    location: 'Gurgaon, India',
    period: 'Aug 2021 – Nov 2022',
    description:
      'Implemented LogicGate as a GRC solution including Common Control Framework (CCF), Third Party Risk Management (TPRM), and InfoSec Risk Management. Led NIST 800-171 implementation and policy revision initiatives.',
    highlights: [
      'Implemented GRC solution enabling senior management insights into security requirements',
      'Created TPRM process for vendor security assessments and mitigation planning',
      'Performed gap assessment against NIST 800-171 standard',
      'Managed audit programs and revised training and awareness campaigns',
    ],
    color: '#00b050',
  },
  {
    company: 'PwC India',
    role: 'Assistant Manager, IT GRC & Data Privacy',
    location: 'Gurgaon, India',
    period: 'July 2018 – Aug 2021',
    description:
      'Led IT Audit Centre of Excellence with US, UK, and Canada PwC Member Firms. Managed multiple ISO 27001 implementations and established vendor risk management frameworks for global clients.',
    highlights: [
      'Led IT Audit CoE engagements across IT operations, security, and governance',
      'Established vendor risk management framework classifying 200+ vendors',
      'Led multiple ISO 27001:2013 implementations for e-commerce and manufacturing',
      'Developed AUA/KUA Compliance Audit Framework for Aadhaar authentication',
    ],
    color: '#d04a02',
  },
  {
    company: 'PwC India',
    role: 'Consultant, IT GRC & Data Privacy',
    location: 'Gurgaon, India',
    period: 'June 2016 – June 2018',
    description:
      'Performed IT risk assessments, information security audits, and data privacy engagements. Assisted in ISO 27001 implementation for largest e-commerce firm in India.',
    highlights: [
      'Conducted IT Risk Assessments for Government PSU Bank, FMCG, and manufacturing',
      'Performed Data Privacy Impact Assessments and defined Data Flow Diagrams',
      'Designed cybersecurity processes for incident response and SOC operations',
      'Assisted in ISO 27001:2013 implementation for largest e-commerce firm',
    ],
    color: '#d04a02',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

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

      // Timeline items animation
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      if (items) {
        items.forEach((item, index) => {
          gsap.fromTo(
            item,
            { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // Progress bar animation
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/experience-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Orange glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-orange/5 rounded-full blur-[150px]" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 mb-6">
            <Briefcase size={16} className="text-orange" />
            <span className="text-sm text-orange font-medium">Career Path</span>
          </div>
          <h2 className="font-display text-5xl lg:text-7xl text-foreground mb-6">
            PROFESSIONAL EXPERIENCE
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A progressive career spanning top technology firms and consulting giants,
            delivering security excellence across global organizations.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-1/2" />
          
          {/* Progress line */}
          <div
            ref={progressRef}
            className="absolute left-4 lg:left-1/2 top-0 w-px bg-orange lg:-translate-x-1/2 origin-top"
            style={{ height: '100%' }}
          />

          {/* Experience items */}
          <div className="space-y-8 lg:space-y-12">
            {experiences.map((exp, index) => {
              const isExpanded = expandedIndex === index;
              
              return (
                <div
                  key={index}
                  className={`timeline-item relative flex flex-col lg:flex-row gap-6 lg:gap-12 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div 
                    className="absolute left-4 lg:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 mt-2 z-10 shadow-glow transition-all duration-300"
                    style={{ 
                      backgroundColor: exp.color,
                      boxShadow: `0 0 20px ${exp.color}50`,
                    }}
                  />

                  {/* Content */}
                  <div
                    className={`pl-12 lg:pl-0 lg:w-1/2 ${
                      index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'
                    }`}
                  >
                    <div 
                      className="group p-6 lg:p-8 rounded-2xl bg-card/80 border border-border hover:border-orange/30 transition-all duration-500 cursor-pointer"
                      onClick={() => toggleExpand(index)}
                    >
                      {/* Company & Role */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-1">
                            {exp.company}
                          </h3>
                          <p className="font-medium" style={{ color: exp.color }}>{exp.role}</p>
                        </div>
                        <ChevronDown 
                          size={24} 
                          className={`text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </div>

                      {/* Meta info */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {exp.period}
                        </span>
                      </div>

                      {/* Description - always visible */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Highlights - expandable */}
                      <div 
                        className={`overflow-hidden transition-all duration-500 ${
                          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm font-medium text-foreground mb-3">Key Achievements:</p>
                          <ul className="space-y-2">
                            {exp.highlights.map((highlight, hIndex) => (
                              <li
                                key={hIndex}
                                className="text-sm text-muted-foreground flex items-start gap-2"
                              >
                                <span style={{ color: exp.color }}>•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
