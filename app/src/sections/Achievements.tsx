import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Award,
  Trophy,
  BookOpen,
  Star,
  TrendingUp,
  FileBadge,
  Target,
  Rocket,
  Shield,
  Lock,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  { name: 'ISO 27001:2013 Lead Implementer', icon: Shield },
  { name: 'ISO 9001:2015 Lead Auditor', icon: FileBadge },
  { name: 'BS 10012 PIMS / GDPR Training', icon: Lock },
  { name: 'ITIL V3 Foundation', icon: Target },
  { name: 'BCMS ISO 22301:2012', icon: Rocket },
  { name: 'Revenue Assurance Foundation', icon: TrendingUp },
  { name: 'LogicGate GRC Power User', icon: Award },
  { name: 'EY Cybersecurity', icon: Star },
];

const achievements = [
  {
    icon: Trophy,
    title: 'Top Performer Awards',
    description: 'Received Top Performer awards in 2017, 2018, and 2020 at PwC India',
    year: '2017-2020',
  },
  {
    icon: TrendingUp,
    title: 'Fast-Track Promotion',
    description: 'Promoted through fast-track mode to senior level at PwC',
    year: '2019',
  },
  {
    icon: Star,
    title: 'Client Recognition',
    description: '5+ client appreciation awards and recognitions for exceptional delivery',
    year: '2016-2021',
  },
  {
    icon: BookOpen,
    title: 'Published Research',
    description: 'Authored research paper on Corporate Social Responsibility published in ICSMS 2015 journal',
    year: '2015',
  },
];

const stats = [
  { value: '8+', label: 'Years Experience', suffix: '' },
  { value: '5', label: 'Companies', suffix: '' },
  { value: '50', label: 'Projects Delivered', suffix: '+' },
  { value: '8', label: 'Certifications', suffix: '' },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

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

      // Stats counter animation
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => {
          stats.forEach((stat, index) => {
            const numValue = parseInt(stat.value.replace(/\D/g, ''));
            gsap.to(
              { value: 0 },
              {
                value: numValue,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function () {
                  setAnimatedStats((prev) => {
                    const newStats = [...prev];
                    newStats[index] = Math.round(this.targets()[0].value);
                    return newStats;
                  });
                },
              }
            );
          });
        },
        once: true,
      });

      // Stats items animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Certifications animation
      const certItems = certsRef.current?.querySelectorAll('.cert-item');
      if (certItems) {
        gsap.fromTo(
          certItems,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: certsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Achievements animation
      const achievementItems = achievementsRef.current?.querySelectorAll('.achievement-item');
      if (achievementItems) {
        gsap.fromTo(
          achievementItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: achievementsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 mb-6">
            <Trophy size={16} className="text-orange" />
            <span className="text-sm text-orange font-medium">Recognition</span>
          </div>
          <h2 className="font-display text-5xl lg:text-7xl text-foreground mb-6">
            ACHIEVEMENTS & CERTIFICATIONS
          </h2>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 lg:mb-24"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item text-center p-6 lg:p-8 rounded-2xl bg-card/50 border border-border hover:border-orange/30 transition-all duration-300 group"
            >
              <p className="font-display text-4xl lg:text-5xl text-orange mb-2 group-hover:scale-110 transition-transform">
                {animatedStats[index]}{stat.suffix}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Certifications */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-orange/10">
                <FileBadge className="text-orange" size={24} />
              </div>
              <h3 className="font-display text-2xl lg:text-3xl text-foreground">
                CERTIFICATIONS
              </h3>
            </div>

            <div ref={certsRef} className="grid gap-3">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <div
                    key={index}
                    className="cert-item flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-orange/30 transition-all duration-300 group hover:bg-card"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange/20 transition-colors">
                      <Icon size={20} className="text-orange" />
                    </div>
                    <span className="text-foreground text-sm font-medium">{cert.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-orange/10">
                <Trophy className="text-orange" size={24} />
              </div>
              <h3 className="font-display text-2xl lg:text-3xl text-foreground">
                RECOGNITIONS
              </h3>
            </div>

            <div ref={achievementsRef} className="space-y-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className="achievement-item p-6 rounded-xl bg-card/50 border border-border hover:border-orange/30 transition-all duration-300 group hover:bg-card"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-orange/10 flex-shrink-0 group-hover:bg-orange/20 transition-colors">
                        <Icon size={20} className="text-orange" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-display text-lg text-foreground">
                            {achievement.title}
                          </h4>
                          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                            {achievement.year}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
