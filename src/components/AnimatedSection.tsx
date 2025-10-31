import { motion } from "framer-motion";
import { ReactNode } from "react";
import { staggerContainer } from "@/lib/animations";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
}

const AnimatedSection = ({ 
  children, 
  className = "", 
  stagger = false,
  delay = 0 
}: AnimatedSectionProps) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger ? staggerContainer : undefined}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
