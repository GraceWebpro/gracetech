import { motion } from "framer-motion";

export default function Example() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Start position
      animate={{ opacity: 1, y: 0 }} // Animation when mounted
      transition={{ duration: 0.5 }} // Animation duration
    >
      Hello, Framer Motion! 👋
    </motion.div>
  );
}
