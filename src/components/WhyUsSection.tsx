import { motion } from 'motion/react';
import { PaintBrush, Chats, Lightning, ShieldCheck } from '@phosphor-icons/react';

const FEATURES = [
  {
    id: "01",
    title: "Built for your business, not a template",
    body: "Every automation, agent, or website is made to fit how you actually work, not copied from a generic playbook.",
    ctas: ["Custom builds", "No templates", "Tailored strategy"],
    icon: PaintBrush,
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: "02",
    title: "You'll actually understand what we're doing",
    body: "We explain everything in plain language. No tech overwhelm, no confusion, just clear communication at every step.",
    ctas: ["Plain language", "Full transparency", "No jargon"],
    icon: Chats,
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: "03",
    title: "AI that actually saves you time",
    body: "We only recommend automations and agents that genuinely free up your time or grow your revenue. No AI for the sake of it.",
    ctas: ["AI agents", "Automation", "Time saved"],
    icon: Lightning,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "04",
    title: "Try before you commit",
    body: "We offer risk-free pilots. You see the work before you pay. We're confident in what we deliver, and we want you to be too.",
    ctas: ["Risk-free pilot", "Pay after results", "Zero commitment"],
    icon: ShieldCheck,
    className: "md:col-span-1 md:row-span-1",
  }
];

export default function WhyUsSection() {
  /* --- WHY US SECTION --- 
     Value proposition and unique selling points.
  */
  return (
    <motion.section 
      id="why" 
      className="relative py-32 bg-black border-t border-white/5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
    >
      {/* Dynamic Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{
            x: [-100, 100, -50],
            y: [-50, 50, 0],
            scale: [1, 1.2, 0.9]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{
            x: [100, -100, 50],
            y: [50, -50, 0],
            scale: [1.2, 0.9, 1.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-orange-600/10 blur-[140px] rounded-full" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-orange-500/[0.03] to-transparent" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-white/30" />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-white/50">
                The Advantage
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter uppercase">
              WHY <span className="font-display italic text-white/70">US</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-md text-sm md:text-base font-light leading-relaxed">
            We don't just build things. We build things that actually work for you. No jargon. No overpromising. Just practical AI tools, automations, and websites built around how your business actually runs.
          </p>
        </motion.div>

        <div className="relative flex flex-col md:grid md:grid-cols-3 md:auto-rows-[minmax(320px,auto)] gap-8 mt-12 md:mt-0">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative rounded-[2rem] overflow-hidden flex flex-col justify-between p-8 md:p-10 ${feature.className} border border-white/10 ${
                index % 2 === 0 ? 'bg-[#E85D34]' : 'bg-[#C83A22]'
              } 
                /* Mobile Stacking Logic — Strictly isolated from desktop */
                sticky top-[var(--stack-top)] md:relative md:top-auto
              `}
              style={{ 
                zIndex: index,
                // Use a CSS variable to keep the dynamic calc out of the main 'top' style property
                // This prevents it from overriding the Tailwind md:top-auto class on desktop
                '--stack-top': `calc(120px + ${index * 24}px)`
              } as any}
            >
              {/* HEATMAP MESH GRADIENT — Alternating between Brand Orange and Deep Reddish Orange */}
              <div className="absolute inset-0 z-0">
                <div className={`absolute inset-0 opacity-100 bg-gradient-to-br ${
                  index % 2 === 0 
                  ? 'from-[#E85D34] via-[#D14D2A] to-[#E85D34]' 
                  : 'from-[#C83A22] via-[#A82A1A] to-[#C83A22]'
                }`} />
                
                {/* Secondary Pulsing Heat Surface */}
                <motion.div 
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                    x: index % 2 === 0 ? [0, 50, 0] : [0, -50, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute -top-1/4 ${index % 2 === 0 ? '-right-1/4' : '-left-1/4'} w-[150%] h-[150%] bg-gradient-radial from-[#F2A65A]/40 to-transparent blur-[100px]`} 
                />

                {/* Dark Depth Spot */}
                <motion.div 
                  animate={{
                    opacity: [0.4, 0.2, 0.4],
                    scale: [0.8, 1.1, 0.8]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: index * 2 }}
                  className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-black/40 blur-[80px] rounded-full" 
                />

                {/* Subtle Grain Texture */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" 
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />
              </div>


              {/* Top Section: Icon & ID */}
              <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-500">
                  <feature.icon className="w-6 h-6 text-white" weight="duotone" />
                </div>
                <span className="font-mono text-sm text-white/40">
                  {feature.id}
                </span>
              </div>

              {/* Bottom Section: Content */}
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-sm md:text-base font-light leading-relaxed mb-8">
                  {feature.body}
                </p>

                {/* Tags */}
                {feature.ctas && feature.ctas.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {feature.ctas.map(cta => (
                      <span 
                        key={cta} 
                        className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/90 text-[10px] md:text-xs tracking-wider uppercase backdrop-blur-sm"
                      >
                        {cta}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  );
}
