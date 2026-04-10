import Image from "next/image";

export default function Journey({ journeyEvents }: any) {
  return (
    <section className="   relative z-10">
      <div className="">
        <div className="flex flex-col gap-30">
          {journeyEvents.map((event: any, index: any) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-16 md:gap-32`}
            >
              <div
                className="flex-1 w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="relative aspect-[16/10] primary-rounded overflow-hidden group shadow-2xl">
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
              </div>

              <div
                className="flex-1 space-y-8"
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                  {event.title.split(" ").map((word: any, i: any) => (
                    <span key={i} className={i === 0 ? "primary-text2" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed font-medium text-justify">
                  {event.description}
                </p>
                <div className="flex gap-4">
                  <div className="h-[1px] w-20 bg-[#FF0055] mt-4" />
                  <div className="p-4 primary-text4 primary-rounded border primary-border primary-text2">
                    {event.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
