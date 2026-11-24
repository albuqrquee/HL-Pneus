import { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 'some' as const,
  margin: '0px 0px -48px 0px',
};

export const headerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
};

export const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: MOTION_EASE },
  },
};

export const serviceCardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

export const serviceCardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, ease: MOTION_EASE },
  },
};

interface RevealBlockProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
}

export function RevealBlock({
  children,
  className,
  id,
  delay = 0,
  duration = 0.6,
  y = 22,
  x = 0,
}: RevealBlockProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration, delay, ease: MOTION_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealHeaderProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function RevealHeader({ children, className, id }: RevealHeaderProps) {
  return (
    <motion.div
      id={id}
      variants={headerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  id?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export function RevealStagger({
  children,
  className,
  id,
  staggerDelay = 0.06,
  delayChildren = 0.04,
}: RevealStaggerProps) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  hoverScale?: number;
}

export function RevealItem({
  children,
  className,
  y = 18,
  duration = 0.55,
  hoverScale,
}: RevealItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: MOTION_EASE },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={
        hoverScale
          ? {
              scale: hoverScale,
              transition: { duration: 0.18, ease: MOTION_EASE },
            }
          : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
