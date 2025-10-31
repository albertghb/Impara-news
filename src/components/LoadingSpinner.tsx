import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  text?: string;
}

const LoadingSpinner = ({ size = "md", color = "green", text }: LoadingSpinnerProps) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  const colors = {
    green: "border-green-600",
    blue: "border-blue-600",
    purple: "border-purple-600",
    red: "border-red-600"
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <motion.div
        className={`${sizes[size]} border-4 ${colors[color as keyof typeof colors] || colors.green} border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Pulsing Dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`w-3 h-3 rounded-full ${colors[color as keyof typeof colors] || colors.green} bg-current`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Loading Text */}
      {text && (
        <motion.p
          className="text-gray-600 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
