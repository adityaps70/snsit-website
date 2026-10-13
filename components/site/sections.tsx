"use client"

import { forwardRef, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react"
import {
  Anchor,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  Bot,
  Building2,
  Code,
  FileText,
  IndianRupee,
  Landmark,
  Layers,
  Mail,
  MessageCircle,
  Monitor,
  Plus,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/magicui/animated-beam"
import { AnimatedList } from "@/components/magicui/animated-list"
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid"
import { Iphone } from "@/components/magicui/iphone"
import { Lens } from "@/components/magicui/lens"
import { MagicCard } from "@/components/magicui/magic-card"
import { Marquee } from "@/components/magicui/marquee"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { OrbitingCircles } from "@/components/magicui/orbiting-circles"
import { Safari } from "@/components/magicui/safari"
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/magicui/scroll-based-velocity"
import { ShineBorder } from "@/components/magicui/shine-border"
import { TextAnimate } from "@/components/magicui/text-animate"

import { CLIENTS, FAQ, SERVICES, STEPS, WHY, WORK, type Project } from "./content"
import { Float, Reveal, Stagger, StaggerItem, Tilt, useWide } from "./motion"

/* ---------- shared bits ---------- */

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-brand inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.14em] uppercase">
      <motion.span
        className="bg-brand h-px w-6 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      {children}
    </span>
  )
}

function SectionHead({ eyebrow, title, lede, className }: { eyebrow: string; title: string; lede?: ReactNode; className?: string }) {
  return (
    <div className={cn("mb-14 flex flex-wrap items-end justify-between gap-6", className)}>
      <div className="flex max-w-3xl flex-col gap-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <TextAnimate as="h2" by="word" animation="blurInUp" duration={0.5} once className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.04em]">
          {title}
        </TextAnimate>
      </div>
      {lede && (
        <Reveal delay={0.15}>
          <p className="text-muted-foreground max-w-[44ch] text-lg">{lede}</p>
        </Reveal>
      )}
    </div>
  )
}

const Wrap = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
)

const SPOT = { gradientColor: "#eef3ff", gradientFrom: "#4c7df0", gradientTo: "#9dc0ff" }

/* ---------- velocity band ---------- */

export function VelocityBand() {
  const words = ["Websites", "Platforms", "Mobile apps", "AI agents", "Hosting & care"]
  return (
    <section aria-label="What we build" className="overflow-hidden border-y py-8 sm:py-10">
      <ScrollVelocityContainer className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] font-bold tracking-[-0.04em]">
        <ScrollVelocityRow baseVelocity={3} direction={1}>
          {words.map((w) => (
            <span key={w} className="inline-flex items-center gap-8 pr-8">
              {w}
              <span className="bg-brand inline-block size-3 rounded-full sm:size-4" />
            </span>
          ))}
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={3} direction={-1}>
          {words.map((w) => (
            <span key={w} className="inline-flex items-center gap-8 pr-8">
              <span className="text-outline">{w}</span>
              <span className="border-brand inline-block size-3 rounded-full border-2 sm:size-4" />
            </span>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  )
}

/* ---------- logos + stats ---------- */

export function Clients() {
  return (
    <section aria-label="Clients" className="pt-6 pb-10">
      <Wrap>
        <p className="text-muted-foreground mb-5 text-center text-sm">Products we shipped that you can open today</p>
        <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" gap={0.07}>
          {CLIENTS.map((c, i) => (
            <StaggerItem key={c.name} className={cn("h-full", i === CLIENTS.length - 1 && "max-sm:col-span-2")}>
              <motion.a
                href={c.url}
                target="_blank"
                rel="noopener"
                aria-label={`${c.name} (opens in a new tab)`}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                style={{ background: c.bg }}
                className={cn(
                  "group relative flex h-40 flex-col items-center justify-between overflow-hidden rounded-3xl border p-4 shadow-[0_10px_30px_-20px_rgba(31,37,89,.35)] transition-shadow hover:shadow-[0_24px_40px_-20px_rgba(31,37,89,.45)]",
                  c.dark && "border-transparent"
                )}
              >
                <span className="flex flex-1 items-center justify-center">
                  <motion.img
                    src={c.logo}
                    alt={`${c.name} logo`}
                    className={cn(c.h, "w-auto max-w-[85%] object-contain")}
                    whileHover={{ rotate: [0, -4, 4, 0] }}
                    transition={{ duration: 0.5 }}
                  />
                </span>
                <span className={cn("flex w-full items-center justify-between text-xs", c.dark ? "text-white/60" : "text-muted-foreground")}>
                  {c.tag}
                  <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
              </motion.a>
            </StaggerItem>
          ))}
        </Stagger>
      </Wrap>
    </section>
  )
}

export function Stats() {
  const items = [
    { n: 5, label: "Products live in production across web and mobile" },
    { n: 3, label: "Sectors we know well: maritime, safety-tech, travel & leisure" },
    { n: 1, label: "Team from first sketch to hosting, so nothing gets lost in handover" },
  ]
  return (
    <Wrap className="pt-14 pb-8">
      <Stagger className="grid gap-4 sm:grid-cols-3">
        {items.map((s) => (
          <StaggerItem key={s.label} className="h-full">
            <Tilt max={10} className="h-full rounded-3xl">
              <div className="bg-muted/60 relative flex h-full min-w-0 flex-col gap-3 overflow-hidden rounded-3xl border p-7">
                <span className="font-display text-7xl leading-none font-bold tracking-[-0.05em]">
                  <NumberTicker value={s.n} className="tracking-[-0.05em]" />
                  <span className="text-brand">.</span>
                </span>
                <span className="text-muted-foreground max-w-[30ch]">{s.label}</span>
                <div aria-hidden="true" className="bg-brand/10 absolute -right-10 -bottom-10 size-32 rounded-full blur-2xl" />
              </div>
            </Tilt>
          </StaggerItem>
        ))}
      </Stagger>
    </Wrap>
  )
}

/* ---------- work: sticky cards that stack and shrink as the next one arrives ---------- */

const tint = (c: string, pct: number) => `color-mix(in oklab, ${c} ${pct}%, white)`

function LiveTag({ p }: { p: Project }) {
  return (
    <span className="text-muted-foreground inline-flex items-center gap-2 text-xs font-medium">
      <span className="relative flex size-1.5">
        <span className="bg-live absolute inline-flex size-full animate-ping rounded-full opacity-70" />
        <span className="bg-live relative inline-flex size-1.5 rounded-full" />
      </span>
      Live · {p.domain}
      {p.place ? ` · ${p.place}` : ""}
    </span>
  )
}

function VisitLink({ p }: { p: Project }) {
  return (
    <motion.a
      href={p.url}
      target="_blank"
      rel="noopener"
      whileHover="h"
      className="bg-foreground text-background inline-flex h-11 items-center gap-2 overflow-hidden rounded-full pr-2 pl-5 text-sm font-semibold"
    >
      Visit {p.domain === "GitHub Pages" ? "site" : p.domain}
      <motion.span variants={{ h: { rotate: 45, scale: 1.1 } }} className="bg-background text-foreground grid size-7 place-items-center rounded-full">
        <ArrowUpRight className="size-4" />
      </motion.span>
    </motion.a>
  )
}

function WorkCard({ p, i, progress, total, sticky }: { p: Project; i: number; progress: MotionValue<number>; total: number; sticky: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.18, 1])
  const imgRotate = useTransform(scrollYProgress, [0, 1], [i % 2 ? -6 : 6, 0])
  const target = 1 - (total - i) * 0.045
  const scale = useTransform(progress, [i / total, 1], [1, target])
  const dim = useTransform(progress, [i / total, 1], [0, (total - 1 - i) * 0.04])

  return (
    <div ref={ref} className={cn(sticky && "sticky flex h-[88vh] items-start")} style={sticky ? { top: `calc(6rem + ${i * 18}px)` } : undefined}>
      <motion.article
        style={sticky && !reduce ? { scale, transformOrigin: "50% 0%" } : undefined}
        className="relative w-full overflow-hidden rounded-[32px] border shadow-[0_-10px_60px_-30px_rgba(31,37,89,.35)]"
      >
        <div className="grid bg-white lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)]">
          <div className="flex min-w-0 flex-col gap-5 p-6 sm:p-10">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs" style={{ color: p.color }}>
                0{i + 1} / 0{total}
              </span>
              <LiveTag p={p} />
            </div>
            <div>
              <h3 className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] leading-none font-bold tracking-[-0.04em]">{p.name}</h3>
              <p className="text-muted-foreground mt-2">{p.sector}</p>
            </div>
            <p className="text-foreground/80 max-w-[54ch] leading-relaxed">{p.desc}</p>
            <Stagger className="flex flex-wrap gap-2" gap={0.05}>
              {p.did.map((d) => (
                <StaggerItem key={d}>
                  <span className="inline-block rounded-full border px-3 py-1 text-xs" style={{ background: tint(p.color, 8), borderColor: tint(p.color, 25) }}>
                    {d}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-auto pt-2">
              <VisitLink p={p} />
            </div>
          </div>
          <div
            className="relative order-first min-w-0 overflow-hidden px-6 pt-10 pb-16 sm:px-10 lg:order-none lg:py-14"
            style={{ background: `radial-gradient(120% 100% at 80% 0%, ${tint(p.color, 40)}, ${tint(p.color, 10)} 70%)` }}
          >
            <span aria-hidden="true" className="font-display pointer-events-none absolute -bottom-6 -left-2 text-[clamp(4rem,10vw,9rem)] leading-none font-extrabold tracking-[-0.06em] whitespace-nowrap text-white/40">
              {p.name}
            </span>
            <motion.div style={reduce ? undefined : { scale: imgScale, rotate: imgRotate }} className="relative mx-auto max-w-[620px]">
              <div className="overflow-hidden rounded-xl shadow-[0_30px_60px_-25px_rgba(0,0,0,.45)]">
                <Lens zoomFactor={1.8} lensSize={180} ariaLabel={`Zoom into the ${p.name} website`}>
                  <Safari url={p.bar} imageSrc={p.desktop} />
                </Lens>
              </div>
              <Float className={cn("absolute bottom-[-12%] z-30 w-[23%]", i % 2 ? "left-[-3%]" : "right-[-3%]")} delay={i * 0.4} range={10}>
                <div className={cn("drop-shadow-[0_20px_25px_rgba(0,0,0,.3)]", i % 2 ? "-rotate-6" : "rotate-6")}>
                  <Iphone src={p.phone} />
                </div>
              </Float>
            </motion.div>
          </div>
        </div>
        {sticky && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0b1020]" style={{ opacity: dim }} />}
      </motion.article>
    </div>
  )
}

export function Work() {
  const ref = useRef<HTMLDivElement>(null)
  const sticky = useWide("(min-width: 1024px) and (min-height: 720px)")
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  return (
    <section id="work" className="py-20 sm:py-28">
      <Wrap>
        <SectionHead eyebrow="Featured work" title="Five products, all live." lede="Scroll through the stack. Hover a screenshot to zoom in, or open any site and click around." />
        <div ref={ref} className={cn("flex flex-col", sticky ? "gap-0" : "gap-6")}>
          {WORK.map((p, i) => (
            <WorkCard key={p.name} p={p} i={i} total={WORK.length} progress={scrollYProgress} sticky={sticky} />
          ))}
        </div>
      </Wrap>
    </section>
  )
}

/* ---------- services (bento) ---------- */

function SiteStrip() {
  return (
    <div className="absolute top-6 flex w-full flex-col gap-1 [mask-image:linear-gradient(to_top,transparent_15%,#000_70%)]">
      <Marquee pauseOnHover className="[--duration:28s] [--gap:1rem]">
        {WORK.map((w) => (
          <figure key={w.desktop} className="bg-card w-56 overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-2 hover:rotate-[-1.5deg] hover:shadow-lg">
            <div className="flex h-5 items-center gap-1 border-b px-2">
              <i className="size-1.5 rounded-full bg-[#ff5f57]" />
              <i className="size-1.5 rounded-full bg-[#febc2e]" />
              <i className="size-1.5 rounded-full bg-[#28c840]" />
            </div>
            <img src={w.desktop} alt="" className="aspect-[16/9] w-full object-cover object-top" />
          </figure>
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:34s] [--gap:1rem]">
        {[...WORK].reverse().map((w) => (
          <figure key={w.desktop} className="bg-card w-56 overflow-hidden rounded-xl border shadow-sm">
            <img src={w.desktop} alt="" className="aspect-[16/9] w-full object-cover object-[50%_40%]" />
          </figure>
        ))}
      </Marquee>
    </div>
  )
}

const EVENTS = [
  { t: "New job match", m: "Chief Officer · Product tanker", c: "#1A8C86", Icon: Anchor },
  { t: "Certificate issued", m: "Course completed", c: "#2f5fe0", Icon: BadgeCheck },
  { t: "Company page verified", m: "Ship manager", c: "#8A4BD6", Icon: Building2 },
  { t: "Payment received", m: "Subscription renewed", c: "#12a46a", Icon: IndianRupee },
  { t: "New message", m: "From a crewing manager", c: "#C98A2E", Icon: Mail },
  { t: "Booking confirmed", m: "Royal Enfield rental", c: "#e0533d", Icon: Bell },
]

function PlatformFeed() {
  return (
    <div className="absolute top-4 right-0 left-0 h-[236px] overflow-hidden px-4 [mask-image:linear-gradient(to_top,transparent_0%,#000_45%)]">
      <AnimatedList delay={1500}>
        {EVENTS.map((e) => (
          <figure key={e.t} className="bg-card w-full rounded-2xl border p-3 shadow-sm transition-transform hover:scale-[1.03]">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl text-white" style={{ background: e.c }}>
                <e.Icon className="size-4" />
              </span>
              <div className="min-w-0">
                <figcaption className="truncate text-sm font-semibold">{e.t}</figcaption>
                <p className="text-muted-foreground truncate text-xs">{e.m}</p>
              </div>
            </div>
          </figure>
        ))}
      </AnimatedList>
    </div>
  )
}

function OrbitIcon({ children, bg }: { children: ReactNode; bg: string }) {
  return (
    <span className="grid size-full place-items-center rounded-full text-white shadow-md" style={{ background: bg }}>
      {children}
    </span>
  )
}

function PhoneOrbit() {
  return (
    <div className="absolute inset-x-0 top-0 h-[250px] overflow-hidden [mask-image:linear-gradient(to_top,transparent_0%,#000_35%)]">
      <div className="relative mx-auto flex h-[280px] w-full items-center justify-center">
        <div className="w-24 rotate-[-6deg] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-0">
          <Iphone src="assets/work/verifyu.jpg" />
        </div>
        <OrbitingCircles radius={105} iconSize={34} duration={22}>
          <OrbitIcon bg="#8A4BD6"><ShieldCheck className="size-4" /></OrbitIcon>
          <OrbitIcon bg="#2f5fe0"><Bell className="size-4" /></OrbitIcon>
          <OrbitIcon bg="#12a46a"><MessageCircle className="size-4" /></OrbitIcon>
          <OrbitIcon bg="#C98A2E"><BadgeCheck className="size-4" /></OrbitIcon>
        </OrbitingCircles>
      </div>
    </div>
  )
}

const Node = forwardRef<HTMLDivElement, { children: ReactNode; label: string; className?: string }>(({ children, label, className }, ref) => (
  <div className="flex flex-col items-center gap-1.5">
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.15 }}
      className={cn("bg-card z-10 grid size-12 place-items-center rounded-full border shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]", className)}
    >
      {children}
    </motion.div>
    <span className="text-muted-foreground text-[11px] font-medium whitespace-nowrap">{label}</span>
  </div>
))
Node.displayName = "Node"

function AgentFlow() {
  const box = useRef<HTMLDivElement>(null)
  const a = useRef<HTMLDivElement>(null)
  const b = useRef<HTMLDivElement>(null)
  const c = useRef<HTMLDivElement>(null)
  const hub = useRef<HTMLDivElement>(null)
  const x = useRef<HTMLDivElement>(null)
  const y = useRef<HTMLDivElement>(null)
  const z = useRef<HTMLDivElement>(null)
  const beam = { gradientStartColor: "#4c7df0", gradientStopColor: "#9dc0ff", pathColor: "#586178", pathOpacity: 0.18 }
  return (
    <div ref={box} className="absolute inset-x-0 top-4 flex h-[230px] items-center justify-between px-6 sm:px-12">
      <div className="flex flex-col gap-3">
        <Node ref={a} label="IMO"><Landmark className="size-5" /></Node>
        <Node ref={b} label="DG Shipping"><Landmark className="size-5" /></Node>
        <Node ref={c} label="UK MCA"><Landmark className="size-5" /></Node>
      </div>
      <div className="relative">
        <motion.span
          aria-hidden="true"
          className="bg-brand/20 absolute -inset-3.5 rounded-full"
          animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
        <Node ref={hub} label="Checks every 4 hours" className="size-16">
          <img src="assets/brand/sns-mark-color.png" alt="" className="size-10" />
        </Node>
      </div>
      <div className="flex flex-col gap-3">
        <Node ref={x} label="Ask Marine Tanks AI"><Bot className="size-5" /></Node>
        <Node ref={y} label="WhatsApp alert"><MessageCircle className="size-5" /></Node>
        <Node ref={z} label="Intelligence feed"><FileText className="size-5" /></Node>
      </div>
      {[a, b, c].map((r, i) => (
        <AnimatedBeam key={i} containerRef={box} fromRef={r} toRef={hub} curvature={(1 - i) * 30} duration={4} delay={i * 0.4} {...beam} />
      ))}
      {[x, y, z].map((r, i) => (
        <AnimatedBeam key={`o${i}`} containerRef={box} fromRef={hub} toRef={r} curvature={(1 - i) * 30} duration={4} delay={1.2 + i * 0.4} {...beam} />
      ))}
    </div>
  )
}

export function Services() {
  const cards = [
    { Icon: Monitor, name: SERVICES[0].t, description: SERVICES[0].one, cta: "Discuss a website", className: "lg:col-span-2", background: <SiteStrip /> },
    { Icon: Layers, name: SERVICES[1].t, description: SERVICES[1].one, cta: "Discuss a platform", className: "lg:col-span-1", background: <PlatformFeed /> },
    { Icon: Smartphone, name: SERVICES[2].t, description: SERVICES[2].one, cta: "Discuss an app", className: "lg:col-span-1", background: <PhoneOrbit /> },
    { Icon: Bot, name: SERVICES[3].t, description: SERVICES[3].one, cta: "Discuss automation", className: "lg:col-span-2", background: <AgentFlow /> },
  ]
  return (
    <section id="services" className="bg-muted/50 relative py-20 sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(#d5dbea_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]" />
      <Wrap className="relative">
        <SectionHead eyebrow="Services" title="Four things, done properly." lede="Pick one or combine them. Every build comes with hosting, analytics and a person to call after launch." />
        <Stagger className="grid w-full grid-cols-3 gap-5" gap={0.1}>
          {cards.map((c) => (
            <StaggerItem key={c.name} className={cn("col-span-3", c.className)}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-[24rem]">
                <BentoGrid className="h-full auto-rows-fr grid-cols-1">
                  <BentoCard {...c} href="#contact" className="col-span-1 h-full rounded-3xl" />
                </BentoGrid>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
        <Stagger className="mt-12 grid gap-x-8 gap-y-6 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <StaggerItem key={s.t} className="min-w-0">
              <h3 className="font-display text-base font-semibold">{s.t}</h3>
              <ul className="text-muted-foreground mt-3 flex flex-col gap-2 text-sm">
                {s.pts.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <span className="bg-brand mt-[7px] size-1.5 shrink-0 rounded-full" />
                    {p}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </Wrap>
    </section>
  )
}

/* ---------- about ---------- */

const WHY_ICONS = { Code, MessageCircle, Zap, ShieldCheck, FileText }

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <Wrap className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-16">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>About SNS IT</Eyebrow>
          <TextAnimate as="h2" by="word" animation="blurInUp" duration={0.5} once className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.04em]">
            One team, from first sketch to live product.
          </TextAnimate>
          <Reveal delay={0.15}>
            <p className="text-muted-foreground max-w-[46ch] text-lg">
              Sea N Shore IT is the team that built Sea N Shore and Marine Tanks. We run our own platforms too, so we build yours like owners.
            </p>
          </Reveal>
        </div>
        <Stagger className="grid gap-4 sm:grid-cols-2" gap={0.09}>
          {WHY.map((w) => {
            const Icon = WHY_ICONS[w.icon]
            return (
              <StaggerItem key={w.t} className="h-full">
                <Tilt max={9} className="h-full rounded-2xl">
                  <MagicCard {...SPOT} className="h-full rounded-2xl">
                    <div className="flex h-full min-h-52 flex-col gap-3 p-6">
                      <motion.span
                        whileHover={{ rotate: [0, -12, 12, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-muted text-brand grid size-11 place-items-center rounded-xl border"
                      >
                        <Icon className="size-5" />
                      </motion.span>
                      <h3 className="font-display mt-auto text-xl font-semibold tracking-[-0.02em]">{w.t}</h3>
                      <p className="text-muted-foreground text-[15px]">{w.d}</p>
                    </div>
                  </MagicCard>
                </Tilt>
              </StaggerItem>
            )
          })}
          <StaggerItem className="h-full">
            <Tilt max={9} className="h-full rounded-2xl">
              <a href="#contact" className="group bg-primary text-primary-foreground relative flex h-full min-h-52 flex-col justify-between gap-4 overflow-hidden rounded-2xl p-6">
                <ShineBorder shineColor={["#ffffff", "#9dc0ff", "#ffffff"]} borderWidth={1.5} duration={10} />
                <motion.span
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 size-48 rounded-full bg-white/15"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <h3 className="font-display relative text-2xl leading-tight font-semibold tracking-[-0.02em]">Have an idea or an old site that needs fixing?</h3>
                <span className="relative inline-flex items-center gap-1.5 text-sm font-semibold">
                  Tell us in two lines <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </a>
            </Tilt>
          </StaggerItem>
        </Stagger>
      </Wrap>
    </section>
  )
}

/* ---------- process: a line fills as you scroll and each step lights up when it is reached ---------- */

function Step({ s, i, progress }: { s: (typeof STEPS)[number]; i: number; progress: MotionValue<number> }) {
  const n = STEPS.length
  const at = i / (n - 1)
  const on = useTransform(progress, [Math.max(0, at - 0.08), at], [0, 1])
  const bg = useTransform(on, [0, 1], ["#ffffff", "#2f5fe0"])
  const fg = useTransform(on, [0, 1], ["#2f5fe0", "#ffffff"])
  const scale = useTransform(on, [0, 0.6, 1], [1, 1.25, 1])
  const lift = useTransform(on, [0, 1], [10, 0])
  const seg = useTransform(progress, [at, (i + 1) / (n - 1)], [0, 1])
  return (
    <motion.div style={{ y: lift }} className="relative flex flex-col gap-4 max-lg:pl-16">
      {i < n - 1 && (
        <div aria-hidden="true" className="bg-border absolute top-6 left-12 hidden h-0.5 w-[calc(100%+1.25rem-3rem)] lg:block">
          <motion.div style={{ scaleX: seg }} className="from-brand to-brand-2 h-full origin-left bg-linear-to-r" />
        </div>
      )}
      <motion.div
        style={{ backgroundColor: bg, color: fg, scale }}
        className="border-brand relative z-10 grid size-12 place-items-center rounded-full border-2 font-mono text-sm font-semibold shadow-sm max-lg:absolute max-lg:top-0 max-lg:left-0"
      >
        {i + 1}
      </motion.div>
      <div className="bg-card flex flex-1 flex-col gap-3 rounded-2xl border p-6 transition-shadow hover:shadow-[0_20px_40px_-20px_rgba(31,37,89,.3)]">
        <span className="text-muted-foreground font-mono text-xs tracking-[0.12em] uppercase">
          Step {i + 1} · {s.k}
        </span>
        <h3 className="font-display text-2xl font-semibold tracking-[-0.03em]">{s.t}</h3>
        <p className="text-muted-foreground text-[15px]">{s.d}</p>
      </div>
    </motion.div>
  )
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return (
    <section id="process" className="py-20 sm:py-28">
      <Wrap>
        <SectionHead eyebrow="Process" title="From call to launch in four steps." lede="You see a written scope before we start and a live preview every week after." />
        <div ref={ref} className="relative">
          <div aria-hidden="true" className="bg-border absolute top-6 bottom-6 left-[23px] w-0.5 lg:hidden" />
          <motion.div aria-hidden="true" style={{ scaleY: fill }} className="from-brand to-brand-2 absolute top-6 bottom-6 left-[23px] w-0.5 origin-top bg-linear-to-b lg:hidden" />
          <div className="grid gap-8 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((s, i) => (
              <Step key={s.k} s={s} i={i} progress={fill} />
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  )
}

/* ---------- faq: animated accordion ---------- */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="py-20 sm:py-28">
      <Wrap className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-16">
        <div className="flex flex-col items-start gap-5">
          <Eyebrow>FAQ</Eyebrow>
          <TextAnimate as="h2" by="character" animation="blurInUp" duration={0.5} once className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.04em]">
            Quick answers.
          </TextAnimate>
          <p className="text-muted-foreground text-lg">Looking for something else? Ask us on WhatsApp or by email.</p>
        </div>
        <Stagger className="border-t" gap={0.06}>
          {FAQ.map(([q, a], i) => {
            const isOpen = open === i
            return (
              <StaggerItem key={q} className="border-b">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="font-display hover:text-brand flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left text-xl font-semibold tracking-[-0.02em] transition-colors"
                  >
                    {q}
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0, backgroundColor: isOpen ? "#0b1020" : "#ffffff", color: isOpen ? "#ffffff" : "#0b1020" }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="grid size-8 shrink-0 place-items-center rounded-full border"
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.p initial={{ y: -8 }} animate={{ y: 0 }} className="text-muted-foreground max-w-[62ch] pr-12 pb-6 leading-relaxed">
                        {a}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StaggerItem>
            )
          })}
        </Stagger>
      </Wrap>
    </section>
  )
}
