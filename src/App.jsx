import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, Zap, Shield, Globe, ArrowRight, ChevronDown,
  BarChart3, Users, Scale, Rocket, Server, Bot,
  Cpu, Cloud, Lock, TrendingUp, Mail, Layers,
  CheckCircle, ExternalLink, Menu, X, Sparkles,
  Workflow, Database, LineChart, Building2, Lightbulb
} from 'lucide-react'

const NAV_LINKS = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Engines', href: '#engines' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Ideas', href: '#ideas' },
  { label: 'Contact', href: '#contact' },
]

const SOLUTIONS = [
  {
    icon: TrendingUp,
    title: 'Sales & Revenue',
    desc: 'AI-driven pipeline, lead scoring, outreach automation, and CRM intelligence. Close more, chase less.',
    color: 'text-gx-accent',
    bg: 'bg-gx-accent/10',
  },
  {
    icon: BarChart3,
    title: 'Marketing & Content',
    desc: 'Automated content engines, social scheduling, analytics dashboards, and audience intelligence.',
    color: 'text-gx-cyan',
    bg: 'bg-gx-cyan/10',
  },
  {
    icon: Users,
    title: 'HR & People Ops',
    desc: 'HRMS automation, attendance, payroll processing, onboarding workflows, and team analytics.',
    color: 'text-gx-emerald',
    bg: 'bg-gx-emerald/10',
  },
  {
    icon: Workflow,
    title: 'Operations',
    desc: 'End-to-end process automation, task orchestration, SLA tracking, and real-time dashboards.',
    color: 'text-gx-amber',
    bg: 'bg-gx-amber/10',
  },
  {
    icon: Scale,
    title: 'Legal & Compliance',
    desc: 'Contract analysis, regulatory tracking, HIPAA compliance, audit trails, and risk management.',
    color: 'text-gx-rose',
    bg: 'bg-gx-rose/10',
  },
  {
    icon: Rocket,
    title: 'Growth & Expansion',
    desc: 'Market intelligence, investor outreach, competitive analysis, and strategic growth playbooks.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    desc: 'AWS architecture, CI/CD pipelines, serverless automation, and cost-optimized cloud deployments.',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
  },
  {
    icon: Bot,
    title: 'AI Solutions',
    desc: 'Custom AI agents, voice AI, LLM orchestration, intelligent document processing, and smart routing.',
    color: 'text-gx-accent',
    bg: 'bg-gx-accent/10',
  },
  {
    icon: Database,
    title: 'Data & Analytics',
    desc: 'Data warehousing, ETL pipelines, real-time analytics, BI dashboards, and predictive modeling.',
    color: 'text-teal-400',
    bg: 'bg-teal-400/10',
  },
]

const ENGINES = [
  {
    name: 'Revenue Engine',
    desc: 'End-to-end billing, claims, payments, AR management, and financial operations.',
    icon: LineChart,
    status: 'live',
    color: 'from-gx-accent to-gx-cyan',
  },
  {
    name: 'Delivery Engine',
    desc: 'Client onboarding, SLA enforcement, quality audits, and operational excellence.',
    icon: Layers,
    status: 'live',
    color: 'from-gx-emerald to-teal-400',
  },
  {
    name: 'Content Engine',
    desc: 'Automated content creation, social media management, brand voice, and analytics.',
    icon: Sparkles,
    status: 'live',
    color: 'from-purple-500 to-gx-rose',
  },
  {
    name: 'Product Engine',
    desc: 'AI product development, voice agents, SaaS platforms, and technical architecture.',
    icon: Cpu,
    status: 'building',
    color: 'from-gx-amber to-orange-500',
  },
  {
    name: 'Power Engine',
    desc: 'Infrastructure, security, compliance, HR, legal, and organizational backbone.',
    icon: Shield,
    status: 'building',
    color: 'from-sky-400 to-gx-accent',
  },
]

const ROADMAP = [
  { q: 'Q2 2026', items: ['AI Agent Marketplace', 'Voice AI v2 Launch', 'Multi-client Scaling'], active: true },
  { q: 'Q3 2026', items: ['Self-serve Onboarding', 'Smart Schema v6', 'API Gateway Public Beta'], active: false },
  { q: 'Q4 2026', items: ['Brain OS v1', 'Enterprise Tier', 'Global Expansion'], active: false },
  { q: 'Q1 2027', items: ['AI Tokenization Layer', 'Partner Ecosystem', 'Series A Ready'], active: false },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gx-darker/80 backdrop-blur-xl border-b border-gx-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gx-accent to-gx-cyan flex items-center justify-center">
            <span className="text-white font-extrabold text-sm">G</span>
          </div>
          <span className="font-bold text-lg text-white">Getmax<span className="text-gx-accentLight">Global</span></span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</a>
          ))}
          <a href="#contact" className="px-4 py-2 bg-gx-accent hover:bg-gx-accentLight text-white text-sm font-medium rounded-lg transition-colors">
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
            className="md:hidden bg-gx-darker border-b border-gx-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">{l.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center grid-bg pt-16">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gx-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gx-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gx-card border border-gx-border rounded-full mb-8">
            <span className="w-2 h-2 bg-gx-emerald rounded-full animate-pulse-dot" />
            <span className="text-sm text-gray-400">AI-Native Operations Platform</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
        >
          Automate Every Layer
          <br />
          <span className="gradient-text">of Your Business</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
        >
          Sales. Marketing. HR. Operations. Legal. Cloud. AI.
          <br />
          One platform. Zero busywork. Infinite scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#solutions" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gx-accent hover:bg-gx-accentLight text-white font-semibold rounded-xl transition-all hover:scale-105">
            Explore Solutions <ArrowRight size={18} />
          </a>
          <a href="#engines" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gx-card border border-gx-border hover:border-gx-accent/50 text-gray-300 font-semibold rounded-xl transition-all">
            See the Engines <ChevronDown size={18} />
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { num: '10+', label: 'AI Agents Live' },
            { num: '5', label: 'Business Engines' },
            { num: '24/7', label: 'Autonomous Ops' },
            { num: '$0', label: 'Wasted Overhead' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{s.num}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Solutions() {
  return (
    <section id="solutions" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Solutions That <span className="gradient-text">Scale</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every department. Every workflow. AI-native from day one.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group p-6 bg-gx-card border border-gx-border rounded-2xl hover:border-gx-accent/30 transition-all hover:glow-indigo"
            >
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center mb-4`}>
                <s.icon className={s.color} size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Engines() {
  return (
    <section id="engines" className="py-24 px-6 bg-gx-darker">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            The <span className="gradient-text">5 Engines</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Every business function runs on a dedicated engine. Together, they form a self-operating company.
          </p>
        </motion.div>

        <div className="space-y-4">
          {ENGINES.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-6 p-6 bg-gx-card border border-gx-border rounded-2xl hover:border-gx-accent/20 transition-all group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${e.color} flex items-center justify-center flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity`}>
                <e.icon className="text-white" size={26} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-semibold text-white">{e.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    e.status === 'live'
                      ? 'bg-gx-emerald/10 text-gx-emerald'
                      : 'bg-gx-amber/10 text-gx-amber'
                  }`}>
                    {e.status === 'live' ? 'LIVE' : 'BUILDING'}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{e.desc}</p>
              </div>
              <ArrowRight size={20} className="text-gray-600 group-hover:text-gx-accent transition-colors flex-shrink-0 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Roadmap() {
  return (
    <section id="roadmap" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="text-gray-400 text-lg">Where we're headed. Built in public.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROADMAP.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-2xl border ${
                r.active
                  ? 'bg-gx-accent/5 border-gx-accent/30 glow-indigo'
                  : 'bg-gx-card border-gx-border'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`font-mono font-semibold ${r.active ? 'text-gx-accentLight' : 'text-gray-500'}`}>{r.q}</span>
                {r.active && <span className="w-2 h-2 bg-gx-accent rounded-full animate-pulse-dot" />}
              </div>
              <ul className="space-y-3">
                {r.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <CheckCircle size={16} className={`mt-0.5 flex-shrink-0 ${r.active ? 'text-gx-accent' : 'text-gray-600'}`} />
                    <span className="text-sm text-gray-300">{item}</span>
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
    <section id="ideas" className="py-24 px-6 bg-gx-darker">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gx-accent to-gx-cyan flex items-center justify-center">
            <Lightbulb className="text-white" size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            <span className="gradient-text">Idea Box</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Got an idea for a feature, integration, or automation? Drop it here. The best ideas shape our roadmap.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="What should we build next?"
              className="flex-1 px-5 py-3.5 bg-gx-card border border-gx-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gx-accent/50 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-gx-accent hover:bg-gx-accentLight text-white font-semibold rounded-xl transition-all hover:scale-105 whitespace-nowrap"
            >
              {submitted ? 'Sent!' : 'Submit'}
            </button>
          </form>

          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-gx-emerald text-sm mt-4"
              >
                Thanks! Your idea has been received.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Ready to <span className="gradient-text">Get Started</span>?
          </h2>
          <p className="text-gray-400 text-lg">Let's talk about what we can automate for you.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            { icon: Mail, label: 'Email Us', value: 'contact@getmaxglobal.com', href: 'mailto:contact@getmaxglobal.com' },
            { icon: Globe, label: 'RCM Solutions', value: 'getmaxsolutions.com', href: 'https://getmaxsolutions.com' },
            { icon: Building2, label: 'Headquarters', value: 'India & USA', href: null },
          ].map((c, i) => (
            <div key={i} className="p-6 bg-gx-card border border-gx-border rounded-2xl text-center hover:border-gx-accent/20 transition-all">
              <c.icon className="mx-auto text-gx-accent mb-3" size={24} />
              <div className="text-sm text-gray-500 mb-1">{c.label}</div>
              {c.href ? (
                <a href={c.href} className="text-white font-medium hover:text-gx-accentLight transition-colors">
                  {c.value}
                </a>
              ) : (
                <span className="text-white font-medium">{c.value}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-gx-border bg-gx-darker">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-gx-accent to-gx-cyan flex items-center justify-center">
            <span className="text-white font-extrabold text-xs">G</span>
          </div>
          <span className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Getmax Global. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://getmaxsolutions.com" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
            RCM Solutions
          </a>
          <a href="mailto:contact@getmaxglobal.com" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Solutions />
      <Engines />
      <Roadmap />
      <IdeaBox />
      <Contact />
      <Footer />
    </>
  )
}
