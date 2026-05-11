import { useState, useEffect, useMemo } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, Zap, Shield, Globe, ArrowRight, ChevronDown,
  BarChart3, Users, Scale, Rocket, Server, Bot,
  Cpu, Cloud, Lock, TrendingUp, Mail, Layers,
  CheckCircle, ExternalLink, Menu, X, Sparkles,
  Workflow, Database, LineChart, Building2, Lightbulb,
  ArrowUpRight, ChevronRight, Target, Headphones,
  Pen, Radio, Plane, Boxes, FlaskConical, Rss,
  BookOpen, Eye, Phone, FileCheck, Inbox, Mic2,
  Video, Megaphone, Activity, Heart, Stethoscope
} from 'lucide-react'
import { BlogList, BlogPost } from './pages/Blog'

// ─── Data ──────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Products', href: '/#products' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'Architecture', href: '/#engines' },
  { label: 'Lab', href: '/#lab' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
]

const PRODUCTS = [
  {
    name: 'Pulse',
    letter: 'P',
    tagline: 'HRMS & Operations Intelligence',
    desc: 'Employee dashboard, attendance tracking, payroll, leave management, and real-time work monitoring with productivity scoring.',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-indigo-600',
    icon: Users,
    status: 'LIVE',
    features: ['Team Management', 'Payroll Engine', 'Work Monitor', 'Leave System'],
  },
  {
    name: 'Verify',
    letter: 'V',
    tagline: 'Eligibility Verification AI',
    desc: 'Real-time insurance eligibility checks via Stedi X12 270/271. Payer search, coverage status, copay, deductible — instant.',
    color: '#10b981',
    gradient: 'from-emerald-500 to-emerald-600',
    icon: FileCheck,
    status: 'LIVE',
    features: ['X12 270/271', 'Payer Search', 'Coverage Cards', 'Batch EBV'],
  },
  {
    name: 'Flux',
    letter: 'F',
    tagline: 'AI-Powered Inbox',
    desc: 'Unified email inbox with Claude classification. 3-bucket triage: Needs You / Digest / Noise. Eisenhower matrix for priorities.',
    color: '#22c55e',
    gradient: 'from-green-500 to-green-600',
    icon: Inbox,
    status: 'BUILT',
    features: ['Claude Classifier', 'Priority Triage', 'Auto-Handle', 'MS + Gmail'],
  },
  {
    name: 'Echo',
    letter: 'E',
    tagline: 'Voice AI Platform',
    desc: '4 AI voice agents with 11 personas. Payer calls, sales outreach, patient follow-up, and assistant duties — autonomous phone operations.',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-cyan-600',
    icon: Phone,
    status: 'LIVE',
    features: ['4 Agents', '11 Personas', 'IVR Navigation', 'WhatsApp Ready'],
  },
  {
    name: 'Lisa',
    letter: 'L',
    tagline: 'Meeting AI',
    desc: 'Auto-join Teams/Zoom/Meet meetings with real-time transcription, AI summaries, action items, and decision tracking.',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-violet-600',
    icon: Video,
    status: 'BUILT',
    features: ['Auto-Join', 'Transcription', 'AI Summaries', 'Action Items'],
  },
  {
    name: 'Storm',
    letter: 'S',
    tagline: 'Marketing AI Engine',
    desc: 'Content creation, social scheduling, lead pipeline with scoring, campaign builder. 19,958 leads tracked across multi-tenant workspaces.',
    color: '#ec4899',
    gradient: 'from-pink-500 to-pink-600',
    icon: Megaphone,
    status: 'BUILT',
    features: ['Content Pilot', 'Lead Scoring', 'Campaigns', '19K Leads'],
  },
  {
    name: 'Orion',
    letter: 'O',
    tagline: 'RCM Command Center',
    desc: 'Claims tracking, denial management with CARC/RARC analysis, payment posting, and AR aging — wired to real production data.',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-amber-600',
    icon: Activity,
    status: 'WIRING',
    features: ['5,015 Claims', '2,669 Payments', 'Denial Heatmaps', 'AR Aging'],
  },
]

const SOLUTIONS = [
  {
    icon: Heart, title: 'Revenue Cycle Management',
    desc: 'End-to-end claims, billing, payments, denials, and appeals — fully AI-automated with real payer intelligence.',
    color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'hover:border-rose-500/30',
  },
  {
    icon: Stethoscope, title: 'Healthcare Operations',
    desc: 'EHR automation, credentialing, eligibility verification, and provider enrollment at scale.',
    color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'hover:border-emerald-500/30',
  },
  {
    icon: TrendingUp, title: 'Sales & Revenue',
    desc: 'AI-driven pipeline, lead scoring, outreach automation, and CRM intelligence.',
    color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'hover:border-indigo-500/30',
  },
  {
    icon: BarChart3, title: 'Marketing & Content',
    desc: 'Automated content engines, social scheduling, analytics, and audience intelligence.',
    color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'hover:border-cyan-500/30',
  },
  {
    icon: Users, title: 'HR & People Ops',
    desc: 'HRMS automation, payroll, onboarding, leave management, and team analytics.',
    color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'hover:border-violet-500/30',
  },
  {
    icon: Cloud, title: 'Cloud & AI Infrastructure',
    desc: 'AWS architecture, CI/CD, serverless agents, LLM orchestration, and zero-cost scaling.',
    color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'hover:border-sky-500/30',
  },
]

const LAB_CONCEPTS = [
  { name: 'FlyMax', desc: 'AI-native autonomous drone systems for inspection, delivery, surveillance, and 3D mapping.', icon: Plane, color: 'text-sky-400', status: 'Concept' },
  { name: 'LLM Foundry', desc: 'Domain-specific language models trained on structured healthcare, operations, and business data.', icon: FlaskConical, color: 'text-purple-400', status: 'Partners' },
  { name: 'AI Tokenization', desc: 'Tokenize agent output, compute hours, and operational capacity. A framework for valuing AI work.', icon: Boxes, color: 'text-amber-400', status: 'Research' },
  { name: 'Brain OS', desc: 'Unified intelligence layer across CLI, chat, API, voice. One brain, persistent memory, every channel.', icon: Brain, color: 'text-rose-400', status: 'Building' },
  { name: 'Agent Marketplace', desc: 'Deploy, share, and sell AI agents. A marketplace for pre-built business automation.', icon: Rocket, color: 'text-emerald-400', status: 'Q3 2026' },
  { name: 'Your Idea Here', desc: 'We keep this open. If you have a concept that fits — AI-native, autonomous, scalable — we want to hear it.', icon: Lightbulb, color: 'text-indigo-400', status: 'Open' },
]

const ENGINES = [
  { name: 'Revenue Engine', desc: 'Billing, claims, payments, AR — all AI-automated.', icon: LineChart, status: 'live', gradient: 'from-indigo-500 to-cyan-500' },
  { name: 'Delivery Engine', desc: 'Client ops, SLAs, quality audits at scale.', icon: Layers, status: 'live', gradient: 'from-emerald-500 to-teal-500' },
  { name: 'Content Engine', desc: 'Blog, social, brand voice, analytics — powered by Storm.', icon: Sparkles, status: 'live', gradient: 'from-purple-500 to-pink-500' },
  { name: 'Product Engine', desc: 'Voice AI, SaaS platform, agent architecture.', icon: Cpu, status: 'building', gradient: 'from-amber-500 to-orange-500' },
  { name: 'Power Engine', desc: 'Infra, security, compliance, HR, legal.', icon: Shield, status: 'building', gradient: 'from-sky-500 to-indigo-500' },
]

const ROADMAP = [
  { q: 'Q2 2026', items: ['7-Product Platform Launch', 'Voice AI v2 — IVR Mastery', 'Multi-client Scaling'], active: true },
  { q: 'Q3 2026', items: ['Agent Marketplace Beta', 'LLM Foundry Partners', 'API Gateway'], active: false },
  { q: 'Q4 2026', items: ['Brain OS v1', 'FlyMax Prototype', 'Enterprise Tier'], active: false },
  { q: 'Q1 2027', items: ['AI Tokenization Framework', 'Global Expansion', 'Series A'], active: false },
]

const PARTNERS = ['NVIDIA', 'AWS', 'Microsoft', 'MongoDB', 'Vercel', 'Stedi', 'ElevenLabs']

const STATS = [
  { num: '5,015', label: 'Claims Tracked' },
  { num: '7', label: 'AI Products' },
  { num: '$0', label: 'Infra Cost/mo' },
  { num: '24/7', label: 'Autonomous Ops' },
]

// ─── Floating Particles ───────────────────────────────

function Particles({ count = 25 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 6 + 8,
      delay: Math.random() * 5,
      color: Math.random() > 0.5 ? 'bg-purple-400' : 'bg-emerald-400',
      opacity: Math.random() * 0.4 + 0.1,
    }))
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className={`absolute rounded-full ${p.color} animate-particle`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// ─── Navbar ────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo-mark.png" alt="Getmax" className="h-9 w-9 object-contain" />
          <img src="/logo-wordmark-white.png" alt="Getmax" className="h-6 object-contain hidden sm:block" />
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(l => (
            l.href.startsWith('/') && !l.href.includes('#') ? (
              <Link key={l.href} to={l.href} className="text-sm text-gray-400 hover:text-white font-medium transition-colors">{l.label}</Link>
            ) : (
              <a key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-white font-medium transition-colors">{l.label}</a>
            )
          ))}
          <a href="/#contact" className="px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5">
            Get Started
          </a>
        </div>

        <button className="md:hidden text-gray-400" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map(l => (
                l.href.startsWith('/') && !l.href.includes('#') ? (
                  <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="text-gray-400 hover:text-white font-medium">{l.label}</Link>
                ) : (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-gray-400 hover:text-white font-medium">{l.label}</a>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// ─── Hero ──────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center grid-bg pt-16 overflow-hidden">
      {/* Gradient blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Particles */}
      <Particles count={25} />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="badge text-purple-300 mb-8 mx-auto w-fit">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-dot" />
            <span>AI-Native Healthcare & Business Platform</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.05 }} className="mb-10">
          <img src="/logo-mark.png" alt="Getmax" className="h-20 w-20 mx-auto mb-6 drop-shadow-[0_0_30px_rgba(167,139,250,0.3)]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-white"
        >
          One Platform.
          <br />
          <span className="gradient-text">Seven AI Products.</span>
          <br />
          <span className="text-gray-400 text-4xl md:text-5xl">Zero Friction.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Healthcare RCM. Voice AI. Marketing. HR. Operations.
          <br />
          <span className="font-medium text-gray-300">Built by operators, powered by AI, scaled to zero cost.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#products" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0A0A0F] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:-translate-y-0.5">
            Explore Products <ArrowRight size={18} />
          </a>
          <a href="https://app.getmaxglobal.com" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.04] border border-white/[0.08] text-white font-semibold rounded-full transition-all hover:bg-white/[0.08] hover:-translate-y-0.5">
            Open Platform <ExternalLink size={16} />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold gradient-text tabular-nums">{s.num}</div>
              <div className="text-sm text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Partner logos */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {PARTNERS.map(p => (
            <span key={p} className="text-xs font-semibold text-gray-600 uppercase tracking-[0.2em]">{p}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Products ─────────────────────────────────────────

function ProductsSection() {
  return (
    <section id="products" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="7 Products"
          title={<>What We've <span className="gradient-text">Built</span></>}
          subtitle="Live products powering real healthcare operations and businesses today."
        />
        <div className="space-y-4">
          {PRODUCTS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="relative overflow-hidden p-6 md:p-8 glass-card rounded-2xl hover:-translate-y-1 transition-all group"
            >
              <div className="relative flex flex-col md:flex-row gap-5">
                {/* Product icon */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-extrabold text-lg">{p.letter}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-xl font-extrabold text-white">{p.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      p.status === 'LIVE' ? 'bg-emerald-500/20 text-emerald-400' :
                      p.status === 'BUILT' ? 'bg-cyan-500/20 text-cyan-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>{p.status}</span>
                  </div>
                  <p className="text-sm font-medium mb-2" style={{ color: p.color }}>{p.tagline}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.features.map(f => (
                      <span key={f} className="px-3 py-1.5 bg-white/[0.04] text-gray-400 text-xs font-medium rounded-lg border border-white/[0.06]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Hover glow */}
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ background: `${p.color}10` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Solutions ─────────────────────────────────────────

function Solutions() {
  return (
    <section id="solutions" className="py-24 px-6 section-dark">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="What We Automate"
          title={<>Solutions That <span className="gradient-text">Scale</span></>}
          subtitle="Every department. Every workflow. AI-native from day one."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOLUTIONS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className={`group p-7 glass-card rounded-2xl ${s.border} transition-all hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center mb-5`}>
                <s.icon className={s.color} size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Lab / Concepts ────────────────────────────────────

function LabSection() {
  return (
    <section id="lab" className="py-24 px-6 section-dark">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Getmax Lab"
          title={<>Ideas & <span className="gradient-text-warm">Concepts</span></>}
          subtitle="Where tomorrow's products are born. Some are building, some are dreaming. All are open."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LAB_CONCEPTS.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="group p-6 glass-card rounded-2xl hover:border-white/[0.12] transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white/[0.04] rounded-xl flex items-center justify-center">
                  <c.icon className={c.color} size={24} />
                </div>
                <span className="px-2 py-0.5 bg-white/[0.04] text-gray-500 text-xs font-medium rounded-full border border-white/[0.06]">
                  {c.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{c.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Engines ───────────────────────────────────────────

function EnginesSection() {
  return (
    <section id="engines" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Architecture"
          title={<>The <span className="gradient-text">5 Engines</span></>}
          subtitle="Every function runs on a dedicated engine. Together, a self-operating company."
        />
        <div className="space-y-3">
          {ENGINES.map((e, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="flex items-center gap-6 p-5 glass-card rounded-2xl hover:border-white/[0.12] transition-all group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${e.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform`}>
                <e.icon className="text-white" size={26} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-white">{e.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    e.status === 'live' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>{e.status === 'live' ? 'LIVE' : 'BUILDING'}</span>
                </div>
                <p className="text-gray-400 text-sm">{e.desc}</p>
              </div>
              <ChevronRight size={20} className="text-gray-600 group-hover:text-purple-400 transition-colors flex-shrink-0 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Roadmap ───────────────────────────────────────────

function RoadmapSection() {
  return (
    <section id="roadmap" className="py-24 px-6 section-dark">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="What's Next"
          title={<span className="gradient-text">Roadmap</span>}
          subtitle="Where we're headed. Built in public."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROADMAP.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className={`p-6 rounded-2xl border transition-all ${
                r.active
                  ? 'bg-purple-500/[0.06] border-purple-500/30 shadow-[0_0_30px_rgba(167,139,250,0.08)]'
                  : 'glass-card'
              }`}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className={`font-mono font-bold text-sm ${r.active ? 'text-purple-400' : 'text-gray-500'}`}>{r.q}</span>
                {r.active && <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-dot" />}
              </div>
              <ul className="space-y-3">
                {r.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className={`mt-0.5 flex-shrink-0 ${r.active ? 'text-emerald-400' : 'text-gray-600'}`} />
                    <span className={`text-sm ${r.active ? 'text-gray-200 font-medium' : 'text-gray-500'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Blog Preview ──────────────────────────────────────

function BlogPreview() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch('/blog/posts.json')
      .then(r => r.json())
      .then(data => setPosts(data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)))
      .catch(() => {})
  }, [])

  if (posts.length === 0) return null

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="badge text-rose-300 mb-3">Fresh Reads</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4">
              From the <span className="gradient-text">Blog</span>
            </h2>
          </div>
          <Link to="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-purple-400 font-medium text-sm hover:gap-2.5 transition-all">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link to={`/blog/${post.id}`} className="block p-6 glass-card rounded-2xl hover:border-white/[0.12] transition-all hover:-translate-y-1 group h-full">
                <span className="inline-block px-2.5 py-0.5 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full mb-3">{post.category}</span>
                <h3 className="font-bold text-white mb-2 group-hover:text-purple-300 transition-colors leading-snug">{post.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{post.excerpt}</p>
                <div className="mt-4 text-xs text-gray-600">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} &middot; {post.readTime}</div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="sm:hidden mt-8 text-center">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-purple-400 font-medium text-sm">
            View all posts <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Contact ───────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="py-24 px-6 section-dark">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Ready to <span className="gradient-text">Get Started</span>?
          </h2>
          <p className="text-gray-400 text-lg">Let's talk about what we can automate for you.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Mail, label: 'Email Us', value: 'contact@getmaxglobal.com', href: 'mailto:contact@getmaxglobal.com' },
            { icon: Headphones, label: 'Healthcare RCM', value: 'getmaxsolutions.com', href: 'https://getmaxsolutions.com' },
            { icon: Building2, label: 'Headquarters', value: 'India & USA', href: null },
          ].map((c, i) => (
            <div key={i} className="p-6 glass-card rounded-2xl text-center hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <c.icon className="text-purple-400" size={22} />
              </div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-[0.15em] mb-1">{c.label}</div>
              {c.href ? (
                <a href={c.href} className="text-white font-semibold hover:text-purple-400 transition-colors">{c.value}</a>
              ) : (
                <span className="text-white font-semibold">{c.value}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/[0.06] bg-[#08080d]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo-mark.png" alt="Getmax" className="h-7 w-7 object-contain" />
          <span className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Getmax Global. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/blog" className="text-sm text-gray-500 hover:text-gray-300 transition-colors font-medium">Blog</Link>
          <a href="https://app.getmaxglobal.com" className="text-sm text-gray-500 hover:text-gray-300 transition-colors font-medium">Platform</a>
          <a href="https://getmaxsolutions.com" className="text-sm text-gray-500 hover:text-gray-300 transition-colors font-medium">RCM</a>
          <a href="mailto:contact@getmaxglobal.com" className="text-sm text-gray-500 hover:text-gray-300 transition-colors font-medium">Contact</a>
        </div>
      </div>
    </footer>
  )
}

// ─── Helpers ───────────────────────────────────────────

function SectionHeader({ badge, title, subtitle }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
      <span className="badge text-purple-300 mb-4">{badge}</span>
      <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 mt-4">{title}</h2>
      {subtitle && <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  )
}

// ─── Home Page ─────────────────────────────────────────

function HomePage() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <Solutions />
      <EnginesSection />
      <LabSection />
      <RoadmapSection />
      <BlogPreview />
      <Contact />
    </>
  )
}

// ─── App ───────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
