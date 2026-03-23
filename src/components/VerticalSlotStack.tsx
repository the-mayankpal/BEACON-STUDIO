import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { animate } from 'motion';

const SLOTS_DATA = [
  { id: 'slot_01', label: 'Slot 01', status: 'assigned' },
  { id: 'slot_02', label: 'Slot 02', status: 'assigned' },
  { id: 'slot_03', label: 'Slot 03', status: 'assigned' },
  { id: 'slot_04', label: 'Slot 04', status: 'assigned' },
  { id: 'slot_05', label: 'Slot 05', status: 'assigned' },
  { id: 'slot_06', label: 'Slot 06', status: 'available' },
];

const CARD_H   = 64;  // card height px
const CARD_GAP = 12;  // gap between cards px
const STEP     = CARD_H + CARD_GAP; // 76px per slot row

export default function VerticalSlotStack() {
  const [slots, setSlots] = useState(SLOTS_DATA);
  const stripY   = useMotionValue(0);
  const isPaused = useRef(false);
  const running  = useRef(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      if (isPaused.current) { timer = setTimeout(cycle, 300); return; }
      running.current = true;

      // Slide the whole strip UP by exactly one STEP
      animate(stripY, -STEP, {
        duration : 0.72,
        ease     : [0.25, 0.46, 0.45, 0.94], // smooth cubic-bezier
        onComplete: () => {
          // Instant snap — invisible to the eye because clone fills the gap
          stripY.set(0);
          // Rotate: card[0] leaves the top, reappears as clone at the bottom
          setSlots(prev => {
            const next  = [...prev];
            const first = next.shift()!;
            next.push(first);
            return next;
          });
          running.current = false;
          timer = setTimeout(cycle, 2000); // pause before next cycle
        },
      });
    };

    timer = setTimeout(cycle, 1500); // initial delay
    return () => clearTimeout(timer);
  }, []);

  /*
   * Render 6 slots + 1 clone of slots[0] at position 6.
   * When the strip animates up by STEP, slot[6] (clone) enters from the bottom.
   * After snap + rotate, slot[0] of the NEW array == old slot[1], y=0 again → seamless.
   */
  const rendered = [...slots, { ...slots[0], id: slots[0].id + '_clone' }];

  // Container shows 4 full cards + partial glimpse at top/bottom (hidden by mask)
  const containerH = 4 * STEP + CARD_GAP;

  return (
    <div
      className="relative w-full overflow-hidden bg-black/5 backdrop-blur-sm border-t border-white/20"
      style={{
        height: containerH,
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
      }}
      onTouchStart={() => { isPaused.current = true;  }}
      onTouchEnd  ={() => { isPaused.current = false; }}
    >
      {/* The animated strip — all cards move together, no intersections */}
      <motion.div
        style={{ y: stripY, paddingTop: CARD_GAP / 2 }}
        className="absolute inset-x-0 top-0 flex flex-col items-center will-change-transform"
      >
        {rendered.map((slot) => (
          <div
            key={slot.id}
            className="w-[90%] rounded-2xl border border-white/10 px-5 flex flex-row items-center justify-between bg-white/5 backdrop-blur-md shadow-md shrink-0"
            style={{ height: CARD_H, marginBottom: CARD_GAP }}
          >
            <span className="text-xs font-mono font-bold text-white/70 uppercase tracking-wider">
              {slot.label}
            </span>

            {slot.status === 'available' ? (
              <span className="text-sm font-sans font-bold text-white flex items-center gap-2">
                <motion.div
                  animate={{
                    scale     : [1, 1.4, 1],
                    opacity   : [0.6, 1, 0.6],
                    boxShadow : [
                      '0 0 0px rgba(34,197,94,0)',
                      '0 0 10px rgba(34,197,94,0.8)',
                      '0 0 0px rgba(34,197,94,0)',
                    ],
                  }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-2.5 h-2.5 bg-green-500 rounded-full"
                />
                Available
              </span>
            ) : (
              <span className="text-sm font-sans font-medium text-white/40">Assigned</span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
