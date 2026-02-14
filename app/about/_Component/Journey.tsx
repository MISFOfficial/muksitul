import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Journey({ journeyEvents }: any) {
    return (
        <section className=" bg-black relative z-10">
            <div className="">
                <div className="space-y-48">
                    {journeyEvents.map((event: any, index: any) => (
                        <div
                            key={index}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-32`}
                        >
                            <motion.div
                                className="flex-1 w-full"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden group shadow-2xl">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                    <div className="absolute bottom-8 left-8">
                                        <span className="px-4 py-2 rounded-full bg-[#FF0055] text-white text-[10px] font-black uppercase tracking-widest">
                                            {event.year}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex-1 space-y-8"
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                                    {event.title.split(' ').map((word: any, i: any) => (
                                        <span key={i} className={i === 0 ? 'text-[#20255e]' : ''}>{word} </span>
                                    ))}
                                </h2>
                                <p className="text-xl text-gray-400 leading-relaxed font-medium text-justify">
                                    {event.description}
                                </p>
                                <div className="flex gap-4">
                                    <div className="h-[1px] w-20 bg-[#FF0055] mt-4" />
                                    <div className="p-4 bg-white/5 rounded-md border border-white/10 primary-text2">
                                        {event.icon}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
