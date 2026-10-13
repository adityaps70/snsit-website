"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type Variants } from "motion/react"

import { cn } from "@/lib/utils"

/** Fade, lift and un-blur a block when it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  as = "div",
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: "div" | "li" | "article"
}) {
  const reduce = useReducedMotion()
  const M = motion[as]
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}

/** Children enter one after another. Wrap each child in <StaggerItem>. */
export function Stagger({ children, className, gap = 0.08 }: { children: ReactNode; className?: string; gap?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  )
}

const itemV: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 140, damping: 20 } },
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemV}>
      {children}
    </motion.div>
  )
}

/** Pulls its child toward the pointer while hovered. */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 })
  const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 })
  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/** Tilts in 3D toward the pointer, with a soft glare that follows it. */
export function Tilt({ children, className, max = 8, glare = true }: { children: ReactNode; className?: string; max?: number; glare?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 160, damping: 18 })
  const sy = useSpring(py, { stiffness: 160, damping: 18 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const glareBg = useTransform([sx, sy], ([a, b]: number[]) => `radial-gradient(420px circle at ${a * 100}% ${b * 100}%, rgba(255,255,255,.5), transparent 45%)`)
  const [hover, setHover] = useState(false)
  return (
    <motion.div
      ref={ref}
      className={cn("relative [transform-style:preserve-3d]", className)}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        px.set((e.clientX - r.left) / r.width)
        py.set((e.clientY - r.top) / r.height)
      }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => {
        setHover(false)
        px.set(0.5)
        py.set(0.5)
      }}
    >
      {children}
      {glare && !reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-50 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: hover ? 1 : 0,
            background: glareBg,
          }}
        />
      )}
    </motion.div>
  )
}

/** Gentle endless bob, used for floating phones and badges. */
export function Float({ children, className, delay = 0, range = 10, duration = 5 }: { children: ReactNode; className?: string; delay?: number; range?: number; duration?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -range, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

export function useWide(q = "(min-width: 1024px)") {
  const [wide, setWide] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setWide(mq.matches)
    on()
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [q])
  return wide
}
