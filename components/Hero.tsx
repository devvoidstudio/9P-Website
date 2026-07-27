"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";

const stats = [
  {
    value: "40+",
    label: "Members",
  },
  {
    value: "2026",
    label: "Founded",
  },
  {
    value: "Roblox",
    label: "Platform",
  },
];

const textContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const textItem = {
  hidden: {
    opacity: 0,
    y: 38,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut" as const,
    },
  },
};

const statsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.55,
    },
  },
};

const statItem = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut" as const,
    },
  },
};

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 70,
    damping: 20,
    mass: 0.6,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 70,
    damping: 20,
    mass: 0.6,
  });

  const artworkX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const artworkY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const glowX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden border-b border-red-950/40 bg-black px-6 text-white"
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(220,38,38,0.18),transparent_38%)]"
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.92)_38%,rgba(0,0,0,0.35)_68%,rgba(0,0,0,0.75)_100%)]" />

      <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-0">
        <motion.div
          className="relative z-20 pt-10 lg:pt-0"
          variants={textContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={textItem}
            className="mb-7 flex items-center gap-4"
          >
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 44, opacity: 1 }}
              transition={{
                duration: 0.75,
                delay: 0.15,
                ease: "easeOut",
              }}
              className="h-px bg-red-600"
            />

            <p className="text-xs font-black uppercase tracking-[0.36em] text-red-500 sm:text-sm">
              Roblox RIVALS Clan
            </p>
          </motion.div>

          <motion.h1
            variants={textItem}
            className="max-w-3xl text-6xl font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-7xl lg:text-[94px]"
          >
            Built for
            <span className="block text-red-600">
              competition<span className="text-white">.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={textItem}
            className="mt-8 max-w-xl text-lg leading-8 text-zinc-400 sm:text-xl"
          >
            A competitive Roblox RIVALS clan focused on teamwork, discipline,
            improvement, and building a strong community.
          </motion.p>

          <motion.div
            variants={textItem}
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.a
             href="https://discord.gg/u5tNbwc45j"
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                duration: 0.2,
              }}
              className="rounded-md bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_28px_rgba(220,38,38,0.28)] transition-colors duration-300 hover:bg-red-500 hover:shadow-[0_0_42px_rgba(220,38,38,0.42)]"
            >
              Join Discord
            </motion.a>

            <motion.a
              href="#about"
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                duration: 0.2,
              }}
              className="rounded-md border border-red-900/80 bg-black/50 px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition-colors duration-300 hover:border-red-600 hover:bg-red-950/20"
            >
              Learn More
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-14 flex flex-wrap border-t border-zinc-800 pt-8"
            variants={statsContainer}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statItem}
                className={`min-w-[130px] ${
                  index === 0
                    ? "pr-8"
                    : "border-l border-zinc-800 px-8"
                }`}
              >
                <p className="text-3xl font-black text-white">{stat.value}</p>

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative z-10 flex items-center justify-center lg:h-full">
          <motion.div
            style={{
              x: glowX,
              y: glowY,
            }}
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.65, 1, 0.65],
            }}
            transition={{
              scale: {
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: {
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute h-[72%] w-[72%] rounded-full bg-red-700/25 blur-[120px]"
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              x: 55,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="relative aspect-square w-full max-w-[760px]"
          >
            <motion.div
              style={{
                x: artworkX,
                y: artworkY,
              }}
              animate={{
                translateY: [0, -10, 0],
              }}
              transition={{
                translateY: {
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute inset-0"
            >
              <Image
                src="/9p-artwork.png"
                alt="9P clan artwork"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 58vw"
                className="object-contain object-center drop-shadow-[0_0_45px_rgba(220,38,38,0.28)]"
              />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/5 to-transparent lg:from-black/70 lg:via-black/10" />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/75 to-transparent" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        animate={{
          scaleX: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.1,
          delay: 0.6,
          ease: "easeOut",
        }}
        className="absolute bottom-0 left-0 h-px w-full origin-center bg-gradient-to-r from-transparent via-red-600/60 to-transparent"
      />
    </section>
  );
}