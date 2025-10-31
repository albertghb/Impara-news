import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowingBadgeProps {
  children: ReactNode;
  color?: "green" | "blue" | "red" | "purple" | "yellow";
  pulse?: boolean;
  className?: string;
}

const GlowingBadge = ({ 
  children, 
  color = "green", 
  pulse = true,
  className = "" 
}: GlowingBadgeProps) => {
  const colors = {
    green: "bg-green-600 shadow-green-500/50",
    blue: "bg-blue-600 shadow-blue-500/50",
    red: "bg-red-600 shadow-red-500/50",
    purple: "bg-purple-600 shadow-purple-500/50",
    yellow: "bg-yellow-600 shadow-yellow-500/50"
  };

  return (
    <motion.span
      className={`
        inline-flex items-center px-3 py-1 rounded-full 
        text-white text-sm font-bold
        ${colors[color]}
        ${className}
      `}
      animate={pulse ? {
        boxShadow: [
          "0 0 10px rgba(34, 197, 94, 0.5)",
          "0 0 20px rgba(34, 197, 94, 0.8)",
          "0 0 10px rgba(34, 197, 94, 0.5)"
        ]
      } : {}}
      transition={pulse ? {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      } : {}}
    >
      {children}
    </motion.span>
  );
};

export default GlowingBadge;
