import { CountUp } from "@/components/ui/count-up"
import { motion } from "framer-motion"
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}
function StatisticCard(props: { color: "blue" | "green" | "red", content: string, stats: number, duration?: number }) {
  return (
    <motion.div
      className="site-card-bg rounded-lg shadow-xl p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="w-full flex justify-center items-center text-4xl font-bold text-blue-300 mb-2">
        <CountUp target={props.stats} duration={props.duration || 1000} colorScheme={props.color} />
      </div>
      <h3 className="text-2xl font-normal text-white mb-2 mt-5">{props.content}</h3>

    </motion.div>
  );
}

export function Statistics() {
  return (
    <motion.div
      className="grid md:grid-cols-2 gap-8 mb-12"
      variants={fadeIn}
    >
      <StatisticCard color="green" content="of people are eligible for overtime pay" stats={60} duration={1000} />
      <StatisticCard color="red" content="of employers do not pay what is owed" stats={30} duration={2000} />

    </motion.div>
  )
}