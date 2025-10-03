"use client";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Reveal = ({ children, delay = 0.1, y = 24, className }: RevealProps) => {
  const controls = useAnimation();
  useEffect(() => {
    const onScroll = () => {
      controls.start("visible");
    };
    // Start immediately; framer will only animate once in view when used with viewport
    controls.start("visible");
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      animate={controls}
      variants={variants}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;


