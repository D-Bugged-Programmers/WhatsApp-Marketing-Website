import { useReducedMotion, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Container from '../common/Container'
import Button from '../common/Button'
import { LogoMark } from '../common/Logo'
import HeroVisual from './HeroVisual'
import { links } from '../../config/site'

// Smooth-scrolls to the features section; the plain #features href still works without JS.
function scrollToFeatures(e) {
  const el = document.getElementById('features')
  if (!el) return
  e.preventDefault()
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

function Line({ children, className = '' }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span className={`block ${className}`} variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}>{children}</motion.span>
    </span>
  )
}

function Welcome({ reduce, className = '' }) {
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }
  const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } }
  return (
    <motion.div variants={container} initial={reduce ? false : 'hidden'} whileInView="show" viewport={{ once: true }} className={`text-center lg:max-w-[46%] lg:text-left ${className}`}>
      <motion.div variants={item} className="mx-auto mb-4 hidden w-fit items-center gap-3 sm:flex lg:mx-0">
        <span className="rounded-xl shadow-[0_0_32px_rgb(52_211_153/0.55)]"><LogoMark className="size-10" /></span>
        <span className="text-xl font-bold tracking-tight">PingReach</span>
      </motion.div>
      <motion.p variants={item} className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.18em] text-emerald-200 backdrop-blur lg:mx-0"><span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-lime" />WELCOME TO PINGREACH</motion.p>
      <motion.p variants={item} className="mt-2 text-base font-medium text-emerald-100/90 sm:text-xl">Welcome to PingReach!</motion.p>
      <h1 className="mt-3 text-3xl font-extrabold leading-[1.08] tracking-tight sm:mt-4 sm:text-5xl md:text-6xl lg:text-5xl xl:text-[3.4rem]">
        <Line>Reach Thousands.</Line>
        <Line className="text-gradient">One Message at a Time.</Line>
      </h1>
      <motion.p variants={item} className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-green-100/75 sm:mt-5 sm:text-lg lg:mx-0">
        Create campaigns, connect with your audience, and manage your messaging — all in one place.
      </motion.p>
      <motion.div variants={item} className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row lg:justify-start">
        <Button to={links.getStarted} variant="mint" size="lg" className="rounded-full">Get Started <ArrowRight aria-hidden="true" className="size-4" /></Button>
        <Button href={links.explore} onClick={scrollToFeatures} variant="outlineLight" size="lg" className="rounded-full border-emerald-300/60">Explore Features</Button>
      </motion.div>
      <motion.p variants={item} className="mt-5 hidden text-sm text-green-100/60 sm:block">Your messaging journey starts here.</motion.p>
    </motion.div>
  )
}

const Backdrop = () => (
  <>
    <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />
    <div aria-hidden="true" className="aurora -right-32 top-10 size-[28rem] bg-emerald-500/25" />
    <div aria-hidden="true" className="aurora -left-40 bottom-0 size-[24rem] bg-lime/15" style={{ animationDelay: '-7s' }} />
  </>
)

// The scroll-driven campaign experience now lives in the intro (components/intro); this is the regular hero.
export default function HeroSection() {
  const reduce = useReducedMotion()
  return (
    <section className="bg-night-grad relative overflow-hidden text-white">
      <Backdrop />
      <Container className="relative grid items-center gap-6 pb-12 pt-10 sm:pt-14 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-2 lg:py-12">
        <Welcome reduce={reduce} className="lg:max-w-none" />
        <HeroVisual />
      </Container>
    </section>
  )
}
