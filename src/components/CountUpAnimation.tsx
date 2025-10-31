import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

interface CountUpAnimationProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const CountUpAnimation = ({ 
  value, 
  duration = 2, 
  suffix = "", 
  prefix = "",
  className = "" 
}: CountUpAnimationProps) => {
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
};

export default CountUpAnimation;
