"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Swords, Trophy } from "lucide-react";

const clanWars = [
  { opponent: "Soul Reapers" },
  { opponent: "S1NGULAR1TY" },
  { opponent: "DLC" },
  { opponent: "V3X" },
];

const stats = [
  {
    icon: Trophy,
    value: "4",
    label: "Clan Wins",
    color: "text-red-500",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Win Rate",
    color: "text-green-500",
  },
  {
    icon: Swords,
    value: "4",
    label: "Clan Wars",
    color: "text-red-500",
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

const statsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.25,
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

export default function ClanWars() {
  return (
    <section
      id="clan-wars"
      className="border-t border-zinc-900 bg-zinc-950 py-12 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="max-w-3xl"
          variants={headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.p
            variants={headerItem}
            className="mb-2 text-sm font-black uppercase tracking-[0.35em] text-red-500"
          >
            Clan Wars
          </motion.p>

          <motion.h2
            variants={headerItem}
            className="text-4xl font-black uppercase tracking-tight sm:text-5xl"
          >
            Forged Through Competition.
          </motion.h2>

          <motion.p
            variants={headerItem}
            className="mt-3 text-lg leading-7 text-zinc-400"
          >
            Every clan war is another opportunity to improve, compete, and
            represent 9P. These battles reflect our commitment to teamwork,
            strategy, and continuous growth.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-8 grid gap-5 md:grid-cols-3"
          variants={statsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                variants={cardItem}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-zinc-800 bg-black p-5 transition-colors duration-300 hover:border-red-600 hover:shadow-[0_0_25px_rgba(220,38,38,0.12)]"
              >
                <Icon className={`mb-3 ${stat.color}`} size={30} />

                <p className="text-4xl font-black">{stat.value}</p>

                <p className="mt-1 text-sm font-bold uppercase tracking-widest text-zinc-400">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-6 grid gap-5 md:grid-cols-2"
          variants={cardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {clanWars.map((war) => (
            <motion.article
              key={war.opponent}
              variants={cardItem}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="group rounded-2xl border border-zinc-800 bg-black p-5 transition-colors duration-300 hover:border-red-600 hover:shadow-[0_0_25px_rgba(220,38,38,0.14)]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-green-900 bg-green-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-green-400">
                  WIN
                </span>

                <ShieldCheck
                  size={20}
                  className="text-green-500 transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-4 text-2xl font-black">
                {war.opponent}
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                A competitive clan war where 9P demonstrated teamwork,
                coordination, and determination against a strong opponent.
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}