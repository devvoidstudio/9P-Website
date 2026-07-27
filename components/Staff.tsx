"use client";

import { motion } from "framer-motion";
import { Crown, Settings, Target } from "lucide-react";

const staffGroups = [
  {
    role: "Owners",
    icon: Crown,
    names: "mar & Andrew",
    description:
      "Lead the clan, make major decisions, oversee the staff team, and guide the long-term vision of 9P while ensuring the community continues to grow and succeed.",
  },
  {
    role: "Manager",
    icon: Settings,
    names: "v0id",
    description:
      "Manages the Discord server, website, and technical operations while handling most of the behind-the-scenes development and infrastructure that keeps 9P running smoothly.",
  },
  {
    role: "Tryout Host",
    icon: Target,
    names: "MRLEGEND_isaqt",
    description:
      "Organizes and hosts tryouts, evaluates new recruits, identifies talented players, and helps build a skilled, active, and competitive community for the future of 9P.",
  },
];

const headerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const headerItem = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

const cardsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const cardItem = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: "easeOut" as const,
    },
  },
};

export default function Staff() {
  return (
    <section
      id="staff"
      className="border-t border-zinc-900 bg-black py-12 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="max-w-3xl"
          variants={headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.35,
          }}
        >
          <motion.p
            variants={headerItem}
            className="mb-3 text-sm font-black uppercase tracking-[0.35em] text-red-500"
          >
            Leadership
          </motion.p>

          <motion.h2
            variants={headerItem}
            className="text-4xl font-black uppercase tracking-tight sm:text-5xl"
          >
            Meet the Team Behind 9P.
          </motion.h2>

          <motion.p
            variants={headerItem}
            className="mt-4 text-lg leading-8 text-zinc-400"
          >
            Behind every successful clan is a dedicated leadership team that
            keeps the community active, competitive, and welcoming.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-8 lg:grid-cols-3"
          variants={cardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          {staffGroups.map((group) => {
            const Icon = group.icon;

            return (
              <motion.article
                key={group.role}
                variants={cardItem}
                whileHover={{
                  y: -8,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition-colors duration-300 hover:border-red-600 hover:shadow-[0_0_35px_rgba(220,38,38,0.16)]"
              >
                <div className="relative flex h-24 items-center justify-center overflow-hidden border-b border-red-900/30 bg-gradient-to-b from-red-950/50 via-red-950/20 to-zinc-950">
                  <div className="absolute h-40 w-40 rounded-full bg-red-600/10 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:bg-red-600/20" />

                  <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:28px_28px]" />

                  <Icon
                    size={50}
                    strokeWidth={1.8}
                    className="relative z-10 text-red-500 transition-all duration-300 group-hover:scale-110 group-hover:text-red-400"
                  />
                </div>

                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-red-500">
                    {group.role}
                  </p>

                  <h3 className="mt-2 break-words text-3xl font-black tracking-tight">
                    {group.names}
                  </h3>

                  <p className="mt-4 leading-7 text-zinc-400">
                    {group.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.7,
            delay: 0.25,
            ease: "easeOut",
          }}
          className="mt-8 rounded-2xl border border-red-900/40 bg-red-950/10 p-5 text-center text-zinc-400"
        >
          More leadership roles and staff members will be introduced as 9P
          continues to grow.
        </motion.div>
      </div>
    </section>
  );
}