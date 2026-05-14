import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Check, Sparkles, Users, FileCheck,
  Inbox, Phone, Video, Megaphone, Activity
} from 'lucide-react'

const TIERS = [
  {
    name: 'Starter',
    price: 'Free',
    period: '14-day trial',
    desc: 'Kick the tires. No credit card required.',
    cta: { label: 'Start free trial', href: 'https://app.getmaxglobal.com' },
    highlight: false,
    features: [
      'Up to 3 users',
      '1 workspace',
      'Pick any 1 product (Pulse, Verify, Flux, Echo, Lisa, Storm, or Orion)',
      'Community email support',
      'Standard rate limits',
      'No PHI / no BAA',
    ],
  },
  {
    name: 'Growth',
    price: 'Talk to us',
    period: 'volume-based',
    desc: 'For growing healthcare teams running real revenue cycle ops.',
    cta: { label: 'Book a demo', href: '/demo' },
    highlight: true,
    features: [
      'Up to 25 users',
      'Multi-product bundle',
      'Signed BAA for PHI workloads',
      'SSO (Google, Microsoft)',
      'Priority email + chat support',
      'Standard SLAs',
      'Sandbox + production environments',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Talk to us',
    period: 'annual contract',
    desc: 'For RCM organizations, MSOs, and provider groups operating at scale.',
    cta: { label: 'Book a demo', href: '/demo' },
    highlight: false,
    features: [
      'Unlimited users',
      'All 7 products',
      'BAA, custom DPA, security review',
      'SSO + SCIM provisioning',
      'Dedicated success manager',
      'Custom SLAs with credits',
      'Private deployment options',
      'White-labeling available',
    ],
  },
]

const PRODUCTS = [
  { name: 'Pulse',  letter: 'P', from: '$10 / user / mo',  desc: 'HRMS, attendance, payroll, work monitoring.', icon: Users,     color: 'from-indigo-500 to-indigo-600' },
  { name: 'Verify', letter: 'V', from: '$0.25 / EBV check', desc: 'Eligibility verification via Stedi X12 270/271.', icon: FileCheck, color: 'from-emerald-500 to-emerald-600' },
  { name: 'Flux',   letter: 'F', from: '$15 / inbox / mo',  desc: 'AI-classified unified inbox for ops teams.',  icon: Inbox,     color: 'from-green-500 to-green-600' },
  { name: 'Echo',   letter: 'E', from: '$0.18 / voice min', desc: 'Outbound + inbound AI voice agents.',         icon: Phone,     color: 'from-cyan-500 to-cyan-600' },
  { name: 'Lisa',   letter: 'L', from: '$20 / user / mo',   desc: 'Meeting bot, transcription, summaries.',      icon: Video,     color: 'from-violet-500 to-violet-600' },
  { name: 'Storm',  letter: 'S', from: '$199 / mo',         desc: 'Marketing, content, lead pipeline.',          icon: Megaphone, color: 'from-pink-500 to-pink-600' },
  { name: 'Orion',  letter: 'O', from: 'Talk to us',        desc: 'RCM command center: claims, denials, AR.',    icon: Activity,  color: 'from-amber-500 to-amber-600' },
]

export default function Pricing() {
  return (
    <div className="min-h-screen">
      <div className="section-dark border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-400 font-medium mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <span className="badge text-purple-300 mb-4">Pricing</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-4">
            Simple plans. <span className="gradient-text">Serious leverage.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Try Getmax free. Then pay for the products you actually use. We are healthcare-priced
            and revenue-shared on RCM — talk to us for the right fit.
          </p>
        </div>
      </div>

      {/* Tier grid */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`relative p-7 rounded-2xl border transition-all ${
                t.highlight
                  ? 'bg-purple-500/[0.06] border-purple-500/30 shadow-[0_0_30px_rgba(167,139,250,0.08)]'
                  : 'glass-card'
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                  Most popular
                </span>
              )}
              <h2 className="text-xl font-extrabold text-white mb-1">{t.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{t.desc}</p>
              <div className="mb-1">
                <span className="text-4xl font-extrabold gradient-text">{t.price}</span>
              </div>
              <div className="text-xs text-gray-500 mb-6 uppercase tracking-[0.15em]">{t.period}</div>

              {t.cta.href.startsWith('http') ? (
                <a
                  href={t.cta.href}
                  target="_blank"
                  rel="noopener"
                  className={`block text-center px-5 py-3 font-semibold rounded-full text-sm transition-all mb-6 ${
                    t.highlight
                      ? 'bg-white text-[#0A0A0F] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]'
                      : 'bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white'
                  }`}
                >
                  {t.cta.label}
                </a>
              ) : (
                <Link
                  to={t.cta.href}
                  className={`block text-center px-5 py-3 font-semibold rounded-full text-sm transition-all mb-6 ${
                    t.highlight
                      ? 'bg-white text-[#0A0A0F] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]'
                      : 'bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white'
                  }`}
                >
                  {t.cta.label}
                </Link>
              )}

              <ul className="space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={16} className={`mt-0.5 flex-shrink-0 ${t.highlight ? 'text-purple-400' : 'text-emerald-400'}`} />
                    <span className="text-sm text-gray-300">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-8 uppercase tracking-[0.15em]">
          Prices in USD. Annual billing discounts available on Growth and Enterprise.
        </p>
      </div>

      {/* Per-product pricing */}
      <div className="section-dark py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="badge text-purple-300 mb-4">A la carte</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4">
              The 7 products, <span className="gradient-text">priced clearly</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Bundle them or pick one. Volume discounts kick in on Growth and Enterprise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="p-6 glass-card rounded-2xl hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-extrabold text-lg">{p.letter}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{p.name}</h3>
                    <div className="text-xs text-gray-500 uppercase tracking-[0.15em]">Starting at {p.from}</div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="badge text-purple-300 mb-4 mx-auto w-fit">
              <Sparkles size={12} />
              <span>See it on real data</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Ready to <span className="gradient-text">book a demo?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              30 minutes. We walk through your highest-friction workflow and show you exactly what
              Getmax automates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0A0A0F] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:-translate-y-0.5">
                Book a demo <ArrowRight size={18} />
              </Link>
              <a href="mailto:contact@getmaxglobal.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.04] border border-white/[0.08] text-white font-semibold rounded-full transition-all hover:bg-white/[0.08] hover:-translate-y-0.5">
                Email sales
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
