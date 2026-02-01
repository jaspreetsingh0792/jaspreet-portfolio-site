import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    const percentage = percentageRef.current;
    if (!progress || !percentage) return;

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progressValue = self.progress * 100;
        gsap.to(progress, {
          scaleX: self.progress,
          duration: 0.1,
          ease: 'none',
        });
        if (percentage) {
          percentage.textContent = `${Math.round(progressValue)}%`;
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === document.body) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border z-[100]">
        <div
          ref={progressRef}
          className="h-full bg-orange origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
      
      {/* Percentage indicator */}
      <div className="fixed bottom-6 right-6 z-50 hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Scroll</span>
        <span ref={percentageRef} className="text-sm font-mono text-orange">0%</span>
      </div>
    </>
  );
}
