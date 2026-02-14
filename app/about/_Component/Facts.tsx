
import { motion } from "framer-motion";

function Facts({ quickFacts }: any) {
    return (
        <section className="py-20 bg-black/50 backdrop-blur-sm relative z-10">
            <div className="ratio grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
                {quickFacts.map((fact: any, i: any) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-md bg-white/5 border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 transition-colors"
                    >
                        <div className="primary-text2 mb-4 group-hover:scale-125 transition-transform duration-300">
                            {fact.icon}
                        </div>
                        <span className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1">{fact.label}</span>
                        <span className="text-sm font-bold text-white">{fact.value}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Facts