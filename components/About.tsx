"use client";

import { motion } from "framer-motion";

const values = [
  {
    number: "01",
    title: "Improve",
    description:
      "We push each other to become better players through practice, feedback, and competitive matches.",
  },
  {
    number: "02",
    title: "Compete",
    description:
      "We enter every match with focus, discipline, and the ambition to perform at our best.",
  },
  {
    number: "03",
    title: "Grow Together",
    description:
      "Individual skill matters, but strong communication and teamwork are what make 9P stronger.",
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

export default function About() {
  return (
    <section
      id="about"
      className="border-t border-zinc-900 bg-[#0b0b0b] px-6 py-20 text-white sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
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
            className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-red-500"
          >
            About 9P
          </motion.p>

          <motion.h2
            variants={headerItem}
            className="text-4xl font-black tracking-tight sm:text-5xl"
          >
            More than a clan.
          </motion.h2>

          <motion.p
            variants={headerItem}
            className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400"
          >
            9P is a place for competitive RIVALS players who want to improve,
            compete seriously, and be part of an active team.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-5 md:grid-cols-3"
          variants={cardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          {values.map((value) => (
            <motion.div
              key={value.number}
              variants={cardItem}
              whileHover={{
                y: -6,
              }}
              transition={{
                duration: 0.25,
              }}
              className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 p-7 transition-colors duration-300 hover:border-red-700 hover:bg-zinc-900/60 hover:shadow-[0_0_30px_rgba(220,38,38,0.08)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-red-600 opacity-0 transition duration-300 group-hover:opacity-100" />

              <p className="text-xs font-black tracking-[0.3em] text-red-500">
                {value.number}
              </p>

              <h3 className="mt-5 text-2xl font-black">{value.title}</h3>

              <p className="mt-4 leading-7 text-zinc-400">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}