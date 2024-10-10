import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CountUp } from "./count-up"
import { motion } from "framer-motion"
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}
function StatisticCard(props: { color: "blue" | "green" | "red", content: string, stats:number}) {
  return (
    <motion.div 
      className="bg-indigo-700 rounded-lg shadow-xl p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
           <div className="text-4xl font-bold text-blue-300 mb-2">
        <CountUp target={props.stats} duration={1000} colorScheme={props.color} />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{props.content}</h3>

    </motion.div>
  );
}

export function Statistics() {
  return (
    <motion.div 
    className="grid md:grid-cols-2 gap-8 mb-12"
    variants={fadeIn}
  >
    <StatisticCard color="green" content="of people are eligible for overtime pay" stats={60} />
    <StatisticCard color="red" content="of employers do not pay what is owed" stats={30} />

  </motion.div> 
  )
}