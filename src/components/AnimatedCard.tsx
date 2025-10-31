import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  onClick?: () => void;
}

const AnimatedCard = ({ 
  children, 
  className = "", 
  delay = 0, 
  hover = true,
  onClick 
}: AnimatedCardProps) => {
  const hoverAnimation = hover ? {
    scale: 1.03,
    y: -8
  } : undefined;

  const tapAnimation = hover ? { scale: 0.98 } : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.6, -0.05, 0.01, 0.99] 
      }}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${hover ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
