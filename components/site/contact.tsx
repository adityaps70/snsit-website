"use client"

import { useMemo, useState, type FormEvent } from "react"
import { AnimatePresence, motion, useAnimationControls, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import { ArrowUp, ArrowUpRight, Briefcase, Check, Copy, Layers, MessageCircle, Send } from "lucide-react"
import type { COBEOptions } from "cobe"

import { cn } from "@/lib/utils"
import { AuroraText } from "@/components/magicui/aurora-text"
import { CoolMode } from "@/components/magicui/cool-mode"
import { Dock, DockIcon } from "@/components/magicui/dock"
import { Globe } from "@/components/magicui/globe"
import { HyperText } from "@/components/magicui/hyper-text"
import { Ripple } from "@/components/magicui/ripple"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { ShineBorder } from "@/components/magicui/shine-border"

import { CONTACT, NAV, NEEDS } from "./content"
import { go, Logo } from "./hero"
import { Reveal } from "./motion"
import { Eyebrow } from "./sections"

/* Client cities: Lucknow (inFAMOUS Gaming Cafe) and Shillong (Cloud Trails). */
const GLOBE: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: 1,
  diffuse: 1.4,
  mapSamples: 16000,
  mapBrightness: 7,
  baseColor: [0.2, 0.4, 0.95],
  markerColor: [1, 1, 1],
  glowColor: [0.55, 0.7, 1],
  markers: [
    { location: [26.8467, 80.9462], size: 0.1 },
    { location: [25.5788, 91.8933], size: 0.1 },
  ],
}

function CopyLine({ value, raw, label }: { value: string; raw: string; label: string }) {
  const [done, setDone] = useState(false)
  const id = `cl-${label}`
  const select = () => {
    const el = document.getElementById(id)
    if (!el) return
    const r = document.createRange()
    r.selectNodeContents(el)
    const s = window.getSelection()
    s?.removeAllRanges()
    s?.addRange(r)
  }
  const copy = () => {
    const ok = () => {
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    }
    try {
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(raw).then(ok, select)
      else select()
    } catch {
      select()
    }
  }
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span id={id} className="font-display text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold tracking-[-0.02em] select-all">
        {value}
      </span>
      <motion.button
        type="button"
        onClick={copy}
        whileTap={{ scale: 0.9 }}
        aria-label={`Copy ${label}`}
        className="hover:bg-muted relative inline-flex h-9 items-center gap-1.5 overflow-hidden rounded-full border px-3 text-xs font-medium transition-colors"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={done ? "y" : "n"}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-1.5"
          >
            {done ? <Check className="text-live size-3.5" /> : <Copy className="size-3.5" />}
            {done ? "Copied" : "Copy"}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

const SPARKS = { particle: "circle", size: 12, particleCount: 34, speedHorz: 7, speedUp: 16 }

export function Contact() {
  const [name, setName] = useState("")
  const [biz, setBiz] = useState("")
  const [msg, setMsg] = useState("")
  const [needs, setNeeds] = useState<string[]>(["Website"])
  const [err, setErr] = useState(false)
  const [sent, setSent] = useState(false)
  const shake = useAnimationControls()

  const waUrl = useMemo(() => {
    const lines = [`Hi SNS IT, I'm ${name.trim() || "…"}${biz.trim() ? " from " + biz.trim() : ""}.`]
    if (needs.length) lines.push("I need: " + needs.join(", ") + ".")
    if (msg.trim()) lines.push(msg.trim())
    return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`
  }, [name, biz, msg, needs])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setErr(true)
      shake.start({ x: [0, -10, 10, -6, 6, 0], transition: { duration: 0.4 } })
      document.getElementById("f-name")?.focus()
      return
    }
    setErr(false)
    const a = document.createElement("a")
    a.href = waUrl
    a.target = "_blank"
    a.rel = "noopener"
    document.body.appendChild(a)
    a.click()
    a.remove()
    setSent(true)
  }

  const field =
    "w-full rounded-xl border bg-white px-3.5 py-3 text-[15px] text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-brand focus:shadow-[0_0_0_4px_rgba(76,125,240,.15)]"

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative grid overflow-hidden rounded-[32px] border bg-[linear-gradient(160deg,#f3f7ff,#ffffff_45%)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="relative flex min-w-0 flex-col gap-6 overflow-hidden p-6 sm:p-10 lg:pb-0">
              <Eyebrow>Start a project</Eyebrow>
              <h2 className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] font-bold tracking-[-0.05em]">
                Let's <AuroraText colors={["#2f5fe0", "#6a9bf8", "#1f2559", "#4c7df0"]}>talk.</AuroraText>
              </h2>
              <div className="flex flex-col gap-3">
                <CopyLine value={CONTACT.email} raw={CONTACT.email} label="email" />
                <CopyLine value={CONTACT.phone} raw={CONTACT.phoneRaw} label="phone" />
              </div>
              <p className="text-muted-foreground font-mono text-[11px] tracking-wide">Globe markers: Lucknow and Shillong, home to two of our client businesses.</p>
              <div className="relative mx-auto mt-2 aspect-square w-full max-w-[460px] lg:mt-auto lg:mb-[-18%]" aria-hidden="true">
                <Ripple mainCircleSize={260} numCircles={6} mainCircleOpacity={0.12} className="[&>div]:bg-brand/10 [&>div]:border-brand/20" />
                <Globe config={GLOBE} className="max-w-none" />
              </div>
            </div>

            <div className="relative min-w-0 border-t p-6 sm:p-10 lg:border-t-0 lg:border-l">
              <motion.form
                animate={shake}
                onSubmit={submit}
                noValidate
                className="relative flex flex-col gap-5 rounded-2xl border bg-white/80 p-5 shadow-[0_30px_60px_-35px_rgba(31,37,89,.35)] backdrop-blur sm:p-6"
              >
                <ShineBorder shineColor={["#4c7df0", "#9dc0ff", "#4c7df0"]} borderWidth={1.5} duration={12} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <label htmlFor="f-name" className="text-muted-foreground flex flex-col gap-1.5 text-sm">
                    Your name
                    <input
                      id="f-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Name"
                      value={name}
                      aria-invalid={err || undefined}
                      aria-describedby="f-note"
                      onChange={(e) => {
                        setName(e.target.value)
                        if (e.target.value.trim()) setErr(false)
                      }}
                      className={cn(field, err && "border-red-500 bg-red-50")}
                    />
                  </label>
                  <label htmlFor="f-biz" className="text-muted-foreground flex flex-col gap-1.5 text-sm">
                    Business
                    <input id="f-biz" name="biz" placeholder="Company or brand" value={biz} onChange={(e) => setBiz(e.target.value)} className={field} />
                  </label>
                </div>
                <fieldset className="flex flex-col gap-2">
                  <legend className="text-muted-foreground mb-2 text-sm">What do you need?</legend>
                  <div className="flex flex-wrap gap-2">
                    {NEEDS.map((n, i) => {
                      const on = needs.includes(n)
                      return (
                        <label key={n} htmlFor={`need-${i}`} className="relative cursor-pointer">
                          <input
                            id={`need-${i}`}
                            type="checkbox"
                            className="peer sr-only"
                            checked={on}
                            onChange={() => setNeeds((v) => (on ? v.filter((x) => x !== n) : [...v, n]))}
                          />
                          <motion.span
                            whileTap={{ scale: 0.92 }}
                            className={cn(
                              "peer-focus-visible:ring-ring relative inline-flex h-9 items-center gap-1.5 overflow-hidden rounded-full border px-3.5 text-sm transition-colors peer-focus-visible:ring-2",
                              on ? "text-white" : "bg-white hover:bg-muted"
                            )}
                          >
                            {on && <motion.span className="bg-primary absolute inset-0 rounded-full" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} />}
                            <AnimatePresence>
                              {on && (
                                <motion.span initial={{ width: 0, opacity: 0 }} animate={{ width: "auto", opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="relative z-10 inline-flex">
                                  <Check className="size-3.5" />
                                </motion.span>
                              )}
                            </AnimatePresence>
                            <span className="relative z-10">{n}</span>
                          </motion.span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
                <label htmlFor="f-msg" className="text-muted-foreground flex flex-col gap-1.5 text-sm">
                  Project details
                  <textarea id="f-msg" name="msg" rows={4} placeholder="What are you building, and by when?" value={msg} onChange={(e) => setMsg(e.target.value)} className={cn(field, "min-h-28 resize-y")} />
                </label>
                <CoolMode options={SPARKS}>
                  <ShimmerButton type="submit" background="var(--primary)" shimmerColor="#cfe0ff" borderRadius="14px" className="h-12 w-full gap-2 text-base font-semibold">
                    Send on WhatsApp <Send className="size-4" />
                  </ShimmerButton>
                </CoolMode>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={err ? "e" : sent ? "s" : "n"}
                    id="f-note"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className={cn("text-xs", err ? "text-red-600" : "text-muted-foreground")}
                  >
                    {err
                      ? "Add your name so we know who to reply to."
                      : sent
                        ? `If WhatsApp didn't open, message ${CONTACT.phone} or email ${CONTACT.email}.`
                        : `Opens WhatsApp with your message filled in. Prefer email? Write to ${CONTACT.email}.`}
                  </motion.p>
                </AnimatePresence>
              </motion.form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- footer: every letter of the wordmark springs up under the pointer ---------- */

function Wordmark({ text }: { text: string }) {
  const reduce = useReducedMotion()
  return (
    <p aria-hidden="true" className="font-display mt-14 flex justify-center overflow-hidden text-[clamp(3rem,11.5vw,10rem)] leading-[0.95] font-extrabold tracking-[-0.06em] whitespace-nowrap select-none">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          className="inline-block bg-linear-to-b from-[#0b1020] to-[#0b1020]/10 bg-clip-text whitespace-pre text-transparent"
          initial={reduce ? false : { y: "100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 160, damping: 18, delay: i * 0.03 }}
          whileHover={{ y: "-14%", color: "#4c7df0", transition: { type: "spring", stiffness: 400, damping: 10 } }}
        >
          {c}
        </motion.span>
      ))}
    </p>
  )
}

export function Footer() {
  return (
    <footer className="border-t pt-16 pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#top" aria-label="Back to top" className="inline-flex h-12 items-center">
              <Logo className="h-12" />
            </a>
            <p className="text-muted-foreground mt-4 max-w-[38ch]">{CONTACT.company}. Websites, platforms, apps and AI automation for businesses that want to ship.</p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-1">
            <span className="text-muted-foreground mb-2 font-mono text-xs tracking-[0.12em] uppercase">Navigate</span>
            {[...NAV, { label: "Contact", href: "#contact" }].map((n) => (
              <a key={n.href} href={n.href} className="group hover:text-brand inline-flex items-center gap-2 py-1.5 transition-colors">
                <span className="bg-brand h-px w-0 transition-all duration-300 group-hover:w-4" />
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground mb-2 font-mono text-xs tracking-[0.12em] uppercase">Contact</span>
            <span className="py-1.5 select-all">{CONTACT.email}</span>
            <span className="py-1.5 select-all">{CONTACT.phone}</span>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener" className="hover:text-brand inline-flex items-center gap-1 py-1.5 transition-colors">
              WhatsApp <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
        <Wordmark text="Sea N Shore IT" />
        <div className="text-muted-foreground mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-sm">
          <span>
            © {new Date().getFullYear()} {CONTACT.company}. All rights reserved.
          </span>
          <HyperText as="span" className="font-mono text-sm font-normal" animateOnHover startOnView>
            SNSIT.CO.IN
          </HyperText>
        </div>
      </div>
    </footer>
  )
}

/* ---------- floating dock: appears once the hero has scrolled away ---------- */

export function FloatingDock() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, "change", (v) => {
    const nearEnd = v + window.innerHeight > document.documentElement.scrollHeight - 200
    setShow(v > 700 && !nearEnd)
  })
  const items = [
    { label: "Back to top", icon: <ArrowUp className="size-5" />, on: go("#top") },
    { label: "Work", icon: <Briefcase className="size-5" />, on: go("#work") },
    { label: "Services", icon: <Layers className="size-5" />, on: go("#services") },
    { label: "Start a project", icon: <Send className="size-5" />, on: go("#contact"), hot: true },
  ]
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-40 flex justify-center px-4"
        >
          <Dock iconSize={40} iconMagnification={58} className="mt-0 border-white/60 bg-white/70 shadow-[0_20px_50px_-20px_rgba(31,37,89,.45)] backdrop-blur-xl">
            {items.map((it) => (
              <DockIcon key={it.label} className={cn("rounded-full", it.hot ? "bg-primary text-white" : "hover:bg-muted text-foreground")}>
                <button type="button" onClick={it.on} aria-label={it.label} title={it.label} className="grid size-6 place-items-center">
                  {it.icon}
                </button>
              </DockIcon>
            ))}
            <DockIcon className="rounded-full bg-[#12a46a] text-white">
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener" aria-label="WhatsApp us" title="WhatsApp us" className="grid size-6 place-items-center">
                <MessageCircle className="size-5" />
              </a>
            </DockIcon>
          </Dock>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
