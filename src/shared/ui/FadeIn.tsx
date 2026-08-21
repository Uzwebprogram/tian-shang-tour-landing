import { motion, type HTMLMotionProps } from 'framer-motion';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';
import type { ReactNode } from 'react';

type FadeInProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  delay?: number;
  y?: number;
};

export function FadeIn({ children, delay = 0, y = 36, className, ...props }: FadeInProps) {
  const reduce = usePrefersReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
