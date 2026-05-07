import { useState, useEffect } from 'react'
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
  BookOpen, Eye
} from 'lucide-react'
import { BlogList, BlogPost } from './pages/Blog'

// ─── Data ──────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Solutions', href: '/#solutions' },
  { label: 'Products', href: '/#products' },
  { label: 'Lab', href: '/#lab' },
  { label: 'Roadmap', href: '/#roadmap' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
]

const SOLUTIONS = [
  {
    icon: TrendingUp, title: 'Sales & Revenue',
    desc: 'AI-driven pipeline, lead scoring, outreach automation, and CRM intelligence.',
    color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'hover:border-indigo-200',
  },
  {
    icon: BarChart3, title: 'Marketing & Content',
    desc: 'Automated content engines, social scheduling, analytics, and audience intelligence.',
    color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'hover:border-cyan-200',
  },
  {
    icon: Users, title: 'HR & People Ops',
    desc: 'HRMS automation, payroll, onboarding, leave management, and team analytics.',
    color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'hover:border-emerald-200',
  },
  {
    icon: Workflow, title: 'Operations',
    desc: 'Process automation, task orchestration, SLA tracking, and real-time dashboards.',
    color: 'text-amber-600', bg: 'bg-amber-50', border: 'hover:border-amber-200',
  },
  {
    icon: Scale, title: 'Legal & Compliance',
    desc: 'Contract analysis, HIPAA/SOC2, audit trails, and risk management.',
    color: 'text-rose-600', bg: 'bg-rose-50', border: 'hover:border-rose-200',
  },
  {
    icon: Cloud, title: 'Cloud & AI Infrastructure',
    desc: 'AWS architecture, CI/CD, serverless, AI agents, LLM orchestration.',
    color: 'text-sky-600', bg: 'bg-sky-50', border: 'hover:border-sky-200',
  },
]

const PRODUCTS = [
  {
    name: 'ContentPilot',
    tagline: 'Your AI Content Engine',
    desc: 'Research, write, publish, repurpose — every day, every channel, fully automated. ContentPilot runs your entire content operation on autopilot.',
    icon: Pen,
    gradient: 'from-indigo-500 to-purple-500',
    status: 'Live',
    features: ['Daily auto-blog', 'Social repurposing', 'Brand voice AI', 'Analytics loop'],
  },
  {
    name: 'Voice AI',
    tagline: 'Conversational Agents That Call, Listen & Act',
    desc: 'AI-powered phone agents with natural voices, DTMF navigation, IVR handling, and real-time transcription. 17+ page platform live on Vercel.',
    icon: Headphones,
    gradient: 'from-cyan-500 to-emerald-500',
    status: 'Live',
    features: ['11 voice personas', 'Hold & IVR aware', 'Real-time transcription', 'WhatsApp ready'],
  },
  {
    name: 'Smart Schema',
    tagline: 'Intelligent Data Architecture',
    desc: 'Self-evolving database schemas that adapt to your data. 14 collections, 31 tables, zero manual migrations.',
    icon: Database,
    gradient: 'from-amber-500 to-orange-500',
    status: 'v5 Live',
    features: ['Auto-migration', '14 collections', 'MongoDB + SQLite', 'Vector-ready'],
  },
]

const LAB_CONCEPTS = [
  {
    name: 'FlyMax',
    desc: 'AI-native autonomous drone systems for inspection, delivery, surveillance, and 3D mapping. Same agent architecture, physical world.',
    icon: Plane,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    status: 'Concept',
  },
  {
    name: 'LLM Foundry',
    desc: 'Build new-age language models with us. We\'re collecting structured data across healthcare, operations, and business to train domain-specific LLMs. Open to partners.',
    icon: FlaskConical,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    status: 'Recruiting Partners',
  },
  {
    name: 'AI Tokenization',
    desc: 'Tokenize AI agent output, compute hours, and operational capacity. A framework for valuing and trading AI work units.',
    icon: Boxes,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    status: 'Research',
  },
  {
    name: 'Brain OS',
    desc: 'Unified intelligence layer across all surfaces — CLI, chat, API, voice. One brain, persistent memory, every channel connected.',
    icon: Brain,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    status: 'Building',
  },
  {
    name: 'Agent Marketplace',
    desc: 'Deploy, share, and sell AI agents. A marketplace where businesses can plug in pre-built agents for any function.',
    icon: Rocket,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    status: 'Q3 2026',
  },
  {
    name: 'Your Idea Here',
    desc: 'We keep this open. If you have a concept that fits the Getmax architecture — AI-native, autonomous, scalable — we want to hear it.',
    icon: Lightbulb,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    status: 'Open',
  },
]

const ENGINES = [
  { name: 'Revenue Engine', desc: 'Billing, claims, payments, AR — all AI-automated.', icon: LineChart, status: 'live', gradient: 'from-indigo-500 to-cyan-500' },
  { name: 'Delivery Engine', desc: 'Client ops, SLAs, quality audits at scale.', icon: Layers, status: 'live', gradient: 'from-emerald-500 to-teal-500' },
  { name: 'Content Engine', desc: 'Blog, social, brand voice, analytics — powered by ContentPilot.', icon: Sparkles, status: 'live', gradient: 'from-purple-500 to-pink-500' },
  { name: 'Product Engine', desc: 'Voice AI, SaaS, platform architecture.', icon: Cpu, status: 'building', gradient: 'from-amber-500 to-orange-500' },
  { name: 'Power Engine', desc: 'Infra, security, compliance, HR, legal.', icon: Shield, status: 'building', gradient: 'from-sky-500 to-indigo-500' },
]

const ROADMAP = [
  { q: 'Q2 2026', items: ['ContentPilot Public Launch', 'Voice AI v2', 'Multi-client Scaling'], active: true },
  { q: 'Q3 2026', items: ['Agent Marketplace Beta', 'LLM Foundry Partners', 'API Gateway'], active: false },
  { q: 'Q4 2026', items: ['Brain OS v1', 'FlyMax Prototype', 'Enterprise Tier'], active: false },
  { q: 'Q1 2027', items: ['AI Tokenization Framework', 'Global Expansion', 'Series A'], active: false },
]

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
      scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100' : 'bg-white/50 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shadow-md shadow-indigo-200">
            <span className="text-white font-extrabold text-sm">G</span>
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">
            Getmax<span className="text-indigo-600">Global</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(l => (
            l.href.startsWith('/') && !l.href.includes('#') ? (
              <Link key={l.href} to={l.href} className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">{l.label}</Link>
            ) : (
              <a key={l.href} href={l.href} className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">{l.label}</a>
            )
          ))}
          <a href="/#contact" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-indigo-200 hover:shadow-lg hover:-translate-y-0.5">
            Get Started
          </a>
        </div>

        <button className="md:hidden text-gray-500" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map(l => (
                l.href.startsWith('/') && !l.href.includes('#') ? (
                  <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-900 font-medium">{l.label}</Link>
                ) : (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-900 font-medium">{l.label}</a>
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-100/60 via-transparent to-cyan-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-dot" />
            <span className="text-sm text-indigo-600 font-medium">AI-Native Business Platform</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-gray-900"
        >
          Automate Every Layer
          <br />
          <span className="gradient-text">of Your Business</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Sales. Marketing. HR. Operations. Legal. Cloud. AI.
          <br />
          <span className="font-medium text-gray-700">One platform. Zero busywork. Infinite scale.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#solutions" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5">
            Explore Solutions <ArrowRight size={18} />
          </a>
          <Link to="/blog" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white border-2 border-gray-200 hover:border-indigo-300 text-gray-700 font-semibold rounded-xl transition-all hover:shadow-md">
            Read the Blog <BookOpen size={18} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { num: '10+', label: 'AI Agents Live' },
            { num: '5', label: 'Business Engines' },
            { num: '24/7', label: 'Autonomous Ops' },
            { num: '$0', label: 'Wasted Overhead' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold gradient-text">{s.num}</div>
              <div className="text-sm text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Solutions ─────────────────────────────────────────

function Solutions() {
  return (
    <section id="solutions" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader badge="What We Automate" badgeColor="indigo" title={<>Solutions That <span className="gradient-text">Scale</span></>} subtitle="Every department. Every workflow. AI-native from day one." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className={`group p-7 bg-white border border-gray-100 rounded-2xl ${s.border} transition-all soft-shadow hover:soft-shadow-lg hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center mb-5`}>
                <s.icon className={s.color} size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Products ──────────────────────────────────────────

function ProductsSection() {
  return (
    <section id="products" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader badge="Products" badgeColor="cyan" title={<>What We've <span className="gradient-text">Built</span></>} subtitle="Live products powering real businesses today." />
        <div className="space-y-6">
          {PRODUCTS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden p-8 bg-white border border-gray-100 rounded-2xl soft-shadow-lg hover:-translate-y-1 transition-all group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-50/50 to-transparent rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="relative flex flex-col md:flex-row gap-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <p.icon className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-extrabold text-gray-900">{p.name}</h3>
                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full">{p.status}</span>
                  </div>
                  <p className="text-sm text-indigo-600 font-medium mb-3">{p.tagline}</p>
                  <p className="text-gray-500 leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.features.map(f => (
                      <span key={f} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg border border-gray-100">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
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
    <section id="lab" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Getmax Lab"
          badgeColor="purple"
          title={<>Ideas & <span className="gradient-text-warm">Concepts</span></>}
          subtitle="Where tomorrow's products are born. Some are building, some are dreaming. All are open."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAB_CONCEPTS.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="group p-6 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 transition-all soft-shadow hover:soft-shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center`}>
                  <c.icon className={c.color} size={24} />
                </div>
                <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs font-medium rounded-full border border-gray-100">
                  {c.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{c.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
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
        <SectionHeader badge="Architecture" badgeColor="emerald" title={<>The <span className="gradient-text">5 Engines</span></>} subtitle="Every function runs on a dedicated engine. Together, a self-operating company." />
        <div className="space-y-4">
          {ENGINES.map((e, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 transition-all group soft-shadow hover:soft-shadow-lg"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${e.gradient} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                <e.icon className="text-white" size={26} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{e.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    e.status === 'live' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>{e.status === 'live' ? 'LIVE' : 'BUILDING'}</span>
                </div>
                <p className="text-gray-500 text-sm">{e.desc}</p>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0 hidden md:block" />
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
    <section id="roadmap" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-5xl mx-auto">
        <SectionHeader badge="What's Next" badgeColor="sky" title={<span className="gradient-text">Roadmap</span>} subtitle="Where we're headed. Built in public." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROADMAP.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className={`p-6 rounded-2xl border transition-all ${
                r.active ? 'bg-white border-indigo-200 shadow-lg shadow-indigo-100 ring-1 ring-indigo-100' : 'bg-white border-gray-100 soft-shadow'
              }`}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className={`font-mono font-bold text-sm ${r.active ? 'text-indigo-600' : 'text-gray-400'}`}>{r.q}</span>
                {r.active && <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse-dot" />}
              </div>
              <ul className="space-y-3">
                {r.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className={`mt-0.5 flex-shrink-0 ${r.active ? 'text-indigo-500' : 'text-gray-300'}`} />
                    <span className={`text-sm ${r.active ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{item}</span>
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
            <span className="inline-block px-3 py-1 bg-rose-50 text-rose-600 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">Fresh Reads</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              From the <span className="gradient-text">Blog</span>
            </h2>
          </div>
          <Link to="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-indigo-600 font-medium text-sm hover:gap-2.5 transition-all">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link to={`/blog/${post.id}`} className="block p-6 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 transition-all soft-shadow hover:soft-shadow-lg hover:-translate-y-1 group h-full">
                <span className="inline-block px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full mb-3">{post.category}</span>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug">{post.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
                <div className="mt-4 text-xs text-gray-400">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} &middot; {post.readTime}</div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="sm:hidden mt-8 text-center">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-indigo-600 font-medium text-sm">
            View all posts <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Idea Box ──────────────────────────────────────────

function IdeaBox() {
  const [idea, setIdea] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!idea.trim()) return
    setSubmitted(true)
    setIdea('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="ideas" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200 animate-float">
            <Lightbulb className="text-white" size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            <span className="gradient-text-warm">Idea Box</span>
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Got a concept, feature, or wild idea? Drop it here. The best ones shape our roadmap.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input type="text" value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="What should we build next?"
              className="flex-1 px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all" />
            <button type="submit" className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-indigo-200 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
              {submitted ? 'Sent!' : 'Submit Idea'}
            </button>
          </form>
          <AnimatePresence>
            {submitted && (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-emerald-600 text-sm font-medium mt-4">
                Thanks! Your idea has been received.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Contact ───────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Ready to <span className="gradient-text">Get Started</span>?
          </h2>
          <p className="text-gray-500 text-lg">Let's talk about what we can automate for you.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Mail, label: 'Email Us', value: 'contact@getmaxglobal.com', href: 'mailto:contact@getmaxglobal.com' },
            { icon: Headphones, label: 'RCM Solutions', value: 'getmaxsolutions.com', href: 'https://getmaxsolutions.com' },
            { icon: Building2, label: 'Headquarters', value: 'India & USA', href: null },
          ].map((c, i) => (
            <div key={i} className="p-6 bg-white border border-gray-100 rounded-2xl text-center soft-shadow hover:soft-shadow-lg transition-all hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-4 bg-indigo-50 rounded-xl flex items-center justify-center">
                <c.icon className="text-indigo-600" size={22} />
              </div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{c.label}</div>
              {c.href ? (
                <a href={c.href} className="text-gray-900 font-semibold hover:text-indigo-600 transition-colors">{c.value}</a>
              ) : (
                <span className="text-gray-900 font-semibold">{c.value}</span>
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
    <footer className="py-8 px-6 border-t border-gray-100 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-extrabold text-xs">G</span>
          </div>
          <span className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Getmax Global. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/blog" className="text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium">Blog</Link>
          <a href="https://getmaxsolutions.com" className="text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium">RCM Solutions</a>
          <a href="mailto:contact@getmaxglobal.com" className="text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium">Contact</a>
        </div>
      </div>
    </footer>
  )
}

// ─── Helpers ───────────────────────────────────────────

function SectionHeader({ badge, badgeColor = 'indigo', title, subtitle }) {
  const colorMap = {
    indigo: 'bg-indigo-50 text-indigo-600',
    cyan: 'bg-cyan-50 text-cyan-600',
    purple: 'bg-purple-50 text-purple-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    sky: 'bg-sky-50 text-sky-600',
    rose: 'bg-rose-50 text-rose-600',
  }
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
      <span className={`inline-block px-3 py-1 ${colorMap[badgeColor]} text-xs font-semibold rounded-full uppercase tracking-wider mb-4`}>{badge}</span>
      <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">{title}</h2>
      {subtitle && <p className="text-gray-500 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  )
}

// ─── Home Page ─────────────────────────────────────────

function HomePage() {
  return (
    <>
      <Hero />
      <Solutions />
      <ProductsSection />
      <LabSection />
      <EnginesSection />
      <RoadmapSection />
      <BlogPreview />
      <IdeaBox />
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
