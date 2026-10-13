"use client"

import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import { ArrowRight, Bot, FileText, Menu, MessageCircle, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"
import { BorderBeam } from "@/components/magicui/border-beam"
import { CoolMode } from "@/components/magicui/cool-mode"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import { Iphone } from "@/components/magicui/iphone"
import { Particles } from "@/components/magicui/particles"
import { Safari } from "@/components/magicui/safari"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { TextAnimate } from "@/components/magicui/text-animate"

import { CONTACT, NAV } from "./content"
import { Float, Magnetic, Tilt } from "./motion"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("relative block", className)}>
      <img src="assets/brand/sns-lockup-light.png" alt="Sea N Shore IT Solutions LLP" width={234} height={48} className="h-full w-auto" />
    </span>
  )
}

export const go = (href: string) => () => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
}

const SPARKS = { particle: "circle", size: 10, particleCount: 26, speedHorz: 6, speedUp: 14 }

/* ---------- header: hides on scroll down, returns on scroll up; hover pill glides between links ---------- */

export function Header() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState<string | null>(null)
  const last = useRef(0)

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 12)
    setHidden(v > last.current && v > 280 && !open)
    last.current = v
  })
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
  }, [open])

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top,0px)]"
    >
      <div
        className={cn(
          "mx-auto mt-2 flex h-16 max-w-7xl items-center justify-between gap-4 rounded-full px-4 transition-all duration-500 sm:px-5",
          scrolled || open ? "bg-background/75 mx-3 border shadow-[0_8px_30px_-12px_rgba(31,37,89,.25)] backdrop-blur-xl sm:mx-6 xl:mx-auto" : "border border-transparent"
        )}
      >
        <a href="#top" aria-label="Sea N Shore IT Solutions, home" className="flex h-11 items-center">
          <Logo className="h-9 sm:h-10" />
        </a>
        <nav aria-label="Primary" className="hidden items-center md:flex" onPointerLeave={() => setHover(null)}>
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onPointerEnter={() => setHover(n.href)}
              className="text-muted-foreground hover:text-foreground relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              {hover === n.href && (
                <motion.span layoutId="nav-pill" className="bg-muted absolute inset-0 -z-10 rounded-full" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Magnetic className="hidden sm:inline-block">
            <CoolMode options={SPARKS}>
              <ShimmerButton onClick={go("#contact")} background="var(--primary)" shimmerColor="#cfe0ff" className="h-10 px-5 text-sm font-semibold">
                Start a project
              </ShimmerButton>
            </CoolMode>
          </Magnetic>
          <button
            type="button"
            className="hover:bg-muted grid size-11 place-items-center rounded-full md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={open ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 0%)" }}
            animate={{ clipPath: "circle(150% at 92% 0%)" }}
            exit={{ clipPath: "circle(0% at 92% 0%)" }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
            className="bg-background fixed inset-0 -z-10 px-6 pt-[calc(6rem+env(safe-area-inset-top,0px))] pb-10 md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {[...NAV, { label: "Contact", href: "#contact" }].map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, type: "spring", stiffness: 200, damping: 22 }}
                  className="font-display border-b py-4 text-4xl font-bold tracking-[-0.04em]"
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <p className="text-muted-foreground mt-8 font-mono text-xs">
              {CONTACT.email} · {CONTACT.phone}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/* ---------- rotating word: letters flip in one by one, each tinted along the SNS blue ramp ---------- */

const RAMP = ["#2f5fe0", "#3f6ff0", "#4c7df0", "#5b8cf5", "#6a9bf8", "#4c7df0", "#3a63d8", "#2c4fb8", "#26408f"]

function RotatingWord({ words, every = 2600 }: { words: string[]; every?: number }) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % words.length), every)
    return () => clearInterval(t)
  }, [words.length, every, reduce])
  const w = words[i]
  return (
    <span aria-hidden="true" className="relative block overflow-hidden pb-[0.12em] [perspective:600px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={w} className="inline-flex">
          {w.split("").map((c, j) => (
            <motion.span
              key={j}
              className="inline-block whitespace-pre"
              style={{ color: RAMP[Math.round((j / Math.max(1, w.length - 1)) * (RAMP.length - 1))], transformOrigin: "50% 100%" }}
              initial={{ y: "90%", rotateX: -90, opacity: 0 }}
              animate={{ y: "0%", rotateX: 0, opacity: 1 }}
              exit={{ y: "-60%", rotateX: 70, opacity: 0, transition: { duration: 0.22, delay: j * 0.012 } }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: j * 0.035 }}
            >
              {c}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ---------- hero ---------- */

function Badge({ icon, text, sub, className, delay }: { icon: React.ReactNode; text: string; sub: string; className?: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 16, delay }}
      className={cn("absolute z-20", className)}
    >
      <Float delay={delay} range={8} duration={4.5}>
        <div className="bg-background/90 flex items-center gap-2.5 rounded-2xl border px-3 py-2 shadow-[0_12px_30px_-12px_rgba(31,37,89,.35)] backdrop-blur">
          <span className="grid size-8 place-items-center rounded-xl text-white">{icon}</span>
          <span className="leading-tight">
            <span className="block text-[13px] font-semibold whitespace-nowrap">{text}</span>
            <span className="text-muted-foreground block text-[11px] whitespace-nowrap">{sub}</span>
          </span>
        </div>
      </Float>
    </motion.div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const stageRotate = useTransform(scrollYProgress, [0, 1], [0, 22])
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.86])
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const phoneLY = useTransform(scrollYProgress, [0, 1], [0, -160])
  const phoneRY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const copyO = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])

  const mx = useMotionValue(-600)
  const my = useMotionValue(-600)
  const sx = useSpring(mx, { stiffness: 120, damping: 20 })
  const sy = useSpring(my, { stiffness: 120, damping: 20 })
  const spot = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(76,125,240,.14), transparent 70%)`

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left)
        my.set(e.clientY - r.top)
      }}
      className="relative isolate overflow-hidden pt-[calc(7rem+env(safe-area-inset-top,0px))] pb-24 sm:pb-32"
    >
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.18}
        duration={3}
        repeatDelay={1}
        className="text-brand fill-brand/10 stroke-border -z-20 [mask-image:radial-gradient(1000px_circle_at_40%_20%,white,transparent_70%)]"
      />
      <Particles className="absolute inset-0 -z-10" quantity={90} ease={70} staticity={40} size={0.6} color="#4c7df0" refresh={false} />
      {!reduce && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: spot }} />}
      <div aria-hidden="true" className="bg-brand/15 absolute top-[-10%] right-[-10%] -z-10 size-[520px] rounded-full blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-8 lg:px-8">
        <motion.div className="min-w-0" style={reduce ? undefined : { y: copyY, opacity: copyO }}>
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="group bg-background/80 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm shadow-sm backdrop-blur transition-colors hover:border-brand/40"
          >
            <span className="relative flex size-2">
              <span className="bg-live absolute inline-flex size-full animate-ping rounded-full opacity-60" />
              <span className="bg-live relative inline-flex size-2 rounded-full" />
            </span>
            <AnimatedShinyText className="text-muted-foreground mx-0">
              Taking new projects<span className="hidden sm:inline"> · reply within a working day</span>
            </AnimatedShinyText>
            <ArrowRight className="text-muted-foreground size-3.5 transition-transform group-hover:translate-x-0.5" />
          </motion.a>

          <div className="font-display mt-7 text-[clamp(2.9rem,7.4vw,5.6rem)] leading-[0.95] font-bold tracking-[-0.045em]">
            <TextAnimate as="h1" by="word" animation="blurInUp" duration={0.6} startOnView={false} once>
              We design, build and run
            </TextAnimate>
            <RotatingWord words={["websites.", "platforms.", "mobile apps.", "AI agents."]} />
            <span className="sr-only">Websites, platforms, mobile apps and AI agents.</span>
          </div>

          <TextAnimate
            by="word"
            animation="fadeIn"
            delay={0.5}
            duration={0.8}
            startOnView={false}
            once
            className="text-muted-foreground mt-5 max-w-[50ch] text-lg leading-relaxed sm:text-xl"
          >
            Sea N Shore IT is one team from first sketch to hosting. We've shipped everything from a gaming café's booking page to a maritime professional network.
          </TextAnimate>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <CoolMode options={SPARKS}>
                <ShimmerButton onClick={go("#contact")} background="var(--primary)" shimmerColor="#cfe0ff" className="h-13 gap-2 px-7 text-base font-semibold shadow-[0_12px_30px_-10px_rgba(47,95,224,.6)]">
                  Start a project <ArrowRight className="size-4" />
                </ShimmerButton>
              </CoolMode>
            </Magnetic>
            <Magnetic strength={0.25}>
              <InteractiveHoverButton onClick={go("#work")} className="h-13 px-7 text-base">
                See our work
              </InteractiveHoverButton>
            </Magnetic>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-muted-foreground mt-6 font-mono text-xs tracking-wide">
            {CONTACT.email} &nbsp;·&nbsp; {CONTACT.phone}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 25, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.25 }}
          className="relative min-w-0 pb-12 [perspective:1200px] sm:pb-16 lg:pr-4"
        >
          <motion.div style={reduce ? undefined : { rotateX: stageRotate, scale: stageScale, y: stageY, transformPerspective: 1200 }}>
            <Tilt max={7} className="rounded-[22px]">
              <div className="bg-background/70 relative rounded-[22px] border p-2 shadow-[0_40px_90px_-30px_rgba(31,37,89,.45)] backdrop-blur sm:p-3">
                <Safari url="seanshore.in" imageSrc="assets/work/seanshore-desktop.jpg" className="block" />
                <BorderBeam size={160} duration={8} colorFrom="#4c7df0" colorTo="#9dc0ff" borderWidth={2} />
              </div>
            </Tilt>
          </motion.div>

          <motion.div style={reduce ? undefined : { y: phoneLY }} className="absolute bottom-0 left-[-4%] z-10 w-[23%] sm:left-[-6%]">
            <Float delay={0.4} range={12} duration={6}>
              <div className="-rotate-6 drop-shadow-[0_25px_30px_rgba(31,37,89,.35)]">
                <Iphone src="assets/work/verifyu.jpg" />
              </div>
            </Float>
          </motion.div>
          <motion.div style={reduce ? undefined : { y: phoneRY }} className="absolute right-[1%] bottom-[-3%] z-10 w-[21%]">
            <Float delay={1.6} range={10} duration={5.2}>
              <div className="rotate-[6deg] drop-shadow-[0_25px_30px_rgba(31,37,89,.35)]">
                <Iphone src="assets/work/cloudtrails.jpg" />
              </div>
            </Float>
          </motion.div>

          <Badge
            delay={1.0}
            className="top-[-6%] left-[4%] hidden sm:block"
            icon={<span className="grid size-8 place-items-center rounded-xl bg-[#12a46a]"><MessageCircle className="size-4" /></span>}
            text="WhatsApp booking"
            sub="Cloud Trails · inFAMOUS"
          />
          <Badge
            delay={1.25}
            className="top-[30%] right-[-4%] hidden md:block"
            icon={<span className="bg-primary grid size-8 place-items-center rounded-xl"><Bot className="size-4" /></span>}
            text="AI answers with citations"
            sub="Ask Marine Tanks AI"
          />
          <Badge
            delay={1.5}
            className="bottom-[14%] left-[22%] hidden sm:block"
            icon={<span className="grid size-8 place-items-center rounded-xl bg-[#1A8C86]"><FileText className="size-4" /></span>}
            text="Maritime Passport"
            sub="Exports a DG-format PDF"
          />
        </motion.div>
      </div>
    </section>
  )
}
